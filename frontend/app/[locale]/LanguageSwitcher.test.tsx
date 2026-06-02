import { messages } from '@/i18n/messages'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import type { ReactElement } from 'react'

// Define the spy inside the factory (jest.mock is hoisted above imports) and
// expose it so the test can assert on it.
jest.mock('../../i18n/navigation', () => {
  const replace = jest.fn()
  return {
    useRouter: () => ({ replace }),
    usePathname: () => '/',
    __replace: replace
  }
})

// routing.ts pulls in next-intl/routing (ESM); mock it with a small locale set.
jest.mock('../../i18n/routing', () => ({
  routing: { locales: ['en', 'fi', 'de', 'sv'], defaultLocale: 'en' }
}))

import * as navigation from '../../i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'

const mockReplace = (navigation as unknown as { __replace: jest.Mock }).__replace

function renderWithIntl(ui: ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages.en}>
      {ui}
    </NextIntlClientProvider>
  )
}

beforeEach(() => mockReplace.mockReset())

describe('LanguageSwitcher', () => {
  it('opens the menu and switches locale on selection', async () => {
    const user = userEvent.setup()
    renderWithIntl(<LanguageSwitcher />)

    // Collapsed initially — language options are not rendered.
    expect(screen.queryByRole('button', { name: /suomi/i })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /language/i }))
    await user.click(screen.getByRole('button', { name: /suomi/i }))

    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/', { locale: 'fi' }))
  })
})
