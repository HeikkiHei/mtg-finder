import { promises as fs } from 'fs'
import path from 'path'

/**
 * On-disk perceptual-hash index. This is derived/cacheable reference data (the
 * hashes of known Scryfall card images), so it lives in a local JSON file
 * rather than the database. Build it with `build-index.ts`.
 */
export interface HashEntry {
  scryfallId: string
  name: string
  set: string
  collectorNumber: string
  lang: string
  imageUrl: string
  /** DCT perceptual hash as a hex string (see phash.ts). */
  hash: string
}

export const DEFAULT_INDEX_PATH = path.join(__dirname, 'data', 'hashes.json')

/** Load the hash index. Returns an empty array if it hasn't been built yet. */
export async function loadIndex(indexPath: string = DEFAULT_INDEX_PATH): Promise<HashEntry[]> {
  try {
    const raw = await fs.readFile(indexPath, 'utf8')
    return JSON.parse(raw) as HashEntry[]
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/** Persist the hash index, creating the data directory if needed. */
export async function saveIndex(
  entries: HashEntry[],
  indexPath: string = DEFAULT_INDEX_PATH
): Promise<void> {
  await fs.mkdir(path.dirname(indexPath), { recursive: true })
  await fs.writeFile(indexPath, JSON.stringify(entries))
}
