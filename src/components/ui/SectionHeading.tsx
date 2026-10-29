import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

type Props = {
  /** Section number shown as "(02)". */
  index?: string;
  label: string;
  title: ReactNode;
  text?: ReactNode;
  className?: string;
  titleClassName?: string;
  /** Use "h1" for the main heading of a page (one per page). */
  as?: "h1" | "h2";
  size?: "md" | "lg";
};

/**
 * Editorial section header: mono index + label in a narrow left column,
 * large title (and optional text) on the right. Hairline on top.
 */
export function SectionHeading({
  index,
  label,
  title,
  text,
  className,
  titleClassName,
  as = "h2",
  size = "md",
}: Props) {
  return (
    <div
      className={cn(
        "grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8",
        className,
      )}
    >
      <Reveal y={8} className="lg:col-span-3">
        <p className="label">
          {index && <span className="text-signal">({index})</span>} {label}
        </p>
      </Reveal>
      <div className="lg:col-span-9">
        <SplitReveal
          as={as}
          className={cn(
            size === "lg" ? "display-lg max-w-[14ch]" : "display-md max-w-[16ch]",
            "text-balance text-text",
            titleClassName,
          )}
        >
          {title}
        </SplitReveal>
        {text && (
          <Reveal delay={0.15} y={12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {text}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
