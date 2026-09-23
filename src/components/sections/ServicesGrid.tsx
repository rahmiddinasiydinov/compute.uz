import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { serviceKeys, serviceIcons } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <section className="relative py-20 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            label={t("label")}
            title={t.rich("title", {
              hl: (chunks) => <span className="text-cyan">{chunks}</span>,
            })}
          />
          <Reveal delay={0.15} className="max-w-sm text-base leading-relaxed text-muted lg:pb-2">
            {t("text")}
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key];
            return (
              <StaggerItem key={key}>
                <Link href="/services" className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col p-6">
                    <span className="icon-tile">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold text-white">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {t(`items.${key}.text`)}
                    </p>
                    <span className="mt-auto flex justify-end pt-6 text-cyan">
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </SpotlightCard>
                </Link>
              </StaggerItem>
            );
          })}

          {/* Custom-request card */}
          <StaggerItem>
            <Link href="/contact" className="group block h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <div className="pointer-events-none absolute -bottom-10 -right-10 size-56 rounded-full bg-[radial-gradient(circle,rgba(46,224,255,0.45),rgba(27,92,255,0.25)_45%,transparent_70%)] blur-2xl" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(200deg,transparent_45%,rgba(46,224,255,0.25)_46%,rgba(27,92,255,0.15)_60%,transparent_61%)]" />
                <span className="relative flex size-9 items-center justify-center rounded-full border border-cyan/50 bg-cyan/10 text-cyan">
                  <ArrowUpRight className="size-4" />
                </span>
                <h3 className="relative mt-6 text-lg font-semibold text-white">
                  {t("custom.title")}
                </h3>
                <p className="relative mt-2 max-w-[220px] text-sm leading-relaxed text-muted">
                  {t("custom.text")}
                </p>
                <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-cyan">
                  {t("custom.cta")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </SpotlightCard>
            </Link>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
