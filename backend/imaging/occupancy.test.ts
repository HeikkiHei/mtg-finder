import sharp from 'sharp'
import { cellActivity } from './occupancy'

// A per-pixel-noise tile (busy card detail).
async function noiseTile(width: number, height: number, seed = 1) {
  const raw = Buffer.alloc(width * height * 3)
  for (let i = 0; i < width * height; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    raw[i * 3] = raw[i * 3 + 1] = raw[i * 3 + 2] = seed % 256
  }
  return sharp(raw, { raw: { width, height, channels: 3 } })
    .png()
    .toBuffer()
}

// A uniform tile (blank pocket).
async function blankTile(width: number, height: number) {
  return sharp({ create: { width, height, channels: 3, background: '#dddddd' } })
    .png()
    .toBuffer()
}

describe('cellActivity', () => {
  it('scores a detailed card far above a blank pocket', async () => {
    const card = await cellActivity(await noiseTile(70, 96))
    const empty = await cellActivity(await blankTile(70, 96))

    expect(empty).toBeLessThan(card * 0.2)
  })
})
