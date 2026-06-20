"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileWarning,
  IdCard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Share2,
  UserCheck,
} from "lucide-react";
import { api, ApiError, type AgentProfile } from "@/lib/api";
import { useAuth } from "@/lib/auth";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const statusLabels: Record<string, string> = {
  ACCESS_UNLOCKED: "Completed",
  PROOF_VERIFIED: "Verified",
  PAYMENT_RECEIVED: "In Progress",
};

export default function AgentVerificationProfilePage() {
  const { token } = useAuth();
  const params = useParams<{ id: string }>();
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api.agents
      .findOne(token, params.id)
      .then(setAgent)
      .catch((err) => setError(err instanceof ApiError ? err.message : "Could not load agent profile."));
  }, [token, params.id]);

  if (error) {
    return <p className="p-8 text-sm text-ur-error">{error}</p>;
  }

  if (!agent) {
    return <p className="p-8 text-sm text-ur-text-muted">Loading agent profile...</p>;
  }

  const isVerified = agent.verificationStatus === "verified";

  const checks = [
    { label: "Identity Verification", verified: isVerified },
    { label: "Business Registration", verified: Boolean(agent.agencyName) },
    { label: "Professional License", verified: Boolean(agent.licenseNumber) },
    { label: "Account Status", verified: true },
  ];

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between">
        <Link href="/listings" className="text-sm font-semibold text-ur-primary hover:underline">
          ← Back to Agents
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card px-4 py-2 text-sm font-semibold text-ur-navy"
        >
          <Share2 className="h-4 w-4" />
          Share Profile
        </button>
      </div>

      <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-ur-navy">Agent Verification Profile</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">View agent verification status, trust score, reports, and activity.</p>

      <div className="mt-6 ur-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-ur-card-soft text-xl font-bold text-ur-primary">
              {agent.user.name.charAt(0)}
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-lg font-bold text-ur-navy">
                {agent.user.name}
                <BadgeCheck className="h-4 w-4 text-ur-cyan" />
              </p>
              <p className="text-sm text-ur-text-secondary">
                Verified Agent · <span className="text-ur-primary">Active</span>
              </p>
              <p className="text-sm text-ur-text-muted">Member since {formatDate(agent.createdAt)}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-ur-text-secondary">
                {agent.user.phone ? (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {agent.user.phone}
                  </span>
                ) : null}
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {agent.user.email}
                </span>
                {agent.agencyName ? (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {agent.agencyName}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="rounded-ur border border-ur-primary/30 bg-ur-success-bg px-4 py-3 text-center">
              <p className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase text-ur-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verification Status
              </p>
              <p className="mt-1 font-bold text-ur-primary">{isVerified ? "Verified" : agent.verificationStatus}</p>
              <p className="text-xs text-ur-text-muted">
                {isVerified ? "This agent has passed all verification checks." : "Verification pending."}
              </p>
            </div>
            <div className="rounded-ur border border-ur-border bg-ur-card-soft px-4 py-3 text-center">
              <p className="text-xs font-bold uppercase text-ur-text-secondary">Verified On</p>
              <p className="mt-1 font-bold text-ur-navy">{formatDate(agent.createdAt)}</p>
              <p className="text-xs text-ur-text-muted">Verified by UrbanRentisha</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={ShieldCheck} label="Trust Score" value={`${agent.trustScore} / 100`} color="text-ur-primary" />
        <StatCard
          icon={FileWarning}
          label="Report Count"
          value={`${agent.stats.openReports + agent.stats.resolvedReports}`}
          sub={`${agent.stats.openReports} active · ${agent.stats.resolvedReports} resolved`}
          color="text-ur-warning"
        />
        <StatCard
          icon={Building2}
          label="Listed Properties"
          value={`${agent.stats.totalListings}`}
          sub={`${agent.stats.activeListings} active · ${agent.stats.inactiveListings} inactive`}
          color="text-ur-cyan"
        />
        <StatCard
          icon={UserCheck}
          label="Verified Viewings"
          value={`${agent.stats.completedViewings}`}
          sub="Access unlocked"
          color="text-ur-mint"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="ur-card p-4">
          <p className="text-sm font-bold text-ur-navy">
            Listed Properties <span className="text-ur-text-muted">({agent.stats.activeListings} Active)</span>
          </p>
          <div className="mt-3 divide-y divide-ur-border">
            {agent.listings.length === 0 ? (
              <p className="py-3 text-sm text-ur-text-muted">No listings yet.</p>
            ) : (
              agent.listings.slice(0, 4).map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.id}`}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{listing.title}</p>
                    <p className="flex items-center gap-1 text-xs text-ur-text-secondary">
                      <MapPin className="h-3 w-3" />
                      {listing.location}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      listing.verificationStatus === "VERIFIED"
                        ? "border-ur-primary/40 text-ur-primary"
                        : "border-ur-text-muted text-ur-text-muted"
                    }`}
                  >
                    {listing.verificationStatus === "VERIFIED" ? "Active" : listing.verificationStatus}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="ur-card p-4">
          <p className="text-sm font-bold text-ur-navy">Verified Viewing Requests (Recent)</p>
          <div className="mt-3 divide-y divide-ur-border">
            {agent.recentViewingRequests.length === 0 ? (
              <p className="py-3 text-sm text-ur-text-muted">No completed viewings yet.</p>
            ) : (
              agent.recentViewingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <p className="text-sm font-bold text-ur-navy">{request.tenantName}</p>
                    <p className="text-xs text-ur-text-secondary">{formatDate(request.updatedAt)}</p>
                  </div>
                  <span className="rounded-full border border-ur-primary/40 px-2.5 py-0.5 text-xs font-semibold text-ur-primary">
                    {statusLabels[request.status] ?? request.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="ur-card p-4">
          <p className="text-sm font-bold text-ur-navy">Verification Checks</p>
          <div className="mt-3 space-y-3">
            {checks.map((check) => (
              <div key={check.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ur-text-secondary">
                  {check.verified ? (
                    <CheckCircle2 className="h-4 w-4 text-ur-primary" />
                  ) : (
                    <IdCard className="h-4 w-4 text-ur-text-muted" />
                  )}
                  {check.label}
                </span>
                <span className={check.verified ? "text-ur-primary" : "text-ur-text-muted"}>
                  {check.verified ? "Verified" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="ur-card p-4">
      <Icon className={`h-4 w-4 ${color}`} />
      <p className="mt-2 text-xs text-ur-text-secondary">{label}</p>
      <p className="text-xl font-black text-ur-navy">{value}</p>
      {sub ? <p className="mt-0.5 text-xs text-ur-text-muted">{sub}</p> : null}
    </div>
  );
}
