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

describe('POST /api/scan/process', () => {
  it('splits an uploaded binder photo into 9 card crops', async () => {
    const image = await binderImage()

    const res = await request(app).post('/api/scan/process').attach('image', image, 'binder.png')

    expect(res.status).toBe(200)
    expect(res.body.cards).toHaveLength(9)
    expect(res.body.cards[0].image).toMatch(/^data:image\/png;base64,/)
    expect(res.body.cards[8]).toMatchObject({ index: 8, row: 2, col: 2 })
    // No hash index is built in the test env, so recognition is skipped.
    expect(res.body.cards[0].match).toBeNull()
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
