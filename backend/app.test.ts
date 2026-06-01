import request from "supertest"
import sharp from "sharp"
import { app } from "./app"
import { collections } from "./db"

async function binderImage(cols = 3, rows = 3, cw = 60, ch = 84) {
  const cells: sharp.OverlayOptions[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hue = (r * cols + c) * 20
      const tile = await sharp({
        create: {
          width: cw,
          height: ch,
          channels: 3,
          background: { r: hue, g: 255 - hue, b: 120 },
        },
      })
        .png()
        .toBuffer()
      cells.push({ input: tile, left: c * cw, top: r * ch })
    }
  }
  return sharp({
    create: { width: cols * cw, height: rows * ch, channels: 3, background: "#000" },
  })
    .composite(cells)
    .png()
    .toBuffer()
}

describe("POST /api/scan/process", () => {
  it("splits an uploaded binder photo into 9 card crops", async () => {
    const image = await binderImage()

    const res = await request(app)
      .post("/api/scan/process")
      .attach("image", image, "binder.png")

    expect(res.status).toBe(200)
    expect(res.body.cards).toHaveLength(9)
    expect(res.body.cards[0].image).toMatch(/^data:image\/png;base64,/)
    expect(res.body.cards[8]).toMatchObject({ index: 8, row: 2, col: 2 })
    // No hash index is built in the test env, so recognition is skipped.
    expect(res.body.cards[0].match).toBeNull()
  })

  it("returns 400 when no image field is provided", async () => {
    const res = await request(app).post("/api/scan/process")
    expect(res.status).toBe(400)
    expect(res.text).toMatch(/no image/i)
  })
})

describe("GET /api/cards", () => {
  afterEach(() => {
    delete collections.cards
  })

  it("returns 500 when the database is not connected", async () => {
    delete collections.cards
    const res = await request(app).get("/api/cards")
    expect(res.status).toBe(500)
  })

  it("returns the cards from the collection", async () => {
    collections.cards = {
      find: () => ({ toArray: async () => [{ name: "Black Lotus" }] }),
    } as unknown as (typeof collections)["cards"]

    const res = await request(app).get("/api/cards")

    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ name: "Black Lotus" }])
  })
})
