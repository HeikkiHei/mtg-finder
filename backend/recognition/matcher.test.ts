import sharp from 'sharp'
import { recognize } from './matcher'
import { computePhash } from './phash'
import type { HashEntry } from './store'

/** A deterministic noisy image so its pHash is varied and distinct per seed. */
async function patterned(seed: number, w = 64, h = 64) {
  const raw = Buffer.alloc(w * h * 3)
  let s = seed
  for (let i = 0; i < w * h; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const v = s % 256
    raw[i * 3] = v
    raw[i * 3 + 1] = v
    raw[i * 3 + 2] = v
  }
  return sharp(raw, { raw: { width: w, height: h, channels: 3 } })
    .png()
    .toBuffer()
}

function entry(id: string, hash: string): HashEntry {
  return {
    scryfallId: id,
    name: id,
    set: 'tst',
    collectorNumber: '1',
    lang: 'en',
    imageUrl: 'http://example/img.png',
    hash
  }
}

// A populated index of distinct cards (seeds 1..count) so the outlier
// statistic is meaningful.
async function buildIndex(count: number): Promise<HashEntry[]> {
  const entries: HashEntry[] = []
  for (let seed = 1; seed <= count; seed++) {
    entries.push(entry(`card-${seed}`, await computePhash(await patterned(seed))))
  }
  return entries
}

describe('recognize', () => {
  let index: HashEntry[]
  beforeAll(async () => {
    index = await buildIndex(40)
  })

  it('returns null for an empty index', async () => {
    expect(await recognize(await patterned(5), [])).toBeNull()
  })

  it('recognises a card that stands out as a clear outlier', async () => {
    const match = await recognize(await patterned(5), index)
    expect(match?.scryfallId).toBe('card-5')
    expect(match?.distance).toBe(0)
    expect(match?.score).toBeGreaterThan(4)
  })

  it('matches a card slotted upside-down (180° rotation)', async () => {
    const upsideDown = await sharp(await patterned(7))
      .rotate(180)
      .toBuffer()
    const match = await recognize(upsideDown, index)
    expect(match?.scryfallId).toBe('card-7')
  })

  it('returns null when no card stands out (not in the index)', async () => {
    // Seed 9999 isn't indexed, so nothing is a meaningful outlier.
    expect(await recognize(await patterned(9999), index)).toBeNull()
  })

  it('declines to guess from too small an index', async () => {
    const tiny = index.slice(0, 4)
    // Even with the exact card present, the statistic is too noisy to trust.
    expect(await recognize(await patterned(1), tiny)).toBeNull()
  })
})
