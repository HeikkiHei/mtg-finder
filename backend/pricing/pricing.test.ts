import { getCardPrices } from './pricing'

const fetchMock = jest.fn()

beforeEach(() => {
  ;(globalThis as { fetch: unknown }).fetch = fetchMock
  fetchMock.mockReset()
})

function mockCard(prices: Record<string, string | null>) {
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ id: 'abc', name: 'Card', prices })
  })
}

describe('getCardPrices', () => {
  it('parses EUR and foil EUR prices into numbers', async () => {
    mockCard({ eur: '1.23', eur_foil: '4.56' })
    expect(await getCardPrices('abc')).toEqual({ eur: 1.23, eurFoil: 4.56 })
  })

  it('returns null for prices Scryfall does not have', async () => {
    mockCard({ eur: '2.00', eur_foil: null })
    expect(await getCardPrices('abc')).toEqual({ eur: 2, eurFoil: null })
  })

  it('returns nulls when the card has no prices at all', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ id: 'abc', name: 'Card' }) })
    expect(await getCardPrices('abc')).toEqual({ eur: null, eurFoil: null })
  })

  it('propagates a Scryfall error', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 404 })
    await expect(getCardPrices('missing')).rejects.toThrow(/404/)
  })
})
