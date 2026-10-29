"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean;
};

/**
 * Lines slide up from behind a mask, one after another. Split runs after
 * fonts load so line breaks match the final layout.
 */
export function SplitReveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      let split: SplitText | undefined;
      const run = () => {
        split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "pb-[0.08em] -mb-[0.08em]" });
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          delay,
          scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
        });
      };

      if (document.fonts?.status === "loaded") run();
      else document.fonts?.ready.then(run);

      return () => split?.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={cn("gsap-hidden", className)}>
      {children}
    </Tag>
  );
}
