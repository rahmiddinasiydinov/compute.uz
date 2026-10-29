import { routing } from "@/i18n/routing";
import { servicePrices, site, type ServiceKey } from "./site";
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
    priceRange: "100 000 – 3 000 000 UZS",
    currenciesAccepted: "UZS",
    knowsLanguage: ["uz", "ru", "en"],
    areaServed: [
      { "@type": "City", name: "Tashkent" },
      { "@type": "Country", name: "Uzbekistan" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
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
  services: { key: ServiceKey; name: string; description: string }[],
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
        areaServed: { "@type": "City", name: "Tashkent" },
        url: absoluteUrl(locale, pagePaths.services),
        ...(servicePrices[s.key] !== null && {
          offers: {
            "@type": "Offer",
            priceCurrency: "UZS",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: servicePrices[s.key],
              priceCurrency: "UZS",
            },
          },
        }),
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

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
