"use client";

import type { AuthMode } from "@/components/auth/auth-page";
import { cn } from "@/lib/utils";

type AuthTabsProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthTabs({ mode, onModeChange }: AuthTabsProps) {
  return (
    <div className="mb-5 grid grid-cols-2 rounded-ur-sm border border-white/10 bg-black/18 p-1">
      {(["login", "signup"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onModeChange(item)}
          className={cn(
            "h-10 rounded-[7px] text-sm font-bold transition-colors ur-focus",
            mode === item
              ? "bg-ur-primary text-white shadow-green-glow"
              : "text-white/58 hover:bg-white/5 hover:text-white"
          )}
          aria-pressed={mode === item}
        >
          {item === "login" ? "Login" : "Sign up"}
        </button>
      ))}
    </div>
  );
}
