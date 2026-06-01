import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { messages } from './messages'
import { routing } from './routing'

// Each locale file is typed `: Messages`, so completeness is enforced at
// compile time — no runtime fallback needed (a missing key fails the build).
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: messages[locale]
  }
})
