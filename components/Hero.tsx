"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import CornerGithub from "./CornerGithub";

export default function Hero() {
  const [swap, setSwap] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) return;

    const id = window.setInterval(() => setSwap((v) => !v), 2500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={isDark ? "mainTextContainer__isDark" : "mainTextContainer"}>
      <CornerGithub />

      <h1 className="heroKicker" data-aos="fade-up" data-aos-duration="900">
        Hi, I’m
      </h1>

      <h1
        className="heroTitle"
        data-aos="fade-up"
        data-aos-duration="900"
        data-aos-delay="100"
      >
        <span
          className="heroSwap"
          aria-label={swap ? "Santiago Vittor" : "A Software Engineer"}
        >
          <span className={swap ? "heroSwap__item isActive" : "heroSwap__item"}>
            Santiago Vittor
          </span>
          <span
            className={!swap ? "heroSwap__item isActive" : "heroSwap__item"}
          >
            a Software Engineer
          </span>
        </span>
      </h1>

      {/* Mobile-only anchor (CSS will hide it on desktop) */}
      <Link className="heroBottomCta" href="/portfolio" aria-label="View selected work">
        <span className="heroBottomCta__label">Selected work</span>
        <span className="heroBottomCta__arrow" aria-hidden="true">
          ↓
        </span>
      </Link>
    </div>
  );
}
