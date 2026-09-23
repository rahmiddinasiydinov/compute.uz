import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
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
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(90deg,#4fe9ff_0%,#22cdf5_100%)] text-[#03111f] shadow-[0_10px_30px_-10px_rgba(46,224,255,0.8)] hover:shadow-[0_14px_40px_-10px_rgba(46,224,255,0.95)] hover:brightness-110",
  outline:
    "border border-line-strong bg-white/[0.02] text-cyan-soft hover:bg-cyan/10 hover:border-cyan/50",
  ghost: "text-text hover:text-cyan px-0!",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

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
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
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
