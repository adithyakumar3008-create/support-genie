import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, JetBrains_Mono, Noto_Sans_Telugu, Noto_Sans_Devanagari } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  weight: ['700'],
  variable: '--font-noto-sans-telugu',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['700'],
  variable: '--font-noto-sans-devanagari',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "God Mode AI Console - Masterpiece Refined",
  description: "Live observability layer connected to our Antigravity AI backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansTelugu.variable} ${notoSansDevanagari.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
