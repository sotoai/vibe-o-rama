import type { Metadata } from 'next'
import './globals.css'
import { Nav, Footer } from '@/components'

export const metadata: Metadata = {
  title: 'Vibe-O-Rama | SPRO',
  description: 'A creative AI playground for SPRO. Build weird, fun, delightful things with AI. No business case required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
