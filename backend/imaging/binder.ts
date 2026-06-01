import sharp from "sharp"

export interface BinderGrid {
  rows: number
  cols: number
}

export interface CardCrop {
  /** Position in the binder page, left-to-right then top-to-bottom (0-8 for a 3x3 page). */
  index: number
  row: number
  col: number
  /** Processed crop encoded as a PNG buffer. */
  buffer: Buffer
  width: number
  height: number
}

/** A standard binder page holds 9 cards in a 3x3 grid. */
export const DEFAULT_GRID: BinderGrid = { rows: 3, cols: 3 }

/**
 * Split a binder-page image into its individual card crops.
 *
 * The page is assumed to be a regular `rows x cols` grid (3x3 by default). Each
 * cell is extracted as its own image. EXIF orientation is normalised first so
 * crops line up with what the user actually photographed.
 *
 * Card recognition (perceptual hashing) and de-distortion of the plastic-sleeve
 * warp are handled downstream; this step only divides the page into cells.
 */
export async function splitBinderPage(
  input: Buffer,
  grid: BinderGrid = DEFAULT_GRID,
): Promise<CardCrop[]> {
  // Bake in EXIF rotation, then read the resulting dimensions.
  const normalised = await sharp(input).rotate().toBuffer()
  const { width, height } = await sharp(normalised).metadata()

  if (!width || !height) {
    throw new Error("Could not read image dimensions")
  }

  const cellWidth = Math.floor(width / grid.cols)
  const cellHeight = Math.floor(height / grid.rows)

  if (cellWidth < 1 || cellHeight < 1) {
    throw new Error(
      `Image (${width}x${height}) is too small for a ${grid.rows}x${grid.cols} grid`,
    )
  }

  const crops: CardCrop[] = []

  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      const left = col * cellWidth
      const top = row * cellHeight
      // Clamp the final row/column so rounding never reads past the edge.
      const extractWidth =
        col === grid.cols - 1 ? width - left : cellWidth
      const extractHeight =
        row === grid.rows - 1 ? height - top : cellHeight

      const buffer = await sharp(normalised)
        .extract({ left, top, width: extractWidth, height: extractHeight })
        .png()
        .toBuffer()

      crops.push({
        index: row * grid.cols + col,
        row,
        col,
        buffer,
        width: extractWidth,
        height: extractHeight,
      })
    }
  }

  return crops
}
