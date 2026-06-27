import { cn } from "@/lib/utils";

const sizeClasses = {
  xs: "h-3.5 w-3.5 border-[1.5px]",
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-[3px]",
} as const;

type SpinnerSize = keyof typeof sizeClasses;

/**
 * A single rotating ring - the one primitive every other loading indicator
 * in this file builds on. `motion-reduce:animate-none` (a Tailwind core
 * utility, no config needed) drops the spin for prefers-reduced-motion
 * users; the ring still reads as "busy" via opacity alone.
 */
export function Spinner({
  size = "md",
  className,
  "aria-label": ariaLabel = "Loading",
}: {
  size?: SpinnerSize;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent motion-reduce:animate-none motion-reduce:opacity-60",
        sizeClasses[size],
        className,
      )}
    />
  );
}

/** Spinner + label for inline use in card bodies, table cells, etc. */
export function InlineSpinner({
  label = "Loading...",
  size = "sm",
  className,
}: {
  label?: string;
  size?: SpinnerSize;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm text-ur-text-muted", className)}>
      <Spinner size={size} aria-label={label} />
      {label}
    </span>
  );
}

/**
 * Sized to sit inline with a button's text at every Button size variant
 * (sm/md/lg) without shifting the button's height - drop this in place of
 * the button's icon/label while a submit is pending.
 */
export function ButtonSpinner({ className }: { className?: string }) {
  return <Spinner size="sm" className={cn("text-current", className)} aria-label="" />;
}
