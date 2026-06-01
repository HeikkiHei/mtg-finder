import sharp from 'sharp'

/**
 * Perceptual hashing for card recognition.
 *
 * We use a 64-bit difference hash (dHash): downscale to a tiny greyscale image
 * and record, for each pixel, whether it is brighter than its right-hand
 * neighbour. The result is robust to scaling, JPEG noise and the mild colour
 * shifts introduced by binder-sleeve plastic, while staying dependency-free.
 *
 * Hashes are represented as 16-character hex strings so they serialise cleanly
 * into the on-disk index and are cheap to compare with a Hamming distance.
 */

const HASH_SIZE = 8 // 8x8 comparisons -> 64-bit hash

/** Compute the 64-bit dHash of an image as a 16-char hex string. */
export async function computeDHash(input: Buffer): Promise<string> {
  const width = HASH_SIZE + 1
  const height = HASH_SIZE

  const { data, info } = await sharp(input)
    .greyscale()
    .resize(width, height, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const stride = info.channels // greyscale value lives in channel 0
  let bits = 0n
  let bit = 0n

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < HASH_SIZE; col++) {
      const left = data[(row * width + col) * stride]
      const right = data[(row * width + col + 1) * stride]
      if (left < right) {
        bits |= 1n << bit
      }
      bit++
    }
  }

  return bits.toString(16).padStart(16, '0')
}

/**
 * Compute hashes for an image at the orientations a binder card is plausibly
 * photographed in: upright and upside-down. Matching against both lets us
 * recognise cards that were slotted in rotated 180°.
 */
export async function computeOrientationHashes(input: Buffer): Promise<string[]> {
  const upright = await computeDHash(input)
  const flipped = await computeDHash(await sharp(input).rotate(180).toBuffer())
  return [upright, flipped]
}

/** Hamming distance between two hex hashes: 0 = identical, 64 = inverse. */
export function hammingDistance(a: string, b: string): number {
  let diff = BigInt(`0x${a}`) ^ BigInt(`0x${b}`)
  let distance = 0
  while (diff > 0n) {
    distance += Number(diff & 1n)
    diff >>= 1n
  }
  return distance
}
