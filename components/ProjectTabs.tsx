"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";

export default function ProjectTabs({ project }: { project: Project }) {
  const [tab, setTab] = useState<"description" | "technologies">("description");

  const active =
    "border-brand-dark dark:border-white text-brand-dark dark:text-white";
  const inactive =
    "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100";

  return (
    <div className="grid gap-6">
      <ul className="flex flex-wrap gap-10 mb-2">
        <li>
          <button
            className={[
              "uppercase font-semibold border-b-2 pb-1 transition-transform duration-300 hover:scale-110",
              tab === "description" ? active : inactive,
            ].join(" ")}
            onClick={() => setTab("description")}
          >
            Description
          </button>
        </li>
        <li>
          <button
            className={[
              "uppercase font-semibold border-b-2 pb-1 transition-transform duration-300 hover:scale-110",
              tab === "technologies" ? active : inactive,
            ].join(" ")}
            onClick={() => setTab("technologies")}
          >
            Technologies
          </button>
        </li>
      </ul>

      {tab === "description" ? (
        <p className="text-lg leading-10">{project.description}</p>
      ) : (
        <ul className="list-disc list-inside text-lg leading-10">
          {project.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
