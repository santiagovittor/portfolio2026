import ProjectDetail from "../../../components/ProjectDetail";
import { projects } from "../../../lib/projects";

export default function MovieRecoPage() {
  const project = projects.find((p) => p.slug === "movie-reco")!;

  return (
    <ProjectDetail
      project={project}
      description="An AI-powered movie recommendation app. Users describe what they want to watch (and optionally reference a similar movie), then the app generates curated recommendations."
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
