"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";

const whatYouCanDo = [
  "Use the viewing code to meet the agent",
  "Tour the property during the scheduled time",
  "Ask questions and confirm property details",
  "Proceed with lease agreement if satisfied",
];

export default function ViewingCodePage() {
  const params = useParams<{ id: string }>();
  const { token } = useAuth();

  const [request, setRequest] = useState<ViewingRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!token) return;
    api.viewingRequests
      .findOne(token, params.id)
      .then(async (req) => {
        setRequest(req);
        if (!req.viewingCode && req.proofVerification?.status === "VERIFIED") {
          setGenerating(true);
          const code = await api.viewingCodes.generate(token, { viewingRequestId: params.id });
          setRequest({ ...req, viewingCode: code });
          setGenerating(false);
        }
      })
      .catch(() => setError("Could not load this viewing request."))
      .finally(() => setLoading(false));
  }, [token, params.id]);

  function copyCode() {
    if (!request?.viewingCode) return;
    navigator.clipboard.writeText(request.viewingCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (loading || generating) return <p className="p-8 text-sm text-ur-text-muted">Loading...</p>;
  if (error) return <p className="p-8 text-sm text-ur-error">{error}</p>;
  if (!request?.viewingCode || !request.payment) {
    return <p className="p-8 text-sm text-ur-error">Proof must be verified before a viewing code can be unlocked.</p>;
  }

  const { listing, payment, viewingCode, proofVerification } = request;

  return (
    <div className="px-6 py-8">
      <Link
        href={`/requests/${params.id}/verify`}
        className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
      >
        <Icon name="arrow_back" size={16} />
        Back to Verification
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ur-primary/40 bg-ur-success-bg">
            <Icon name="check" size={24} className="text-ur-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">Viewing Code Unlocked!</h1>
            <p className="mt-1 text-sm text-ur-text-secondary">
              Your payment has been verified and access to the property is now granted.
            </p>
          </div>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-ur-primary/30 bg-ur-success-bg px-3 py-1 text-xs font-bold text-ur-primary">
          <span className="h-2 w-2 rounded-full bg-ur-primary" />
          Stellar Testnet
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Your Viewing Code</h2>
            <p className="mt-1 text-sm text-ur-text-secondary">Use this code to access the property with the agent.</p>

            <div className="mt-4 flex items-center justify-between rounded-ur border border-ur-border bg-ur-card-soft p-4">
              <p className="font-mono text-3xl font-black tracking-[0.1em] text-ur-primary">{viewingCode.code}</p>
              <button type="button" onClick={copyCode} aria-label="Copy code" className="text-ur-text-muted hover:text-ur-primary">
                {copied ? <Icon name="check" size={20} className="text-ur-primary" /> : <Icon name="content_copy" size={20} />}
              </button>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-ur border border-ur-primary/25 bg-ur-success-bg p-3 text-sm">
              <Icon name="verified_user" size={16} className="mt-0.5 shrink-0 text-ur-primary" />
              <div>
                <p className="font-bold text-ur-primary">This code is valid and ready to use.</p>
                <p className="text-xs text-ur-text-secondary">Share this code with the property agent during your viewing.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Access Details</h2>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Property</dt>
                  <dd className="text-right text-ur-text">{listing?.title}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Location</dt>
                  <dd className="text-right text-ur-text">{listing?.location}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Booking ID</dt>
                  <dd className="truncate text-ur-text">{request.id}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Payment Reference</dt>
                  <dd className="truncate text-ur-text">{payment.stellarMemo}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Payment Method</dt>
                  <dd className="text-ur-text">Stellar ({payment.stellarAsset})</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Amount Paid</dt>
                  <dd className="text-ur-text">
                    {payment.amount.toLocaleString()} {payment.stellarAsset}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="ur-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-ur-navy">Viewing Schedule</h2>
                <span className="grid h-8 w-8 place-items-center rounded-ur-sm border border-ur-border bg-ur-card-soft text-ur-primary">
                  <Icon name="calendar_month" size={16} />
                </span>
              </div>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Scheduled Date</dt>
                  <dd className="text-ur-text">
                    {request.preferredDate ? new Date(request.preferredDate).toLocaleDateString() : "Flexible"}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Preferred Time</dt>
                  <dd className="text-ur-text">{request.preferredTime ?? "Flexible"}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Code Expires</dt>
                  <dd className="text-ur-text">{new Date(viewingCode.expiresAt).toLocaleString()}</dd>
                </div>
              </dl>

              {listing?.agent ? (
                <div className="mt-4 border-t border-ur-border pt-4">
                  <p className="text-xs text-ur-text-secondary">Agent</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-ur-card-soft text-sm font-bold text-ur-primary">
                      {listing.agent.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-sm font-semibold text-ur-navy">
                        {listing.agent.user.name}
                        <Icon name="verified_user" size={12} className="text-ur-primary" />
                      </p>
                      <p className="text-xs text-ur-cyan">Verified Agent</p>
                    </div>
                  </div>
                  {listing.agent.user.phone ? (
                    <p className="mt-2 flex items-center gap-2 text-xs text-ur-text-secondary">
                      <Icon name="call" size={14} />
                      {listing.agent.user.phone}
                    </p>
                  ) : null}
                  <p className="mt-2 flex items-center gap-2 text-xs text-ur-text-secondary">
                    <Icon name="mail" size={14} />
                    {listing.agent.user.email}
                  </p>
                  <Button variant="outline" className="mt-3 w-full">
                    <Icon name="chat_bubble" size={16} />
                    Message Agent
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          {proofVerification ? (
            <div className="ur-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-ur-navy">Audit &amp; On-Chain Reference</h2>
                {proofVerification.sorobanTxHash ? (
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${proofVerification.sorobanTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-ur-mint hover:underline"
                  >
                    View on Stellar Expert
                    <Icon name="open_in_new" size={12} />
                  </a>
                ) : null}
              </div>
              <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
                <div>
                  <dt className="text-ur-text-secondary">Verification Tx Hash</dt>
                  <dd className="break-all text-ur-text">{proofVerification.sorobanTxHash ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">Soroban Contract</dt>
                  <dd className="break-all text-ur-text">{proofVerification.verifierAddress}</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">Ledger</dt>
                  <dd className="text-ur-text">Public Test Network</dd>
                </div>
              </dl>
            </div>
          ) : null}

          <div className="flex items-center justify-between rounded-ur border border-ur-primary/25 bg-ur-success-bg p-4">
            <p className="text-sm font-semibold text-ur-primary">
              You&apos;re all set! Use your viewing code to access the property and meet your agent.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="ur-card flex flex-col items-center p-5 text-center">
            <h2 className="self-start font-bold text-ur-navy">Verification Success</h2>
            <div className="my-4 grid h-20 w-20 place-items-center rounded-full border border-ur-primary/40 bg-ur-success-bg">
              <Icon name="verified_user" size={36} className="text-ur-primary" />
            </div>
            <p className="font-bold text-ur-primary">Proof Verified On-Chain</p>
            <p className="mt-1 text-sm text-ur-text-secondary">
              Your zero-knowledge proof has been successfully verified on Stellar.
            </p>
            {proofVerification?.verifiedAt ? (
              <div className="mt-3 w-full border-t border-ur-border pt-3">
                <p className="text-xs text-ur-text-secondary">Verified At</p>
                <p className="text-sm font-semibold text-ur-text">{new Date(proofVerification.verifiedAt).toLocaleString()}</p>
              </div>
            ) : null}
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">What You Can Do</h2>
            <div className="mt-3 space-y-2">
              {whatYouCanDo.map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-ur-text-secondary">
                  <Icon name="verified_user" size={16} className="mt-0.5 shrink-0 text-ur-primary" />
                  {item}
                </p>
              ))}
            </div>
            <Link href="/bookings">
              <Button className="mt-4 w-full">
                View Booking Details
                <Icon name="arrow_forward" size={16} />
              </Button>
            </Link>
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center gap-2">
              <Icon name="lock" size={16} className="text-ur-cyan" />
              <h2 className="font-bold text-ur-navy">Keep Your Code Secure</h2>
            </div>
            <p className="mt-2 text-sm text-ur-text-secondary">
              Do not share your viewing code publicly. This code is unique to you and should only be used for this
              scheduled viewing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
