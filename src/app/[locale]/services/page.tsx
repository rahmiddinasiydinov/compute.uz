import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { serviceKeys, serviceIcons } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    page: "services",
    title: t("pages.services.title"),
    description: t("pages.services.description"),
    keywords: t("keywords"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("services");
  const nav = await getTranslations("nav");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { page: "home", name: nav("home") },
            { page: "services", name: nav("services") },
          ]),
          servicesSchema(
            locale,
            serviceKeys.map((key) => ({
              name: t(`items.${key}.title`),
              description: t(`items.${key}.text`),
            })),
          ),
        ]}
      />
      <section className="relative overflow-hidden pt-[76px]">
        <div className="pointer-events-none absolute -left-40 top-10 size-[480px] rounded-full bg-brand/20 blur-[140px]" />
        <Container className="py-16 lg:py-24">
          <SectionHeading
            as="h1"
            label={t("label")}
            title={t.rich("page.title", {
              hl: (chunks) => <span className="text-cyan">{chunks}</span>,
            })}
            text={t("page.text")}
            className="max-w-3xl"
            titleClassName="lg:text-[52px]"
          />

          <Stagger className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.1}>
            {serviceKeys.map((key) => {
              const Icon = serviceIcons[key];
              const details = t.raw(`page.details.${key}`) as string[];
              return (
                <StaggerItem key={key}>
                  <SpotlightCard className="flex h-full flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="icon-tile">
                        <Icon className="size-5" />
                      </span>
                      <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">
                        {t("page.from")}{" "}
                        <span className="font-semibold text-cyan">{t(`page.prices.${key}`)}</span>
                      </span>
                    </div>
                    <h2 className="mt-6 text-xl font-semibold text-white">
                      {t(`items.${key}.title`)}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {t(`items.${key}.text`)}
                    </p>
                    <ul className="mt-6 grid gap-2.5 text-sm text-text/90 sm:grid-cols-2">
                      {details.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-cyan" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
