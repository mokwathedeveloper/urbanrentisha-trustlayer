"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { useAuth } from "@/lib/auth";
import { ApiError, api, type LandlordTeamSummary, type LandlordTeamSummaryMember } from "@/lib/api";
import { RoleGuard, useHasRole } from "@/components/auth/role-guard";

const ALLOWED_ROLES = ["LANDLORD"] as const;

export default function TeamPage() {
  const { token } = useAuth();
  const allowed = useHasRole([...ALLOWED_ROLES]);
  const [team, setTeam] = useState<LandlordTeamSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"AGENT" | "MANAGER">("AGENT");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteMessage, setInviteMessage] = useState<string | null>(null);

  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<{
    email: string;
    code: string;
    expiresAt: string;
  } | null>(null);

  function load() {
    if (!token || !allowed) return;
    api.landlord
      .getTeam(token)
      .then(setTeam)
      .finally(() => setLoading(false));
  }

  useEffect(load, [token, allowed]);

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    if (!token || !file) return;
    setSubmitting(true);
    setError(null);
    setInviteMessage(null);
    try {
      const result = await api.landlord.inviteAgent(token, { name, email, role }, file);
      setInviteMessage(result.message);
      setName("");
      setEmail("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setLoading(true);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not submit this invite.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGenerateCode(member: LandlordTeamSummaryMember) {
    if (!token) return;
    setGeneratingId(member.id);
    setCodeError(null);
    setGeneratedCode(null);
    try {
      const result = await api.landlord.generateActivationCode(token, member.profileType, member.id);
      setGeneratedCode({ email: member.user.email, code: result.activationCode, expiresAt: result.expiresAt });
    } catch (err) {
      setCodeError(err instanceof ApiError ? err.message : "Could not generate an activation code.");
    } finally {
      setGeneratingId(null);
    }
  }

  const members = team ? [...team.agents, ...team.managers] : [];

  return (
    <RoleGuard allow={[...ALLOWED_ROLES]}>
      <div className="px-6 py-8">
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">My Team</h1>
        <p className="mt-1 text-sm text-ur-text-secondary">
          Invite agents and property managers to represent your listings. Each invite is reviewed by an
          admin before they can access the platform.
        </p>

        {codeError ? <p className="mt-4 text-sm text-ur-error">{codeError}</p> : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="ur-card">
            <div className="border-b border-ur-border p-4">
              <p className="text-sm font-bold text-ur-navy">Agents &amp; Managers ({members.length})</p>
            </div>
            {loading ? (
              <p className="p-6 text-sm text-ur-text-muted">Loading...</p>
            ) : members.length === 0 ? (
              <p className="p-6 text-sm text-ur-text-muted">
                You haven&apos;t invited any agents or managers yet.
              </p>
            ) : (
              <div className="divide-y divide-ur-border">
                {members.map((member) => {
                  const isVerified = member.verificationStatus === "VERIFIED";
                  const isActivated = Boolean(member.activatedAt);
                  return (
                    <div key={`${member.profileType}-${member.id}`} className="flex flex-wrap items-center justify-between gap-3 p-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-ur-navy">{member.user.name}</p>
                          <span className="rounded-full border border-ur-border px-2 py-0.5 text-xs font-semibold text-ur-text-secondary">
                            {member.profileType === "agent" ? "Agent" : "Property Manager"}
                          </span>
                        </div>
                        <p className="text-xs text-ur-text-secondary">{member.user.email}</p>
                        {member.attestationTxHash ? (
                          <p className="mt-1 flex items-center gap-1 text-xs text-ur-mint">
                            <Icon name="verified_user" size={12} />
                            Attested on Stellar testnet
                          </p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            isActivated
                              ? "border-ur-primary/40 text-ur-primary"
                              : isVerified
                                ? "border-ur-cyan/40 text-ur-cyan"
                                : "border-ur-warning/40 text-ur-warning"
                          }`}
                        >
                          {isActivated ? "Active" : isVerified ? "Approved" : "Pending Review"}
                        </span>
                        {isVerified && !isActivated ? (
                          <Button
                            size="sm"
                            disabled={generatingId === member.id}
                            onClick={() => handleGenerateCode(member)}
                          >
                            {generatingId === member.id ? "Generating..." : "Generate Activation Code"}
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Invite Agent or Manager</h2>
              <p className="mt-1 text-sm text-ur-text-secondary">
                Upload a copy of their ID. An admin reviews it before they can be activated.
              </p>

              <form onSubmit={handleInvite} className="mt-4 space-y-4">
                <Input label="Full Name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("AGENT")}
                    className={`rounded-ur-sm border px-3 py-2 text-sm font-semibold ${
                      role === "AGENT" ? "border-ur-primary bg-ur-success-bg text-ur-primary" : "border-ur-border text-ur-text-secondary"
                    }`}
                  >
                    Agent
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("MANAGER")}
                    className={`rounded-ur-sm border px-3 py-2 text-sm font-semibold ${
                      role === "MANAGER" ? "border-ur-primary bg-ur-success-bg text-ur-primary" : "border-ur-border text-ur-text-secondary"
                    }`}
                  >
                    Property Manager
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-[0.04em] text-white/78">ID Document</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    required
                    className="mt-2 block w-full text-sm text-ur-text-secondary"
                  />
                </div>

                {error ? <p className="text-sm text-ur-error">{error}</p> : null}
                {inviteMessage ? <p className="text-sm text-ur-primary">{inviteMessage}</p> : null}

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Invite"}
                  <Icon name="person_add" size={16} />
                </Button>
              </form>
            </div>

            {generatedCode ? (
              <div className="ur-card border border-ur-warning/30 bg-ur-warning-bg p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-ur-warning">
                  <Icon name="warning" size={16} />
                  Copy this now — it won&apos;t be shown again
                </p>
                <p className="mt-2 text-xs text-ur-text-secondary">{generatedCode.email}</p>
                <p className="mt-1 break-all rounded-ur-sm bg-ur-card px-3 py-2 font-mono text-sm text-ur-navy">
                  {generatedCode.code}
                </p>
                <p className="mt-2 text-xs text-ur-text-secondary">
                  Share this code with them directly (e.g. via WhatsApp or in person). They&apos;ll enter it at{" "}
                  <span className="font-semibold text-ur-navy">/activate</span> along with their own ID to set
                  their password. Expires{" "}
                  {new Date(generatedCode.expiresAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
