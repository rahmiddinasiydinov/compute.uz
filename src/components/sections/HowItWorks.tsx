"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = ["contact", "work", "results"] as const;

/**
 * Three columns, each topped by a progress bar. The bars fill one after
 * another as the section scrolls through the viewport (scrubbed), and the
 * big outlined numeral of a step turns solid once its bar is full.
 */
export function HowItWorks() {
  const t = useTranslations("how");
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]");
      const nums = gsap.utils.toArray<HTMLElement>("[data-num]");

      if (prefersReducedMotion()) {
        gsap.set(bars, { scaleX: 1 });
        gsap.set(nums, { color: "var(--color-signal)" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
      });
      bars.forEach((bar, i) => {
        tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, i).to(
          nums[i],
          { color: "var(--color-signal)", duration: 0.2, ease: "none" },
          i + 0.8,
        );
      });
    },
    { scope: ref },
  );

  return (
    <section className="py-24 lg:py-36">
      <Container>
        <SectionHeading index="03" label={t("label")} title={t("title")} text={t("text")} />

        <div ref={ref} className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-6 lg:mt-24 lg:gap-8">
          {steps.map((key, i) => (
            <div key={key}>
              <div className="h-px bg-line">
                <div data-bar className="h-full origin-left scale-x-0 bg-signal" />
              </div>
              <span
                data-num
                className="mt-6 block font-display text-[120px] font-semibold leading-[0.85] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)] lg:text-[180px]"
              >
                0{i + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.04em] text-text">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-muted">
                {t(`steps.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
