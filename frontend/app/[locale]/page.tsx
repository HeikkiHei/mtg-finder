'use client'

import { useAuth } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import BinderUpload from './BinderUpload'

interface SavedCard {
  _id: string
  name: string
  set: string | null
  eur: number | null
}

export default function Home() {
  const t = useTranslations()
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const [cards, setCards] = useState<SavedCard[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    const fetchData = async () => {
      try {
        const token = await getToken()
        const response = await fetch('/api/cards', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        setCards(await response.json())
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(true)
      }
    }
    fetchData()
  }, [isLoaded, isSignedIn, getToken])

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">MTG Finder</h1>
        <p className="mt-2 text-gray-600">{t('app.tagline')}</p>
      </header>

      <BinderUpload />

      <section className="mt-10" aria-labelledby="saved-cards-heading">
        <h2 id="saved-cards-heading" className="text-xl font-semibold">
          {t('saved.heading')}
        </h2>
        {!isLoaded ? (
          <p className="mt-4 text-gray-600" role="status">
            {t('saved.loading')}
          </p>
        ) : !isSignedIn ? (
          <p className="mt-4 text-gray-600">{t('saved.signInPrompt')}</p>
        ) : error ? (
          <p
            role="alert"
            className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {t('saved.error')}
          </p>
        ) : cards ? (
          cards.length > 0 ? (
            <ul className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
              {cards.map(card => (
                <li key={card._id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span>
                    {card.name}
                    {card.set ? ` (${card.set.toUpperCase()})` : ''}
                  </span>
                  {card.eur != null && (
                    <span className="text-gray-600">€{card.eur.toFixed(2)}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">{t('saved.empty')}</p>
          )
        ) : (
          <p className="mt-4 text-gray-600" role="status">
            {t('saved.loading')}
          </p>
        )}
      </section>
    </main>
  )
}
