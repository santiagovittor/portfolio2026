"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import CornerGithub from "./CornerGithub";

export default function Hero() {
  const [swap, setSwap] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => setSwap((v) => !v), 2500);
    return () => clearTimeout(t);
  }, [swap]);

  return (
    <div className={isDark ? "mainTextContainer__isDark" : "mainTextContainer"}>
      <CornerGithub />

      <h1 data-aos="zoom-in" data-aos-duration="1500">
        Hi, I’m
      </h1>

      <h1 data-aos="zoom-out" data-aos-duration="1500">
        {swap ? "Santiago Vittor" : "a Software Engineer"}
      </h1>
    </div>
  );
}
