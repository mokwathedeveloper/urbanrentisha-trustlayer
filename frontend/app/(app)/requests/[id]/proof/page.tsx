"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/requests/stepper";
import { api, ApiError, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";
import { PageLoader } from "@/components/ui/page-loader";
import { VerificationProcessingState } from "@/components/ui/processing-state";
import { Spinner } from "@/components/ui/spinner";

const proofSteps = ["Payment Confirmed", "Generate Proof", "Proof Generated", "Verify Proof", "Use Code"];

const proofGuarantees = ["Proves payment was made", "Hides amount, wallet & metadata", "Secure, private & verifiable"];

const zkExplainer = [
  "Your payment is valid",
  "The amount remains private",
  "Your wallet stays private",
  "Only the truth is proven",
];

export default function ProofGenerationPage() {
  const params = useParams<{ id: string }>();
  const { token } = useAuth();

  const [request, setRequest] = useState<ViewingRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [proofHash, setProofHash] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    api.viewingRequests
      .findOne(token, params.id)
      .then((req) => {
        setRequest(req);
        if (req.zkProof?.proofHash) setProofHash(req.zkProof.proofHash);
      })
      .catch(() => setError("Could not load this viewing request."))
      .finally(() => setLoading(false));
  }, [token, params.id]);

  async function handleGenerate() {
    if (!token) return;
    setError(null);
    setGenerating(true);
    try {
      const proof = await api.zkProofs.generate(token, { viewingRequestId: params.id });
      setProofHash(proof.proofHash);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not generate the proof.");
    } finally {
      setGenerating(false);
    }
  }

  if (loading) return <PageLoader />;
  if (error && !request) return <p className="p-8 text-sm text-ur-error">{error}</p>;
  if (!request?.payment) return null;

  const payment = request.payment;
  const generated = Boolean(proofHash);
  const progress = generating ? 60 : generated ? 100 : 0;

  return (
    <div className="px-6 py-8">
      <Link
        href={`/requests/${params.id}/payment`}
        className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
      >
        <Icon name="arrow_back" size={16} />
        Back to Payment
      </Link>

      <h1 className="mt-4 text-2xl font-black tracking-[-0.02em] text-ur-navy">Generate ZK Proof</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">
        Create a private payment proof to confirm your viewing payment without revealing sensitive details.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Stepper currentStep={2} steps={proofSteps} />

          <div className="flex items-center justify-between rounded-ur border border-ur-primary/25 bg-ur-success-bg p-4">
            <div className="flex items-center gap-3">
              <Icon name="lock" size={20} className="text-ur-primary" />
              <div>
                <p className="text-sm font-bold text-ur-primary">Your payment is confirmed</p>
                <p className="text-xs text-ur-text-secondary">
                  Transaction validated on Stellar Testnet. You can now generate your zero-knowledge proof.
                </p>
              </div>
            </div>
            <span className="shrink-0 text-xs text-ur-text-secondary">
              Confirmed At
              <br />
              <span className="font-semibold text-ur-text">
                {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "—"}
              </span>
            </span>
          </div>

          {generating ? (
            <VerificationProcessingState
              title="Generating your ZK proof..."
              subtitle="Building witness and computing the Groth16 proof. This usually takes 15-30 seconds."
            />
          ) : null}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Payment Summary</h2>
              <dl className="mt-3 space-y-3 text-xs">
                <div>
                  <dt className="text-ur-text-secondary">Transaction Hash</dt>
                  <dd className="mt-0.5 break-all text-ur-text">{payment.txHash}</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">From (Your Wallet)</dt>
                  <dd className="mt-0.5 break-all text-ur-text">{payment.payerWallet ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">To (Escrow Address)</dt>
                  <dd className="mt-0.5 break-all text-ur-text">{payment.destinationWallet}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ur-text-secondary">Amount Paid</dt>
                  <dd className="font-bold text-ur-text">
                    {payment.amount.toLocaleString()} {payment.stellarAsset}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ur-text-secondary">Status</dt>
                  <dd>
                    <span className="rounded-full bg-ur-success-bg px-2 py-0.5 font-semibold text-ur-primary">
                      {payment.status}
                    </span>
                  </dd>
                </div>
              </dl>
              {payment.txHash ? (
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${payment.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-fit items-center gap-1 rounded-ur-sm border border-ur-border px-3 py-2 text-xs font-semibold text-ur-text-secondary hover:text-ur-navy"
                >
                  View on Stellar Expert
                  <Icon name="open_in_new" size={14} />
                </a>
              ) : null}
            </div>

            <div className="ur-card flex flex-col items-center p-5 text-center">
              <h2 className="font-bold text-ur-navy">Generate Your ZK Proof</h2>
              <div className="my-4 grid h-24 w-24 place-items-center rounded-full border border-ur-primary/40 bg-ur-success-bg">
                <Icon name="verified_user" size={40} className="text-ur-primary" />
              </div>
              <p className="text-sm text-ur-text-secondary">
                This will create a zero-knowledge proof that verifies your payment without revealing any private
                information.
              </p>
              <div className="mt-4 w-full space-y-2 text-left">
                {proofGuarantees.map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm text-ur-text-secondary">
                    <Icon name="verified_user" size={16} className="text-ur-primary" />
                    {item}
                  </p>
                ))}
              </div>

              <Button
                className="mt-5 w-full"
                size="lg"
                onClick={handleGenerate}
                disabled={generated}
                loading={generating}
              >
                {!generating ? <Icon name="auto_awesome" size={16} /> : null}
                {generated ? "Proof Generated" : generating ? "Generating..." : "Generate ZK Proof"}
              </Button>
              <p className="mt-2 flex items-center gap-1 text-xs text-ur-text-muted">
                <Icon name="schedule" size={12} />
                This process usually takes 15-30 seconds
              </p>
            </div>
          </div>

          {error ? <p className="text-sm text-ur-error">{error}</p> : null}

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Proof Generation Status</h2>
            <div className="mt-4 flex items-center gap-5">
              <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 border-ur-border">
                {generating ? (
                  <Spinner
                    size="lg"
                    className="absolute inset-[-4px] h-[calc(100%+8px)] w-[calc(100%+8px)] text-ur-cyan"
                    aria-label="Generating proof"
                  />
                ) : null}
                <span className="text-sm font-black text-ur-navy transition-opacity duration-300">{progress}%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-ur-navy">
                  {generated ? "Proof Generated" : generating ? "Generating Proof..." : "Ready to Generate"}
                </p>
                <p className="text-sm text-ur-text-secondary">
                  {generated
                    ? "Your zero-knowledge proof has been generated."
                    : generating
                      ? "Building witness and computing the Groth16 proof..."
                      : "Click the button above to start generating your zero-knowledge proof."}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-ur-text-muted">
              {["Initializing", "Computing", "Finalizing", "Complete"].map((label, i) => {
                const active = progress >= (i + 1) * 25;
                return (
                  <span key={label} className="flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${active ? "bg-ur-primary" : "bg-ur-border"}`} />
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          <p className="flex items-start gap-2 rounded-ur border border-ur-border bg-ur-card-soft p-3 text-xs text-ur-text-secondary">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            Your ZK proof will be securely stored and can be used to confirm your payment to the property agent.
          </p>
        </div>

        <div className="space-y-5">
          <div className="ur-card p-5">
            <h2 className="flex items-center gap-1 font-bold text-ur-navy">
              What is a ZK Proof?
              <Icon name="info" size={14} className="text-ur-text-muted" />
            </h2>
            <p className="mt-2 text-sm text-ur-text-secondary">
              A zero-knowledge proof lets you prove that a statement is true without revealing any underlying
              information.
            </p>
            <div className="mt-3 space-y-2">
              {zkExplainer.map((item) => (
                <p key={item} className="flex items-center gap-2 text-sm text-ur-text-secondary">
                  <Icon name="check" size={16} className="text-ur-primary" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">
              Your Proof <span className="text-xs font-normal text-ur-text-muted">{generated ? "" : "(Will be generated)"}</span>
            </h2>
            <div className="mt-3 rounded-ur border border-ur-border bg-ur-card-soft p-4 text-center">
              {generated ? (
                <p className="break-all text-xs text-ur-primary">{proofHash}</p>
              ) : (
                <>
                  <Icon name="lock" size={24} className="mx-auto text-ur-text-muted" />
                  <p className="mt-2 text-xs text-ur-text-muted">No proof generated yet</p>
                </>
              )}
            </div>
            {generated ? (
              <Link href={`/requests/${params.id}/verify`}>
                <Button className="mt-4 w-full">Continue to Verification</Button>
              </Link>
            ) : null}
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center gap-2">
              <Icon name="verified_user" size={16} className="text-ur-primary" />
              <h2 className="font-bold text-ur-navy">About Your Privacy</h2>
            </div>
            <p className="mt-2 text-sm text-ur-text-secondary">
              We use advanced cryptographic techniques to ensure your financial privacy. Only the fact of payment is
              shared, never the details.
            </p>
            <a href="#" className="mt-2 flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline">
              Learn more about ZK Proofs
              <Icon name="arrow_back" size={14} className="rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
