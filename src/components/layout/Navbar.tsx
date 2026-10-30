"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalTime } from "./LocalTime";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/showcase", key: "showcase" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

const EASE = [0.23, 1, 0.32, 1] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Lock page scroll while the menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color] duration-300",
          scrolled || open ? "border-line bg-bg/80 backdrop-blur-md" : "border-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {links.map(({ href, key }, i) => {
              const active = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "group flex items-baseline gap-1.5 text-sm transition-colors duration-200",
                    active ? "text-text" : "text-muted hover:text-text",
                  )}
                >
                  <span className={cn("font-mono text-[10px]", active ? "text-signal" : "text-dim")}>
                    0{i + 1}
                  </span>
                  <span className="link-u">{t(key)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <LocaleSwitcher />
            <Button href="/contact" size="md" className="h-9 px-4 text-[13px]">
              {t("cta")}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text md:hidden"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
          >
            <span className="relative block h-2.5 w-5">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ease-[var(--ease-out)]",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ease-[var(--ease-out)]",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
            {open ? t("close") : t("menu")}
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.25, ease: EASE } }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-16 bg-bg md:hidden"
            // Any link tapped inside the menu navigates away, so close it
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <Container className="flex h-full flex-col justify-between pb-8 pt-6">
              <nav className="flex flex-col" aria-label="Mobile">
                {links.map(({ href, key }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, transform: "translateY(24px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{ delay: 0.08 + 0.05 * i, duration: 0.5, ease: EASE }}
                    className="border-b border-line"
                  >
                    <Link
                      href={href}
                      className={cn(
                        "flex items-baseline gap-3 py-4 font-display text-[40px] font-semibold leading-none tracking-[-0.045em]",
                        pathname === href ? "text-signal" : "text-text",
                      )}
                    >
                      <span className="font-mono text-xs font-normal tracking-normal text-dim">0{i + 1}</span>
                      {t(key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="flex flex-col gap-6">
                <Button href="/contact" size="lg" arrow className="w-full">
                  {t("cta")}
                </Button>
                <div className="flex items-center justify-between">
                  <LocaleSwitcher />
                  <a href={site.phoneHref} className="label text-text">
                    {site.phone}
                  </a>
                </div>
                <LocalTime className="label" />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
