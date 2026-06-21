"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoMark } from "@/components/landing/logo-mark";
import { AccessSidebar } from "@/components/auth/access-sidebar";
import { useAuth } from "@/lib/auth";
import { ApiError, type UserRole } from "@/lib/api";
import { Icon, type IconName } from "@/components/ui/icon";

type Tab = "signin" | "signup" | "demo";

const DEMO_EMAIL = "tenant1@urbanrentisha.local";
const DEMO_PASSWORD = "TenantPass123!";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [signinForm, setSigninForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "TENANT" as UserRole,
    landlordEmail: "",
  });

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(signinForm.email, signinForm.password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await register({
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
        role: signupForm.role,
        landlordEmail:
          signupForm.role === "AGENT" || signupForm.role === "MANAGER"
            ? signupForm.landlordEmail || undefined
            : undefined,
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Account creation failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleTryDemo() {
    setError(null);
    setSubmitting(true);
    try {
      await login(DEMO_EMAIL, DEMO_PASSWORD);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Demo login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  const passwordChecks = {
    length: signupForm.password.length >= 8,
    uppercase: /[A-Z]/.test(signupForm.password),
    number: /[0-9]/.test(signupForm.password),
  };

  return (
    <main className="ur-muted-grid min-h-screen bg-ur-page py-12">
      <div className="ur-container flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
        <div className="w-full max-w-md">
          <div className="ur-card p-6 sm:p-8">
            <Link href="/" aria-label="UrbanRentisha home">
              <LogoMark />
            </Link>

            <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-ur-primary/30 bg-ur-success-bg px-3 py-1 text-xs font-bold tracking-[0.02em] text-ur-primary">
              Blockchain-Powered. Privacy-First. Zero-Knowledge.
            </div>

            <h1 className="mt-5 text-2xl font-black tracking-[-0.03em] text-ur-navy">
              {tab === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-ur-text-secondary">
              {tab === "signup"
                ? "One account to manage your properties and rental operations."
                : "Access your rentals, agents, and on-chain intelligence."}
            </p>

            <div className="mt-6 flex gap-1 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setTab("signin")}
                className={`rounded-ur-sm px-4 py-2 transition-colors ${
                  tab === "signin"
                    ? "bg-ur-success-bg text-ur-primary"
                    : "text-ur-text-secondary hover:text-ur-navy"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={`rounded-ur-sm px-4 py-2 transition-colors ${
                  tab === "signup"
                    ? "bg-ur-success-bg text-ur-primary"
                    : "text-ur-text-secondary hover:text-ur-navy"
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setTab("demo")}
                className={`rounded-ur-sm px-4 py-2 transition-colors ${
                  tab === "demo"
                    ? "bg-ur-success-bg text-ur-primary"
                    : "text-ur-text-secondary hover:text-ur-navy"
                }`}
              >
                Demo Login
              </button>
            </div>
            <div className="mt-3 border-b border-ur-border" />

            {error ? (
              <p className="mt-4 rounded-ur border border-ur-error/30 bg-ur-error-bg px-3 py-2 text-sm text-ur-error">
                {error}
              </p>
            ) : null}

            {tab === "signin" ? (
              <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
                <div className="relative">
                  <Icon name="mail" size={16} className="pointer-events-none absolute left-3 top-9 text-ur-text-muted" />
                  <Input
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    value={signinForm.email}
                    onChange={(e) => setSigninForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <div className="relative">
                    <Icon name="lock" size={16} className="pointer-events-none absolute left-3 top-9 text-ur-text-muted" />
                    <Input
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-9 pr-9"
                      value={signinForm.password}
                      onChange={(e) => setSigninForm((f) => ({ ...f, password: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-9 text-ur-text-muted hover:text-ur-navy"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <Icon name="visibility_off" size={16} /> : <Icon name="visibility" size={16} />}
                    </button>
                  </div>
                  <div className="mt-1 text-right">
                    <a href="#" className="text-xs font-semibold text-ur-mint hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? "Signing in..." : "Sign In"}
                  <Icon name="arrow_forward" size={16} />
                </Button>

                <Divider />
                <WalletButton />

                <p className="text-center text-sm text-ur-text-secondary">
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => setTab("signup")} className="font-semibold text-ur-mint">
                    Create account
                  </button>
                </p>
              </form>
            ) : null}

            {tab === "signup" ? (
              <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
                <div className="relative">
                  <Icon name="person" size={16} className="pointer-events-none absolute left-3 top-9 text-ur-text-muted" />
                  <Input
                    label="Full name"
                    name="name"
                    placeholder="Enter your full name"
                    className="pl-9"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="relative">
                  <Icon name="mail" size={16} className="pointer-events-none absolute left-3 top-9 text-ur-text-muted" />
                  <Input
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <div className="relative">
                    <Icon name="lock" size={16} className="pointer-events-none absolute left-3 top-9 text-ur-text-muted" />
                    <Input
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pl-9"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm((f) => ({ ...f, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    <PasswordCheck ok={passwordChecks.length} label="At least 8 characters" />
                    <PasswordCheck ok={passwordChecks.uppercase} label="1 uppercase letter" />
                    <PasswordCheck ok={passwordChecks.number} label="1 number" />
                  </div>
                </div>
                <div className="relative">
                  <Icon name="lock" size={16} className="pointer-events-none absolute left-3 top-9 text-ur-text-muted" />
                  <Input
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-9"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.04em] text-white/78">I am a...</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <RoleCard
                      icon="person"
                      title="Tenant"
                      description="Search and view properties"
                      selected={signupForm.role === "TENANT"}
                      onClick={() => setSignupForm((f) => ({ ...f, role: "TENANT" }))}
                    />
                    <RoleCard
                      icon="apartment"
                      title="Landlord"
                      description="List my own properties"
                      selected={signupForm.role === "LANDLORD"}
                      onClick={() => setSignupForm((f) => ({ ...f, role: "LANDLORD" }))}
                    />
                    <RoleCard
                      icon="badge"
                      title="Agent"
                      description="Represent a landlord's property"
                      selected={signupForm.role === "AGENT"}
                      onClick={() => setSignupForm((f) => ({ ...f, role: "AGENT" }))}
                    />
                    <RoleCard
                      icon="groups"
                      title="Property Manager"
                      description="Manage properties for others"
                      selected={signupForm.role === "MANAGER"}
                      onClick={() => setSignupForm((f) => ({ ...f, role: "MANAGER" }))}
                    />
                  </div>
                </div>

                {signupForm.role === "AGENT" || signupForm.role === "MANAGER" ? (
                  <div className="relative">
                    <Icon name="mail" size={16} className="pointer-events-none absolute left-3 top-9 text-ur-text-muted" />
                    <Input
                      label="Landlord's email (optional)"
                      name="landlordEmail"
                      type="email"
                      placeholder="landlord@example.com"
                      className="pl-9"
                      value={signupForm.landlordEmail}
                      onChange={(e) => setSignupForm((f) => ({ ...f, landlordEmail: e.target.value }))}
                    />
                    <p className="mt-1 text-xs text-ur-text-muted">
                      If you already know the landlord or property you represent, enter their email so an
                      admin can confirm the connection during review. You can also add this later.
                    </p>
                  </div>
                ) : null}

                <label className="flex items-start gap-2 text-xs text-ur-text-secondary">
                  <input type="checkbox" required className="mt-0.5" />I agree to the{" "}
                  <a href="#" className="text-ur-mint">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-ur-mint">
                    Privacy Policy
                  </a>
                </label>

                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? "Creating account..." : "Create Account"}
                  <Icon name="arrow_forward" size={16} />
                </Button>

                <Divider />
                <WalletButton />
              </form>
            ) : null}

            {tab === "demo" ? (
              <div className="mt-6 space-y-4 text-center">
                <Icon name="verified_user" size={40} className="mx-auto text-ur-primary" />
                <p className="text-sm text-ur-text-secondary">
                  Explore the full UrbanRentisha TrustLayer flow with a seeded demo tenant account &mdash;
                  no signup required.
                </p>
                <Button className="w-full" size="lg" onClick={handleTryDemo} disabled={submitting}>
                  {submitting ? "Logging in..." : "Try Demo"}
                  <Icon name="arrow_forward" size={16} />
                </Button>
              </div>
            ) : null}

            <p className="mt-6 flex items-center gap-2 text-xs text-ur-text-muted">
              <Icon name="verified_user" size={16} className="text-ur-primary" />
              Your data is encrypted and never stored in the clear. Non-custodial. You stay in control.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-ur-text-muted">
            &copy; {new Date().getFullYear()} UrbanRentisha TrustLayer. All rights reserved.
          </p>
        </div>

        <AccessSidebar
          onTryDemo={handleTryDemo}
          onUseEmail={() => setTab("signin")}
          onConnectWallet={() => setTab("signin")}
        />
      </div>
    </main>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.1em] text-ur-text-muted">
      <span className="h-px flex-1 bg-ur-border" />
      Or continue with
      <span className="h-px flex-1 bg-ur-border" />
    </div>
  );
}

function WalletButton() {
  return (
    <Button type="button" variant="outline" className="w-full">
      <Icon name="account_balance_wallet" size={16} />
      Connect Wallet
    </Button>
  );
}

function PasswordCheck({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${ok ? "text-ur-primary" : "text-ur-text-muted"}`}>
      <Icon name="check" size={12} />
      {label}
    </span>
  );
}

function RoleCard({
  icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: IconName;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-ur border p-3 text-left transition-colors ${
        selected ? "border-ur-primary bg-ur-success-bg" : "border-ur-border bg-ur-card-soft"
      }`}
    >
      <Icon name={icon} size={20} className={`${selected ? "text-ur-primary" : "text-ur-text-muted"}`} />
      <p className="mt-2 text-sm font-bold text-ur-navy">{title}</p>
      <p className="text-xs text-ur-text-muted">{description}</p>
    </button>
  );
}
