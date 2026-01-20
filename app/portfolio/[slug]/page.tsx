import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/lib/projects";
import ProjectTabs from "@/components/ProjectTabs";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.blurb,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.blurb,
      url: `${siteConfig.url}/portfolio/${project.slug}`,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  return (
    <Section className="min-h-[100vh] grid items-center">
      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        <Reveal className="grid justify-center">
          <Link href={project.href} target="_blank" rel="noreferrer" aria-label="Open project">
            <div className="relative h-[50vh] w-[50vh] max-w-[320px] max-h-[320px] md:max-w-none md:max-h-none overflow-hidden rounded-full">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 768px) 50vh, 320px"
                className="object-cover grayscale hover:grayscale-0 transition duration-[2000ms]"
              />
            </div>
          </Link>
        </Reveal>

        <div className="grid gap-6">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold uppercase">{project.title}</h1>
          </Reveal>

          <Reveal>
            <ProjectTabs project={project} />
          </Reveal>

          <Reveal>
            <p className="opacity-80">
              <Link href="/portfolio" className="underline">
                ← Back to portfolio
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
