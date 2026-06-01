import { promises as fs } from "fs"
import os from "os"
import path from "path"
import sharp from "sharp"
import { buildIndex } from "./build-index"
import { loadIndex } from "./store"
import { downloadImage, searchCards, type ScryfallCard } from "./scryfall"

// Keep cardImageUrl real (pure logic); mock only the network calls.
jest.mock("./scryfall", () => ({
  ...jest.requireActual("./scryfall"),
  searchCards: jest.fn(),
  downloadImage: jest.fn(),
}))

const mockedSearch = searchCards as jest.MockedFunction<typeof searchCards>
const mockedDownload = downloadImage as jest.MockedFunction<typeof downloadImage>

const card = (over: Partial<ScryfallCard>): ScryfallCard =>
  ({ id: "x", name: "X", set: "tst", collector_number: "1", lang: "en", ...over }) as ScryfallCard

describe("buildIndex", () => {
  let dir: string
  let image: Buffer

  beforeAll(async () => {
    image = await sharp({
      create: { width: 64, height: 89, channels: 3, background: { r: 10, g: 80, b: 200 } },
    })
      .png()
      .toBuffer()
  })

  beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), "mtg-build-"))
    jest.clearAllMocks()
  })

  afterEach(async () => {
    await fs.rm(dir, { recursive: true, force: true })
  })

  it("hashes each card image, skips imageless cards, and persists the index", async () => {
    mockedSearch.mockResolvedValue([
      card({ id: "a", name: "Card A", image_uris: { normal: "http://x/a.png" } }),
      card({ id: "b", name: "Card B", card_faces: [{ image_uris: { normal: "http://x/b.png" } }] }),
      card({ id: "c", name: "No Image" }),
    ])
    mockedDownload.mockResolvedValue(image)

    const indexPath = path.join(dir, "hashes.json")
    const entries = await buildIndex({ query: "set:tst", indexPath })

    expect(entries).toHaveLength(2) // "No Image" skipped
    expect(entries[0]).toMatchObject({ scryfallId: "a", name: "Card A", imageUrl: "http://x/a.png" })
    expect(entries[0].hash).toMatch(/^[0-9a-f]{16}$/)
    expect(mockedDownload).toHaveBeenCalledTimes(2)
    expect(await loadIndex(indexPath)).toEqual(entries)
  })

  it("skips cards whose image fails to download", async () => {
    mockedSearch.mockResolvedValue([
      card({ id: "a", name: "Card A", image_uris: { normal: "http://x/a.png" } }),
    ])
    mockedDownload.mockRejectedValue(new Error("boom"))
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {})

    const entries = await buildIndex({ query: "q", indexPath: path.join(dir, "h.json") })

    expect(entries).toEqual([])
    warn.mockRestore()
  })
})
