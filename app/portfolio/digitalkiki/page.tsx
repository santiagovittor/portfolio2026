"use client";

import { useState } from "react";
import { useTheme } from "../../../components/ThemeProvider";

export default function DigitalKikiPage() {
  const { isDark } = useTheme();

  const [tab, setTab] = useState<"desc" | "tech">("desc");

  const menuClass = isDark
    ? "profileCardContainer__text--menu"
    : "profileCardContainer__text--menuIsDark";

  return (
    <div className="profileCardContainer">
      <div className="profileCardContainer__img" data-aos="fade" data-aos-duration="3000">
        <a href="https://example.com" target="_blank" rel="noreferrer">
          <img src="/imgs/digitalkiki.png" alt="digital kiki website" />
        </a>
      </div>

      <div className="profileCardContainer__text">
        <div className={menuClass}>
          <ul>
            <li onClick={() => setTab("desc")} id={tab === "desc" ? "isActive" : "notActive"}>
              Descripción
            </li>
            <li onClick={() => setTab("tech")} id={tab === "tech" ? "isActive" : "notActive"}>
              Tecnologías
            </li>
          </ul>

          {tab === "desc" ? (
            <p>Descripción del proyecto (placeholder).</p>
          ) : (
            <>
              <li>React / Next</li>
              <li>Firebase (opcional)</li>
              <li>Deployment en Vercel</li>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
