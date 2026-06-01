// Manual Jest mock for next-intl (which ships ESM that next/jest won't
// transform). It resolves the real English messages so component tests assert
// the actual copy, and replaces the provider with a passthrough. Behaviour —
// not next-intl internals — is what these tests cover.
import { messages } from '@/i18n/messages'
import type { ReactNode } from 'react'

const en = messages.en

type Values = Record<string, string | number>

function lookup(namespace: string | undefined, key: string): string {
  const root: unknown = namespace ? (en as Record<string, unknown>)[namespace] : en
  const value = key
    .split('.')
    .reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], root)
  return typeof value === 'string' ? value : key
}

function interpolate(template: string, values?: Values): string {
  if (!values) return template
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    name in values ? String(values[name]) : `{${name}}`
  )
}

export function useTranslations(namespace?: string) {
  return (key: string, values?: Values) => interpolate(lookup(namespace, key), values)
}

export function useLocale() {
  return 'en'
}

export function NextIntlClientProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function hasLocale(locales: readonly string[], locale: unknown): boolean {
  return typeof locale === 'string' && locales.includes(locale)
}
