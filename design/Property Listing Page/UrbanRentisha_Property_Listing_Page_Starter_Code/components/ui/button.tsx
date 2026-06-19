import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "warning";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: "border border-ur-primary bg-ur-primary text-white hover:bg-ur-primary-hover",
  secondary: "border border-ur-border-strong bg-ur-card text-ur-text hover:bg-ur-card-hover",
  ghost: "border border-transparent bg-transparent text-ur-muted hover:bg-white/5 hover:text-white",
  outline: "border border-white/14 bg-transparent text-white hover:border-ur-primary/60 hover:bg-white/5",
  warning: "border border-ur-warning/30 bg-ur-warning-bg text-ur-warning hover:bg-ur-warning/15"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-[52px] px-8 text-base"
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-ur-sm font-bold transition-colors duration-150 ur-focus disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
