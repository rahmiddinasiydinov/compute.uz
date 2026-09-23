import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  label: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  /** Use "h1" for the main heading of a page (one per page). */
  as?: "h1" | "h2";
};

export function SectionHeading({
  label,
  title,
  text,
  align = "left",
  className,
  titleClassName,
  as: Heading = "h2",
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="section-label">
        <span className="size-1.5 rounded-full bg-cyan shadow-glow" />
        {label}
      </span>
      <Heading
        className={cn(
          "mt-4 text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[44px]",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {text && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {text}
        </p>
      )}
    </Reveal>
  );
}
