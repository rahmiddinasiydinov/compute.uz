import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Container } from "./Container";
import { LocalTime } from "./LocalTime";
import { BackToTop } from "./BackToTop";
import { Dot } from "@/components/brand/Mark";

const pages = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Signal-colored closing panel. On large screens it is sticky underneath
 * <main> (opaque, stacked above), so the page slides up to reveal it. The
 * wordmark is capped by viewport height so the panel always fits.
 */
export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const d = useTranslations("contact.direct");
  const year = new Date().getFullYear();

  const contacts = [
    { label: d("channel"), value: site.channelHandle, href: site.channel, external: true },
    { label: d("phone"), value: site.phone, href: site.phoneHref },
    { label: d("email"), value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <footer className="overflow-hidden bg-signal text-ink selection:bg-ink selection:text-signal reveal:sticky reveal:bottom-0 reveal:z-0">
      <Container className="pt-16 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="label text-ink/60">(→) {t("fastest")}</p>
            <a
              href={site.telegram}
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-[0.2em] font-display text-[clamp(2.75rem,6.4vw,6rem)] font-semibold leading-none tracking-[-0.055em]"
            >
              <span className="link-u pb-[0.06em]">{site.telegramHandle}</span>
              <ArrowUpRight
                className="size-[0.7em] shrink-0 transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45"
                strokeWidth={1.5}
              />
            </a>
          </div>

          <nav className="lg:col-span-2 lg:col-start-8" aria-label="Footer">
            <p className="label text-ink/60">{t("navTitle")}</p>
            <ul className="mt-5 space-y-1.5">
              {pages.map(({ href, key }) => (
                <li key={key}>
                  <Link href={href} className="link-u text-lg font-medium">
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label text-ink/60">{t("contactTitle")}</p>
            <ul className="mt-5 space-y-3">
              {contacts.map(({ label, value, href, external }) => (
                <li key={label} className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
                    {label}
                  </span>
                  <a
                    href={href}
                    className="link-u w-fit break-all text-lg font-medium"
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {value}
                  </a>
                </li>
              ))}
              <li className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
                  {t("timeTitle")} · {t("location")}
                </span>
                <LocalTime className="font-mono text-lg font-medium [&>span]:text-ink/55" />
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark bleeding off the bottom edge */}
      <div aria-hidden="true" className="mt-16 select-none overflow-hidden border-t border-ink/15 px-2 pt-6 lg:mt-24">
        <p className="-mb-[0.06em] whitespace-nowrap text-center font-display text-[min(19.4vw,36svh)] font-semibold leading-[0.8] tracking-[-0.07em]">
          compute
          <Dot className="bg-ink" />
          uz
        </p>
      </div>

      <div className="border-t border-ink/15">
        <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-ink/70">{t("rights", { year })}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="label text-ink/70">{t("privacy")}</span>
            <span className="label text-ink/70">{t("terms")}</span>
            <BackToTop label={t("top")} />
          </div>
        </Container>
      </div>
    </footer>
  );
}
