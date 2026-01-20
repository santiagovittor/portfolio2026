export type Project = {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  technologies: string[];
  image: { src: string; alt: string };
  href: string;
};

export const projects: Project[] = [
  {
    slug: "the-football-store",
    title: "The Football Store",
    blurb: "Mock e-commerce for classic football jerseys.",
    description:
      "Placeholder description. Replace with your own copy. Keep it short, clear, and outcome-based (what you built, how, and why it matters).",
    technologies: [
      "React (components, hooks)",
      "Firestore (optional)",
      "CSS / UI system",
      "Vercel deploy",
    ],
    image: { src: "/project1-placeholder.png", alt: "Project screenshot placeholder" },
    href: "https://example.com",
  },
  {
    slug: "digital-kiki",
    title: "Digital Kiki",
    blurb: "Landing site for a digital agency concept.",
    description:
      "Placeholder description. Replace with your own copy. Focus on UX details, responsiveness, and performance.",
    technologies: ["React / Next.js", "Tailwind CSS", "Responsive layout", "SEO"],
    image: { src: "/project2-placeholder.png", alt: "Project screenshot placeholder" },
    href: "https://example.com",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    blurb: "This site — rebuilt in Next.js for 2026-grade SEO/perf.",
    description:
      "Placeholder description. Replace with your own copy. Mention App Router, Server Components, metadata, and image/font optimization.",
    technologies: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Accessibility"],
    image: { src: "/project3-placeholder.png", alt: "Project screenshot placeholder" },
    href: "https://example.com",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
