import { routing } from "@/i18n/routing";
import { site } from "./site";
import { absoluteUrl, pagePaths, type PageKey } from "./seo";

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationSchema(locale: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/og/${locale}.png`,
    description,
    telephone: site.phone,
    email: site.email,
    sameAs: [site.channel, site.telegram],
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    address: { "@type": "PostalAddress", addressCountry: "UZ" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone,
      email: site.email,
      availableLanguage: ["uz", "ru", "en"],
    },
  };
}

export function websiteSchema(locale: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name,
    inLanguage: routing.locales,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(locale: string, items: { page: PageKey; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(locale, pagePaths[it.page]),
    })),
  };
}

export function servicesSchema(
  locale: string,
  services: { name: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        url: absoluteUrl(locale, pagePaths.services),
      },
    })),
  };
}

export function contactPageSchema(locale: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name,
    url: absoluteUrl(locale, pagePaths.contact),
    about: { "@id": ORG_ID },
  };
}
