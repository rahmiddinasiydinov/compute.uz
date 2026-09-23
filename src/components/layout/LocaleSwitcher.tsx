"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const change = (next: Locale) => {
    if (next === locale) return;
    router.replace(
      // @ts-expect-error -- params are forwarded as-is for dynamic segments
      { pathname, params },
      { locale: next },
    );
  };

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-line bg-white/[0.02] p-1 text-[11px] font-semibold uppercase tracking-wider",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => change(l)}
            className={cn(
              "relative z-10 rounded-full px-2.5 py-1 transition-colors duration-300",
              active ? "text-[#03111f]" : "text-muted hover:text-white",
            )}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 -z-10 rounded-full bg-cyan"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
