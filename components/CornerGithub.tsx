// components/CornerGithub.tsx
"use client";

import { useTheme } from "./ThemeProvider";
import { trackOutboundClick } from "../lib/analytics";

export default function CornerGithub() {
  const { isDark } = useTheme();

  const repoUrl = "https://github.com/santiagovittor/portfolio2026";

  return (
    <div className={isDark ? "cornerGithubContainer__isDark" : "cornerGithubContainer"}>
      <a
        href={repoUrl}
        target="_blank"
        rel="noreferrer"
        data-aos="zoom-out"
        onClick={() =>
          trackOutboundClick({ url: repoUrl, label: "Repo", location: "corner_github" })
        }
      >
        <img
          src={isDark ? "/svgs/cornerGithubIsDark.svg" : "/svgs/cornerGithub.svg"}
          alt="link to github repo"
        />
      </a>
    </div>
  );
}
