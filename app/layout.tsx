import type { Metadata } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { mediaPaths } from "@/lib/media";
import { absoluteUrl } from "@/lib/seo";

const display = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl()),
  title: {
    default: "FinTechLab",
    template: "%s",
  },
  description:
    "Research laboratory for behavioral finance, financial technology, and behavioral security.",
  openGraph: {
    type: "website",
    siteName: "FinTechLab",
    images: [{ url: mediaPaths.ogDefault, width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="page-shell antialiased">{children}</body>
    </html>
  );
}
