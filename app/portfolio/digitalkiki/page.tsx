import ProjectDetail from "../../../components/ProjectDetail";
import { projects } from "../../../lib/projects";

export default function DigitalKikiPage() {
  const project = projects.find((p) => p.slug === "digitalkiki")!;

  return (
    <ProjectDetail
      project={project}
      description="Kiki Digital is a responsive digital marketing landing page focused on clear messaging, section-based navigation, and conversion-oriented calls to action."
      tech={[
        "React (Create React App)",
        "JavaScript",
        "SCSS/Sass",
        "Responsive layout",
        "Component-based sections",
      ]}
    />
  );
}
