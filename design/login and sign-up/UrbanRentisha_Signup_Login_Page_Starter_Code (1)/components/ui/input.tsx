import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold tracking-[0.04em] text-white/78"
        >
          {label}
        </label>

        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary",
            error && "border-ur-error focus:border-ur-error",
            className
          )}
          {...props}
        />

        {error ? (
          <p className="text-xs font-medium text-ur-error">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-ur-subtle">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
