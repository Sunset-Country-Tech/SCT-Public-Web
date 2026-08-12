import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const description =
  "Technology problems solved locally. Repairs, IT support, digital literacy, networking, installations and custom technology solutions across Mildura and Sunraysia.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sunset Country Tech | Technology Problems Solved Locally",
    template: "%s | Sunset Country Tech",
  },
  description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "computer repairs Mildura",
    "IT support Mildura",
    "tech support Mildura",
    "Wi-Fi help Mildura",
    "computer help Mildura",
    "digital literacy Mildura",
    "computer lessons Mildura",
    "3D printing Mildura",
    "small business IT Mildura",
    "Sunraysia IT support",
    "Sunraysia computer repairs",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sunset Country Tech",
    description,
    type: "website",
    locale: "en_AU",
    siteName: "Sunset Country Tech",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sunset Country Tech - Technology problems solved locally.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunset Country Tech",
    description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/brand/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
