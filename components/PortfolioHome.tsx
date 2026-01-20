"use client";

import CornerGithub from "./CornerGithub";
import ProjectsSection from "./ProjectsSection";

export default function PortfolioHome() {
  return (
    <>
      <CornerGithub />
      <div className="portfolioTitle">
        <h1>Portfolio</h1>
      </div>
      <ProjectsSection />
    </>
  );
}
