import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ur-primary text-ur-text-inverse hover:bg-ur-primary-hover border border-ur-primary",
  secondary:
    "bg-ur-secondary text-ur-text-inverse hover:bg-ur-primary border border-ur-secondary",
  ghost:
    "bg-transparent text-ur-text-primary hover:bg-ur-card-soft border border-transparent",
  outline:
    "bg-transparent text-ur-text-primary hover:bg-ur-card-soft border border-ur-border",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-8 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-ur-sm font-semibold transition-colors duration-150 ur-focus disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
