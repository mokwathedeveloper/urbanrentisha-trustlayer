"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { LogoMark } from "@/components/landing/logo-mark";
import { ApiError, api } from "@/lib/api";

export default function ActivatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please upload a copy of your ID to confirm it's you.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await api.landlord.activate({ email, activationCode, newPassword }, file);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not activate this account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="ur-muted-grid flex min-h-screen items-center justify-center bg-ur-page px-4 py-12">
      <div className="w-full max-w-md">
        <div className="ur-card p-6 sm:p-8">
          <Link href="/" aria-label="UrbanRentisha home">
            <LogoMark />
          </Link>

          <h1 className="mt-5 text-2xl font-black tracking-[-0.03em] text-ur-navy">Activate Your Account</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">
            Your landlord shared an activation code with you after admin approval. Enter it below along with a
            copy of your ID to confirm it&apos;s really you, and set your own password.
          </p>

          {success ? (
            <div className="mt-6 rounded-ur border border-ur-primary/30 bg-ur-success-bg p-4 text-center">
              <Icon name="check_circle" size={28} className="mx-auto text-ur-primary" />
              <p className="mt-2 text-sm font-bold text-ur-primary">Account activated!</p>
              <p className="mt-1 text-xs text-ur-text-secondary">Redirecting you to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Activation Code"
                name="activationCode"
                placeholder="e.g. TAYX6P8F"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                required
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="Create a strong password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                required
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
              />

              <div>
                <label className="block text-xs font-semibold tracking-[0.04em] text-white/78">
                  Your ID Document
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  required
                  className="mt-2 block w-full text-sm text-ur-text-secondary"
                />
                <p className="mt-1 text-xs text-ur-text-muted">
                  This confirms you&apos;re a real, present person activating your own account.
                </p>
              </div>

              {error ? <p className="text-sm text-ur-error">{error}</p> : null}

              <Button type="submit" className="w-full" size="lg" loading={submitting}>
                {submitting ? "Activating..." : "Activate Account"}
                {!submitting ? <Icon name="arrow_forward" size={16} /> : null}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-ur-text-secondary">
            Already activated?{" "}
            <Link href="/login" className="font-semibold text-ur-mint">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
