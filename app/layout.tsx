import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UK Student Visa Guidance | AEOC - 97% Visa Success Rate",
  description:
    "Get expert UK student visa guidance from Apex Education & Overseas Consultant. 97% visa success rate, 1200+ university tie-ups, free counselling. Study at Oxford, Cambridge, Imperial & more.",
  keywords:
    "UK student visa, study in UK, UK universities, AEOC, student visa guidance, Gujarat, Nadiad, Anand",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AEOC%20Rectangle%20Png-aziVeGFOxou9xUQySzTBzyGZEgnTnr.png",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AEOC%20Rectangle%20Png-aziVeGFOxou9xUQySzTBzyGZEgnTnr.png",
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CTLCVK5WL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9CTLCVK5WL');
          `}
        </Script>
        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11451485153"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('config', 'AW-11451485153');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
