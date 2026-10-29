import { Plus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

type Props = {
  index: string;
  label: string;
  title: string;
  items: { q: string; a: string }[];
};

/**
 * Native <details> accordion: answers stay in the HTML for crawlers and work
 * without JS. Open/close height animates where `::details-content` is supported.
 */
export function Faq({ index, label, title, items }: Props) {
  return (
    <section className="bg-bg-2 py-24 lg:py-36">
      <Container>
        <SectionHeading index={index} label={label} title={title} />
        <Stagger className="mt-16 border-t border-line lg:mt-24" stagger={0.06}>
          {items.map(({ q, a }, i) => (
            <StaggerItem key={q}>
              <details className="faq group border-b border-line">
                <summary className="grid cursor-pointer list-none grid-cols-12 items-baseline gap-x-4 py-7 lg:gap-x-8 lg:py-8 [&::-webkit-details-marker]:hidden">
                  <span className="col-span-2 font-mono text-xs text-signal lg:col-span-3">
                    0{i + 1}
                  </span>
                  <h3 className="col-span-9 font-display text-2xl font-semibold leading-[1.1] tracking-[-0.04em] text-text transition-colors duration-200 group-hover:text-signal lg:col-span-8 lg:text-3xl">
                    {q}
                  </h3>
                  <Plus
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="col-span-1 size-5 self-center justify-self-end text-text transition-transform duration-300 ease-[var(--ease-out)] group-open:rotate-45"
                  />
                </summary>
                <div className="grid grid-cols-12 gap-x-4 pb-8 lg:gap-x-8">
                  <p className="col-span-10 col-start-3 max-w-2xl text-base leading-relaxed text-muted lg:col-span-7 lg:col-start-4 lg:text-lg">
                    {a}
                  </p>
                </div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
