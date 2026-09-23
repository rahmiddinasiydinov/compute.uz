"use client";

import { motion } from "motion/react";
import { useCallback, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  lift?: boolean;
};

/**
 * Glass card with a cyan spotlight that tracks the cursor (CSS vars set
 * on mousemove) and a subtle lift on hover.
 */
export function SpotlightCard({ children, className, lift = true }: Props) {
  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <motion.div
      onMouseMove={onMove}
      whileHover={lift ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "spotlight glass relative overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-500",
        "hover:border-line-strong hover:shadow-glow",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
