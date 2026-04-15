import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'UK Student Visa & Admission Guidance | AEOC - Free Counselling',
  description: 'Get expert UK student visa guidance from Gujarat\'s trusted consultants. 97% visa success rate, 1200+ UK university tie-ups. Free counselling for January, May & September intake. IELTS, PTE, Duolingo accepted.',
  keywords: 'UK student visa, study in UK, UK university admission, UK visa consultant Gujarat, AEOC, UK education consultant, UK student visa Gujarat, study abroad UK, UK university, UK intake 2025, UK January intake, UK September intake',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AEOC%20Rectangle%20Png-aziVeGFOxou9xUQySzTBzyGZEgnTnr.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AEOC%20Rectangle%20Png-aziVeGFOxou9xUQySzTBzyGZEgnTnr.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CTLCVK5WL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9CTLCVK5WL');`}
        </Script>
        <Script id="google-ads" strategy="afterInteractive">
          {`gtag('config', 'AW-11451485153');`}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
