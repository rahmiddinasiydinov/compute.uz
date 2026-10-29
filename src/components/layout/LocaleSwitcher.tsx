"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
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
      className={cn("flex items-center font-mono text-[11px] uppercase tracking-[0.14em]", className)}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l, i) => {
        const active = l === locale;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="px-1.5 text-dim">/</span>}
            <button
              type="button"
              onClick={() => change(l)}
              className={cn(
                "py-1 transition-colors duration-200",
                active ? "text-signal" : "text-muted hover:text-text",
              )}
              aria-pressed={active}
            >
              {l}
            </button>
          </span>
        );
      })}
    </div>
  );
}
