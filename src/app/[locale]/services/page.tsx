import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { serviceKeys } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
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
      <section className="pt-16">
        <Container className="pb-12 pt-20 lg:pt-32">
          <SectionHeading
            as="h1"
            index="S"
            label={t("label")}
            title={t.rich("page.title", {
              hl: (chunks) => <span className="text-signal">{chunks}</span>,
            })}
            text={t("page.text")}
            size="lg"
          />

          <Stagger className="mt-20 lg:mt-28" stagger={0.08}>
            {serviceKeys.map((key, i) => {
              const details = t.raw(`page.details.${key}`) as string[];
              return (
                <StaggerItem
                  key={key}
                  className="grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-8 lg:py-14"
                >
                  <div className="flex items-baseline justify-between gap-4 lg:col-span-3 lg:flex-col lg:justify-start">
                    <span className="font-mono text-xs text-signal">00{i + 1}</span>
                    <span className="label lg:mt-6">
                      {t("page.from")} <span className="text-text">{t(`page.prices.${key}`)}</span>
                    </span>
                  </div>
                  <div className="lg:col-span-5">
                    <h2 className="font-display text-4xl font-semibold leading-[1] tracking-[-0.045em] text-text lg:text-5xl">
                      {t(`items.${key}.title`)}
                    </h2>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                      {t(`items.${key}.text`)}
                    </p>
                  </div>
                  <ul className="divide-y divide-line border-y border-line lg:col-span-4 lg:self-start">
                    {details.map((d) => (
                      <li key={d} className="flex items-baseline gap-3 py-3 text-sm text-text">
                        <span className="font-mono text-xs text-signal">+</span>
                        {d}
                      </li>
                    ))}
                  </ul>
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
