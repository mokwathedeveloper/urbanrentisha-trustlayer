import * as React from "react";
import { cn } from "@/lib/utils";
import { ButtonSpinner } from "@/components/ui/spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "warning";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Optional - existing call sites that don't pass this are unaffected.
   * When true: forces disabled (so a pending request can never be
   * double-submitted even if the caller forgets its own disabled={...}),
   * and shows a spinner ahead of the button's existing children. Callers
   * keep their own text ("Processing..." etc.) - this only adds the
   * spinner, it doesn't replace any copy.
   */
  loading?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  // bg-ur-primary-hover (not bg-ur-primary) at rest: white button-label text
  // on the brand's lighter green (#16A34A) measures 3.3:1, below WCAG AA's
  // 4.5:1 for normal text. The darker hover/active shades (already part of
  // the palette) pass at 5:1+ and read as the same green family - ur-primary
  // itself stays untouched everywhere else (badges, links, icons, borders).
  primary: "border border-ur-primary-hover bg-ur-primary-hover text-white hover:bg-ur-primary-active active:bg-ur-primary-active",
  secondary: "border border-ur-border-strong bg-ur-card text-ur-text hover:bg-ur-card-hover",
  ghost: "border border-transparent bg-transparent text-ur-muted hover:bg-white/5 hover:text-white",
  outline: "border border-white/14 bg-transparent text-white hover:border-ur-primary/60 hover:bg-white/5",
  danger: "border border-ur-error/50 bg-ur-error-bg text-ur-error hover:bg-ur-error/15",
  warning: "border border-ur-warning/30 bg-ur-warning-bg text-ur-warning hover:bg-ur-warning/15"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-8 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-ur-sm font-bold transition-colors duration-150 ur-focus disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? <ButtonSpinner /> : null}
      {children}
    </button>
  );
}
