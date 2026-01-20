import ProjectDetail from "../../../components/ProjectDetail";
import { projects } from "../../../lib/projects";

export default function Portfolio2026Page() {
  const project = projects.find((p) => p.slug === "portfolio2026")!;

  return (
    <ProjectDetail
      project={project}
      description="A 2026 rebuild of my portfolio using Next.js App Router, focusing on performance, SEO, and a pixel-close UI to the original design."
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
