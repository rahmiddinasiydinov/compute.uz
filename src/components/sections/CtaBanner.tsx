import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

export function CtaBanner() {
  const t = useTranslations("cta");

  return (
    <section className="py-24 lg:py-36">
      <Container>
        <div className="border-t border-line pt-6">
          <Reveal y={8}>
            <p className="label">
              <span className="text-signal">(→)</span> {t("tagline")}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SplitReveal as="h2" className="display-xl max-w-[11ch] text-text">
                {t("title")}
              </SplitReveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-muted">{t("text")}</p>
              </Reveal>
            </div>

            <Reveal delay={0.25} className="shrink-0">
              <Magnetic strength={0.25}>
                <Link
                  href="/contact"
                  className="group relative flex size-40 items-center justify-center overflow-hidden rounded-full bg-signal text-ink transition-transform duration-200 ease-[var(--ease-out)] active:scale-[0.97] lg:size-52"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-text transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-y-100" />
                  <span className="relative flex flex-col items-center gap-2 font-display text-lg font-semibold tracking-[-0.03em] lg:text-xl">
                    <ArrowUpRight
                      className="size-7 transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45"
                      strokeWidth={1.5}
                    />
                    {t("button")}
                  </span>
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
