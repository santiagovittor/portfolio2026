import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Only indexable static routes (keep /assistant out)
  const staticRoutes = ["", "/about", "/portfolio", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteConfig.url}/portfolio/${p.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
