import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Dot, Mark } from "@/components/brand/Mark";

type Props = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 26 }: Props) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5 text-text", className)}
      aria-label="compute.uz"
    >
      {/* Cursor blinks while hovered */}
      <Mark size={size} cursorClassName="group-hover:animate-blink" />
      <span className="font-display text-[19px] font-semibold tracking-[-0.04em]">
        compute
        <Dot />
        uz
      </span>
    </Link>
  );
}
