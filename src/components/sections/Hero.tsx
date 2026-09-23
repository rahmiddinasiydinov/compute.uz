"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { HeroScene } from "./HeroScene";

export function Hero() {
  const t = useTranslations("hero");
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = copy.current;
      if (!root) return;
      const badge = root.querySelector<HTMLElement>("[data-badge]")!;
      const title = root.querySelector<HTMLElement>("h1")!;
      const text = root.querySelector<HTMLElement>("[data-text]")!;
      const actions = root.querySelector<HTMLElement>("[data-actions]")!;

      if (prefersReducedMotion()) {
        gsap.set([badge, title, text, actions], { autoAlpha: 1 });
        return;
      }

      // Split after fonts load so line breaks are final
      let split: SplitText | undefined;
      const run = () => {
        split = SplitText.create(title, { type: "words", wordsClass: "inline-block" });
        gsap.set([badge, title, text, actions], { autoAlpha: 1 });

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(badge, { y: 16, autoAlpha: 0, duration: 0.8 }, 0.1)
          .from(
            split.words,
            { yPercent: 80, autoAlpha: 0, rotateX: -40, duration: 1.1, stagger: 0.045 },
            0.2,
          )
          .from(text, { y: 24, autoAlpha: 0, duration: 0.9 }, 0.75)
          .from(actions.children, { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.95);
      };

      if (document.fonts?.status === "loaded") run();
      else document.fonts?.ready.then(run);

      return () => split?.revert();
    },
    { scope: copy },
  );

  return (
    <section className="relative overflow-hidden pt-[76px]">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      {/* Corner glows */}
      <div className="pointer-events-none absolute -left-40 top-20 size-[520px] rounded-full bg-brand/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-10 size-[480px] rounded-full bg-cyan/10 blur-[140px]" />

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-24">
        <div ref={copy} className="max-w-xl [perspective:800px]">
          <span
            data-badge
            className="gsap-hidden inline-flex items-center gap-2 rounded-full border border-line-strong bg-cyan/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan"
          >
            {t("badge")}
          </span>

          <h1 className="gsap-hidden mt-6 text-[42px] font-bold leading-[1.05] text-white sm:text-6xl lg:text-[64px]">
            {t.rich("title", {
              hl: (chunks) => <span className="text-cyan">{chunks}</span>,
            })}
          </h1>

          <p data-text className="gsap-hidden mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {t("text")}
          </p>

          <div data-actions className="gsap-hidden mt-9 flex flex-wrap items-center gap-6">
            <Button href="/contact" size="lg" icon={<Send />} magnetic>
              {t("primary")}
            </Button>
            <Button href="/services" variant="ghost" arrow>
              {t("secondary")}
            </Button>
          </div>
        </div>

        <HeroScene />
      </Container>
    </section>
  );
}
