import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/lib/projects";

const slug = "dubanronald";
const project = projects.find((p) => p.slug === slug)!;

const description =
  "A restaurant website focused on clean content structure, responsive layout, and SEO-friendly pages.";

export const metadata: Metadata = {
  title: project.title,
  description,
  alternates: {
    canonical: `/portfolio/${slug}`,
  },
};

export default function DubanRonaldPage() {
  return (
    <ProjectDetail
      project={project}
      description={description}
      tech={["Next.js", "SEO", "Responsive layout", "Vercel / custom domain"]}
    />
  );
}
