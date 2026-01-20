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
  title: "Santiago Vittor — Software Engineer (Frontend)",
  description:
    "Software engineer in Buenos Aires building React/Next.js web experiences, automation tools, and practical AI-enabled workflows.",
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
