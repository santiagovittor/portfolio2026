"use client";

import { useTheme } from "./ThemeProvider";

export default function CornerGithub() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "cornerGithubContainer__isDark" : "cornerGithubContainer"}>
      <a
        href="https://github.com/santiagovittor/portfolio2026"
        target="_blank"
        rel="noreferrer"
        data-aos="zoom-out"
      >
        <img
          src={isDark ? "/svgs/cornerGithubIsDark.svg" : "/svgs/cornerGithub.svg"}
          alt="link to github repo"
        />
      </a>
    </div>
  );
}
