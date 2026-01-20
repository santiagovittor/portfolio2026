"use client";

import Link from "next/link";
import { projects } from "../lib/projects";
import { useTheme } from "./ThemeProvider";

export default function ProjectsSection() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "projectsContainer__isDark" : "projectsContainer"}>
      {projects.map((p) => {
        const imgSrc = isDark && p.image.dark ? p.image.dark : p.image.light;

        return (
          <Link key={p.slug} href={`/portfolio/${p.slug}`}>
            <div className="projectsContainer__box" data-aos="fade">
              <img src={imgSrc} alt={p.image.alt} />
              <h2>
                {p.title}
                {p.status === "not-maintained" ? " (not maintained)" : ""}
                {p.status === "wip" ? " (WIP)" : ""}
              </h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
