"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function ProjectsSection() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "projectsContainer__isDark" : "projectsContainer"}>
      <Link href="/portfolio/thefootballstore">
        <div className="projectsContainer__box" data-aos="fade">
          <img src="/imgs/thefootballstore.png" alt="the football store website" />
          <h2>The Football Store</h2>
        </div>
      </Link>

      <Link href="/portfolio/digitalkiki">
        <div className="projectsContainer__box" data-aos="fade">
          <img src="/imgs/digitalkiki.png" alt="digital kiki website" />
          <h2>Digital Kiki</h2>
        </div>
      </Link>

      <div className="projectsContainer__box" data-aos="fade">
        <img
          src={isDark ? "/imgs/portfolio.png" : "/imgs/portfolioDark.png"}
          alt="portfolio project"
        />
        <h2>Portfolio</h2>
      </div>
    </div>
  );
}
