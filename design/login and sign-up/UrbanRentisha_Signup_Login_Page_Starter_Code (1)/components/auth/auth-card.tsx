"use client";

import type { AuthMode } from "@/components/auth/auth-page";
import { AuthTabs } from "@/components/auth/auth-tabs";
import { DemoLoginPanel } from "@/components/auth/demo-login-panel";
import { Divider } from "@/components/auth/divider";
import { EmailAuthForm } from "@/components/auth/email-auth-form";
import { WalletLoginPanel } from "@/components/auth/wallet-login-panel";

type AuthCardProps = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export function AuthCard({ mode, onModeChange }: AuthCardProps) {
  return (
    <section
      className="mx-auto w-full max-w-[500px] rounded-ur-xl border border-white/10 bg-white/[0.045] p-5 shadow-soft-dark backdrop-blur-xl sm:p-6 lg:ml-auto"
      aria-labelledby="auth-title"
    >
      <div className="mb-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Secure access
        </p>
        <h1 id="auth-title" className="text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
          {mode === "login" ? "Welcome back." : "Create your account."}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/66">
          {mode === "login"
            ? "Sign in with demo access, email, or wallet to continue the trust flow."
            : "Start with email access or connect a wallet for Stellar-based verification later."}
        </p>
      </div>

      <AuthTabs mode={mode} onModeChange={onModeChange} />
      <DemoLoginPanel />
      <Divider label="or continue with email" />
      <EmailAuthForm mode={mode} />
      <Divider label="or use wallet access" />
      <WalletLoginPanel />

      <p className="mt-6 text-center text-xs leading-5 text-white/45">
        By continuing, you agree to the UrbanRentisha demo terms and privacy-first access rules.
      </p>
    </section>
  );
}
