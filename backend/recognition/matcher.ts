import { computeOrientationHashes, hammingDistance } from './phash'
import type { HashEntry } from './store'

export interface RecognitionMatch {
  scryfallId: string
  name: string
  set: string
  collectorNumber: string
  lang: string
  imageUrl: string
  /** Hamming distance to the matched index entry (lower = more similar). */
  distance: number
  /** How many standard deviations the match stands out as an outlier (higher = more confident). */
  score: number
}

/**
 * A match is accepted only if the best candidate's distance is an outlier this
 * many standard deviations below the field of candidate distances. Rather than
 * a fixed distance cutoff (which fails when sleeve glare/angle shift every
 * distance up together), this self-normalises per photo: we only claim a match
 * when one card clearly stands out. Approach from tmikonen's magic_card_detector.
 */
export const HASH_SEPARATION_THRESHOLD = 4

/**
 * Below this many distinct candidate cards the outlier statistic is too noisy
 * to trust, so we decline to guess. Recognition therefore needs a reasonably
 * populated index to make confident calls.
 */
const MIN_CANDIDATES = 10

/**
 * Identify a card crop by perceptual-hash similarity to the index.
 *
 * The crop is hashed at all four orientations; each indexed card's distance is
 * the best of those. Distances are collapsed per card name (so reprints don't
 * split a card's votes), and a match is returned only when the closest card is
 * a statistical outlier (>= `threshold` std devs below the mean). Returns null
 * when the index is empty/too small or nothing stands out — the caller treats
 * that as "couldn't identify" rather than a wrong guess.
 */
export async function recognize(
  image: Buffer,
  index: HashEntry[],
  threshold: number = HASH_SEPARATION_THRESHOLD
): Promise<RecognitionMatch | null> {
  if (index.length === 0) {
    return null
  }

  const queryHashes = await computeOrientationHashes(image)

  // Best distance per card name, keeping the entry that achieved it.
  const bestByName = new Map<string, { entry: HashEntry; distance: number }>()
  for (const entry of index) {
    let distance = Number.POSITIVE_INFINITY
    for (const queryHash of queryHashes) {
      const d = hammingDistance(queryHash, entry.hash)
      if (d < distance) distance = d
    }
    const current = bestByName.get(entry.name)
    if (!current || distance < current.distance) {
      bestByName.set(entry.name, { entry, distance })
    }
  }

  const candidates = [...bestByName.values()]
  if (candidates.length < MIN_CANDIDATES) {
    return null
  }

  const distances = candidates.map(c => c.distance)
  const mean = distances.reduce((sum, d) => sum + d, 0) / distances.length
  const variance = distances.reduce((sum, d) => sum + (d - mean) ** 2, 0) / distances.length
  const std = Math.sqrt(variance)
  if (std === 0) {
    return null
  }

  let best = candidates[0]
  for (const candidate of candidates) {
    if (candidate.distance < best.distance) best = candidate
  }

  const score = (mean - best.distance) / std
  if (score < threshold) {
    return null
  }

  return {
    scryfallId: best.entry.scryfallId,
    name: best.entry.name,
    set: best.entry.set,
    collectorNumber: best.entry.collectorNumber,
    lang: best.entry.lang,
    imageUrl: best.entry.imageUrl,
    distance: best.distance,
    score
  }
}
