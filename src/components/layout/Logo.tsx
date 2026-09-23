import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  size?: number;
  tagline?: string;
};

export function Logo({ className, size = 36, tagline }: Props) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="compute.uz"
    >
      <span className="relative shrink-0" style={{ width: size, height: size }}>
        <span className="absolute inset-[18%] rounded-full bg-cyan/60 blur-md transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
        <Image
          src="/logo.png"
          alt=""
          width={size}
          height={size}
          className="relative h-full w-full object-contain"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] font-bold tracking-tight text-white">
          compute<span className="text-cyan">.uz</span>
        </span>
        {tagline && (
          <span className="mt-1 text-xs text-muted">{tagline}</span>
        )}
      </span>
    </Link>
  );
}
