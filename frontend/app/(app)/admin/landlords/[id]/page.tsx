"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ApiError, api, type LandlordTeam, type LandlordTeamMember } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { RoleGuard } from "@/components/auth/role-guard";

interface LandlordOption {
  id: string;
  companyName: string | null;
  name: string;
  email: string;
}

export default function AdminLandlordTeamPage() {
  const { token } = useAuth();
  const params = useParams<{ id: string }>();
  const [team, setTeam] = useState<LandlordTeam | null>(null);
  const [landlordOptions, setLandlordOptions] = useState<LandlordOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  function load() {
    if (!token) return;
    api.admin.landlords
      .getTeam(token, params.id)
      .then(setTeam)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Could not load landlord team."));
  }

  useEffect(load, [token, params.id]);

  useEffect(() => {
    if (!token) return;
    api.admin.landlords.list(token).then(setLandlordOptions);
  }, [token]);

  async function handleChangeLandlord(member: LandlordTeamMember, landlordProfileId: string) {
    if (!token) return;
    setSavingId(member.id);
    setError(null);
    try {
      await api.admin.agents.setLandlord(token, member.profileType, member.id, landlordProfileId || null);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update landlord assignment.");
    } finally {
      setSavingId(null);
    }
  }

  if (error) {
    return (
      <div className="px-6 py-8">
        <p className="text-sm text-ur-error">{error}</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="px-6 py-8">
        <p className="text-sm text-ur-text-muted">Loading landlord team...</p>
      </div>
    );
  }

  const members: LandlordTeamMember[] = [...team.agents, ...team.managers];

  return (
    <RoleGuard allow={["ADMIN", "PLATFORM"]}>
      <div className="px-6 py-8">
        <Link href="/admin/verifications" className="text-sm font-semibold text-ur-primary hover:underline">
          ← Back to Verification Review
        </Link>

        <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-ur-navy">
          {team.companyName ?? team.user.name}&apos;s Team
        </h1>
        <p className="mt-1 text-sm text-ur-text-secondary">
          Manage which agents and property managers represent this landlord.
        </p>

        {error ? <p className="mt-4 text-sm text-ur-error">{error}</p> : null}

        <div className="mt-6 ur-card p-5">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-ur-card-soft text-lg font-bold text-ur-primary">
              {team.user.name.charAt(0)}
            </div>
            <div>
              <p className="text-base font-bold text-ur-navy">{team.user.name}</p>
              <p className="text-sm text-ur-text-secondary">{team.user.email}</p>
              <p className="text-sm text-ur-text-muted">Trust score: {team.trustScore} / 100</p>
            </div>
          </div>
        </div>

        <div className="mt-6 ur-card">
          <div className="border-b border-ur-border p-4">
            <p className="text-sm font-bold text-ur-navy">Agents &amp; Managers ({members.length})</p>
          </div>
          {members.length === 0 ? (
            <p className="p-6 text-sm text-ur-text-muted">No agents or managers are linked to this landlord yet.</p>
          ) : (
            <div className="divide-y divide-ur-border">
              {members.map((member) => (
                <div key={`${member.profileType}-${member.id}`} className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-ur-navy">{member.user.name}</p>
                      <span className="rounded-full border border-ur-border px-2 py-0.5 text-xs font-semibold text-ur-text-secondary">
                        {member.profileType === "agent" ? "Agent" : "Property Manager"}
                      </span>
                    </div>
                    <p className="text-xs text-ur-text-secondary">{member.user.email}</p>
                    <p className="text-xs text-ur-text-muted">
                      {member.listings.length} listing{member.listings.length === 1 ? "" : "s"} · trust {member.trustScore}/100
                    </p>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-ur-text-secondary">
                    Change Landlord
                    <select
                      defaultValue={team.id}
                      disabled={savingId === member.id}
                      onChange={(e) => handleChangeLandlord(member, e.target.value)}
                      className="rounded-ur-sm border border-ur-border bg-ur-input px-2.5 py-1.5 text-sm text-ur-text outline-none focus:border-ur-primary disabled:opacity-50"
                    >
                      <option value="">Unassigned</option>
                      {landlordOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.companyName ?? option.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 ur-card">
          <div className="border-b border-ur-border p-4">
            <p className="text-sm font-bold text-ur-navy">Listings</p>
          </div>
          <div className="divide-y divide-ur-border">
            {members.flatMap((member) => member.listings).length === 0 ? (
              <p className="p-6 text-sm text-ur-text-muted">No listings under this landlord yet.</p>
            ) : (
              members.flatMap((member) =>
                member.listings.map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/listings/${listing.id}`}
                    className="flex items-center justify-between gap-3 p-4 hover:bg-ur-card-soft"
                  >
                    <p className="text-sm font-bold text-ur-navy">{listing.title}</p>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        listing.verificationStatus === "VERIFIED"
                          ? "border-ur-primary/40 text-ur-primary"
                          : "border-ur-text-muted text-ur-text-muted"
                      }`}
                    >
                      {listing.verificationStatus}
                    </span>
                  </Link>
                )),
              )
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
