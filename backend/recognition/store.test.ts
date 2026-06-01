import { promises as fs } from "fs"
import os from "os"
import path from "path"
import { loadIndex, saveIndex, type HashEntry } from "./store"

const entries: HashEntry[] = [
  {
    scryfallId: "id1",
    name: "Sol Ring",
    set: "cmr",
    collectorNumber: "472",
    lang: "en",
    imageUrl: "http://example/1.png",
    hash: "0123456789abcdef",
  },
]

describe("index store", () => {
  let dir: string

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), "mtg-index-"))
  })

  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true })
  })

  it("round-trips entries through save and load", async () => {
    const indexPath = path.join(dir, "hashes.json")
    await saveIndex(entries, indexPath)
    expect(await loadIndex(indexPath)).toEqual(entries)
  })

  it("creates the data directory when it does not exist", async () => {
    const indexPath = path.join(dir, "nested", "deep", "hashes.json")
    await saveIndex(entries, indexPath)
    expect(await loadIndex(indexPath)).toEqual(entries)
  })

  it("returns an empty index when the file is missing", async () => {
    expect(await loadIndex(path.join(dir, "missing.json"))).toEqual([])
  })
})
