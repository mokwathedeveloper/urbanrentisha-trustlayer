"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { useAuth } from "@/lib/auth";
import { ApiError, api } from "@/lib/api";

export default function ChangePasswordPage() {
  const { token, refreshUser } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await api.users.changePassword(token, { newPassword });
      await refreshUser();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not change password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="ur-muted-grid flex min-h-screen items-center justify-center bg-ur-page px-4 py-12">
      <div className="w-full max-w-md">
        <div className="ur-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-ur-primary">
            <Icon name="lock" size={24} />
            <h1 className="text-2xl font-black tracking-[-0.03em] text-ur-navy">Set a New Password</h1>
          </div>
          <p className="mt-2 text-sm text-ur-text-secondary">
            Your account was created with a temporary password. Choose a new password to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              required
            />

            {error ? <p className="text-sm text-ur-error">{error}</p> : null}

            <Button type="submit" className="w-full" size="lg" loading={submitting}>
              {submitting ? "Saving..." : "Set Password & Continue"}
              {!submitting ? <Icon name="arrow_forward" size={16} /> : null}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
