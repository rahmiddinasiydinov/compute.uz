import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";

const items = ["fast", "secure", "support", "pricing"] as const;

export function WhyUs() {
  const t = useTranslations("why");

  return (
    <section className="bg-bg-2 py-24 lg:py-36">
      <Container>
        <div className="grid gap-6 border-t border-line pt-6 lg:grid-cols-12 lg:gap-8">
          <Reveal y={8} className="lg:col-span-3">
            <p className="label">
              <span className="text-signal">(03)</span> {t("label")}
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <h2 className="display-md text-signal">{t("title")}</h2>
            <ScrubText className="mt-8 font-display text-[28px] font-medium leading-[1.15] tracking-[-0.035em] text-text sm:text-4xl lg:text-[52px]">
              {t("text")}
            </ScrubText>
            <Reveal className="mt-10">
              <Button href="/about" variant="outline" size="lg" arrow>
                {t("cta")}
              </Button>
            </Reveal>
          </div>
        </div>

        <Stagger className="mt-20 grid border-t border-line sm:grid-cols-2 lg:mt-28 lg:grid-cols-4" stagger={0.08}>
          {items.map((key, i) => (
            <StaggerItem
              key={key}
              className="border-b border-line py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:first:pl-0"
            >
              <span className="font-mono text-xs text-signal">0{i + 1}</span>
              <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-0.04em] text-text lg:mt-16">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-muted">
                {t(`items.${key}.text`)}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
