import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "verified" | "neutral" | "warning" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  verified:
    "bg-ur-success-bg text-ur-success border-ur-success/20",
  neutral:
    "bg-ur-card-soft text-ur-text-secondary border-ur-border",
  warning:
    "bg-ur-warning-bg text-ur-warning border-ur-warning/25",
  outline:
    "bg-transparent text-ur-text-primary border-ur-border",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
