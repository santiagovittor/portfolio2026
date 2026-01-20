"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function NavBar() {
  const { isDark, toggleTheme } = useTheme();

  const containerClass = isDark ? "navBarContainer__isDark" : "navBarContainer";

  const icon = (lightSrc: string, darkSrc: string) => (isDark ? darkSrc : lightSrc);

  return (
    <div className={containerClass}>
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
