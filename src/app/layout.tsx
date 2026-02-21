import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JellyTree by JellyJelly',
  description: 'Your bio link page, powered by JellyJelly. Import from Linktree or build from scratch.',
  icons: { icon: '/jelly-icon.png' },
  openGraph: {
    title: 'JellyTree by JellyJelly',
    description: 'Your bio link page, powered by JellyJelly',
    siteName: 'JellyTree',
    images: [{ url: '/jelly-together.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary',
    title: 'JellyTree by JellyJelly',
    description: 'Your bio link page, powered by JellyJelly',
    images: ['/jelly-together.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
