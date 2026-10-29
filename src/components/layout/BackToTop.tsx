"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/components/motion/SmoothScroll";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-transform duration-200 ease-[var(--ease-out)] active:scale-[0.97]"
    >
      {label}
      <ArrowUp className="size-3.5 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5" />
    </button>
  );
}
