"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiError, api, type DocumentType, type ProfileType, type VerificationItem } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { RoleGuard, useHasRole } from "@/components/auth/role-guard";

const ALLOWED_ROLES = ["ADMIN", "PLATFORM"] as const;

const profileTypeLabels: Record<ProfileType, string> = {
  tenant: "Tenant",
  landlord: "Landlord",
  agent: "Agent",
  manager: "Property Manager",
};

const documentTypeLabels: Record<DocumentType, string> = {
  ID_CARD: "National ID / Passport",
  GOOD_CONDUCT: "Certificate of Good Conduct",
  PERSONAL_DOCUMENT: "Proof of Address",
  ASSET_DOCUMENT: "Proof of Property Ownership",
};

const stageTone: Record<string, string> = {
  DOCUMENTS_UPLOADED: "border-ur-cyan/40 text-ur-cyan",
  UNDER_REVIEW: "border-ur-warning/40 text-ur-warning",
  NEEDS_CORRECTION: "border-ur-warning/40 text-ur-warning",
};

export default function AdminVerificationsPage() {
  const { token } = useAuth();
  const allowed = useHasRole([...ALLOWED_ROLES]);
  const [items, setItems] = useState<VerificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function load() {
    if (!token || !allowed) return;
    api.admin.verifications
      .list(token)
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(load, [token, allowed]);

  async function handleReview(item: VerificationItem, decision: "APPROVED" | "REJECTED" | "NEEDS_CORRECTION") {
    if (!token) return;
    setSubmitting(true);
    setError(null);
    try {
      await api.admin.verifications.review(token, item.profileType, item.profileId, {
        decision,
        note: note || undefined,
      });
      setSelectedId(null);
      setNote("");
      setLoading(true);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSetStatus(item: VerificationItem, status: "ACTIVE" | "SUSPENDED") {
    if (!token) return;
    setSubmitting(true);
    setError(null);
    try {
      await api.admin.users.setStatus(token, item.userId, status);
      setItems((prev) =>
        prev.map((row) => (row.userId === item.userId ? { ...row, userStatus: status } : row)),
      );
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update account status.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <RoleGuard allow={[...ALLOWED_ROLES]}>
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Verification Review</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">
        Review submitted documents and approve, reject, or request corrections for pending profiles.
      </p>

      {error ? <p className="mt-4 text-sm text-ur-error">{error}</p> : null}

      <div className="mt-6 ur-card">
        {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
        {!loading && items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="verified_user" size={28} className="text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">No profiles are currently awaiting review.</p>
          </div>
        ) : null}
        <div className="divide-y divide-ur-border">
          {items.map((item) => {
            const expanded = selectedId === `${item.profileType}:${item.profileId}`;
            return (
              <div key={`${item.profileType}-${item.profileId}`} className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-ur-navy">{item.name}</p>
                      <span className="rounded-full border border-ur-border px-2 py-0.5 text-xs font-semibold text-ur-text-secondary">
                        {profileTypeLabels[item.profileType]}
                      </span>
                      {item.userStatus === "SUSPENDED" ? (
                        <span className="rounded-full border border-ur-error/40 px-2 py-0.5 text-xs font-semibold text-ur-error">
                          Suspended
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-ur-text-secondary">{item.email}</p>
                    {item.linkedLandlordName ? (
                      <p className="mt-1 text-xs text-ur-text-muted">Represents: {item.linkedLandlordName}</p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        stageTone[item.verificationStage] ?? "border-ur-border text-ur-text-muted"
                      }`}
                    >
                      {item.verificationStage.replace(/_/g, " ")}
                    </span>
                    {item.profileType === "landlord" ? (
                      <Link
                        href={`/admin/landlords/${item.profileId}`}
                        className="text-sm font-semibold text-ur-text-secondary hover:underline"
                      >
                        View Team
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setSelectedId(expanded ? null : `${item.profileType}:${item.profileId}`)}
                      className="text-sm font-semibold text-ur-primary hover:underline"
                    >
                      {expanded ? "Close" : "Review"}
                    </button>
                  </div>
                </div>

                {expanded ? (
                  <div className="mt-4 space-y-3 rounded-ur border border-ur-border bg-ur-card-soft p-4">
                    <p className="text-xs font-bold uppercase text-ur-text-muted">Submitted Documents</p>
                    {item.documents.length === 0 ? (
                      <p className="text-sm text-ur-text-muted">No documents uploaded yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {item.documents.map((doc) => (
                          <a
                            key={doc.id}
                            href={doc.signedUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card px-3 py-2 text-sm text-ur-primary hover:underline"
                          >
                            <Icon name="description" size={16} />
                            <span>
                              {doc.documentType ? documentTypeLabels[doc.documentType] : doc.fileName}
                              {doc.documentType ? (
                                <span className="ml-1.5 text-xs text-ur-text-muted">({doc.fileName})</span>
                              ) : null}
                            </span>
                            <span className="ml-auto text-xs text-ur-text-muted">{formatDate(doc.createdAt)}</span>
                          </a>
                        ))}
                      </div>
                    )}

                    <label className="block text-xs font-semibold tracking-[0.04em] text-ur-text-secondary">
                      Note (optional, shared in audit log)
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. License document is blurry, please re-upload."
                      className="h-20 w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text outline-none focus:border-ur-primary"
                    />

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => handleReview(item, "APPROVED")}
                        className="flex items-center gap-1.5 rounded-ur-sm bg-ur-primary px-4 py-2 text-sm font-bold text-white hover:bg-ur-primary-hover disabled:opacity-50"
                      >
                        <Icon name="check_circle" size={16} />
                        Approve
                      </button>
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => handleReview(item, "NEEDS_CORRECTION")}
                        className="flex items-center gap-1.5 rounded-ur-sm border border-ur-warning/40 bg-ur-warning-bg px-4 py-2 text-sm font-bold text-ur-warning hover:bg-ur-warning/15 disabled:opacity-50"
                      >
                        <Icon name="info" size={16} />
                        Needs Correction
                      </button>
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => handleReview(item, "REJECTED")}
                        className="flex items-center gap-1.5 rounded-ur-sm border border-ur-error/40 bg-ur-error-bg px-4 py-2 text-sm font-bold text-ur-error hover:bg-ur-error/15 disabled:opacity-50"
                      >
                        <Icon name="close" size={16} />
                        Reject
                      </button>
                      {item.userStatus === "SUSPENDED" ? (
                        <button
                          type="button"
                          disabled={submitting}
                          onClick={() => handleSetStatus(item, "ACTIVE")}
                          className="flex items-center gap-1.5 rounded-ur-sm border border-ur-border bg-ur-card px-4 py-2 text-sm font-bold text-ur-text-secondary hover:bg-ur-card-hover disabled:opacity-50"
                        >
                          <Icon name="verified_user" size={16} />
                          Reactivate Account
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={submitting}
                          onClick={() => handleSetStatus(item, "SUSPENDED")}
                          className="flex items-center gap-1.5 rounded-ur-sm border border-ur-border bg-ur-card px-4 py-2 text-sm font-bold text-ur-text-secondary hover:bg-ur-card-hover disabled:opacity-50"
                        >
                          <Icon name="gpp_maybe" size={16} />
                          Suspend Account
                        </button>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </RoleGuard>
  );
}
