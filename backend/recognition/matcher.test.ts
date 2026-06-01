import sharp from "sharp"
import { computeDHash } from "./phash"
import { DEFAULT_MAX_DISTANCE, recognize } from "./matcher"
import type { HashEntry } from "./store"

/** A deterministic noisy image so its dHash is varied (not all-0s/all-1s). */
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
  return sharp(raw, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer()
}

function entry(id: string, hash: string): HashEntry {
  return {
    scryfallId: id,
    name: id,
    set: "tst",
    collectorNumber: "1",
    lang: "en",
    imageUrl: "http://example/img.png",
    hash,
  }
}

describe("recognize", () => {
  it("returns null for an empty index", async () => {
    expect(await recognize(await patterned(1), [])).toBeNull()
  })

  it("matches the nearest entry within the distance threshold", async () => {
    const image = await patterned(1)
    const hash = await computeDHash(image)
    const match = await recognize(image, [
      entry("far", "aaaaaaaaaaaaaaaa"),
      entry("exact", hash),
    ])
    expect(match?.scryfallId).toBe("exact")
    expect(match?.distance).toBe(0)
  })

  it("returns null when nothing is within maxDistance", async () => {
    const image = await patterned(1)
    const hash = await computeDHash(image)
    // Flip 5 low bits so the only entry sits at distance 5.
    const near = (BigInt(`0x${hash}`) ^ 0b11111n).toString(16).padStart(16, "0")
    expect(await recognize(image, [entry("near", near)], 3)).toBeNull()
  })

  it("matches a card slotted upside-down (180° rotation)", async () => {
    const image = await patterned(7)
    const upsideDown = await sharp(image).rotate(180).toBuffer()
    const match = await recognize(upsideDown, [
      entry("card", await computeDHash(image)),
    ])
    expect(match?.scryfallId).toBe("card")
    expect(match?.distance).toBeLessThanOrEqual(DEFAULT_MAX_DISTANCE)
  })
})
