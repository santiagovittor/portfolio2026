import ProjectDetail from "../../../components/ProjectDetail";
import { projects } from "../../../lib/projects";

export default function DubanRonaldPage() {
  const project = projects.find((p) => p.slug === "dubanronald")!;

  return (
    <ProjectDetail
      project={project}
      description="A restaurant website focused on clean content structure, responsive layout, and SEO-friendly pages."
      tech={["Next.js", "SEO", "Responsive layout", "Vercel / custom domain"]}
    />
  );
}
