"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function PasswordInput({ label, id, name, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? name;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-xs font-semibold tracking-[0.04em] text-white/78"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          className={cn(
            "h-11 w-full rounded-ur-sm border border-white/12 bg-ur-input px-3 pr-11 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary",
            className
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-ur-sm text-white/45 transition-colors hover:bg-white/5 hover:text-white ur-focus"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
