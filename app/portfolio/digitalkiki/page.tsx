import type { Metadata } from "next";
import type { Project } from "@/lib/projects";
import ProjectDetail from "@/components/ProjectDetail";

const slug = "digitalkiki";

const project: Project = {
  slug,
  title: "Kiki Digital",
  subtitle: "Marketing website",
  status: "active",
  image: {
    light: "/imgs/digitalkiki.png",
    alt: "Kiki Digital website preview",
  },
  links: {
    demo: "https://digitalkiki.vercel.app/",
    repo: "https://github.com/santiagovittor/marketingDigitalKiki",
  },
};

const description =
  "A marketing website project built to present services clearly, with responsive layout and a clean, conversion-focused structure.";

export const metadata: Metadata = {
  title: project.title,
  description,
  alternates: {
    canonical: `/portfolio/${slug}`,
  },
};

export default function DigitalKikiPage() {
  return (
    <ProjectDetail
      project={project}
      description={description}
      tech={["Next.js / React", "Responsive layout", "SEO-friendly structure", "Vercel deployment"]}
    />
  );
}
