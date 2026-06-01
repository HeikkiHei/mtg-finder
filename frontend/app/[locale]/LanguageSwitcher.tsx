'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState, useTransition } from 'react'

// A representative country per locale (flags are countries, not languages, so
// this is an approximation — e.g. English -> GB). Used only for the flag glyph;
// the accessible name is always the language name.
const COUNTRY: Record<string, string> = {
  en: 'GB',
  bg: 'BG',
  cs: 'CZ',
  da: 'DK',
  de: 'DE',
  el: 'GR',
  es: 'ES',
  et: 'EE',
  fi: 'FI',
  fr: 'FR',
  ga: 'IE',
  hr: 'HR',
  hu: 'HU',
  it: 'IT',
  lt: 'LT',
  lv: 'LV',
  mt: 'MT',
  nl: 'NL',
  pl: 'PL',
  pt: 'PT',
  ro: 'RO',
  sk: 'SK',
  sl: 'SI',
  sv: 'SE',
  zh: 'CN',
  ja: 'JP'
}

/** Country code -> flag emoji (regional indicator symbols). */
function flag(locale: string): string {
  const code = COUNTRY[locale] ?? locale.toUpperCase()
  return code.replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

/** A language's name in its own language (e.g. "Deutsch", "日本語"). */
function languageName(locale: string): string {
  try {
    const name = new Intl.DisplayNames([locale], { type: 'language' }).of(locale)
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : locale
  } catch {
    return locale
  }
}

export default function LanguageSwitcher() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const choose = (nextLocale: string) => {
    setOpen(false)
    startTransition(() => router.replace(pathname, { locale: nextLocale }))
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        disabled={isPending}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t('language')}: ${languageName(locale)}`}
        className="flex h-10 w-12 items-center justify-center rounded-md border border-gray-300 bg-white text-2xl leading-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
      >
        <span aria-hidden="true">{flag(locale)}</span>
      </button>

      {open && (
        <div
          aria-label={t('language')}
          className="absolute right-0 z-10 mt-1 grid w-60 grid-cols-5 gap-1 rounded-md border border-gray-300 bg-white p-2 shadow-lg"
        >
          {routing.locales.map(loc => (
            <button
              key={loc}
              type="button"
              onClick={() => choose(loc)}
              aria-label={languageName(loc)}
              aria-current={loc === locale ? 'true' : undefined}
              title={languageName(loc)}
              className={`flex h-11 items-center justify-center rounded text-2xl leading-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                loc === locale ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              <span aria-hidden="true">{flag(loc)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
