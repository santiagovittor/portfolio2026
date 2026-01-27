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

  // Cursor velocity (for a subtle “lead”)
  const vel = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, lastT: 0 });

  const [isVisible, setIsVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    document.body.classList.add("hasCustomCursor");

    const onMove = (e: MouseEvent) => {
      const now = performance.now();

      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // velocity estimate
      const v = vel.current;
      const dt = v.lastT ? Math.max(8, now - v.lastT) : 16;
      v.x = (e.clientX - v.lastX) / dt;
      v.y = (e.clientY - v.lastY) / dt;
      v.lastX = e.clientX;
      v.lastY = e.clientY;
      v.lastT = now;

      // hover detection
      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
      const wantsNative = !!el?.closest?.('[data-cursor="native"]');

      const isTextField =
        wantsNative ||
        !!el?.closest?.('input, textarea, select, [contenteditable="true"], [data-cursor="text"]');

      const interactive =
        !!el?.closest?.('a, button, [role="button"], [data-cursor="hover"], summary') && !isTextField;

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

      // Keep rings premium/inertial
      const ringEase = 0.18;

      // Make dot snappier
      const dotEase = 0.7; // was 0.35

      // Subtle “lead” for dot (feels responsive, not laggy)
      // clamp so it never jumps too much
      const leadX = clamp(vel.current.x * 18, -10, 10);
      const leadY = clamp(vel.current.y * 18, -10, 10);

      const dotTargetX = tx + leadX;
      const dotTargetY = ty + leadY;

      dotPos.current.x += (dotTargetX - dotPos.current.x) * dotEase;
      dotPos.current.y += (dotTargetY - dotPos.current.y) * dotEase;

      ringPos.current.x += (tx - ringPos.current.x) * ringEase;
      ringPos.current.y += (ty - ringPos.current.y) * ringEase;

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

  const styleVars: React.CSSProperties = {
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
