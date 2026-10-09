import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "./components/ThemeProvider";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"], variable: "--font-inter", display: "swap",
  weight: ["300","400","500","600"],
});
const playfair = Playfair_Display({
  subsets: ["latin"], variable: "--font-playfair",
  style: ["normal","italic"], weight: ["400","500","600","700"], display: "swap",
});

export const metadata: Metadata = {
  title: "CrownWrite — AI Writing, Undeniably Human",
  description: "Transform AI-generated text into natural, human-like prose that bypasses every detector. Join 50,000+ writers who trust CrownWrite for authentic content.",
  keywords: ["AI humanizer", "AI text humanizer", "AI detector bypass", "human-like writing", "content humanization", "AI writing tool"],
  authors: [{ name: "CrownWrite" }],
  creator: "CrownWrite",
  publisher: "CrownWrite",
  metadataBase: new URL('https://crownwrite.com'), // Update with your actual domain
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CrownWrite — AI Writing, Undeniably Human",
    description: "Transform AI-generated text into natural, human-like prose that bypasses every detector.",
    url: 'https://crownwrite.com',
    siteName: 'CrownWrite',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'CrownWrite - AI Writing Humanizer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CrownWrite — AI Writing, Undeniably Human",
    description: "Transform AI-generated text into natural, human-like prose that bypasses every detector.",
    images: ['/logo.png'],
    creator: '@crownwrite',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: "xn3uzP9Je3MF8ZrKDTU5pc4DAI99w7Rqehu2doRESPs",
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
        <head>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-37FDMMJJWF"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-37FDMMJJWF');
            `}
          </Script>
        </head>
        <body>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
