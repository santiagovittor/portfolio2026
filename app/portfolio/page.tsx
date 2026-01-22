import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected projects by Santiago Vittor — Next.js apps, product UI, and web experiences with a focus on performance and clean UX.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <ProjectsSection />;
}
