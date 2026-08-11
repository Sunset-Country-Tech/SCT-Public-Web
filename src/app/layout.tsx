import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const description =
  "Sunset Country Tech provides local computer repairs, IT support, tutoring, networking, installations, small business IT and 3D printing across Mildura and Sunraysia.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sunset Country Tech | Mildura Computer Repairs & IT Support",
    template: "%s | Sunset Country Tech",
  },
  description,
  keywords: [
    "Sunset Country Tech",
    "Mildura computer repairs",
    "Mildura IT support",
    "IT tutoring Mildura",
    "computer help Mildura",
    "Wi-Fi setup Mildura",
    "Sunraysia IT support",
    "3D printing Mildura",
    "small business IT Mildura",
  ],
  openGraph: {
    title: "Sunset Country Tech",
    description,
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/og.png",
        width: 1792,
        height: 1024,
        alt: "Warm sunset-lit technology workspace with a laptop, router and tools.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunset Country Tech",
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
