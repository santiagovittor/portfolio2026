"use client";

import { useEffect, useState } from "react";
import CornerGithub from "./CornerGithub";
import Reveal from "./Reveal";

export default function Hero() {
  const [showName, setShowName] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowName((v) => !v), 2500);
    return () => clearTimeout(t);
  }, [showName]);

  return (
    <main className="min-h-[100vh] grid place-items-center text-center uppercase relative">
      <CornerGithub />

      <div className="grid gap-2">
        <Reveal>
          <h1 className="text-[1.7rem] md:text-7xl font-bold tracking-tight">
            Hi, I am
          </h1>
        </Reveal>

        <Reveal>
          <h1
            key={showName ? "name" : "role"}
            className="text-[1.7rem] md:text-7xl font-bold tracking-tight animate-heroSwap"
          >
            {showName ? "Santiago Vittor" : "Front End Developer"}
          </h1>
        </Reveal>
      </div>
    </main>
  );
}
