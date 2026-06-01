/**
 * Minimal Scryfall API client used to build the recognition index and to look
 * up card data/prices. Scryfall asks API consumers to send a descriptive
 * User-Agent and to throttle to ~10 requests/second, both of which we honour.
 *
 * Docs: https://scryfall.com/docs/api
 */

const API_BASE = "https://api.scryfall.com"
const USER_AGENT = "mtg-finder/0.1 (personal project)"
const RATE_LIMIT_MS = 100

export interface ScryfallImageUris {
  small?: string
  normal?: string
  large?: string
  png?: string
  art_crop?: string
}

export interface ScryfallPrices {
  eur?: string | null
  eur_foil?: string | null
  usd?: string | null
  usd_foil?: string | null
}

export interface ScryfallCard {
  id: string
  name: string
  set: string
  collector_number: string
  lang: string
  finishes?: string[]
  image_uris?: ScryfallImageUris
  card_faces?: { image_uris?: ScryfallImageUris }[]
  prices?: ScryfallPrices
}

interface ScryfallList {
  data: ScryfallCard[]
  has_more: boolean
  next_page?: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
  })
  if (!response.ok) {
    throw new Error(`Scryfall request failed (${response.status}): ${url}`)
  }
  return (await response.json()) as T
}

/**
 * Run a Scryfall search and return up to `limit` cards, paginating as needed.
 * `query` uses Scryfall search syntax, e.g. `set:dsk` or `set:dsk unique:prints`.
 */
export async function searchCards(
  query: string,
  limit = 250,
): Promise<ScryfallCard[]> {
  const cards: ScryfallCard[] = []
  let url: string | undefined =
    `${API_BASE}/cards/search?q=${encodeURIComponent(query)}`

  while (url && cards.length < limit) {
    const page: ScryfallList = await getJson<ScryfallList>(url)
    cards.push(...page.data)
    url = page.has_more ? page.next_page : undefined
    if (url) await sleep(RATE_LIMIT_MS)
  }

  return cards.slice(0, limit)
}

/** Pick the best whole-card image URL for hashing (front face for DFCs). */
export function cardImageUrl(card: ScryfallCard): string | undefined {
  return (
    card.image_uris?.normal ??
    card.card_faces?.[0]?.image_uris?.normal ??
    card.image_uris?.large ??
    card.card_faces?.[0]?.image_uris?.large
  )
}

/** Download an image as a Buffer, throttled to respect Scryfall's rate limit. */
export async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } })
  if (!response.ok) {
    throw new Error(`Image download failed (${response.status}): ${url}`)
  }
  await sleep(RATE_LIMIT_MS)
  return Buffer.from(await response.arrayBuffer())
}
