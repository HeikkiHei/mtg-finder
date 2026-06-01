import { computeOrientationHashes, hammingDistance } from "./phash"
import type { HashEntry } from "./store"

export interface RecognitionMatch {
  scryfallId: string
  name: string
  set: string
  collectorNumber: string
  lang: string
  imageUrl: string
  /** Hamming distance to the matched index entry (lower = more confident). */
  distance: number
}

/**
 * Maximum Hamming distance (out of 64 bits) we accept as a match. Identical
 * images score 0; binder-sleeve distortion and re-encoding typically stay in
 * the single digits, so a low double-digit ceiling keeps false positives out.
 */
export const DEFAULT_MAX_DISTANCE = 12

/**
 * Identify a card crop by finding the nearest perceptual hash in the index.
 * Each candidate is compared against the crop at both orientations (upright and
 * 180°-rotated) so cards slotted upside-down still match. Returns null if the
 * index is empty or nothing is within `maxDistance`.
 */
export async function recognize(
  image: Buffer,
  index: HashEntry[],
  maxDistance: number = DEFAULT_MAX_DISTANCE,
): Promise<RecognitionMatch | null> {
  if (index.length === 0) {
    return null
  }

  const queryHashes = await computeOrientationHashes(image)

  let best: HashEntry | null = null
  let bestDistance = Number.POSITIVE_INFINITY

  for (const entry of index) {
    for (const queryHash of queryHashes) {
      const distance = hammingDistance(queryHash, entry.hash)
      if (distance < bestDistance) {
        bestDistance = distance
        best = entry
      }
    }
  }

  if (!best || bestDistance > maxDistance) {
    return null
  }

  return {
    scryfallId: best.scryfallId,
    name: best.name,
    set: best.set,
    collectorNumber: best.collectorNumber,
    lang: best.lang,
    imageUrl: best.imageUrl,
    distance: bestDistance,
  }
}
