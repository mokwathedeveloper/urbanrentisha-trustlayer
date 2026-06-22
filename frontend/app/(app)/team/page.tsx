"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { useAuth } from "@/lib/auth";
import { ApiError, api, type LandlordTeamSummary } from "@/lib/api";
import { RoleGuard } from "@/components/auth/role-guard";

export default function TeamPage() {
  const { token } = useAuth();
  const [team, setTeam] = useState<LandlordTeamSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"AGENT" | "MANAGER">("AGENT");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invited, setInvited] = useState<{ email: string; temporaryPassword: string } | null>(null);

  function load() {
    if (!token) return;
    api.landlord
      .getTeam(token)
      .then(setTeam)
      .finally(() => setLoading(false));
  }

  useEffect(load, [token]);

  async function handleInvite(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setError(null);
    setInvited(null);
    try {
      const result = await api.landlord.inviteAgent(token, { email, name, role });
      setInvited({ email: result.user.email, temporaryPassword: result.temporaryPassword });
      setName("");
      setEmail("");
      setLoading(true);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not invite this person.");
    } finally {
      setSubmitting(false);
    }
  }

  const members = team ? [...team.agents, ...team.managers] : [];

  return (
    <RoleGuard allow={["LANDLORD"]}>
      <div className="px-6 py-8">
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">My Team</h1>
        <p className="mt-1 text-sm text-ur-text-secondary">
          Invite agents and property managers to represent your listings.
        </p>

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
                {members.map((member) => (
                  <div key={`${member.profileType}-${member.id}`} className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-ur-navy">{member.user.name}</p>
                        <span className="rounded-full border border-ur-border px-2 py-0.5 text-xs font-semibold text-ur-text-secondary">
                          {member.profileType === "agent" ? "Agent" : "Property Manager"}
                        </span>
                      </div>
                      <p className="text-xs text-ur-text-secondary">{member.user.email}</p>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        member.verificationStatus === "verified"
                          ? "border-ur-primary/40 text-ur-primary"
                          : "border-ur-warning/40 text-ur-warning"
                      }`}
                    >
                      {member.verificationStatus === "verified" ? "Verified" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Invite Agent or Manager</h2>
            <p className="mt-1 text-sm text-ur-text-secondary">
              They&apos;ll get a temporary password to log in and set their own password.
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

              {error ? <p className="text-sm text-ur-error">{error}</p> : null}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Inviting..." : "Send Invite"}
                <Icon name="person_add" size={16} />
              </Button>
            </form>

            {invited ? (
              <div className="mt-4 rounded-ur border border-ur-warning/30 bg-ur-warning-bg p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-ur-warning">
                  <Icon name="warning" size={16} />
                  Copy this now — it won&apos;t be shown again
                </p>
                <p className="mt-2 text-xs text-ur-text-secondary">{invited.email}</p>
                <p className="mt-1 break-all rounded-ur-sm bg-ur-card px-3 py-2 font-mono text-sm text-ur-navy">
                  {invited.temporaryPassword}
                </p>
                <p className="mt-2 text-xs text-ur-text-secondary">
                  Share this password with them directly (e.g. via WhatsApp or in person). They&apos;ll be asked
                  to set a new password the first time they log in.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
