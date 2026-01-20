"use client";

import { useState } from "react";
import { Project } from "../lib/projects";
import { useTheme } from "./ThemeProvider";

export default function ProjectDetail({
  project,
  description,
  tech,
}: {
  project: Project;
  description: string;
  tech: string[];
}) {
  const { isDark } = useTheme();
  const [tab, setTab] = useState<"desc" | "tech">("desc");

  const menuClass = isDark
    ? "profileCardContainer__text--menu"
    : "profileCardContainer__text--menuIsDark";

  const imgSrc = isDark && project.image.dark ? project.image.dark : project.image.light;

  return (
    <div className="profileCardContainer">
      <div className="profileCardContainer__img" data-aos="fade" data-aos-duration="3000">
        {project.links.demo ? (
          <a href={project.links.demo} target="_blank" rel="noreferrer">
            <img src={imgSrc} alt={project.image.alt} />
          </a>
        ) : (
          <img src={imgSrc} alt={project.image.alt} />
        )}
      </div>

      <div className="profileCardContainer__text">
        <div className={menuClass}>
          <ul>
            <li onClick={() => setTab("desc")} id={tab === "desc" ? "isActive" : "notActive"}>
              Description
            </li>
            <li onClick={() => setTab("tech")} id={tab === "tech" ? "isActive" : "notActive"}>
              Tech
            </li>
          </ul>

          {tab === "desc" ? (
            <>
              <p>{description}</p>

              <p style={{ marginTop: "1rem" }}>
                {project.links.repo ? (
                  <a href={project.links.repo} target="_blank" rel="noreferrer">
                    View repository
                  </a>
                ) : null}
                {project.links.demo ? (
                  <>
                    {" "}
                    •{" "}
                    <a href={project.links.demo} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                  </>
                ) : (
                  <>
                    {" "}
                    • <span>Live demo unavailable</span>
                  </>
                )}
              </p>
            </>
          ) : (
            <ul style={{ marginTop: "1rem" }}>
              {tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
