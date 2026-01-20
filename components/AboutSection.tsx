"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import Section from "./Section";

export default function AboutSection() {
  const [tab, setTab] = useState<"current" | "goals">("current");

  const tabBase =
    "relative cursor-pointer uppercase font-semibold transition-transform duration-300 hover:scale-110";
  const underline =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100";

  return (
    <Section className="min-h-[100vh] grid items-center">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <Reveal className="grid justify-center">
          <div className="relative h-[50vh] w-[50vh] max-w-[320px] max-h-[320px] md:max-w-none md:max-h-none overflow-hidden rounded-full">
            <Image
              src="/placeholder-profile.jpg"
              alt="Profile placeholder"
              fill
              sizes="(min-width: 768px) 50vh, 320px"
              className="object-cover grayscale hover:grayscale-0 transition duration-[2000ms]"
              priority={false}
            />
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal>
            <ul className="flex flex-wrap gap-10 mb-2">
              <li
                className={[
                  tabBase,
                  underline,
                  "after:bg-white dark:after:bg-brand-dark",
                  tab === "current" ? "font-bold" : "opacity-80",
                ].join(" ")}
                onClick={() => setTab("current")}
              >
                Currently
              </li>
              <li
                className={[
                  tabBase,
                  underline,
                  "after:bg-white dark:after:bg-brand-dark",
                  tab === "goals" ? "font-bold" : "opacity-80",
                ].join(" ")}
                onClick={() => setTab("goals")}
              >
                Goals
              </li>
            </ul>
          </Reveal>

          {tab === "current" ? (
            <div className="grid gap-4 text-lg leading-10">
              <Reveal>
                <p>
                  Placeholder bio. Replace this text with your own story (focus on outcomes, taste in UI,
                  and what you ship).
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Add 1–2 lines about your current role + what you specialize in (UI engineering, design
                  systems, performance, etc.).
                </p>
              </Reveal>
              <Reveal>
                <p className="text-red-600 font-bold">
                  <a href="/resume.pdf" className="no-underline">
                    Download résumé (PDF)
                  </a>
                </p>
              </Reveal>
            </div>
          ) : (
            <div className="grid gap-4 text-lg leading-10">
              <Reveal>
                <p>
                  Placeholder goals. Replace with your own goals: e.g. mastering motion design, improving
                  accessibility, contributing to OSS, etc.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Mention the kinds of projects you want next and what impact you aim to have.
                </p>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
