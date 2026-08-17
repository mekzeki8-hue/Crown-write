import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "./components/ThemeProvider";
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
  description: "Transform AI-generated text into natural, human-like prose that bypasses every detector.",
  verification: {
    google: "xn3uzP9Je3MF8ZrKDTU5pc4DAI99w7Rqehu2doRESPs",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
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
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
