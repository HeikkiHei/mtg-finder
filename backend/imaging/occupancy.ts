import sharp from 'sharp'

/**
 * Below this average-gradient value a cell is treated as a blank pocket even if
 * it is the busiest one on the page, so an all-empty page yields zero cards
 * instead of a full grid. Real cards (borders, art, text) score far higher.
 */
export const MIN_CARD_ACTIVITY = 4

/**
 * Average gradient "activity" of a single card-cell crop. A card is full of
 * detail (high activity); an empty binder pocket is near-blank (low). The scan
 * endpoint compares each cell against the busiest one to drop empty pockets, so
 * the reported count reflects the actual cards on the page.
 *
 * The page layout itself (rows x cols) is supplied by the user rather than
 * guessed: reliably detecting the grid from arbitrary phone photos needs heavy
 * computer vision (perspective rectification) for little gain over a one-tap
 * page-size choice that defaults to the standard 3x3 nine-pocket page.
 */
export async function cellActivity(input: Buffer): Promise<number> {
  const { data, info } = await sharp(input)
    .resize(64, 64, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const w = info.width
  const h = info.height
  const stride = info.channels
  const value = (x: number, y: number) => data[(y * w + x) * stride]

  let sum = 0
  let count = 0
  for (let y = 1; y < h; y++) {
    for (let x = 1; x < w; x++) {
      sum += Math.abs(value(x, y) - value(x - 1, y)) + Math.abs(value(x, y) - value(x, y - 1))
      count++
    }
  }
  return count === 0 ? 0 : sum / count
}
