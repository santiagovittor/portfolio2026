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
        {/* Replace with your real profile image */}
        <img src="/imgs/profilePicture.jpg" alt="profile picture" />
      </div>

      <div className="profileCardContainer__text">
        <div className={menuClass}>
          <ul>
            <li
              onClick={() => setTab("actual")}
              id={tab === "actual" ? "isActive" : "notActive"}
            >
              Actualidad
            </li>
            <li
              onClick={() => setTab("goals")}
              id={tab === "goals" ? "isActive" : "notActive"}
            >
              Objetivos
            </li>
          </ul>

          {tab === "actual" ? (
            <>
              <p>
                Escribe aquí tu bio “Actualidad”. (Mantén frases cortas para que la
                composición se vea como el original.)
              </p>
              <p id="cv">
                <a href="/pdfs/resume.pdf" target="_blank" rel="noreferrer">
                  Descargar CV
                </a>
              </p>
            </>
          ) : (
            <>
              <p>
                Escribe aquí tu bio “Objetivos” / enfoque profesional / lo que estás buscando.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
