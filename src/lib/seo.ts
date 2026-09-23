import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "./site";

export type PageKey = "home" | "services" | "about" | "contact";

export const pagePaths: Record<PageKey, string> = {
  home: "/",
  services: "/services",
  about: "/about",
  contact: "/contact",
};

export const ogLocales: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/** Absolute path for a page in a locale, honouring `localePrefix: "as-needed"`. */
export function localizedPath(locale: string, path: string) {
  const clean = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

export function absoluteUrl(locale: string, path: string) {
  return new URL(localizedPath(locale, path), site.url).toString();
}

/** hreflang map for one path, including x-default (points at the default locale). */
export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return languages;
}

type BuildArgs = {
  locale: string;
  page: PageKey;
  title: string;
  description: string;
  keywords?: string;
};

export function buildMetadata({ locale, page, title, description, keywords }: BuildArgs): Metadata {
  const path = pagePaths[page];
  const url = absoluteUrl(locale, path);
  const image = `${site.url}/og/${locale}.png`;

  return {
    title,
    description,
    keywords: keywords?.split(",").map((k) => k.trim()),
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: ogLocales[locale as Locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
