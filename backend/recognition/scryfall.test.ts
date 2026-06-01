import { cardImageUrl, downloadImage, searchCards, type ScryfallCard } from './scryfall'

const fetchMock = jest.fn()

beforeEach(() => {
  ;(globalThis as { fetch: unknown }).fetch = fetchMock
  fetchMock.mockReset()
})

describe('cardImageUrl', () => {
  it("prefers the card's own normal image", () => {
    expect(cardImageUrl({ image_uris: { normal: 'n' } } as ScryfallCard)).toBe('n')
  })

  it('falls back to the front face for double-faced cards', () => {
    expect(
      cardImageUrl({
        card_faces: [{ image_uris: { normal: 'front' } }]
      } as ScryfallCard)
    ).toBe('front')
  })

  it('returns undefined when no image is available', () => {
    expect(cardImageUrl({} as ScryfallCard)).toBeUndefined()
  })
})

describe('searchCards', () => {
  it('paginates until has_more is false', async () => {
    const page1 = { data: [{ id: '1' }, { id: '2' }], has_more: true, next_page: 'http://x/p2' }
    const page2 = { data: [{ id: '3' }], has_more: false }
    fetchMock.mockImplementation((url: string) =>
      Promise.resolve({
        ok: true,
        json: async () => (String(url).includes('p2') ? page2 : page1)
      })
    )

    const cards = await searchCards('set:tst')

    expect(cards.map(c => c.id)).toEqual(['1', '2', '3'])
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('stops at the requested limit without fetching more pages', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [{ id: '1' }, { id: '2' }, { id: '3' }],
        has_more: true,
        next_page: 'http://x/p2'
      })
    })

    const cards = await searchCards('q', 2)

    expect(cards).toHaveLength(2)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('throws on a non-ok response', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 404 })
    await expect(searchCards('q')).rejects.toThrow(/404/)
  })
})

describe('getCard', () => {
  it('fetches a single card by id', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'abc', name: 'Sol Ring' })
    })

    const { getCard } = await import('./scryfall')
    const card = await getCard('abc')

    expect(card.name).toBe('Sol Ring')
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/cards/abc'), expect.anything())
  })

  it('throws on a non-ok response', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 404 })
    const { getCard } = await import('./scryfall')
    await expect(getCard('missing')).rejects.toThrow(/404/)
  })
})

describe('downloadImage', () => {
  it('returns the response body as a Buffer', async () => {
    const bytes = new Uint8Array([1, 2, 3, 4])
    fetchMock.mockResolvedValue({ ok: true, arrayBuffer: async () => bytes.buffer })

    const buffer = await downloadImage('http://x/img.png')

    expect(Buffer.isBuffer(buffer)).toBe(true)
    expect([...buffer]).toEqual([1, 2, 3, 4])
  })

  it('throws on a failed download', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 })
    await expect(downloadImage('http://x')).rejects.toThrow(/500/)
  })
})
