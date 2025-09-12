import "swiper/css";
import "./globals.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
        <meta
          content="upgrade-insecure-requests"
          httpEquiv="Content-Security-Policy"
        />
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
