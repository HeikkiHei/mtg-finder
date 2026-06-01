import sharp from 'sharp'
import { splitBinderPage } from './binder'

/** Compose a grid of distinct coloured tiles into one page image. */
async function gridPage(cols: number, rows: number, cw: number, ch: number) {
  const cells: sharp.OverlayOptions[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hue = (r * cols + c) * 20
      const tile = await sharp({
        create: {
          width: cw,
          height: ch,
          channels: 3,
          background: { r: hue, g: 255 - hue, b: 120 }
        }
      })
        .png()
        .toBuffer()
      cells.push({ input: tile, left: c * cw, top: r * ch })
    }
  }
  return sharp({
    create: { width: cols * cw, height: rows * ch, channels: 3, background: '#000' }
  })
    .composite(cells)
    .png()
    .toBuffer()
}

describe('splitBinderPage', () => {
  it('splits a 3x3 page into 9 positioned crops', async () => {
    const page = await gridPage(3, 3, 90, 126)
    const crops = await splitBinderPage(page)

    expect(crops).toHaveLength(9)
    crops.forEach((crop, i) => {
      expect(crop.index).toBe(i)
      expect(crop.row).toBe(Math.floor(i / 3))
      expect(crop.col).toBe(i % 3)
      expect(crop.width).toBe(90)
      expect(crop.height).toBe(126)
      expect(crop.buffer.length).toBeGreaterThan(0)
    })
  })

  it('supports a custom grid size', async () => {
    const page = await gridPage(2, 2, 50, 70)
    const crops = await splitBinderPage(page, { rows: 2, cols: 2 })
    expect(crops).toHaveLength(4)
  })

  it('clamps the final row/column when dimensions are not divisible', async () => {
    const page = await sharp({
      create: { width: 100, height: 100, channels: 3, background: '#888' }
    })
      .png()
      .toBuffer()

    const crops = await splitBinderPage(page, { rows: 3, cols: 3 })

    expect(crops).toHaveLength(9)
    // 100 / 3 -> 33 per cell, last cell absorbs the remainder (34).
    expect(crops[8].width).toBe(34)
    expect(crops[8].height).toBe(34)
    // A full row of crops still spans the whole image width.
    const row0Width = crops.filter(c => c.row === 0).reduce((sum, c) => sum + c.width, 0)
    expect(row0Width).toBe(100)
  })

  it('throws when the image is too small for the requested grid', async () => {
    const tiny = await sharp({
      create: { width: 2, height: 2, channels: 3, background: '#fff' }
    })
      .png()
      .toBuffer()

    await expect(splitBinderPage(tiny, { rows: 3, cols: 3 })).rejects.toThrow(/too small/)
  })
})
