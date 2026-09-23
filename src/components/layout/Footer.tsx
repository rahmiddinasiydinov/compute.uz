import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { Container } from "./Container";
import { site } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-4 py-7 text-xs text-dim sm:flex-row">
        <p>{t("rights", { year })}</p>
        <nav className="flex items-center gap-6" aria-label="Footer">
          <a
            href={site.channel}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan"
          >
            <Send className="size-3.5" />
            {t("channel")}
          </a>
          <a href={site.phoneHref} className="transition-colors hover:text-cyan">
            {site.phone}
          </a>
          <span className="cursor-default transition-colors hover:text-muted">
            {t("privacy")}
          </span>
          <span className="cursor-default transition-colors hover:text-muted">
            {t("terms")}
          </span>
        </nav>
      </Container>
    </footer>
  );
}
