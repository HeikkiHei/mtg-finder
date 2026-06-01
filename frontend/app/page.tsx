'use client'

import { useEffect, useState } from 'react'
import BinderUpload from './BinderUpload'

interface Card {
  id: number
  name: string
  type: string
  rarity: string
}

export default function Home() {
  const [cards, setCards] = useState<Card[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/cards') // Proxied to the backend (see next.config.ts)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setCards(data)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(true)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">MTG Finder</h1>
        <p className="mt-2 text-gray-600">
          Scan a binder page to recognize your Magic: The Gathering cards and look up their prices.
        </p>
      </header>

      <BinderUpload />

      <section className="mt-10" aria-labelledby="saved-cards-heading">
        <h2 id="saved-cards-heading" className="text-xl font-semibold">
          Saved cards
        </h2>
        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            Couldn’t load saved cards. Is the backend running?
          </p>
        ) : cards ? (
          cards.length > 0 ? (
            <ul className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
              {cards.map(card => (
                <li key={card.id?.toString()} className="px-4 py-3 text-sm">
                  {card.name} - {card.type} ({card.rarity})
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No saved cards yet.</p>
          )
        ) : (
          <p className="mt-4 text-gray-600" role="status">
            Loading…
          </p>
        )}
      </section>
    </main>
  )
}
