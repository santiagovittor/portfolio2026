"use client";

import AOSInit from "./AOSInit";
import Navbar from "./Navbar";
import { useTheme } from "./ThemeProvider";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark } = useTheme();

  return (
    <section className={isDark ? "landingDisposition__isDark" : "landingDisposition"}>
      <AOSInit />
      {children}
      <Navbar />
    </section>
  );
}
