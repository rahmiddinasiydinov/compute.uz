import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/motion/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

type Stat = { value: number; suffix: string; label: string };

const values = ["honest", "legal", "clear", "longterm"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    page: "about",
    title: t("pages.about.title"),
    description: t("pages.about.description"),
    keywords: t("keywords"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const nav = await getTranslations("nav");
  const stats = t.raw("stats") as Record<string, Stat>;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { page: "home", name: nav("home") },
          { page: "about", name: nav("about") },
        ])}
      />
      <section className="pt-16">
        <Container className="pt-20 lg:pt-32">
          <SectionHeading
            as="h1"
            index="A"
            label={t("label")}
            size="lg"
            title={t.rich("title", {
              hl: (chunks) => <span className="text-signal">{chunks}</span>,
            })}
            text={t("text")}
          />
          <Reveal delay={0.2} className="mt-10 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-9 lg:col-start-4">
              <Button href="/contact" size="lg" arrow magnetic>
                {t("cta")}
              </Button>
            </div>
          </Reveal>

          <Stagger className="mt-20 grid grid-cols-2 border-t border-line lg:mt-28 lg:grid-cols-4" stagger={0.08}>
            {Object.entries(stats).map(([key, s]) => (
              <StaggerItem
                key={key}
                className="border-b border-line py-8 pr-4 odd:border-r odd:pr-6 even:pl-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="block font-display text-5xl font-semibold tracking-[-0.06em] text-text sm:text-6xl lg:text-7xl"
                />
                <p className="label mt-4">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="mt-24 bg-bg-2 py-24 lg:mt-36 lg:py-36">
        <Container>
          <SectionHeading index="B" label={t("values.label")} title={t("values.title")} />
          <Stagger className="mt-16 border-t border-line lg:mt-24" stagger={0.08}>
            {values.map((key, i) => (
              <StaggerItem
                key={key}
                className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-line py-8 lg:gap-x-8 lg:py-10"
              >
                <span className="col-span-2 font-mono text-xs text-signal lg:col-span-3">0{i + 1}</span>
                <h3 className="col-span-10 font-display text-3xl font-semibold tracking-[-0.045em] text-text lg:col-span-5 lg:text-4xl">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="col-span-10 col-start-3 text-sm leading-relaxed text-muted lg:col-span-4 lg:col-start-auto lg:text-base">
                  {t(`values.items.${key}.text`)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
