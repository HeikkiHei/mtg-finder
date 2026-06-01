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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cards') // Use full backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setCards(data)
      } catch (error) {
        console.error('Error fetching data:', error)
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
        {cards ? (
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
