"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import Section from "./Section";
import { projects } from "@/lib/projects";

export default function ProjectsSection() {
  return (
    <Section className="min-h-[100vh]">
      <Reveal>
        <h1 className="text-5xl font-bold uppercase text-center mb-10">
          Portfolio
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} className="no-underline">
            <Reveal className="grid justify-center m-12">
              <div className="grid gap-6">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale hover:saturate-150 hover:opacity-75 transition duration-[2000ms]"
                  />
                </div>
                <h2 className="text-2xl font-bold text-center">{p.title}</h2>
              </div>
            </Reveal>
          </Link>
        ))}
      </div>
    </Section>
  );
}
