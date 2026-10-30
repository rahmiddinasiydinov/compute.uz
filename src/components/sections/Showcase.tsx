import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { showcaseProjects } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/** One project: screenshot on the left, details on the right. Whole card links out. */
function Project({
  num,
  href,
  image,
  stack,
  title,
  category,
  text,
  visit,
}: {
  num: string;
  href: string;
  image: string;
  stack: readonly string[];
  title: string;
  category: string;
  text: string;
  visit: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid gap-8 border-b border-line py-10 lg:grid-cols-12 lg:gap-8 lg:py-14"
    >
      <div className="relative overflow-hidden border border-line bg-surface lg:col-span-7">
        <Image
          src={image}
          alt={title}
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col lg:col-span-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-xs text-signal">{num}</span>
          <span className="label">{category}</span>
        </div>
        <h3 className="mt-6 font-display text-4xl font-semibold leading-[1] tracking-[-0.045em] text-text lg:mt-10 lg:text-6xl">
          {title}
        </h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">{text}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {stack.map((s) => (
            <li
              key={s}
              className="border border-line-strong px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
            >
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text transition-colors duration-200 group-hover:text-signal lg:mt-auto">
          {visit}
          <ArrowUpRight
            className="size-4 transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </a>
  );
}

/** All showcase projects; shared by the home section and the /showcase page. */
export function ShowcaseList({ className }: { className?: string }) {
  const t = useTranslations("showcase");

  return (
    <Stagger className={cn("border-t border-line", className)}>
      {showcaseProjects.map((p, i) => (
        <StaggerItem key={p.key}>
          <Project
            num={`00${i + 1}`}
            href={p.url}
            image={p.image}
            stack={p.stack}
            title={t(`items.${p.key}.title`)}
            category={t(`items.${p.key}.category`)}
            text={t(`items.${p.key}.text`)}
            visit={t("visit")}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function Showcase() {
  const t = useTranslations("showcase");

  return (
    <section id="showcase" className="py-24 lg:py-36">
      <Container>
        <SectionHeading
          index="02"
          label={t("label")}
          title={t.rich("title", {
            hl: (chunks) => <span className="text-signal">{chunks}</span>,
          })}
          text={t("text")}
        />

        <ShowcaseList className="mt-16 lg:mt-24" />

        <Reveal className="mt-10">
          <Button href="/showcase" variant="outline" size="lg" arrow>
            {t("all")}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
