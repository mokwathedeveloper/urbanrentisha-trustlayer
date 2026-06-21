"use client";

import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { ApiError, api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const { token, user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setSaving(true);
    try {
      await api.users.changePassword(token, { currentPassword, newPassword });
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not change password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Settings</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">Manage your account security.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="ur-card space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-ur-primary" />
            <p className="text-sm font-bold text-ur-navy">Change Password</p>
          </div>

          <Input
            label="Current Password"
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            helperText="At least 8 characters."
            required
          />
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error ? <p className="text-sm text-ur-error">{error}</p> : null}
          {success ? <p className="text-sm text-ur-primary">Password changed successfully.</p> : null}

          <Button type="submit" disabled={saving}>
            {saving ? "Updating..." : "Update Password"}
          </Button>
        </form>

        <div className="ur-card p-5">
          <p className="text-sm font-bold text-ur-navy">Account</p>
          <p className="mt-2 text-sm text-ur-text-secondary">{user?.email}</p>
          <p className="mt-1 text-xs capitalize text-ur-text-muted">{user?.role.toLowerCase()} account</p>
        </div>
      </div>
    </div>
  );
}
