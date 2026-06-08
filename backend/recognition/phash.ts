import sharp from 'sharp'

/**
 * Perceptual hashing for card recognition.
 *
 * We use a DCT-based perceptual hash (pHash): downscale to greyscale, take the
 * 2D discrete cosine transform, keep the low-frequency top-left block and
 * threshold each coefficient against the block's median. This captures far more
 * structure than a difference hash and is robust to scaling, JPEG noise and the
 * colour shifts of binder-sleeve plastic.
 *
 * Hashes are HASH_SIZE*HASH_SIZE bits, serialised as a hex string so they store
 * cleanly in the on-disk index and compare cheaply with a Hamming distance.
 */

// 32x32 low-frequency block -> 1024-bit hash. Larger hashes make a true match
// stand out much more sharply as a statistical outlier (see matcher.ts).
const HASH_SIZE = 32
// Downscale resolution fed into the DCT (4x the hash size, as in imagehash).
const DCT_SIZE = HASH_SIZE * 4

// cos[k][n] = cos(pi * (n + 0.5) * k / DCT_SIZE), cached across calls.
let cosTable: Float64Array[] | null = null
function getCosTable(): Float64Array[] {
  if (!cosTable) {
    cosTable = []
    for (let k = 0; k < HASH_SIZE; k++) {
      const row = new Float64Array(DCT_SIZE)
      for (let n = 0; n < DCT_SIZE; n++) {
        row[n] = Math.cos((Math.PI * (n + 0.5) * k) / DCT_SIZE)
      }
      cosTable.push(row)
    }
  }
  return cosTable
}

/** Compute the DCT perceptual hash of an image as a hex string. */
export async function computePhash(input: Buffer): Promise<string> {
  const { data, info } = await sharp(input)
    .greyscale()
    .resize(DCT_SIZE, DCT_SIZE, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const stride = info.channels // greyscale value lives in channel 0
  const cos = getCosTable()

  // Separable 2D DCT-II, keeping only the HASH_SIZE lowest frequencies on each
  // axis. First transform every row (along x), then those columns (along y).
  const intermediate: Float64Array[] = []
  for (let y = 0; y < DCT_SIZE; y++) {
    const row = new Float64Array(HASH_SIZE)
    const base = y * DCT_SIZE
    for (let k = 0; k < HASH_SIZE; k++) {
      const ck = cos[k]
      let sum = 0
      for (let x = 0; x < DCT_SIZE; x++) sum += data[(base + x) * stride] * ck[x]
      row[k] = sum
    }
    intermediate.push(row)
  }

  const coeffs = new Float64Array(HASH_SIZE * HASH_SIZE)
  for (let k = 0; k < HASH_SIZE; k++) {
    for (let u = 0; u < HASH_SIZE; u++) {
      const cu = cos[u]
      let sum = 0
      for (let y = 0; y < DCT_SIZE; y++) sum += intermediate[y][k] * cu[y]
      coeffs[u * HASH_SIZE + k] = sum
    }
  }

  const sorted = Float64Array.from(coeffs).sort()
  const mid = sorted.length >> 1
  const median = (sorted[mid - 1] + sorted[mid]) / 2

  // Pack one bit per coefficient (> median) into a hex string, MSB-first.
  let hex = ''
  for (let i = 0; i < coeffs.length; i += 4) {
    const nibble =
      ((coeffs[i] > median ? 1 : 0) << 3) |
      ((coeffs[i + 1] > median ? 1 : 0) << 2) |
      ((coeffs[i + 2] > median ? 1 : 0) << 1) |
      (coeffs[i + 3] > median ? 1 : 0)
    hex += nibble.toString(16)
  }
  return hex
}

/**
 * Compute hashes for an image at the four orientations a binder card is
 * plausibly photographed in (0/90/180/270). Matching the query against all four
 * lets us recognise cards slotted rotated.
 */
export async function computeOrientationHashes(input: Buffer): Promise<string[]> {
  const variants = [
    input,
    await sharp(input).rotate(90).toBuffer(),
    await sharp(input).rotate(180).toBuffer(),
    await sharp(input).rotate(270).toBuffer()
  ]
  return Promise.all(variants.map(computePhash))
}

// Per-byte set-bit counts, for a fast length-agnostic Hamming distance.
const POPCOUNT = new Uint8Array(256)
for (let i = 0; i < 256; i++) POPCOUNT[i] = (i & 1) + POPCOUNT[i >>> 1]

/** Hamming distance between two equal-length hex hashes: 0 = identical. */
export function hammingDistance(a: string, b: string): number {
  let distance = 0
  for (let i = 0; i < a.length; i += 2) {
    const xor = (parseInt(a.slice(i, i + 2), 16) ^ parseInt(b.slice(i, i + 2), 16)) & 0xff
    distance += POPCOUNT[xor]
  }
  return distance
}
