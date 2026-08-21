import type { MetadataRoute } from "next";
import { people } from "@/data/people";
import { projects } from "@/data/projects";
import { locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

const staticPaths = [
  "",
  "research",
  "projects",
  "education",
  "publications",
  "people",
  "about",
  "privacy",
  "personal-data",
  "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      const url = absoluteUrl(path ? `${locale}/${path}` : locale);
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }

    for (const project of projects) {
      entries.push({
        url: absoluteUrl(`${locale}/projects/${project.slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    for (const person of people) {
      entries.push({
        url: absoluteUrl(`${locale}/people/${person.slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
