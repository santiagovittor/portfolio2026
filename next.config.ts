import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Fix legacy casing mismatch (Linux/Vercel are case-sensitive).
      {
        source: "/portfolio/theFootballStore",
        destination: "/portfolio/thefootballstore",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
