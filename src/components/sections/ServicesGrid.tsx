import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { serviceKeys } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** One row of the index; a signal fill rises from the bottom on hover. */
function Row({
  href,
  num,
  title,
  text,
}: {
  href: string;
  num: string;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="group relative block border-b border-line">
      <span className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-y-100" />
      <div className="relative grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-7 lg:gap-x-8 transition-colors duration-200 group-hover:text-ink lg:items-center lg:py-9">
        <span className="col-span-2 font-mono text-xs text-dim transition-colors duration-200 group-hover:text-ink lg:col-span-3">
          {num}
        </span>
        <h3 className="col-span-9 font-display text-[28px] font-semibold leading-[1.05] tracking-[-0.045em] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-3 sm:text-4xl lg:col-span-5 lg:text-5xl">
          {title}
        </h3>
        <ArrowUpRight
          className="col-span-1 size-6 justify-self-end transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45 lg:order-last lg:mr-2 lg:size-8"
          strokeWidth={1.5}
        />
        <p className="col-span-9 col-start-3 max-w-sm text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-ink/75 lg:col-span-3 lg:col-start-auto">
          {text}
        </p>
      </div>
    </Link>
  );
}

export function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <section className="py-24 lg:py-36">
      <Container>
        <SectionHeading
          index="01"
          label={t("label")}
          title={t.rich("title", {
            hl: (chunks) => <span className="text-signal">{chunks}</span>,
          })}
          text={t("text")}
        />

        <Stagger className="mt-16 border-t border-line lg:mt-24">
          {serviceKeys.map((key, i) => (
            <StaggerItem key={key}>
              <Row
                href="/services"
                num={`00${i + 1}`}
                title={t(`items.${key}.title`)}
                text={t(`items.${key}.text`)}
              />
            </StaggerItem>
          ))}
          <StaggerItem>
            <Row
              href="/contact"
              num={`00${serviceKeys.length + 1}`}
              title={t("custom.title")}
              text={t("custom.text")}
            />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}
