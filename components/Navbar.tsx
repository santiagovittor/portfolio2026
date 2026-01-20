"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiUserCircle, HiBriefcase, HiMail, HiLightBulb } from "react-icons/hi";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/", label: "Home", Icon: HiHome },
  { href: "/about", label: "About", Icon: HiUserCircle },
  { href: "/portfolio", label: "Portfolio", Icon: HiBriefcase },
  { href: "/contact", label: "Contact", Icon: HiMail },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  const iconBase = "h-8 w-8 transition-transform hover:scale-110 duration-300";
  const active = isDark ? "text-white" : "text-brand-dark";
  const inactive = isDark ? "text-gray-300" : "text-gray-600";

  return (
    <>
      {/* Desktop: vertical, fixed right (matches original behavior) */}
      <nav className="hidden md:grid fixed right-[50px] top-0 h-full z-50 transition-colors duration-[2000ms]">
        <ul className="grid justify-center text-center pt-12 gap-8">
          <li>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="grid place-items-center"
            >
              <HiLightBulb
                className={[
                  iconBase,
                  isDark ? "text-yellow-300" : "text-brand-dark rotate-180",
                ].join(" ")}
              />
            </button>
          </li>

          {navItems.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link href={href} aria-label={label} className="grid place-items-center">
                <Icon className={[iconBase, pathname === href ? active : inactive].join(" ")} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: sticky horizontal bar */}
      <nav className="md:hidden sticky top-[10px] z-50 px-4">
        <div className="h-[12vh] rounded-lg bg-white dark:bg-brand-dark transition-colors duration-[2000ms] shadow-md">
          <ul className="h-full flex items-center justify-around">
            <li>
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="grid place-items-center"
              >
                <HiLightBulb
                  className={[
                    iconBase,
                    isDark ? "text-yellow-300" : "text-brand-dark rotate-180",
                  ].join(" ")}
                />
              </button>
            </li>

            {navItems.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link href={href} aria-label={label} className="grid place-items-center">
                  <Icon className={[iconBase, pathname === href ? active : inactive].join(" ")} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
