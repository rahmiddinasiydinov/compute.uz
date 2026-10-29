import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    // Spread first: its plain `title` string must not override the template below
    ...buildMetadata({
      locale,
      page: "home",
      title: t("pages.home.title"),
      description: t("pages.home.description"),
      keywords: t("keywords"),
    }),
    metadataBase: new URL(site.url),
    applicationName: site.name,
    title: {
      default: t("pages.home.title"),
      template: `%s · ${site.name}`,
    },
    description: t("pages.home.description"),
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    // Search console ownership tokens, set per deployment
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },
    formatDetection: { telephone: true, email: true, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <html lang={locale} className={`${inter.variable} ${interTight.variable} ${jetbrains.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        {/* Without JS the reveal animations never run: show everything they hide */}
        <noscript>
          <style>{`.gsap-hidden{visibility:visible!important}[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd
          data={[
            organizationSchema(locale, t("pages.home.description")),
            websiteSchema(locale, t("pages.home.title")),
          ]}
        />
        <NextIntlClientProvider>
          <SmoothScroll />
          <Navbar />
          {/* Opaque and above the footer so it can slide off and reveal it. At least
              one screen tall, so short pages never show the footer before scrolling. */}
          <main className="relative z-10 min-h-svh flex-1 bg-bg">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
