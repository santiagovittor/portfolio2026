// lib/site.ts
const isProd = process.env.NODE_ENV === "production";

// Preferred: set this in Vercel env vars (Production only)
// NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;

// Vercel provides VERCEL_URL in server env (no protocol). Good fallback for previews.
const vercelFallback =
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

export const siteConfig = {
  name: "Santiago Vittor",
  title: "Santiago Vittor — Frontend Engineer",
  description:
    "Frontend Engineer focused on clean UI, performance, and modern Next.js apps.",
  // Canonical URL used by sitemap, robots, and metadataBase
  // In prod, you want your real domain here (NOT the preview URL).
  url:
    (isProd ? fromEnv : fromEnv || vercelFallback) ||
    "http://santiagovittorweb.vercel.app",
  locale: "en_US",
  email: "svittordev@gmail.com",
  socials: {
    github: "https://github.com/santiagovittor",
    // update if you have it:
    linkedin: "https://www.linkedin.com/in/santiagovittor",
  },
} as const;
