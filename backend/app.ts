import { clerkMiddleware, getAuth } from '@clerk/express'
import cors from 'cors'
import express, { Request, Response } from 'express'
import multer from 'multer'
import { collections } from './db'
import { DEFAULT_GRID, splitBinderPage, type BinderGrid } from './imaging/binder'
import { cellActivity, MIN_CARD_ACTIVITY } from './imaging/occupancy'
import { getCardPrices, type CardPrices } from './pricing/pricing'
import { recognize } from './recognition/matcher'
import { loadIndex, type HashEntry } from './recognition/store'

// Load the perceptual-hash index once, on first scan, and reuse it. If the
// index hasn't been built yet loadIndex() returns [] and recognition is
// simply skipped, so the endpoint still returns the card crops.
let indexPromise: Promise<HashEntry[]> | null = null
function getIndex(): Promise<HashEntry[]> {
  if (!indexPromise) {
    indexPromise = loadIndex()
  }
  return indexPromise
}

/**
 * The Express application and its routes, with no server binding or database
 * connection side effects. `server.ts` wires this up to a port and Mongo;
 * tests import it directly via supertest.
 */
export const app = express()

app.use(cors()) // Enable CORS
app.use(express.json()) // Parse JSON request bodies (used by POST /api/cards)
// Attach Clerk auth context to every request (does not require auth on its
// own; individual routes enforce it by checking getAuth(req).userId and
// returning 401). Reads CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY from the
// environment.
app.use(clerkMiddleware())

// Hold the uploaded binder page in memory; we process it immediately and don't
// need it on disk. Limit to a single 25MB image per request.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024, files: 1 }
})

/** Parse a 1-4 grid-axis override from a request field; null if absent/invalid. */
function parseAxis(value: unknown): number | null {
  const n = Number(value)
  return Number.isInteger(n) && n >= 1 && n <= 4 ? n : null
}

// Accept a binder-page photo and split it into its individual card crops.
// The page layout (rows x cols, each 1-4) comes from the request `rows`/`cols`
// fields and defaults to the standard 3x3 nine-pocket page. Empty pockets are
// detected and dropped so the result reflects the actual cards. Each crop is a
// base64 PNG data URL; recognition and pricing happen per card below.
app.post('/api/scan/process', upload.single('image'), async (req: Request, res: Response) => {
  if (!getAuth(req).userId) {
    res.status(401).send('Unauthorized')
    return
  }
  if (!req.file) {
    res.status(400).send("No image uploaded (expected field 'image')")
    return
  }

  try {
    const rows = parseAxis(req.body?.rows)
    const cols = parseAxis(req.body?.cols)
    const grid: BinderGrid = rows && cols ? { rows, cols } : DEFAULT_GRID

    const allCrops = await splitBinderPage(req.file.buffer, grid)

    // Drop empty pockets: keep cells whose detail is a meaningful fraction of
    // the busiest cell (the busiest is always kept, so a single card survives).
    // If even the busiest cell is essentially blank, the page holds no cards —
    // otherwise an all-empty page would report a full grid.
    const activities = await Promise.all(allCrops.map(crop => cellActivity(crop.buffer)))
    const maxActivity = Math.max(...activities, 0)
    const crops =
      maxActivity < MIN_CARD_ACTIVITY
        ? []
        : allCrops.filter((_, i) => activities[i] >= maxActivity * 0.2)

    const index = await getIndex()

    const cards = await Promise.all(
      crops.map(async crop => {
        const match = await recognize(crop.buffer, index)
        return {
          index: crop.index,
          row: crop.row,
          col: crop.col,
          width: crop.width,
          height: crop.height,
          image: `data:image/png;base64,${crop.buffer.toString('base64')}`,
          match,
          prices: null as CardPrices | null
        }
      })
    )

    // Look up EUR prices for recognized cards. Done sequentially (Scryfall
    // is rate-limited) and memoised per request so duplicate cards on a page
    // are fetched once. A pricing failure must not fail the whole scan.
    const priceCache = new Map<string, CardPrices | null>()
    for (const card of cards) {
      if (!card.match) continue
      const { scryfallId } = card.match
      if (!priceCache.has(scryfallId)) {
        priceCache.set(scryfallId, await getCardPrices(scryfallId).catch(() => null))
      }
      card.prices = priceCache.get(scryfallId) ?? null
    }

    res.status(200).send({ grid, cards })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    res.status(500).send(message)
  }
})

// A card saved to the signed-in user's collection.
interface SavedCard {
  userId: string
  scryfallId: string | null
  name: string
  set: string | null
  eur: number | null
  createdAt: Date
}

// Return only the signed-in user's saved cards.
app.get('/api/cards', async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      res.status(401).send('Unauthorized')
      return
    }
    const cards = await collections.cards!.find({ userId }).toArray()
    res.status(200).send(cards)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    res.status(500).send(message)
  }
})

// Save a card to the signed-in user's collection.
app.post('/api/cards', async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      res.status(401).send('Unauthorized')
      return
    }

    const { scryfallId, name, set, eur } = req.body ?? {}
    if (typeof name !== 'string' || name.length === 0) {
      res.status(400).send("'name' is required")
      return
    }

    const card: SavedCard = {
      userId,
      scryfallId: typeof scryfallId === 'string' ? scryfallId : null,
      name,
      set: typeof set === 'string' ? set : null,
      eur: typeof eur === 'number' ? eur : null,
      createdAt: new Date()
    }

    const result = await collections.cards!.insertOne(card)
    res.status(201).send({ _id: result.insertedId, ...card })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    res.status(500).send(message)
  }
})
