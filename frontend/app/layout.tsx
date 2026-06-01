import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'MtG Finder',
  description: 'Recognize and price Magic: The Gathering cards from binder photos'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
