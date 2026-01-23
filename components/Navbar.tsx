"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function NavBar() {
  const { isDark, toggleTheme } = useTheme();

  const [navAutoHide, setNavAutoHide] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);
  const raf = useRef<number | null>(null);

  const containerClass = isDark ? "navBarContainer__isDark" : "navBarContainer";
  const icon = (lightSrc: string, darkSrc: string) => (isDark ? darkSrc : lightSrc);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileMq = window.matchMedia("(max-width: 768px)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMode = () => {
      const isMobile = mobileMq.matches;
      setNavAutoHide(isMobile);
      setIsHidden(false);
      lastY.current = window.scrollY || 0;
    };

    applyMode();

    const onScroll = () => {
      if (!mobileMq.matches) return;

      if (raf.current) return;
      raf.current = window.requestAnimationFrame(() => {
        raf.current = null;

        const y = window.scrollY || 0;
        const delta = y - lastY.current;

        // Always show near the top (prevents “where did it go?”)
        if (y < 40) {
          setIsHidden(false);
          lastY.current = y;
          return;
        }

        // Deadzone to avoid jitter
        if (delta > 6) setIsHidden(true);      // scrolling down
        else if (delta < -6) setIsHidden(false); // scrolling up

        lastY.current = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    mobileMq.addEventListener?.("change", applyMode);
    reducedMq.addEventListener?.("change", applyMode);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mobileMq.removeEventListener?.("change", applyMode);
      reducedMq.removeEventListener?.("change", applyMode);
      if (raf.current) window.cancelAnimationFrame(raf.current);
    };
  }, []);

  const classes =
    containerClass +
    (navAutoHide ? " navAutoHide" : "") +
    (isHidden ? " isHidden" : "");

  return (
    <div className={classes}>
      <ul>
        <li>
          <img
            id="lightBulb"
            src={isDark ? "/svgs/turnOn.svg" : "/svgs/turnOff.svg"}
            alt={isDark ? "set light theme icon" : "set dark theme icon"}
            onClick={toggleTheme}
          />
        </li>

        <li>
          <Link href="/about" aria-label="about me">
            <img
              src={icon("/svgs/aboutMe.svg", "/svgs/aboutMeDark.svg")}
              alt={isDark ? "about me dark icon" : "about me icon"}
            />
          </Link>
        </li>

        <li>
          <Link href="/" aria-label="home">
            <img
              src={icon("/svgs/home.svg", "/svgs/homeDark.svg")}
              alt={isDark ? "home dark icon" : "home icon"}
            />
          </Link>
        </li>

        <li>
          <Link href="/portfolio" aria-label="portfolio">
            <img
              src={icon("/svgs/portfolio.svg", "/svgs/portfolioDark.svg")}
              alt={isDark ? "portfolio dark icon" : "portfolio icon"}
            />
          </Link>
        </li>

        <li>
          <Link href="/assistant" aria-label="assistant">
            <img
              src={icon("/svgs/assistant.svg", "/svgs/assistantDark.svg")}
              alt={isDark ? "assistant dark icon" : "assistant icon"}
            />
          </Link>
        </li>

        <li>
          <Link href="/contact" aria-label="contact me">
            <img
              src={icon("/svgs/contact.svg", "/svgs/contactDark.svg")}
              alt={isDark ? "contact me dark icon" : "contact me icon"}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}
