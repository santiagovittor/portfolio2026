"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

type Puff = {
  x: number;
  y: number;
  r: number;
  a: number;
  vx: number;
  vy: number;
  growth: number;
  fade: number;
  rot: number;
  spin: number;
  stretch: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function SmokeOverlay() {
  const pathname = usePathname();
  const { isDark } = useTheme();

  const isEnabledRoute = useMemo(() => pathname === "/", [pathname]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const pointerRef = useRef({
    x: 0,
    y: 0,
    px: 0,
    py: 0,
    speed: 0,
    active: false,
    lastT: 0,
  });

  const puffsRef = useRef<Puff[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isEnabledRoute) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    // ✅ Increased density + stronger light mode visibility:
    // - more puffs/sec
    // - slightly higher overlayOpacity
    // - slightly lower fadeOutAlpha (smoke persists longer)
    const SETTINGS = isDark
      ? {
          quality: 0.36,
          overlayOpacity: 0.30,    // was ~0.24
          blurPx: 22,
          fadeOutAlpha: 0.050,     // was ~0.06 (less fade -> denser)
          spawnPerSecond: 18,      // was ~14
          maxPuffs: 200,           // was ~160

          eraseBaseRadius: 145,
          eraseStrength: 0.96,
          repelStrength: 0.070,    // a touch stronger for clearer interaction

          windX: 0.030,
          windY: -0.012,
          swirl: 0.020,
        }
      : {
          quality: 0.38,
          overlayOpacity: 0.26,    // was ~0.16 (much more visible)
          blurPx: 20,
          fadeOutAlpha: 0.055,     // was ~0.07
          spawnPerSecond: 18,      // was ~12
          maxPuffs: 190,           // was ~140

          eraseBaseRadius: 165,
          eraseStrength: 0.965,
          repelStrength: 0.080,

          windX: 0.026,
          windY: -0.010,
          swirl: 0.018,
        };

    const setSize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ow = clamp(Math.floor(w * SETTINGS.quality), 260, 1100);
      const oh = clamp(Math.floor(h * SETTINGS.quality), 260, 1100);
      off.width = ow;
      off.height = oh;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const p = pointerRef.current;

      p.px = p.x;
      p.py = p.y;
      p.x = e.clientX;
      p.y = e.clientY;

      const dt = p.lastT ? Math.max(1, now - p.lastT) : 16;
      const dx = p.x - p.px;
      const dy = p.y - p.py;

      p.speed = clamp(Math.hypot(dx, dy) / dt, 0, 1.2);
      p.active = true;
      p.lastT = now;
    };

    const onLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.speed = 0;
    };

    window.addEventListener("resize", setSize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const spawnPuff = () => {
      const ow = off.width;
      const oh = off.height;

      // Slightly broader spread = more “ambient” smoke
      const cx = ow * (0.24 + Math.random() * 0.52);
      const cy = oh * (0.14 + Math.random() * 0.58);

      const r = 16 + Math.random() * 52;
      const a = isDark ? 0.055 + Math.random() * 0.070 : 0.060 + Math.random() * 0.080; // light: more alpha

      const vx = (Math.random() - 0.5) * 0.25;
      const vy = (Math.random() - 0.5) * 0.14;

      const stretch = 1.25 + Math.random() * 1.2;
      const rot = Math.random() * Math.PI * 2;
      const spin = (Math.random() - 0.5) * 0.02;

      puffsRef.current.push({
        x: cx,
        y: cy,
        r,
        a,
        vx,
        vy,
        growth: 0.12 + Math.random() * 0.26,
        fade: 0.00085 + Math.random() * 0.00135,
        rot,
        spin,
        stretch,
      });

      if (puffsRef.current.length > SETTINGS.maxPuffs) {
        puffsRef.current.splice(0, puffsRef.current.length - SETTINGS.maxPuffs);
      }
    };

    const drawPuff = (p: Puff) => {
      // Stronger smoke tint for light mode (so it actually shows)
      const center = isDark
        ? `rgba(235, 245, 255, ${p.a})`
        : `rgba(25, 28, 35, ${p.a})`;
      const mid = isDark
        ? `rgba(175, 195, 230, ${p.a * 0.55})`
        : `rgba(50, 55, 70, ${p.a * 0.45})`;

      offCtx.save();
      offCtx.translate(p.x, p.y);
      offCtx.rotate(p.rot);
      offCtx.scale(p.stretch, 1);

      const g = offCtx.createRadialGradient(0, 0, p.r * 0.15, 0, 0, p.r);
      g.addColorStop(0, center);
      g.addColorStop(0.55, mid);
      g.addColorStop(1, "rgba(0,0,0,0)");

      offCtx.fillStyle = g;
      offCtx.beginPath();
      offCtx.arc(0, 0, p.r, 0, Math.PI * 2);
      offCtx.fill();

      offCtx.restore();
    };

    const fadeBuffer = () => {
      const ow = off.width;
      const oh = off.height;

      offCtx.save();
      offCtx.globalCompositeOperation = "destination-out";
      offCtx.fillStyle = `rgba(0,0,0,${SETTINGS.fadeOutAlpha})`;
      offCtx.fillRect(0, 0, ow, oh);
      offCtx.restore();
    };

    const applyCursorDissipate = () => {
      const p = pointerRef.current;
      if (!p.active) return;

      const ow = off.width;
      const oh = off.height;

      const px = (p.x / w) * ow;
      const py = (p.y / h) * oh;

      const speedBoost = 1 + p.speed * 1.25;
      const r = ((SETTINGS.eraseBaseRadius * speedBoost) / w) * ow;

      offCtx.save();
      offCtx.globalCompositeOperation = "destination-out";
      const g = offCtx.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, `rgba(0,0,0,${SETTINGS.eraseStrength})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      offCtx.fillStyle = g;
      offCtx.beginPath();
      offCtx.arc(px, py, r, 0, Math.PI * 2);
      offCtx.fill();
      offCtx.restore();

      const repelR = r * 0.95;
      for (const puff of puffsRef.current) {
        const dx = puff.x - px;
        const dy = puff.y - py;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < repelR) {
          const t = 1 - dist / repelR;
          const nx = dx / dist;
          const ny = dy / dist;
          puff.vx += nx * SETTINGS.repelStrength * t * (1 + p.speed);
          puff.vy += ny * SETTINGS.repelStrength * t * (1 + p.speed);
          puff.a *= 1 - 0.02 * t;
        }
      }
    };

    const tick = (t: number) => {
      const dt = lastTimeRef.current ? Math.min(0.04, (t - lastTimeRef.current) / 1000) : 0.016;
      lastTimeRef.current = t;

      fadeBuffer();

      const spawnFloat = SETTINGS.spawnPerSecond * dt;
      const whole = Math.floor(spawnFloat);
      const frac = spawnFloat - whole;

      for (let i = 0; i < whole; i++) spawnPuff();
      if (Math.random() < frac) spawnPuff();

      offCtx.save();
      offCtx.filter = "blur(8px)";
      offCtx.globalCompositeOperation = isDark ? "screen" : "source-over";

      const ow = off.width;
      const oh = off.height;
      const time = t * 0.001;

      for (const puff of puffsRef.current) {
        const ax =
          Math.sin((puff.y / oh) * 6 + time * 0.8) +
          Math.cos((puff.x / ow) * 6 - time * 0.7);
        const ay =
          Math.cos((puff.y / oh) * 6 - time * 0.6) -
          Math.sin((puff.x / ow) * 6 + time * 0.9);

        puff.vx += ax * SETTINGS.swirl * dt;
        puff.vy += ay * SETTINGS.swirl * dt;

        puff.vx += SETTINGS.windX * dt * 10;
        puff.vy += SETTINGS.windY * dt * 10;

        puff.vx *= 0.985;
        puff.vy *= 0.985;

        puff.x += puff.vx * (ow * dt * 0.9);
        puff.y += puff.vy * (oh * dt * 0.9);

        puff.r += puff.growth * (ow * dt * 0.05);
        puff.a = Math.max(0, puff.a - puff.fade * (dt * 60));
        puff.rot += puff.spin * (dt * 60);

        if (puff.x < -puff.r) puff.x = ow + puff.r;
        if (puff.x > ow + puff.r) puff.x = -puff.r;
        if (puff.y < -puff.r) puff.y = oh + puff.r;
        if (puff.y > oh + puff.r) puff.y = -puff.r;

        if (puff.a > 0.002) drawPuff(puff);
      }

      offCtx.restore();

      applyCursorDissipate();

      // Render to main canvas
      ctx.save();
      ctx.clearRect(0, 0, w, h);

      ctx.globalAlpha = SETTINGS.overlayOpacity;
      ctx.filter = `blur(${SETTINGS.blurPx}px)`;
      ctx.drawImage(off, 0, 0, w, h);

      // Subtle vignette to keep hero readable
      ctx.filter = "none";
      ctx.globalAlpha = isDark ? SETTINGS.overlayOpacity * 0.55 : SETTINGS.overlayOpacity * 0.32;
      const vignette = ctx.createRadialGradient(
        w * 0.5,
        h * 0.38,
        0,
        w * 0.5,
        h * 0.42,
        Math.max(w, h) * 0.75
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(0.65, "rgba(0,0,0,0.04)");
      vignette.addColorStop(1, isDark ? "rgba(0,0,0,0.20)" : "rgba(0,0,0,0.10)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        lastTimeRef.current = 0;
        if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      }
    };

    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      puffsRef.current = [];
    };
  }, [isEnabledRoute, isDark]);

  if (!isEnabledRoute) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        // ✅ Light mode visibility fix:
        // dark: soft-light feels premium on gradients
        // light: multiply makes the darker smoke show up
        mixBlendMode: isDark ? "soft-light" : "multiply",
        opacity: 1,
      }}
    />
  );
}
