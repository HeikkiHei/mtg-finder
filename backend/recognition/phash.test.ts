import sharp from 'sharp'
import { computeOrientationHashes, computePhash, hammingDistance } from './phash'

const solid = (gray: number, w = 64, h = 89) =>
  sharp({
    create: {
      width: w,
      height: h,
      channels: 3,
      background: { r: gray, g: gray, b: gray }
    }
  })
    .png()
    .toBuffer()

/** A left-to-right brightness ramp (0 -> 255). */
async function gradient(w = 64, h = 64) {
  const raw = Buffer.alloc(w * h * 3)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const v = Math.round((x / (w - 1)) * 255)
      const i = (y * w + x) * 3
      raw[i] = v
      raw[i + 1] = v
      raw[i + 2] = v
    }
  }
  return sharp(raw, { raw: { width: w, height: h, channels: 3 } })
    .png()
    .toBuffer()
}

describe('hammingDistance', () => {
  it('is 0 for identical hashes', () => {
    expect(hammingDistance('ffffffffffffffff', 'ffffffffffffffff')).toBe(0)
  })

  it('counts the number of differing bits', () => {
    expect(hammingDistance('0000000000000000', '0000000000000001')).toBe(1)
    expect(hammingDistance('0000000000000000', '000000000000000f')).toBe(4)
    expect(hammingDistance('0000000000000000', 'ffffffffffffffff')).toBe(64)
  })
})

describe('computePhash', () => {
  it('returns a 256-character hex string (1024-bit hash)', async () => {
    const hash = await computePhash(await gradient())
    expect(hash).toMatch(/^[0-9a-f]{256}$/)
  })

  it('is deterministic for the same image', async () => {
    const img = await gradient()
    expect(await computePhash(img)).toBe(await computePhash(img))
  })

  it('produces very different hashes for visually different images', async () => {
    const ramp = await computePhash(await gradient())
    const flat = await computePhash(await solid(120))
    // Unrelated images differ in a large fraction of the 1024 bits. (The 1024-bit
    // pHash includes high frequencies that transforms perturb, so absolute
    // distance is only meaningful relatively — see matcher.ts's outlier rule.)
    expect(hammingDistance(ramp, flat)).toBeGreaterThan(200)
  })
})

describe('computeOrientationHashes', () => {
  it('returns the four 0/90/180/270 orientation hashes', async () => {
    const img = await gradient()
    const hashes = await computeOrientationHashes(img)

    expect(hashes).toHaveLength(4)
    expect(hashes[0]).toBe(await computePhash(img))
    expect(hashes[2]).toBe(await computePhash(await sharp(img).rotate(180).toBuffer()))
  })
})
