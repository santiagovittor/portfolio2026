import type { Metadata } from "next";
import ProjectDetail from "../../../components/ProjectDetail";
import { projects } from "../../../lib/projects";

const slug = "portfolio2026";
const project = projects.find((p) => p.slug === slug)!;

const description =
  "A 2026 rebuild of my portfolio using Next.js App Router, focusing on performance, SEO, and a pixel-close UI to the original design.";

export const metadata: Metadata = {
  title: project.title,
  description,
  alternates: {
    canonical: `/portfolio/${slug}`,
  },
};

export default function Portfolio2026Page() {
  return (
    <ProjectDetail
      project={project}
      description={description}
      tech={[
        "Next.js (App Router)",
        "TypeScript",
        "Sass (legacy parity styling)",
        "Vercel deployment",
        "SEO: metadata + clean structure",
      ]}
    />
  );
}
