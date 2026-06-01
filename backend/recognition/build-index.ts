import { computeDHash } from './phash'
import { cardImageUrl, downloadImage, searchCards } from './scryfall'
import { DEFAULT_INDEX_PATH, saveIndex, type HashEntry } from './store'

export interface BuildOptions {
  /** Scryfall search query, e.g. `set:dsk` or `set:dsk lang:en`. */
  query: string
  /** Maximum number of cards to index. */
  limit?: number
  indexPath?: string
}

/**
 * Build (or rebuild) the perceptual-hash index from a Scryfall search. Cards
 * without a usable image are skipped. Downloads are rate-limited inside the
 * Scryfall client. Returns the entries that were written.
 *
 * This is intentionally scoped by `query`/`limit`: hashing all of Scryfall is
 * gigabytes and hours of downloads, so start with the sets you actually own.
 */
export async function buildIndex({
  query,
  limit = 250,
  indexPath = DEFAULT_INDEX_PATH
}: BuildOptions): Promise<HashEntry[]> {
  const cards = await searchCards(query, limit)
  const entries: HashEntry[] = []

  for (const card of cards) {
    const imageUrl = cardImageUrl(card)
    if (!imageUrl) continue

    try {
      const image = await downloadImage(imageUrl)
      const hash = await computeDHash(image)
      entries.push({
        scryfallId: card.id,
        name: card.name,
        set: card.set,
        collectorNumber: card.collector_number,
        lang: card.lang,
        imageUrl,
        hash
      })
    } catch (error) {
      console.warn(`Skipped ${card.name} (${card.set}): ${(error as Error).message}`)
    }
  }

  await saveIndex(entries, indexPath)
  return entries
}

// CLI: ts-node recognition/build-index.ts "<scryfall query>" [limit]
if (require.main === module) {
  const query = process.argv[2]
  const limit = process.argv[3] ? Number(process.argv[3]) : undefined

  if (!query) {
    console.error('Usage: ts-node recognition/build-index.ts "<scryfall query>" [limit]')
    process.exit(1)
  }

  buildIndex({ query, limit })
    .then(entries => console.log(`Indexed ${entries.length} cards -> ${DEFAULT_INDEX_PATH}`))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
