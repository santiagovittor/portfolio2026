"use client";

import AOSInit from "./AOSInit";
import NavBar from "./Navbar";
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
      <NavBar />
    </section>
  );
}
