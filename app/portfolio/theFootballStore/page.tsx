import ProjectDetail from "../../../components/ProjectDetail";
import { projects } from "../../../lib/projects";

export default function TheFootballStorePage() {
  const project = projects.find((p) => p.slug === "thefootballstore")!;

  return (
    <ProjectDetail
      project={project}
      description="A legacy React e-commerce project featuring product browsing and shopping cart interactions. Not currently maintained, but kept as a reference for earlier work."
      tech={[
        "React",
        "JavaScript",
        "Component-driven UI",
        "Cart state management",
      ]}
    />
  );
}
