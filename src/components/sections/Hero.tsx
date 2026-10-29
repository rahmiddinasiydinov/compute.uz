"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { LocalTime } from "@/components/layout/LocalTime";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Marquee } from "./Marquee";

export function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLElement>(null);

  // Headline drifts up and fades as the hero scrolls away
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-drift]", {
        yPercent: -18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col pt-16">
      <Container className="flex flex-1 flex-col">
        {/* Meta row */}
        <Reveal y={8} className="grid grid-cols-2 gap-4 border-b border-line py-4 sm:grid-cols-3">
          {/* Real page topic for search engines; the slogan below is display copy */}
          <h1 className="label">
            <span className="text-signal">(</span>
            {t("seoTitle")}
            <span className="text-signal">)</span>
          </h1>
          <p className="label hidden text-center sm:block">
            {t("location")} — <LocalTime />
          </p>
          <p className="label flex items-center justify-end gap-2 text-text">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative size-2 rounded-full bg-signal" />
            </span>
            {t("available")}
          </p>
        </Reveal>

        <div data-drift className="flex flex-1 items-center py-12 lg:py-16">
          <SplitReveal immediate delay={0.15} className="display-xl max-w-[13ch] text-text">
            {t.rich("title", {
              hl: (chunks) => <span className="text-signal">{chunks}</span>,
            })}
            <span
              aria-hidden="true"
              className="ml-[0.06em] inline-block h-[0.72em] w-[0.42em] translate-y-[0.04em] animate-blink bg-signal align-baseline"
            />
          </SplitReveal>
        </div>

        <div className="grid items-end gap-8 pb-10 sm:grid-cols-2 lg:grid-cols-12 lg:pb-12">
          <Reveal delay={0.6} className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">{t("text")}</p>
          </Reveal>
          <Reveal delay={0.7} className="flex flex-wrap items-center gap-3 lg:col-span-5">
            <Button href="/contact" size="lg" arrow magnetic>
              {t("primary")}
            </Button>
            <Button href="/services" size="lg" variant="outline">
              {t("secondary")}
            </Button>
          </Reveal>
          <Reveal delay={0.8} className="hidden justify-end lg:col-span-2 lg:flex">
            <span className="label flex items-center gap-2">
              {t("scroll")} <ArrowDown className="size-3.5 animate-bounce text-signal" />
            </span>
          </Reveal>
        </div>
      </Container>

      <Marquee />
    </section>
  );
}
