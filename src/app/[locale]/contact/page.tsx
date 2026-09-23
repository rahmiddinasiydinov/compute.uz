import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Clock, Mail, Megaphone, Phone, Send } from "lucide-react";
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
    { Icon: Send, label: t("direct.telegram"), value: site.telegramHandle, href: site.telegram, external: true },
    { Icon: Megaphone, label: t("direct.channel"), value: site.channelHandle, href: site.channel, external: true },
    { Icon: Phone, label: t("direct.phone"), value: site.phone, href: site.phoneHref },
    { Icon: Mail, label: t("direct.email"), value: site.email, href: `mailto:${site.email}` },
    { Icon: Clock, label: t("direct.hours"), value: t("direct.hoursValue") },
  ];

  return (
    <section className="relative overflow-hidden pt-[76px]">
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { page: "home", name: nav("home") },
            { page: "contact", name: nav("contact") },
          ]),
          contactPageSchema(locale, meta("pages.contact.title")),
        ]}
      />
      <div className="pointer-events-none absolute -left-40 top-10 size-[480px] rounded-full bg-brand/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-[420px] rounded-full bg-cyan/10 blur-[140px]" />
      <Container className="py-16 lg:py-24">
        <SectionHeading
          as="h1"
          label={t("label")}
          title={t.rich("title", {
            hl: (chunks) => <span className="text-cyan">{chunks}</span>,
          })}
          text={t("text")}
          titleClassName="lg:text-[52px]"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>

          <div>
            <Reveal delay={0.15}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-dim">
                {t("direct.title")}
              </h2>
            </Reveal>
            <Stagger className="mt-5 grid gap-3" stagger={0.08}>
              {direct.map(({ Icon, label, value, href, external }) => {
                const inner = (
                  <>
                    <span className="ring-tile size-11 shrink-0">
                      <Icon className="size-[18px]" strokeWidth={1.7} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs text-dim">{label}</span>
                      <span className="font-medium text-white">{value}</span>
                    </span>
                  </>
                );
                const cls =
                  "glass flex items-center gap-4 rounded-2xl p-4 transition-[border-color,transform] duration-300 hover:border-line-strong hover:-translate-y-0.5";
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
