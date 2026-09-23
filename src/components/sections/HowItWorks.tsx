"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Check, MessageSquare, Settings, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps: { key: "contact" | "work" | "results"; Icon: LucideIcon }[] = [
  { key: "contact", Icon: MessageSquare },
  { key: "work", Icon: Settings },
  { key: "results", Icon: Check },
];

/**
 * Steps light up in order as the section scrolls into view; the line between
 * them fills like a progress bar tied to scroll position (scrubbed).
 */
export function HowItWorks() {
  const t = useTranslations("how");
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const line = root.querySelector<HTMLElement>("[data-line]")!;
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");
      const gear = root.querySelector<HTMLElement>("[data-gear]");

      if (prefersReducedMotion()) {
        gsap.set(items, { autoAlpha: 1 });
        gsap.set(line, { scaleX: 1 });
        return;
      }

      // Plays once when the section enters: step 1 lights up, the line
      // travels to step 2, step 2 lights up, and so on.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
      const STEP = 0.55;

      items.forEach((item, i) => {
        tl.fromTo(
          item,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          i * STEP,
        )
          .fromTo(
            dots[i],
            { scale: 0.6, boxShadow: "0 0 0 0 rgba(46,224,255,0)" },
            {
              scale: 1,
              boxShadow: "0 0 0 8px rgba(46,224,255,0.12), 0 0 30px rgba(46,224,255,0.5)",
              duration: 0.5,
              ease: "back.out(2)",
            },
            i * STEP + 0.15,
          );
        if (i < items.length - 1) {
          tl.to(
            line,
            { scaleX: (i + 1) / (items.length - 1), duration: STEP, ease: "power1.inOut" },
            i * STEP + 0.3,
          );
        }
      });

      // Gear spins forever once revealed, a small "we're working" cue
      if (gear) {
        gsap.to(gear, { rotate: 360, duration: 8, ease: "none", repeat: -1 });
      }
    },
    { scope: ref },
  );

  return (
    <section className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:items-center lg:gap-16">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          text={t("text")}
          titleClassName="lg:text-[34px]"
        />

        <div ref={ref} className="relative">
          {/* Track + fill line behind the dots (desktop) */}
          <div className="absolute left-[calc(16.66%)] right-[calc(16.66%)] top-[26px] hidden h-px bg-line sm:block">
            <div
              data-line
              className="h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#2ee0ff,#3d8bff)] shadow-glow"
            />
          </div>

          <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6">
            {steps.map(({ key, Icon }, i) => (
              <li key={key} data-step className="gsap-hidden relative flex flex-col items-start sm:items-center sm:text-center">
                <div className="flex items-center gap-3">
                  <span
                    data-dot
                    className="flex size-[52px] items-center justify-center rounded-full border border-line-strong bg-bg font-display text-lg font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <span className="ring-tile size-[52px]">
                    <Icon
                      className="size-5"
                      strokeWidth={1.7}
                      {...(key === "work" ? { "data-gear": "" } : {})}
                    />
                  </span>
                </div>
                <h3 className="mt-5 font-semibold text-white">{t(`steps.${key}.title`)}</h3>
                <p className="mt-1.5 max-w-[200px] text-sm leading-relaxed text-muted">
                  {t(`steps.${key}.text`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
