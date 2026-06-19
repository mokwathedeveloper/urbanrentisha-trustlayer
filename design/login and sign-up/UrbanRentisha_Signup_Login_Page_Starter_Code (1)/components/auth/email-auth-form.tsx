"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import type { AuthMode } from "@/components/auth/auth-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/password-input";
import { StatusNotice } from "@/components/auth/status-notice";

type EmailAuthFormProps = {
  mode: AuthMode;
};

export function EmailAuthForm({ mode }: EmailAuthFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" ? (
        <Input
          label="Full name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
        />
      ) : null}

      <Input
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        helperText={mode === "signup" ? "Use an email you can access during the demo." : undefined}
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder={mode === "signup" ? "Create a secure password" : "Enter your password"}
        autoComplete={mode === "signup" ? "new-password" : "current-password"}
      />

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-xs text-white/56">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-ur-input accent-ur-primary"
          />
          Remember this device
        </label>

        {mode === "login" ? (
          <a href="/forgot-password" className="text-xs font-bold text-ur-mint hover:text-white ur-focus rounded-ur-sm">
            Forgot password?
          </a>
        ) : null}
      </div>

      <Button type="submit" className="w-full" size="lg">
        <Mail className="h-4 w-4" />
        {mode === "login" ? "Login with email" : "Create account"}
      </Button>

      {status === "sent" ? (
        <StatusNotice
          tone="success"
          title={mode === "login" ? "Email login submitted" : "Signup submitted"}
          description="Connect this action to Supabase Auth or your NestJS auth endpoint."
        />
      ) : null}
    </form>
  );
}
