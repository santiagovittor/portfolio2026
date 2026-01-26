"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function CustomCursor() {
  const { isDark } = useTheme();

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const ring2Ref = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef<number | null>(null);

  // Target position (mouse)
  const target = useRef({ x: 0, y: 0 });

  // Smoothed positions
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const [isVisible, setIsVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    // Desktop only (fine pointer)
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    // Enable class that hides the native cursor globally (except inputs via CSS)
    document.body.classList.add("hasCustomCursor");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Detect hover targets
      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null;

      // If user wants native cursor somewhere:
      const wantsNative = !!el?.closest?.('[data-cursor="native"]');

      const isTextField =
        wantsNative ||
        !!el?.closest?.(
          'input, textarea, select, [contenteditable="true"], [data-cursor="text"]'
        );

      const interactive =
        !!el?.closest?.(
          'a, button, [role="button"], [data-cursor="hover"], summary'
        ) && !isTextField;

      setIsHover(interactive);
      setIsHidden(isTextField);
    };

    const onDown = () => setIsDown(true);
    const onUp = () => setIsDown(false);
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    const tick = () => {
      const tx = target.current.x;
      const ty = target.current.y;

      // Dot follows faster
      dotPos.current.x += (tx - dotPos.current.x) * 0.35;
      dotPos.current.y += (ty - dotPos.current.y) * 0.35;

      // Ring follows slower (premium inertia)
      ringPos.current.x += (tx - ringPos.current.x) * 0.18;
      ringPos.current.y += (ty - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      if (ring2Ref.current) {
        ring2Ref.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("hasCustomCursor");

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // Theme-aware colors (avoid mix-blend hacks; keep readable)
  const styleVars: React.CSSProperties = {
    // Dark: light cursor; Light: darker cursor
    ["--cursor-dot" as any]: isDark ? "rgba(235,245,255,0.92)" : "rgba(20,24,35,0.88)",
    ["--cursor-ring" as any]: isDark ? "rgba(235,245,255,0.48)" : "rgba(20,24,35,0.42)",
    ["--cursor-ring2" as any]: isDark ? "rgba(235,245,255,0.18)" : "rgba(20,24,35,0.16)",
  };

  const cls = [
    "customCursor",
    isVisible ? "isVisible" : "",
    isHover ? "isHover" : "",
    isHidden ? "isHidden" : "",
    isDown ? "isDown" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} style={styleVars} aria-hidden="true">
      <div ref={ring2Ref} className="customCursor__ring2" />
      <div ref={ringRef} className="customCursor__ring" />
      <div ref={dotRef} className="customCursor__dot" />
    </div>
  );
}
