import sharp from 'sharp'
import { computeDHash, computeOrientationHashes, hammingDistance } from './phash'

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

describe('computeDHash', () => {
  it('returns a 16-character hex string (64-bit hash)', async () => {
    const hash = await computeDHash(await solid(120))
    expect(hash).toMatch(/^[0-9a-f]{16}$/)
  })

  it('is deterministic for the same image', async () => {
    const img = await gradient()
    expect(await computeDHash(img)).toBe(await computeDHash(img))
  })

  it('is stable across resizing and re-encoding (perceptual)', async () => {
    const img = await gradient(128, 128)
    const reencoded = await sharp(img).resize(80, 110).jpeg({ quality: 80 }).toBuffer()
    const distance = hammingDistance(await computeDHash(img), await computeDHash(reencoded))
    expect(distance).toBeLessThanOrEqual(6)
  })

  it('produces very different hashes for visually different images', async () => {
    const ramp = await computeDHash(await gradient())
    const flat = await computeDHash(await solid(120))
    expect(hammingDistance(ramp, flat)).toBeGreaterThan(40)
  })
})

describe('computeOrientationHashes', () => {
  it('returns the upright hash and the 180°-rotated hash', async () => {
    const img = await gradient()
    const [upright, flipped] = await computeOrientationHashes(img)

    expect(upright).toBe(await computeDHash(img))
    expect(flipped).toBe(await computeDHash(await sharp(img).rotate(180).toBuffer()))
  })
})
