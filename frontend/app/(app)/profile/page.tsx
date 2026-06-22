"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ApiError, api, type UserProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { VerificationProgress } from "@/components/verification/verification-progress";
import { checkWalletStatus, connectWallet, shortenKey, FREIGHTER_INSTALL_URL } from "@/lib/freighter";

const STELLAR_ADDRESS_RE = /^G[A-Z2-7]{55}$/;

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

  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [generatedSecret, setGeneratedSecret] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [walletInput, setWalletInput] = useState("");

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

  async function handleGenerateWallet() {
    if (!token) return;
    setWalletLoading(true);
    setWalletError(null);
    try {
      const wallet = await api.users.generateWallet(token);
      setProfile((prev) => (prev ? { ...prev, walletAddress: wallet.publicKey } : prev));
      setGeneratedSecret(wallet.secretKey);
      setShowSecret(false);
    } catch (err) {
      setWalletError(err instanceof ApiError ? err.message : "Could not generate a wallet.");
    } finally {
      setWalletLoading(false);
    }
  }

  async function handleConnectFreighter() {
    if (!token) return;
    setWalletLoading(true);
    setWalletError(null);
    try {
      const status = await checkWalletStatus();
      if (!status.isInstalled) {
        setWalletError("Freighter is not installed. Install it from freighter.app first.");
        return;
      }
      const { publicKey } = await connectWallet();
      const updated = await api.users.updateProfile(token, { walletAddress: publicKey });
      setProfile(updated);
      setShowManualEntry(false);
    } catch (err) {
      setWalletError(err instanceof Error ? err.message : "Could not connect Freighter.");
    } finally {
      setWalletLoading(false);
    }
  }

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
    const trimmedWallet = walletInput.trim();
    if (trimmedWallet && !STELLAR_ADDRESS_RE.test(trimmedWallet)) {
      setError("Invalid Stellar address. Must start with G and be 56 characters.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const updated = await api.users.updateProfile(token, {
        name,
        phone: phone || undefined,
        walletAddress: trimmedWallet || undefined,
      });
      setProfile(updated);
      setSuccess(true);
      if (trimmedWallet) {
        setWalletInput("");
        setShowManualEntry(false);
      }
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

          <div className="space-y-2 border-t border-ur-border pt-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-[0.04em] text-ur-text-secondary">Stellar Wallet</p>
              {profile.walletAddress ? (
                <a
                  href={`https://stellar.expert/explorer/testnet/account/${profile.walletAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-ur-mint hover:underline"
                >
                  Explorer
                  <Icon name="open_in_new" size={12} />
                </a>
              ) : null}
            </div>

            {profile.walletAddress && !showManualEntry ? (
              <div className="flex items-center gap-2 rounded-ur-sm border border-ur-primary/30 bg-ur-success-bg px-3 py-2.5">
                <Icon name="check_circle" size={16} className="shrink-0 text-ur-primary" />
                <span className="flex-1 truncate font-mono text-xs text-ur-primary">
                  {shortenKey(profile.walletAddress)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (profile.walletAddress) {
                      navigator.clipboard.writeText(profile.walletAddress);
                    }
                  }}
                  className="shrink-0 text-ur-primary hover:text-ur-primary-hover"
                  aria-label="Copy wallet address"
                >
                  <Icon name="content_copy" size={14} />
                </button>
              </div>
            ) : !showManualEntry ? (
              <div className="space-y-2.5 rounded-ur-sm border border-ur-warning/30 bg-ur-warning-bg p-3">
                <p className="text-xs text-ur-warning">No Stellar wallet linked yet.</p>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" disabled={walletLoading} onClick={handleGenerateWallet}>
                    <Icon name="verified_user" size={14} />
                    Generate Wallet
                  </Button>
                  <Button type="button" variant="outline" size="sm" disabled={walletLoading} onClick={handleConnectFreighter}>
                    <Icon name="link" size={14} />
                    Connect Freighter
                  </Button>
                </div>
              </div>
            ) : null}

            {profile.walletAddress && !showManualEntry ? (
              <button
                type="button"
                onClick={() => setShowManualEntry(true)}
                className="text-xs text-ur-text-muted hover:text-ur-text-secondary"
              >
                Replace with a different address
              </button>
            ) : null}

            {showManualEntry ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="G... (56-character Stellar public key)"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  className="w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2.5 font-mono text-sm text-ur-text outline-none focus:border-ur-primary"
                />
                {walletInput && !STELLAR_ADDRESS_RE.test(walletInput) ? (
                  <p className="text-xs text-ur-error">Must start with G and be 56 characters (A-Z and 2-7 only).</p>
                ) : null}
                <p className="text-xs text-ur-text-muted">Will be saved when you click Save Changes below.</p>
                <button
                  type="button"
                  onClick={() => {
                    setShowManualEntry(false);
                    setWalletInput("");
                  }}
                  className="text-xs text-ur-text-muted hover:text-ur-text-secondary"
                >
                  Cancel
                </button>
              </div>
            ) : null}

            {walletError ? <p className="text-xs text-ur-error">{walletError}</p> : null}
            {!profile.walletAddress ? (
              <p className="text-xs text-ur-text-muted">
                Don&apos;t have Freighter?{" "}
                <a href={FREIGHTER_INSTALL_URL} target="_blank" rel="noreferrer" className="text-ur-mint hover:underline">
                  Install it free
                </a>
              </p>
            ) : null}
          </div>

          {generatedSecret ? (
            <div className="rounded-ur border border-ur-error/30 bg-ur-error-bg p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ur-error">
                <Icon name="warning" size={16} />
                Save your secret key — shown once only
              </p>
              <p className="mt-2 text-xs text-ur-error">
                This key gives full control of your Stellar wallet. Write it down or import it into Freighter.
                It will <strong>never</strong> be shown again.
              </p>
              <div className="mt-3 flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card-soft px-3 py-2.5">
                <span className="flex-1 select-all break-all font-mono text-xs text-ur-text">
                  {showSecret ? generatedSecret : `S${"•".repeat(55)}`}
                </span>
                <button
                  type="button"
                  onClick={() => setShowSecret((s) => !s)}
                  className="shrink-0 text-xs font-medium text-ur-text-muted hover:text-ur-text-secondary"
                >
                  {showSecret ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(generatedSecret)}
                  className="shrink-0 text-ur-text-muted hover:text-ur-text-secondary"
                  aria-label="Copy secret key"
                >
                  <Icon name="content_copy" size={14} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => setGeneratedSecret(null)}
                className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-ur-primary hover:text-ur-primary-hover"
              >
                <Icon name="check_circle" size={16} />
                I&apos;ve saved my secret key
              </button>
            </div>
          ) : null}

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
