"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoMark } from "@/components/landing/logo-mark";
import { AccessSidebar } from "@/components/auth/access-sidebar";
import { useAuth } from "@/lib/auth";
import { ApiError, type UserRole } from "@/lib/api";

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

            <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-ur-primary/30 bg-ur-success-bg px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-ur-primary">
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

            <div className="mt-6 flex gap-6 border-b border-ur-border text-sm font-semibold">
              <button
                type="button"
                onClick={() => setTab("signin")}
                className={`-mb-px border-b-2 pb-3 transition-colors ${
                  tab === "signin"
                    ? "border-ur-primary text-ur-primary"
                    : "border-transparent text-ur-text-secondary hover:text-ur-navy"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className={`-mb-px border-b-2 pb-3 transition-colors ${
                  tab === "signup"
                    ? "border-ur-primary text-ur-primary"
                    : "border-transparent text-ur-text-secondary hover:text-ur-navy"
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setTab("demo")}
                className={`-mb-px border-b-2 pb-3 transition-colors ${
                  tab === "demo"
                    ? "border-ur-primary text-ur-primary"
                    : "border-transparent text-ur-text-secondary hover:text-ur-navy"
                }`}
              >
                Demo Login
              </button>
            </div>

            {error ? (
              <p className="mt-4 rounded-ur border border-ur-error/30 bg-ur-error-bg px-3 py-2 text-sm text-ur-error">
                {error}
              </p>
            ) : null}

            {tab === "signin" ? (
              <form className="mt-6 space-y-4" onSubmit={handleSignIn}>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-ur-text-muted" />
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
                    <Lock className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-ur-text-muted" />
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
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                  <ArrowRight className="h-4 w-4" />
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
                  <User className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-ur-text-muted" />
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
                  <Mail className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-ur-text-muted" />
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
                    <Lock className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-ur-text-muted" />
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
                  <Lock className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-ur-text-muted" />
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
                      icon={User}
                      title="Individual"
                      description="Manage my properties"
                      selected={signupForm.role === "TENANT"}
                      onClick={() => setSignupForm((f) => ({ ...f, role: "TENANT" }))}
                    />
                    <RoleCard
                      icon={Building2}
                      title="Property Manager"
                      description="Manage properties for others"
                      selected={signupForm.role === "MANAGER"}
                      onClick={() => setSignupForm((f) => ({ ...f, role: "MANAGER" }))}
                    />
                  </div>
                </div>

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
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Divider />
                <WalletButton />
              </form>
            ) : null}

            {tab === "demo" ? (
              <div className="mt-6 space-y-4 text-center">
                <ShieldCheck className="mx-auto h-10 w-10 text-ur-primary" />
                <p className="text-sm text-ur-text-secondary">
                  Explore the full UrbanRentisha TrustLayer flow with a seeded demo tenant account &mdash;
                  no signup required.
                </p>
                <Button className="w-full" size="lg" onClick={handleTryDemo} disabled={submitting}>
                  {submitting ? "Logging in..." : "Try Demo"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : null}

            <p className="mt-6 flex items-center gap-2 text-xs text-ur-text-muted">
              <ShieldCheck className="h-4 w-4 text-ur-primary" />
              Your data is encrypted and never stored in the clear. Non-custodial. You stay in control.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-ur-text-muted">
            &copy; {new Date().getFullYear()} UrbanRentisha TrustLayer. All rights reserved.
          </p>
        </div>

        <AccessSidebar onTryDemo={handleTryDemo} />
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
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}

function PasswordCheck({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${ok ? "text-ur-primary" : "text-ur-text-muted"}`}>
      <Check className="h-3 w-3" />
      {label}
    </span>
  );
}

function RoleCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: typeof User;
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
      <Icon className={`h-5 w-5 ${selected ? "text-ur-primary" : "text-ur-text-muted"}`} />
      <p className="mt-2 text-sm font-bold text-ur-navy">{title}</p>
      <p className="text-xs text-ur-text-muted">{description}</p>
    </button>
  );
}
