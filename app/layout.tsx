import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Mortgage Rate Quote',
  description: 'Get your personalized mortgage rate quote in under 60 seconds.',
  // Paid traffic pages — no SEO indexing needed
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          Google Tag Manager / gtag setup:
          1. Copy .env.local.example → .env.local and set NEXT_PUBLIC_GA_MEASUREMENT_ID
          2. Uncomment the scripts below
          3. Or use Google Tag Manager (GTM) container instead

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `,
            }}
          />
        */}
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
