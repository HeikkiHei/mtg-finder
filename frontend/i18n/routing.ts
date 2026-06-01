import { defineRouting } from 'next-intl/routing'

// English first (default + fallback), then the 24 official EU languages,
// then Chinese (Simplified) and Japanese.
export const routing = defineRouting({
  locales: [
    'en',
    'bg',
    'cs',
    'da',
    'de',
    'el',
    'es',
    'et',
    'fi',
    'fr',
    'ga',
    'hr',
    'hu',
    'it',
    'lt',
    'lv',
    'mt',
    'nl',
    'pl',
    'pt',
    'ro',
    'sk',
    'sl',
    'sv',
    'zh',
    'ja'
  ],
  defaultLocale: 'en'
})

export type Locale = (typeof routing.locales)[number]
