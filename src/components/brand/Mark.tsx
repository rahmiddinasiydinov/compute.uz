import { cn } from "@/lib/cn";

/** Chamfered-octagon "C" (48-unit grid, 10-unit stroke). */
export const C_PATH = "M34 4H16L4 16v16l12 12h18V34H20l-6-6v-8l6-6h14z";

type Props = {
  size?: number;
  className?: string;
  /** Classes for the cursor block, e.g. to make it blink. */
  cursorClassName?: string;
};

/**
 * The compute mark: a typed "C" followed by a block cursor. The C takes
 * currentColor; the cursor is always signal lime.
 */
export function Mark({ size = 28, className, cursorClassName }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path d={C_PATH} fill="currentColor" />
      <rect x="37" y="18" width="8" height="12" className={cn("fill-signal", cursorClassName)} />
    </svg>
  );
}

/** Square period used in the wordmark: "compute■uz". */
export function Dot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("mx-[0.05em] inline-block size-[0.19em] bg-signal align-baseline", className)}
    />
  );
}
