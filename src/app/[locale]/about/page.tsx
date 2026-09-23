import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Handshake, MessageCircle, ScrollText, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/motion/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

type Stat = { value: number; suffix: string; label: string };

const values: { key: "honest" | "legal" | "clear" | "longterm"; Icon: LucideIcon }[] = [
  { key: "honest", Icon: Handshake },
  { key: "legal", Icon: ShieldCheck },
  { key: "clear", Icon: MessageCircle },
  { key: "longterm", Icon: ScrollText },
];

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
      <section className="relative overflow-hidden pt-[76px]">
        <div className="pointer-events-none absolute -right-40 top-0 size-[480px] rounded-full bg-cyan/10 blur-[140px]" />
        <Container className="py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                as="h1"
                label={t("label")}
                title={t.rich("title", {
                  hl: (chunks) => <span className="text-cyan">{chunks}</span>,
                })}
                text={t("text")}
                titleClassName="lg:text-[52px]"
              />
              <Reveal delay={0.2} className="mt-8">
                <Button href="/contact" size="lg" arrow magnetic>
                  {t("cta")}
                </Button>
              </Reveal>
            </div>

            <Stagger className="grid grid-cols-2 gap-4" stagger={0.1}>
              {Object.entries(stats).map(([key, s]) => (
                <StaggerItem key={key}>
                  <SpotlightCard className="p-6" lift={false}>
                    <Counter
                      value={s.value}
                      suffix={s.suffix}
                      className="font-display text-4xl font-bold text-white sm:text-5xl"
                    />
                    <p className="mt-2 text-sm text-muted">{s.label}</p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-bg-2 py-20 lg:py-24">
        <Container>
          <SectionHeading label={t("values.label")} title={t("values.title")} align="center" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {values.map(({ key, Icon }) => (
              <StaggerItem key={key}>
                <SpotlightCard className="h-full p-6">
                  <span className="ring-tile">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 font-semibold text-white">{t(`values.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`values.items.${key}.text`)}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <div className="pt-16">
        <CtaBanner />
      </div>
    </>
  );
}
