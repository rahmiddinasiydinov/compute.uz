import { useTranslations } from "next-intl";
import { Headset, Shield, Star, Zap, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const items: { key: "fast" | "secure" | "support" | "pricing"; Icon: LucideIcon }[] = [
  { key: "fast", Icon: Zap },
  { key: "secure", Icon: Shield },
  { key: "support", Icon: Headset },
  { key: "pricing", Icon: Star },
];

export function WhyUs() {
  const t = useTranslations("why");

  return (
    <section className="relative border-y border-line bg-bg-2 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(46,224,255,0.5),transparent)]" />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading label={t("label")} title={t("title")} text={t("text")} />
          <Reveal delay={0.2} className="mt-8">
            <Button href="/about" variant="outline" arrow>
              {t("cta")}
            </Button>
          </Reveal>
        </div>

        <Stagger className="grid gap-x-8 gap-y-10 sm:grid-cols-2" stagger={0.12}>
          {items.map(({ key, Icon }) => (
            <StaggerItem key={key} className="flex gap-4">
              <span className="ring-tile shrink-0">
                <Icon className="size-5" strokeWidth={1.7} />
              </span>
              <div>
                <h3 className="font-semibold text-white">{t(`items.${key}.title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t(`items.${key}.text`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
