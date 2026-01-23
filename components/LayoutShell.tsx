"use client";

import { useEffect, useRef } from "react";
import AOSInit from "./AOSInit";
import Navbar from "./Navbar";
import { useTheme } from "./ThemeProvider";
import { usePathname } from "next/navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Ambient + pointer spotlight ONLY on home
  const isHome = pathname === "/";

  const baseClass = isDark ? "landingDisposition__isDark" : "landingDisposition";
  const ambientClass = isHome ? " hasAmbient isHome" : "";

  useEffect(() => {
    if (!isHome) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia?.("(hover: hover)")?.matches &&
      window.matchMedia?.("(pointer: fine)")?.matches;

    if (prefersReduced || !canHover) return;

    const el = sectionRef.current;
    if (!el) return;

    // Set defaults so it never “jumps”
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "35%");

    // Light throttle via rAF so it stays smooth
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [isHome]);

  return (
    <section ref={sectionRef} className={`${baseClass}${ambientClass}`}>
      <AOSInit />
      {children}
      <Navbar />
    </section>
  );
}
