import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    page: "contact",
    title: t("pages.contact.title"),
    description: t("pages.contact.description"),
    keywords: t("keywords"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");
  const meta = await getTranslations("meta");

  const direct = [
    { label: t("direct.telegram"), value: site.telegramHandle, href: site.telegram, external: true },
    { label: t("direct.channel"), value: site.channelHandle, href: site.channel, external: true },
    { label: t("direct.phone"), value: site.phone, href: site.phoneHref },
    { label: t("direct.email"), value: site.email, href: `mailto:${site.email}` },
    { label: t("direct.hours"), value: t("direct.hoursValue") },
  ];

  return (
    <section className="pt-16">
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { page: "home", name: nav("home") },
            { page: "contact", name: nav("contact") },
          ]),
          contactPageSchema(locale, meta("pages.contact.title")),
        ]}
      />
      <Container className="pb-24 pt-20 lg:pb-36 lg:pt-32">
        <SectionHeading
          as="h1"
          index="C"
          label={t("label")}
          size="lg"
          title={t.rich("title", {
            hl: (chunks) => <span className="text-signal">{chunks}</span>,
          })}
          text={t("text")}
        />

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.15}>
              <h2 className="label">
                <span className="text-signal">(→)</span> {t("direct.title")}
              </h2>
            </Reveal>
            <Stagger className="mt-6 border-t border-line" stagger={0.06}>
              {direct.map(({ label, value, href, external }) => {
                const inner = (
                  <>
                    <span className="label text-dim">{label}</span>
                    <span className="mt-1 flex items-center justify-between gap-4 break-all text-lg text-text">
                      {value}
                      {href && (
                        <ArrowUpRight className="size-4 shrink-0 text-dim transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover:rotate-45 group-hover:text-signal" />
                      )}
                    </span>
                  </>
                );
                const cls = "group flex flex-col border-b border-line py-5";
                return (
                  <StaggerItem key={label}>
                    {href ? (
                      <a
                        href={href}
                        className={cls}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
