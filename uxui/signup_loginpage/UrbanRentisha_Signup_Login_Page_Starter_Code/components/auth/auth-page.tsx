"use client";

import { useState } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import { LogoMark } from "@/components/auth/logo-mark";

export type AuthMode = "login" | "signup";

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <main className="relative min-h-screen overflow-hidden bg-ur-bg text-ur-text">
      <div className="absolute inset-0 auth-grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute left-[-18%] top-[-12%] h-[520px] w-[520px] rounded-full bg-ur-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-18%] right-[-14%] h-[620px] w-[620px] rounded-full bg-ur-mint/10 blur-[130px]" />

      <div className="relative z-10">
        <header className="ur-container flex h-20 items-center justify-between">
          <LogoMark />

          <a
            href="/"
            className="hidden rounded-ur-sm border border-white/14 px-4 py-2 text-sm font-bold text-white/80 transition-colors hover:border-ur-primary/60 hover:bg-white/5 hover:text-white ur-focus sm:inline-flex"
          >
            Back to home
          </a>
        </header>

        <section className="ur-container grid min-h-[calc(100vh-80px)] items-center gap-8 pb-12 pt-4 lg:grid-cols-[1.02fr_0.98fr]">
          <AuthSidePanel />
          <AuthCard mode={mode} onModeChange={setMode} />
        </section>
      </div>
    </main>
  );
}
