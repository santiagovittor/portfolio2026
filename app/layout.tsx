// app/layout.tsx
import "./globals.scss";
import { Rajdhani } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import LayoutShell from "../components/LayoutShell";
import Analytics from "../components/Analytics";
import { siteConfig } from "@/lib/site";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio preview`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.png"],
  },

  robots: isProd
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, nocache: true },
      },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin].filter(Boolean),
  };

  return (
    <html lang="en" className={rajdhani.variable}>
      <body>
        {/* Marketing analytics (GA4 + Meta Pixel) */}
        <Analytics />

        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
