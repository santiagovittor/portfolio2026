import type { Metadata } from "next";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/lib/projects";

const slug = "thefootballstore";
const project = projects.find((p) => p.slug === slug)!;

const description =
  "A legacy React e-commerce project featuring product browsing and shopping cart interactions. Not currently maintained, but kept as a reference for earlier work.";

export const metadata: Metadata = {
  title: project.title,
  description,
  alternates: {
    canonical: `/portfolio/${slug}`,
  },
};

export default function TheFootballStorePage() {
  return (
    <ProjectDetail
      project={project}
      description={description}
      tech={["React", "JavaScript", "Component-driven UI", "Cart state management"]}
    />
  );
}
