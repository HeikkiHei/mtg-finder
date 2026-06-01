import cors from 'cors'
import express, { Request, Response } from 'express'
import multer from 'multer'
import Card from './cards/card'
import { collections } from './db'
import { splitBinderPage } from './imaging/binder'
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

// Hold the uploaded binder page in memory; we process it immediately and don't
// need it on disk. Limit to a single 25MB image per request.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024, files: 1 }
})

// Accept a binder-page photo and split it into its individual card crops.
// Each crop is returned as a base64 PNG data URL so the frontend can preview
// them; recognition and pricing happen in later steps of the pipeline.
app.post('/api/scan/process', upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send("No image uploaded (expected field 'image')")
    return
  }

  try {
    const crops = await splitBinderPage(req.file.buffer)
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

    res.status(200).send({ cards })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    res.status(500).send(message)
  }
})

app.get('/api/cards', async (_req: Request, res: Response) => {
  try {
    const cards = (await collections.cards!.find({}).toArray()) as Card[]

    res.status(200).send(cards) // Send the cards as JSON
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unknown error occurred')
    }
  }
})
