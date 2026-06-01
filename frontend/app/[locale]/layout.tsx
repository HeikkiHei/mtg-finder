import { routing } from '@/i18n/routing'
import type { Metadata, Viewport } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import '../globals.css'
import LanguageSwitcher from './LanguageSwitcher'

export const metadata: Metadata = {
  title: 'MtG Finder',
  description: 'Recognize and price Magic: The Gathering cards from binder photos'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className="min-h-dvh bg-gray-50 text-gray-900 antialiased">
        <NextIntlClientProvider>
          <div className="mx-auto flex w-full max-w-3xl justify-end px-4 pt-4">
            <LanguageSwitcher />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
