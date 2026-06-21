"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ApiError, api, type UserProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { VerificationProgress } from "@/components/verification/verification-progress";

export default function ProfilePage() {
  const { token, refreshUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) return;
    api.users
      .me(token)
      .then((data) => {
        setProfile(data);
        setName(data.name);
        setPhone(data.phone ?? "");
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleAvatarChange(file: File) {
    if (!token) return;
    setUploadingAvatar(true);
    try {
      await api.uploads.avatar(token, file);
      await refreshUser();
      const refreshed = await api.users.me(token);
      setProfile(refreshed);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not upload profile picture.");
    } finally {
      setUploadingAvatar(false);
    }
  }

  const verificationStage =
    profile?.landlordProfile?.verificationStage ??
    profile?.agentProfile?.verificationStage ??
    profile?.managerProfile?.verificationStage ??
    profile?.tenantProfile?.verificationStage;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const updated = await api.users.updateProfile(token, { name, phone: phone || undefined });
      setProfile(updated);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !profile) {
    return <p className="px-6 py-8 text-sm text-ur-text-muted">Loading profile...</p>;
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Profile</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">View and update your account details.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="ur-card space-y-4 p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-ur-card-soft text-xl font-bold text-ur-primary">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  profile.name.charAt(0)
                )}
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAvatarChange(file);
                }}
              />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border border-ur-border bg-ur-card text-ur-text-secondary hover:text-ur-primary"
                aria-label="Change profile picture"
              >
                <Icon name="add" size={12} />
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1.5 font-bold text-ur-navy">
                {profile.name}
                {profile.tenantProfile?.verifiedBadge ? (
                  <Icon name="verified" size={16} className="text-ur-primary" />
                ) : null}
              </p>
              <p className="text-xs capitalize text-ur-text-secondary">{profile.role.toLowerCase()}</p>
            </div>
          </div>

          <Input label="Full Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Phone Number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7XX XXX XXX" />
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-[0.04em] text-ur-text-secondary">Email Address</label>
            <div className="flex h-11 items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card-soft px-3 text-sm text-ur-text-muted">
              <Icon name="mail" size={16} />
              {profile.email}
              <span className="ml-auto text-xs">Cannot be changed</span>
            </div>
          </div>

          {error ? <p className="text-sm text-ur-error">{error}</p> : null}
          {success ? <p className="text-sm text-ur-primary">Profile updated successfully.</p> : null}

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>

        <div className="space-y-4">
          {verificationStage ? <VerificationProgress stage={verificationStage} /> : null}

          <div className="ur-card p-5">
            <p className="text-sm font-bold text-ur-navy">Account</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-ur-text-secondary">
                <Icon name="person" size={16} className="text-ur-primary" />
                Member since {formatDate(profile.createdAt)}
              </div>
              <div className="flex items-center gap-2 text-ur-text-secondary">
                <Icon name="verified_user" size={16} className="text-ur-primary" />
                Status: <span className="font-semibold text-ur-text">{profile.status}</span>
              </div>
              {profile.phone ? (
                <div className="flex items-center gap-2 text-ur-text-secondary">
                  <Icon name="call" size={16} className="text-ur-primary" />
                  {profile.phone}
                </div>
              ) : null}
            </div>
          </div>

          {profile.tenantProfile ? (
            <div className="ur-card p-5">
              <p className="text-sm font-bold text-ur-navy">Trust Score</p>
              <p className="mt-2 text-2xl font-black text-ur-primary">{profile.tenantProfile.trustScore} / 100</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-ur-text-secondary">
                <Icon
                  name="verified"
                  size={14}
                  className={profile.tenantProfile.verifiedBadge ? "text-ur-primary" : "text-ur-text-muted"}
                />
                {profile.tenantProfile.verifiedBadge ? "Verified Tenant" : "Not yet verified"}
              </p>
            </div>
          ) : null}

          {profile.landlordProfile ? (
            <div className="ur-card p-5">
              <p className="text-sm font-bold text-ur-navy">Landlord Profile</p>
              <p className="mt-2 text-sm text-ur-text-secondary">{profile.landlordProfile.companyName ?? "Individual landlord"}</p>
              <p className="mt-1 text-xs text-ur-text-muted">Trust score: {profile.landlordProfile.trustScore} / 100</p>
            </div>
          ) : null}

          {profile.agentProfile ? (
            <div className="ur-card p-5">
              <p className="text-sm font-bold text-ur-navy">Agent Profile</p>
              <p className="mt-2 text-sm text-ur-text-secondary">{profile.agentProfile.agencyName ?? "—"}</p>
              <p className="mt-1 text-xs text-ur-text-muted">License: {profile.agentProfile.licenseNumber ?? "—"}</p>
              <p className="mt-1 text-xs text-ur-text-muted">Status: {profile.agentProfile.verificationStatus}</p>
            </div>
          ) : null}

          {profile.managerProfile ? (
            <div className="ur-card p-5">
              <p className="text-sm font-bold text-ur-navy">Property Manager Profile</p>
              <p className="mt-2 text-sm text-ur-text-secondary">{profile.managerProfile.agencyName ?? "—"}</p>
              <p className="mt-1 text-xs text-ur-text-muted">License: {profile.managerProfile.licenseNumber ?? "—"}</p>
              <p className="mt-1 text-xs text-ur-text-muted">Status: {profile.managerProfile.verificationStatus}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
