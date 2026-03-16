"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function AboutSection() {
  const { isDark } = useTheme();

  const [tab, setTab] = useState<"actual" | "goals">("actual");

  // IMPORTANT:
  // Sass expects:
  // - in DARK mode: profileCardContainer__text--menu (underline WHITE)
  // - in LIGHT mode: profileCardContainer__text--menuIsDark (underline BLACK)
  const menuClass = isDark
    ? "profileCardContainer__text--menu"
    : "profileCardContainer__text--menuIsDark";

  return (
    <div className="profileCardContainer">
      <div className="profileCardContainer__img" data-aos="fade" data-aos-duration="3000">
        <img src="/imgs/profilePicture.jpg" alt="Portrait of Santiago Vittor" />
      </div>

      <div className="profileCardContainer__text">
        <div className={menuClass}>
          <ul>
            <li
              onClick={() => setTab("actual")}
              id={tab === "actual" ? "isActive" : "notActive"}
            >
              Now
            </li>
            <li
              onClick={() => setTab("goals")}
              id={tab === "goals" ? "isActive" : "notActive"}
            >
              Next
            </li>
          </ul>

          {tab === "actual" ? (
            <>
              <p>
                At FoodStyles I lead AI training programs and build the tools that support them. That means designing how teams learn to work with LLMs, building RAG pipelines that non-technical people can actually maintain, and automating the workflows that slow everyone down. I also still write code, mostly JavaScript and Python, because it's hard to teach something you don't do yourself.
              </p>

              <p id="cv">
                <a href="/pdfs/resume.pdf" target="_blank" rel="noreferrer">
                  Download resume(7,4KB)
                </a>
              </p>
            </>
          ) : (
            <>
              <p>
                I'm looking for a role where I can keep doing both things: building with AI and helping teams use it well. Whether that's an AI engineer role, an enablement lead position, or something that blends the two, I'm drawn to products where the technology is genuinely useful and the people behind it care about how it gets used.


              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
