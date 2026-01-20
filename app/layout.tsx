import "./globals.scss";
import { Rajdhani } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/ThemeProvider";
import LayoutShell from "../components/LayoutShell";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Portfolio 2026",
  description: "Portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={rajdhani.variable}>
      <body>
        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
