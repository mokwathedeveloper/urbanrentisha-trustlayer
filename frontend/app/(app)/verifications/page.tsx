"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/components/dashboard/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { RoleGuard } from "@/components/auth/role-guard";

const statusTone: Record<string, string> = {
  NOT_STARTED: "border-ur-text-muted text-ur-text-muted",
  GENERATING: "border-ur-cyan/40 text-ur-cyan",
  GENERATED: "border-ur-cyan/40 text-ur-cyan",
  SUBMITTED: "border-ur-cyan/40 text-ur-cyan",
  VERIFIED: "border-ur-primary/40 text-ur-primary",
  FAILED: "border-ur-error/40 text-ur-error",
};

export default function VerificationsPage() {
  const { token } = useAuth();
  const [requests, setRequests] = useState<ViewingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api.viewingRequests
      .findMine(token)
      .then(setRequests)
      .finally(() => setLoading(false));
  }, [token]);

  const proofs = requests.filter((r) => r.zkProof);

  return (
    <RoleGuard allow={["TENANT"]}>
    <div className="px-6 py-8">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Verifications</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">
        Zero-knowledge proofs you have generated and their on-chain verification status.
      </p>

      <div className="mt-6 ur-card">
        {loading ? <p className="p-5 text-sm text-ur-text-muted">Loading...</p> : null}
        {!loading && proofs.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <Icon name="verified_user" size={32} className="text-ur-text-muted" />
            <p className="text-sm text-ur-text-muted">No proofs generated yet.</p>
          </div>
        ) : null}
        <div className="divide-y divide-ur-border">
          {proofs.map((request) => (
            <Link
              key={request.id}
              href={`/requests/${request.id}/verify`}
              className="flex items-center justify-between gap-4 p-4 hover:bg-ur-card-hover"
            >
              <div>
                <p className="text-sm font-bold text-ur-navy">{request.listing?.title ?? "Listing"}</p>
                <p className="mt-0.5 font-mono text-xs text-ur-text-secondary">
                  Proof: {request.zkProof?.proofHash ? `${request.zkProof.proofHash.slice(0, 16)}...` : "pending"}
                </p>
                {request.proofVerification?.sorobanTxHash ? (
                  <p className="mt-0.5 font-mono text-xs text-ur-text-muted">
                    Soroban tx: {request.proofVerification.sorobanTxHash.slice(0, 16)}...
                  </p>
                ) : null}
                <p className="mt-0.5 text-xs text-ur-text-muted">
                  {request.zkProof?.generatedAt ? formatDate(request.zkProof.generatedAt) : formatDate(request.createdAt)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                  statusTone[request.proofVerification?.status ?? request.zkProof?.status ?? ""] ?? "border-ur-border text-ur-text-muted"
                }`}
              >
                {request.proofVerification?.status ?? request.zkProof?.status}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </RoleGuard>
  );
}
