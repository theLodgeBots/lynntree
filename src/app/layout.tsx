import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LynnTree by JellyJelly',
  description: 'Your bio link page, powered by JellyJelly',
  icons: { icon: '/jelly-icon.png' },
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
