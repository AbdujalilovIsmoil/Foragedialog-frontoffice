import "swiper/css";
import "./globals.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/gtag";

import Main from "./main";
import { Footer, Header } from "./components";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Search Console tasdiqlash */}
        <meta
          name="google-site-verification"
          content="7LyUqkUstXCSndqzUA_PzXdArH2w3-W5xMAQ9cP0aLw"
        />

        {/* ✅ HTTPS majburiy qilish (CSP to‘g‘ri sintaksisda) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />

        {/* ✅ Google Analytics 4 skriptlari */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-setup" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main>
          <Header />
          <main className="min-h-[100vh]">{children}</main>
          <Footer />
        </Main>
      </body>
    </html>
  );
}
