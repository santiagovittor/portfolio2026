// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { trackEvent } from "../lib/analytics";

export default function NavBar() {
  const { isDark, toggleTheme } = useTheme();

  const containerClass = isDark ? "navBarContainer__isDark" : "navBarContainer";
  const icon = (lightSrc: string, darkSrc: string) => (isDark ? darkSrc : lightSrc);

  const navClick = (destination: string) => () => {
    trackEvent("nav_click", { destination, location: "navbar" });
  };

  const onToggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    trackEvent("toggle_theme", { next_theme: nextTheme, location: "navbar" });
    toggleTheme();
  };

  return (
    <div className={containerClass}>
      <ul>
        <li>
          <img
            id="lightBulb"
            src={isDark ? "/svgs/turnOn.svg" : "/svgs/turnOff.svg"}
            alt={isDark ? "set light theme icon" : "set dark theme icon"}
            onClick={onToggleTheme}
          />
        </li>

        <li>
          <Link href="/about" aria-label="about me" onClick={navClick("/about")}>
            <img
              src={icon("/svgs/aboutMe.svg", "/svgs/aboutMeDark.svg")}
              alt={isDark ? "about me dark icon" : "about me icon"}
            />
          </Link>
        </li>

        <li>
          <Link href="/" aria-label="home" onClick={navClick("/")}>
            <img
              src={icon("/svgs/home.svg", "/svgs/homeDark.svg")}
              alt={isDark ? "home dark icon" : "home icon"}
            />
          </Link>
        </li>

        <li>
          <Link href="/portfolio" aria-label="portfolio" onClick={navClick("/portfolio")}>
            <img
              src={icon("/svgs/portfolio.svg", "/svgs/portfolioDark.svg")}
              alt={isDark ? "portfolio dark icon" : "portfolio icon"}
            />
          </Link>
        </li>

        <li>
          <Link href="/assistant" aria-label="assistant" onClick={navClick("/assistant")}>
            <img
              src={icon("/svgs/assistant.svg", "/svgs/assistantDark.svg")}
              alt={isDark ? "assistant dark icon" : "assistant icon"}
            />
          </Link>
        </li>

        <li>
          <Link href="/contact" aria-label="contact me" onClick={navClick("/contact")}>
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
