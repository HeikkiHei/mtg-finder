import { getAuth } from '@clerk/express'
import sharp from 'sharp'
import request from 'supertest'
import { app } from './app'
import { collections } from './db'

// getAuth is mocked (backend/__mocks__/@clerk/express). Default: signed-in
// 'user_test'; override per test to simulate an unauthenticated request.
const mockGetAuth = getAuth as unknown as jest.Mock

async function binderImage(cols = 3, rows = 3, cw = 60, ch = 84) {
  const cells: sharp.OverlayOptions[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Detailed (noisy) tiles so every cell reads as a real card, not an empty
      // pocket, once empty-pocket filtering runs.
      const tile = await noiseTile(cw, ch, r * cols + c + 1)
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

// A per-pixel-noise tile reads as a detailed card; a uniform tile reads as an
// empty pocket. The gaps emulate binder-pocket borders so the empty-pocket
// crops stay uniform.
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

// A row of tiles (some may be empty) with gaps, like a single binder row.
async function binderRow(cells: ('card' | 'empty')[], cw = 70, ch = 96, gap = 18) {
  const width = cells.length * cw + (cells.length + 1) * gap
  const height = ch + 2 * gap
  const overlays: sharp.OverlayOptions[] = []
  for (let i = 0; i < cells.length; i++) {
    const tile =
      cells[i] === 'card'
        ? await noiseTile(cw, ch, i + 1)
        : await sharp({ create: { width: cw, height: ch, channels: 3, background: '#dddddd' } })
            .png()
            .toBuffer()
    overlays.push({ input: tile, left: gap + i * (cw + gap), top: gap })
  }
  return sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .composite(overlays)
    .png()
    .toBuffer()
}

describe('POST /api/scan/process', () => {
  it('splits a binder photo into card crops for the given grid override', async () => {
    const image = await binderImage()

    const res = await request(app)
      .post('/api/scan/process')
      .field('rows', '3')
      .field('cols', '3')
      .attach('image', image, 'binder.png')

    expect(res.status).toBe(200)
    expect(res.body.grid).toEqual({ rows: 3, cols: 3 })
    expect(res.body.cards).toHaveLength(9)
    expect(res.body.cards[0].image).toMatch(/^data:image\/png;base64,/)
    expect(res.body.cards[8]).toMatchObject({ index: 8, row: 2, col: 2 })
    // No hash index is built in the test env, so recognition is skipped.
    expect(res.body.cards[0].match).toBeNull()
  })

  it('defaults to the standard 3x3 page when no grid is given', async () => {
    const image = await binderImage()

    const res = await request(app).post('/api/scan/process').attach('image', image, 'binder.png')

    expect(res.status).toBe(200)
    expect(res.body.grid).toEqual({ rows: 3, cols: 3 })
    expect(res.body.cards).toHaveLength(9)
  })

  it('drops empty pockets so the count reflects actual cards', async () => {
    // Three pockets, only two hold a card; override the layout to 1x3.
    const image = await binderRow(['card', 'empty', 'card'])

    const res = await request(app)
      .post('/api/scan/process')
      .field('rows', '1')
      .field('cols', '3')
      .attach('image', image, 'binder.png')

    expect(res.status).toBe(200)
    expect(res.body.grid).toEqual({ rows: 1, cols: 3 })
    expect(res.body.cards).toHaveLength(2)
    // The kept cards are the two filled pockets (columns 0 and 2).
    expect(res.body.cards.map((c: { col: number }) => c.col)).toEqual([0, 2])
  })

  it('returns no cards for an all-empty page instead of a full grid', async () => {
    const image = await binderRow(['empty', 'empty', 'empty'])

    const res = await request(app)
      .post('/api/scan/process')
      .field('rows', '1')
      .field('cols', '3')
      .attach('image', image, 'binder.png')

    expect(res.status).toBe(200)
    expect(res.body.cards).toHaveLength(0)
  })

  it('returns 400 when no image field is provided', async () => {
    const res = await request(app).post('/api/scan/process')
    expect(res.status).toBe(400)
    expect(res.text).toMatch(/no image/i)
  })

  it('returns 401 when not signed in', async () => {
    mockGetAuth.mockReturnValueOnce({ userId: null })
    const res = await request(app)
      .post('/api/scan/process')
      .attach('image', await binderImage(), 'binder.png')
    expect(res.status).toBe(401)
  })
})

// @clerk/express is mocked (backend/__mocks__) so getAuth() returns userId
// 'user_test' and requireAuth() is a pass-through.
describe('GET /api/cards', () => {
  afterEach(() => {
    delete collections.cards
  })

  it('returns 401 when not signed in', async () => {
    mockGetAuth.mockReturnValueOnce({ userId: null })
    const res = await request(app).get('/api/cards')
    expect(res.status).toBe(401)
  })

  it('returns 500 when the database is not connected', async () => {
    delete collections.cards
    const res = await request(app).get('/api/cards')
    expect(res.status).toBe(500)
  })

  it('returns only the signed-in user’s cards', async () => {
    const find = jest.fn(() => ({ toArray: async () => [{ name: 'Black Lotus' }] }))
    collections.cards = { find } as unknown as (typeof collections)['cards']

    const res = await request(app).get('/api/cards')

    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ name: 'Black Lotus' }])
    expect(find).toHaveBeenCalledWith({ userId: 'user_test' })
  })
})

describe('POST /api/cards', () => {
  afterEach(() => {
    delete collections.cards
  })

  it('saves a card to the signed-in user and returns it', async () => {
    const insertOne = jest.fn(async () => ({ insertedId: 'abc123' }))
    collections.cards = { insertOne } as unknown as (typeof collections)['cards']

    const res = await request(app)
      .post('/api/cards')
      .send({ scryfallId: 'sf1', name: 'Sol Ring', set: 'cmr', eur: 0.89 })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({
      _id: 'abc123',
      userId: 'user_test',
      name: 'Sol Ring',
      set: 'cmr',
      eur: 0.89
    })
    expect(insertOne).toHaveBeenCalledWith(expect.objectContaining({ userId: 'user_test' }))
  })

  it('returns 400 when name is missing', async () => {
    collections.cards = {
      insertOne: jest.fn()
    } as unknown as (typeof collections)['cards']

    const res = await request(app).post('/api/cards').send({ set: 'cmr' })
    expect(res.status).toBe(400)
  })

  it('returns 401 when not signed in', async () => {
    mockGetAuth.mockReturnValueOnce({ userId: null })
    const res = await request(app).post('/api/cards').send({ name: 'Sol Ring' })
    expect(res.status).toBe(401)
  })
})
