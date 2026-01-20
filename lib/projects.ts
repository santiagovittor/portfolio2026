export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  status?: "active" | "not-maintained" | "wip";
  image: {
    light: string;
    dark?: string;
    alt: string;
  };
  links: {
    demo?: string;
    repo?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "thefootballstore",
    title: "The Football Store",
    subtitle: "E-commerce (legacy)",
    status: "not-maintained",
    image: {
      light: "/imgs/thefootballstore.png",
      alt: "The Football Store website preview",
    },
    links: {
      // demo intentionally omitted (old link was placeholder)
      repo: "https://github.com/santiagovittor/reactCoderVittor",
    },
  },
  {
    slug: "portfolio2026",
    title: "Portfolio 2026",
    subtitle: "Next.js + SEO-focused rebuild",
    status: "active",
    image: {
      light: "/imgs/portfolio.png",
      dark: "/imgs/portfolioDark.png",
      alt: "Portfolio 2026 preview",
    },
    links: {
      demo: "https://portfolio2026-beige.vercel.app",
      repo: "https://github.com/santiagovittor/portfolio2026",
    },
  },
  {
    slug: "movie-reco",
    title: "Movie Reco",
    subtitle: "AI-powered movie recommendations",
    status: "active",
    image: {
      light: "/imgs/movieReco.png",
      alt: "Movie Reco app preview",
    },
    links: {
      demo: "https://movie-reco-mu.vercel.app",
      repo: "https://github.com/santiagovittor/movie-reco",
    },
  },
  {
    slug: "digitalkiki",
    title: "Kiki Digital",
    subtitle: "Digital marketing landing page",
    status: "active",
    image: {
      light: "/imgs/digitalkiki.png",
      alt: "Kiki Digital website preview",
    },
    links: {
      demo: "https://digitalkiki.vercel.app/",
      repo: "https://github.com/santiagovittor/marketingDigitalKiki",
    },
  },
  {
    slug: "dubanronald",
    title: "Duban Ronald",
    subtitle: "Restaurant site",
    status: "active",
    image: {
      light: "/imgs/dubanronald.png",
      alt: "Duban Ronald website preview",
    },
    links: {
      demo: "https://dubanronald.com",
      repo: "https://github.com/santiagovittor/dubanronald", // keep repo if that’s the repo name
    },
  },
];
