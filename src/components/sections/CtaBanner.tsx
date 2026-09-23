import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBanner() {
  const t = useTranslations("cta");

  return (
    <section className="pb-20 pt-4 lg:pb-24">
      <Container>
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-8 sm:px-10">
            <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-cyan/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 size-64 rounded-full bg-brand/20 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1px_1fr_auto] lg:gap-10">
              <Logo size={48} tagline={t("tagline")} />
              <div className="hidden h-12 w-px bg-line lg:block" />
              <div>
                <h3 className="text-xl font-bold text-white">{t("title")}</h3>
                <p className="mt-1 text-sm text-muted">{t("text")}</p>
              </div>
              <Button href="/contact" size="lg" icon={<Send />} magnetic>
                {t("button")}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
