import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImageBlur Pro - Advanced Image Blur Tool",
  description: "Professional image blur tool with normal and line blur modes. Upload, edit, and download blurred images with adjustable intensity and color options.",
  keywords: ["image blur tool", "photo editor", "blur effects", "image editing", "online photo editor", "blur filter", "image processing", "normal blur", "line blur"],
  authors: [{ name: "ImageBlur Pro Team" }],
  openGraph: {
    title: "ImageBlur Pro - Advanced Image Blur Tool",
    description: "Professional image blur tool with normal and line blur modes. Upload, edit, and download blurred images with adjustable intensity and color options.",
    url: "https://imageblur-pro.com",
    siteName: "ImageBlur Pro",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "ImageBlur Pro - Advanced Image Blur Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ImageBlur Pro - Advanced Image Blur Tool",
    description: "Professional image blur tool with normal and line blur modes. Upload, edit, and download blurred images with adjustable intensity and color options.",
    images: ["/og-image.jpg"],
  },
  other: {
    "twitter:site": "@ImageBlurPro",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
