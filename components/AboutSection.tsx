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
                I build clean, user-friendly web experiences with React and Next.js, and I
                also love automation that removes busywork. At FoodStyles, I lead AI and
                data training programs (LLMs, prompt mastery, data literacy) and build
                internal tools and workflow automations.
              </p>

              <p id="cv">
                <a href="/pdfs/resume.pdf" target="_blank" rel="noreferrer">
                  Download resume
                </a>
              </p>
            </>
          ) : (
            <>
              <p>
                I’m looking for a frontend or software engineering role where I can ship
                polished UI, integrate APIs, and keep improving performance, accessibility,
                and developer experience. I’m especially excited about products that use AI
                in practical, user-first ways.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
