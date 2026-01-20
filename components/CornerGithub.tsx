"use client";

import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

export default function CornerGithub() {
  const { isDark } = useTheme();

  const borderClass = isDark ? "border-white" : "border-brand-dark";
  const iconColor = isDark ? "text-brand-dark" : "text-white";

  return (
    <div className="hidden md:block absolute top-0 left-0 overflow-hidden">
      <div className="relative rotate-90 origin-top-left" style={{ width: "75px", height: "75px" }}>
        <div
          className={[
            "absolute inset-0 border-l-[75px] border-b-[75px] border-transparent transition-colors duration-[2000ms]",
            borderClass,
          ].join(" ")}
        />
        <Link
          href="https://github.com/your-username/your-repo"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
          className="absolute left-0 top-0 h-full w-full grid place-items-center -rotate-45"
        >
          <FiGithub
            className={[
              "h-16 w-16 opacity-70 transition-all duration-[2000ms] hover:opacity-100 hover:-rotate-90",
              iconColor,
            ].join(" ")}
          />
        </Link>
      </div>
    </div>
  );
}
