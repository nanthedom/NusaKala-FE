import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/common/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NusaKala - Connecting Indonesian Culture',
  description: 'Platform untuk connecting culture bagi wisatawan yang berkunjung ke Indonesia',
  keywords: ['indonesia', 'culture', 'travel', 'nusantara', 'budaya'],
  metadataBase: new URL('https://nusakala.vercel.app'),
  authors: [{ name: 'NusaKala Team' }],
  openGraph: {
    title: 'NusaKala - Connecting Indonesian Culture',
    description: 'Platform untuk connecting culture bagi wisatawan yang berkunjung ke Indonesia',
    url: 'https://nusākāla.com',
    siteName: 'NusaKala',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NusaKala - Indonesian Culture Platform',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NusaKala - Connecting Indonesian Culture',
    description: 'Platform untuk connecting culture bagi wisatawan yang berkunjung ke Indonesia',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}