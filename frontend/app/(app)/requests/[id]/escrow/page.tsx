"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";
import { PageLoader } from "@/components/ui/page-loader";

export default function EscrowStatusPage() {
  const params = useParams<{ id: string }>();
  const { token } = useAuth();

  const [request, setRequest] = useState<ViewingRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api.viewingRequests
      .findOne(token, params.id)
      .then(setRequest)
      .catch(() => setError("Could not load this viewing request."))
      .finally(() => setLoading(false));
  }, [token, params.id]);

  if (loading) return <PageLoader />;
  if (error || !request?.payment) return <p className="p-8 text-sm text-ur-error">{error ?? "No payment found."}</p>;

  const payment = request.payment;
  const verified = request.proofVerification?.status === "VERIFIED";
  const released = Boolean(request.viewingCode);

  const timeline = [
    { label: "Payment Received", status: "Completed" },
    { label: "Payment Held in Escrow", status: payment.status === "RECEIVED" ? "Completed" : "Pending" },
    { label: "Conditions Verification", status: verified ? "Completed" : "In Progress" },
    { label: "Release to Landlord", status: released ? "Completed" : "Pending" },
    { label: "Hold Completed", status: released ? "Completed" : "Pending" },
  ];

  const nextSteps = [
    { label: "Payment received and confirmed", done: payment.status === "RECEIVED" },
    { label: "Verification in progress", done: true, active: !verified },
    { label: "Conditions met", done: verified },
    { label: "Funds will be released", done: released },
    { label: "Hold completed", done: released },
  ];

  return (
    <div className="px-6 py-8">
      <Link
        href={`/requests/${params.id}/verify`}
        className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
      >
        <Icon name="arrow_back" size={16} />
        Back to Payments
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Escrow / Payment-Hold Status</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">Your payment is securely held in escrow until all conditions are met.</p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-ur-cyan/30 bg-ur-bg-soft px-3 py-1 text-xs font-bold text-ur-cyan">
          <span className="h-2 w-2 rounded-full bg-ur-cyan" />
          Stellar Testnet
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Current Hold Status</h2>
            <div className="mt-3 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-ur-warning/40 bg-ur-warning-bg text-ur-warning">
                  <Icon name="lock" size={24} />
                </div>
                <div>
                  <p className="font-bold text-ur-warning">{released ? "Funds Released" : "Funds Held in Escrow"}</p>
                  <p className="max-w-xs text-xs text-ur-text-secondary">
                    {released
                      ? "Your payment has been released."
                      : "Your payment is securely reserved and will be released when all conditions are satisfied."}
                  </p>
                  <span className="mt-1 inline-block rounded-full border border-ur-warning/40 px-2 py-0.5 text-xs font-bold text-ur-warning">
                    {released ? "RELEASED" : "ON HOLD"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-ur-text-secondary">Held Amount</p>
                <p className="text-lg font-black text-ur-navy">
                  {payment.amount.toLocaleString()} {payment.stellarAsset}
                </p>
              </div>
              <div>
                <p className="text-xs text-ur-text-secondary">Property</p>
                <p className="text-sm font-semibold text-ur-navy">{request.listing?.title}</p>
                <p className="text-xs text-ur-text-secondary">{request.listing?.location}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 border-t border-ur-border pt-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-ur-text-secondary">Held ID</p>
                <p className="text-sm text-ur-text">{payment.id}</p>
              </div>
              <div>
                <p className="text-xs text-ur-text-secondary">Escrow Contract</p>
                <p className="truncate text-sm text-ur-text">{payment.destinationWallet}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Hold Timeline</h2>
              <ol className="mt-4 space-y-4">
                {timeline.map((step) => (
                  <li key={step.label} className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          step.status === "Completed"
                            ? "bg-ur-primary text-white"
                            : step.status === "In Progress"
                              ? "border-2 border-ur-warning text-ur-warning"
                              : "border-2 border-ur-border"
                        }`}
                      >
                        {step.status === "Completed" ? <Icon name="check" size={12} /> : null}
                      </span>
                      <p className="text-sm font-semibold text-ur-text">{step.label}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        step.status === "Completed"
                          ? "text-ur-primary"
                          : step.status === "In Progress"
                            ? "text-ur-warning"
                            : "text-ur-text-muted"
                      }`}
                    >
                      {step.status}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Hold Details</h2>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Payment Reference</dt>
                  <dd className="truncate text-ur-text">{payment.stellarMemo}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Payment Method</dt>
                  <dd className="text-ur-text">Stellar Testnet</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Escrow Network</dt>
                  <dd className="text-ur-text">Stellar Testnet</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">Escrow Address</dt>
                  <dd className="mt-0.5 break-all text-ur-text">{payment.destinationWallet}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Escrowed At</dt>
                  <dd className="text-ur-text">{payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "—"}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Auto Release Condition</dt>
                  <dd className="font-semibold text-ur-primary">Proof Verified</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Status</dt>
                  <dd>
                    <span className="rounded-full border border-ur-warning/40 px-2 py-0.5 font-bold text-ur-warning">
                      {released ? "RELEASED" : "ON HOLD"}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Your Actions</h2>
            <p className="mt-1 text-sm text-ur-text-secondary">What would you like to do?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <button type="button" className="flex items-center gap-2 rounded-ur-sm border border-ur-border px-3 py-3 text-sm font-semibold text-ur-text-secondary hover:text-ur-navy">
                <Icon name="visibility" size={16} />
                View Hold Details
              </button>
              <button type="button" className="flex items-center gap-2 rounded-ur-sm border border-ur-border px-3 py-3 text-sm font-semibold text-ur-text-secondary hover:text-ur-navy">
                <Icon name="verified_user" size={16} />
                View Conditions
              </button>
              <button type="button" className="flex items-center gap-2 rounded-ur-sm border border-ur-border px-3 py-3 text-sm font-semibold text-ur-text-secondary hover:text-ur-navy">
                <Icon name="chat_bubble" size={16} />
                Contact Support
              </button>
            </div>
            <p className="mt-3 rounded-ur border border-ur-warning/30 bg-ur-warning-bg p-3 text-xs text-ur-warning">
              Refunds are not available during the hold period unless the agent cancels the booking.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="ur-card flex flex-col items-center p-5 text-center">
            <h2 className="self-start font-bold text-ur-navy">Access Status</h2>
            <div
              className={`my-4 grid h-20 w-20 place-items-center rounded-full border ${
                released ? "border-ur-primary bg-ur-success-bg" : "border-ur-cyan/40 bg-ur-bg-soft"
              }`}
            >
              <Icon name="lock" size={36} className={`${released ? "text-ur-primary" : "text-ur-cyan"}`} />
            </div>
            <p className={`font-bold ${released ? "text-ur-primary" : "text-ur-cyan"}`}>
              {released ? "Access Unlocked" : "Access Locked"}
            </p>
            <p className="mt-1 text-sm text-ur-text-secondary">
              {released ? "Property access has been unlocked." : "Property access is locked until payment is released."}
            </p>
            <Button variant="outline" className="mt-4 w-full">
              View Access Rules
            </Button>
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">What Happens Next?</h2>
            <p className="mt-2 text-sm text-ur-text-secondary">
              Your funds are securely held in escrow. Once the verification conditions are met, the payment will be
              released automatically.
            </p>
            <div className="mt-3 space-y-2">
              {nextSteps.map((step) => (
                <p key={step.label} className="flex items-center gap-2 text-sm text-ur-text-secondary">
                  {step.done ? (
                    <Icon name="check" size={16} className="text-ur-primary" />
                  ) : step.active ? (
                    <Icon name="schedule" size={16} className="text-ur-warning" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-ur-border" />
                  )}
                  {step.label}
                </p>
              ))}
            </div>
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-ur-navy">Audit Trail</h2>
              {payment.txHash ? (
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${payment.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-ur-mint hover:underline"
                >
                  View on Stellar Expert
                  <Icon name="open_in_new" size={12} />
                </a>
              ) : null}
            </div>
            <dl className="mt-3 space-y-2 text-xs">
              <div>
                <dt className="text-ur-text-secondary">Transaction Hash</dt>
                <dd className="break-all text-ur-text">{payment.txHash ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ur-text-secondary">Block Time</dt>
                <dd className="text-ur-text">{payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "—"}</dd>
              </div>
            </dl>
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center gap-2">
              <Icon name="support_agent" size={16} className="text-ur-primary" />
              <h2 className="font-bold text-ur-navy">Need Help?</h2>
            </div>
            <Button variant="outline" className="mt-3 w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
