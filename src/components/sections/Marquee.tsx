import { useTranslations } from "next-intl";
import { serviceKeys } from "@/lib/site";

/** Signal-colored band with the service list scrolling forever. */
export function Marquee() {
  const t = useTranslations("services.items");
  const items = serviceKeys.map((key) => t(`${key}.title`));

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((label) => (
        <span key={label} className="flex items-center">
          <span className="px-6 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {label}
          </span>
          <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 0l2.6 8.2L22 4.6l-4.4 7.4L24 12l-6.4 2 4.4 7.4-7.4-3.6L12 24l-2.6-8.2L2 19.4 6.4 12 0 12l6.4-2L2 2.6l7.4 3.6z"
            />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden bg-signal py-4 text-ink">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
