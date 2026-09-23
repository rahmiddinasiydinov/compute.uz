import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates, pagePaths, type PageKey } from "@/lib/seo";

const priority: Record<PageKey, number> = { home: 1, services: 0.9, contact: 0.8, about: 0.7 };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const [page, path] of Object.entries(pagePaths) as [PageKey, string][]) {
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified,
        changeFrequency: page === "home" ? "weekly" : "monthly",
        priority: priority[page],
        alternates: { languages: languageAlternates(path) },
      });
    }
  }
  return entries;
}
