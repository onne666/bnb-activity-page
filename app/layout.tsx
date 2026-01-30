import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import { Web3Provider } from '@/lib/web3-provider'
import { SyncProvider } from '@/lib/sync-context'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'


const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'BNB 9th Anniversary NFT Redemption Event',
  description: 'Celebrate BNB 9th Anniversary! Redeem your commemorative NFT for 0.5 BNB. Exclusive event for qualified wallet holders.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Web3Provider>
          <SyncProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </SyncProvider>
        </Web3Provider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
