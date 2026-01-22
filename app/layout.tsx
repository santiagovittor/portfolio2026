// app/layout.tsx
import "./globals.scss";
import { Rajdhani } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/ThemeProvider";
import LayoutShell from "../components/LayoutShell";
import { siteConfig } from "@/lib/site";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url), // makes OG/Twitter URLs resolve correctly
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
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
        // prevents Google indexing preview deployments
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, nocache: true },
      },

  // Only needed if you choose the HTML-tag verification method (you used DNS verification, so you can ignore this)
  // verification: { google: "YOUR_TOKEN_HERE" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
