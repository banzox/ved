import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nextgear.space'),
  title: "سينما ماكس - أفلام ومسلسلات مترجمة",
  description: "شاهد أحدث الأفلام والمسلسلات العربية والأجنبية مترجمة بجودة عالية HD",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "سينما ماكس",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <GoogleAnalytics ga_id="G-XXXXXXXXXX" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
