import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/Magnetic";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = BaseProps & { href: string; external?: boolean };
type ButtonProps = BaseProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-ink hover:bg-text",
  outline: "border border-line-strong text-text hover:border-text",
  ghost: "px-0! text-text",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

/** Label rolls up on hover: a second copy slides in from below. */
function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function Button(props: LinkProps | ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    arrow,
    magnetic,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {icon && <span className="shrink-0 [&>svg]:size-4">{icon}</span>}
      <Roll>{children}</Roll>
      {arrow && (
        <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover:rotate-45" />
      )}
    </>
  );

  let node: ReactNode;

  if ("href" in rest && typeof rest.href === "string") {
    const { href, external, ...anchorRest } = rest as LinkProps;
    node = external ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        {...(anchorRest as object)}
      >
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} {...(anchorRest as object)}>
        {content}
      </Link>
    );
  } else {
    const buttonRest = rest as Omit<ButtonProps, keyof BaseProps>;
    node = (
      <button type="button" className={classes} {...buttonRest}>
        {content}
      </button>
    );
  }

  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}
