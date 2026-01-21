import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/lib/projects";

const slug = "movie-reco";
const project = projects.find((p) => p.slug === slug)!;

const description =
  "An AI-powered movie recommendation app. Users describe what they want to watch (and optionally reference a similar movie), then the app generates curated recommendations.";

export const metadata: Metadata = {
  title: project.title,
  description,
  alternates: {
    canonical: `/portfolio/${slug}`,
  },
};

export default function MovieRecoPage() {
  return (
    <ProjectDetail
      project={project}
      description={description}
      tech={[
        "Next.js",
        "TypeScript",
        "AI API integration (LLM recommendations)",
        "Responsive UI",
        "Vercel deployment",
      ]}
    />
  );
}
