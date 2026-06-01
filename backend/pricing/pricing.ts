import { getCard } from "../recognition/scryfall"

/**
 * Card pricing in EUR. Scryfall reports a single market price per printing for
 * the regular and foil finishes (sourced from Cardmarket), not a per-condition
 * or per-grade breakdown — the user picks condition/grade separately.
 */
export interface CardPrices {
  /** Regular (non-foil) price in EUR, or null if unavailable. */
  eur: number | null
  /** Foil price in EUR, or null if unavailable. */
  eurFoil: number | null
}

function parsePrice(value: string | null | undefined): number | null {
  if (value == null) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

/** Look up a recognized card's EUR prices from Scryfall by its id. */
export async function getCardPrices(scryfallId: string): Promise<CardPrices> {
  const card = await getCard(scryfallId)
  return {
    eur: parsePrice(card.prices?.eur),
    eurFoil: parsePrice(card.prices?.eur_foil),
  }
}
