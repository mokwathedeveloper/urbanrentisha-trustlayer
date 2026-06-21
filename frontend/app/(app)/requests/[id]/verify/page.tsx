"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/requests/stepper";
import { api, ApiError, type ViewingRequest } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Icon } from "@/components/ui/icon";

const verifySteps = ["Proof Submitted", "Verifying Proof", "Verification Result", "Access Granted", "Complete"];

const resultStages = [
  "Proof submitted to network",
  "Smart contract validation",
  "Zero-knowledge verification",
  "Result confirmation",
  "Access decision",
];

export default function VerifyProofPage() {
  const params = useParams<{ id: string }>();
  const { token } = useAuth();

  const [request, setRequest] = useState<ViewingRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<{ status: string; sorobanTxHash: string | null; verifierAddress: string | null } | null>(
    null,
  );

  useEffect(() => {
    if (!token) return;
    api.viewingRequests
      .findOne(token, params.id)
      .then((req) => {
        setRequest(req);
        if (req.proofVerification) {
          setResult({
            status: req.proofVerification.status,
            sorobanTxHash: req.proofVerification.sorobanTxHash,
            verifierAddress: req.proofVerification.verifierAddress,
          });
        }
      })
      .catch(() => setError("Could not load this viewing request."))
      .finally(() => setLoading(false));
  }, [token, params.id]);

  async function handleVerify() {
    if (!token) return;
    setError(null);
    setVerifying(true);
    try {
      const verification = await api.proofVerification.submit(token, { viewingRequestId: params.id });
      setResult({
        status: verification.status,
        sorobanTxHash: verification.sorobanTxHash,
        verifierAddress: verification.verifierAddress,
      });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Verification failed.");
      setResult({ status: "FAILED", sorobanTxHash: null, verifierAddress: null });
    } finally {
      setVerifying(false);
    }
  }

  if (loading) return <p className="p-8 text-sm text-ur-text-muted">Loading...</p>;
  if (error && !request) return <p className="p-8 text-sm text-ur-error">{error}</p>;
  if (!request?.zkProof) return null;

  const proof = request.zkProof;
  const verified = result?.status === "VERIFIED";
  const failed = result?.status === "FAILED";
  const completedStages = verifying ? 1 : verified ? resultStages.length : 0;

  return (
    <div className="px-6 py-8">
      <Link
        href={`/requests/${params.id}/proof`}
        className="flex items-center gap-1 text-sm font-semibold text-ur-mint hover:underline"
      >
        <Icon name="arrow_back" size={16} />
        Back to ZK Proof
      </Link>

      <h1 className="mt-4 text-2xl font-black tracking-[-0.02em] text-ur-navy">Proof Verification</h1>
      <p className="mt-1 text-sm text-ur-text-secondary">Submit your zero-knowledge proof for verification on Stellar/Soroban.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Stepper currentStep={2} steps={verifySteps} />

          {verifying ? (
            <div className="flex items-center gap-3 rounded-ur border border-ur-cyan/30 bg-ur-bg-soft p-4">
              <Icon name="hourglass_empty" size={20} className="animate-pulse text-ur-cyan" />
              <div>
                <p className="text-sm font-bold text-ur-cyan">Verifying your proof...</p>
                <p className="text-xs text-ur-text-secondary">
                  Your zero-knowledge proof has been submitted to the Stellar network for verification.
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Generated Proof</h2>
              <dl className="mt-3 space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Proof ID</dt>
                  <dd className="truncate text-ur-text">{proof.id}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Generated At</dt>
                  <dd className="text-ur-text">{proof.generatedAt ? new Date(proof.generatedAt).toLocaleString() : "—"}</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">Proof Hash</dt>
                  <dd className="mt-0.5 break-all text-ur-text">{proof.proofHash}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Proof Type</dt>
                  <dd className="text-ur-text">Payment Verification</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-ur-text-secondary">Circuit</dt>
                  <dd className="text-ur-text">Circom Groth16 (BLS12-381)</dd>
                </div>
              </dl>
            </div>

            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Submit Proof for Verification</h2>
              <p className="mt-1 text-xs text-ur-text-secondary">
                Submit your zero-knowledge proof to the Soroban smart contract.
              </p>

              <div className="mt-3">
                <p className="text-xs text-ur-text-secondary">Proof File (JSON)</p>
                <div className="mt-1 flex items-center gap-2 rounded-ur-sm border border-ur-border bg-ur-card-soft px-3 py-2">
                  <Icon name="data_object" size={16} className="text-ur-text-muted" />
                  <span className="flex-1 truncate text-xs text-ur-text">proof_{proof.id}.json</span>
                  {verified ? <Icon name="check" size={16} className="text-ur-primary" /> : null}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-ur-text-secondary">Verifier Contract (Soroban)</p>
                <div className="mt-1 rounded-ur-sm border border-ur-border bg-ur-card-soft px-3 py-2 text-xs text-ur-text">
                  CAO2EE...62HZQYDGSW
                </div>
              </div>

              <Button
                className="mt-4 w-full"
                onClick={handleVerify}
                disabled={verifying || verified}
              >
                {verified ? "Proof Verified" : verifying ? "Verifying Proof..." : "Verify Proof"}
              </Button>
              <p className="mt-2 flex items-center justify-center gap-1 text-xs text-ur-text-muted">
                <Icon name="lock" size={12} />
                Your proof is private and secure.
              </p>
            </div>
          </div>

          {error ? <p className="text-sm text-ur-error">{error}</p> : null}

          {proof.publicInputs ? (
            <div className="ur-card p-5">
              <h2 className="font-bold text-ur-navy">Proof Payload (Public Inputs)</h2>
              <p className="mt-1 text-xs text-ur-text-secondary">Only non-sensitive information is shared for verification.</p>
              <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                <div>
                  <dt className="text-ur-text-secondary">Request ID (field element)</dt>
                  <dd className="break-all text-ur-text">{proof.publicInputs.requestId}</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">Listing ID (field element)</dt>
                  <dd className="break-all text-ur-text">{proof.publicInputs.listingId}</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">Required Viewing Fee</dt>
                  <dd className="text-ur-text">{proof.publicInputs.requiredViewingFee}</dd>
                </div>
                <div>
                  <dt className="text-ur-text-secondary">Payment Commitment</dt>
                  <dd className="break-all text-ur-text">{proof.publicInputs.paymentCommitment}</dd>
                </div>
              </dl>
              <p className="mt-3 flex items-start gap-2 rounded-ur border border-ur-border bg-ur-card-soft p-3 text-xs text-ur-text-secondary">
                <Icon name="info" size={14} className="mt-0.5 shrink-0" />
                Zero-knowledge proofs ensure your payment details remain private while proving validity.
              </p>
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          <div className="ur-card flex flex-col items-center p-5 text-center">
            <h2 className="font-bold text-ur-navy">Verification Result</h2>
            <div
              className={`my-4 grid h-20 w-20 place-items-center rounded-full border ${
                verified ? "border-ur-primary bg-ur-success-bg" : failed ? "border-ur-error bg-ur-error-bg" : "border-ur-cyan/40 bg-ur-bg-soft"
              }`}
            >
              {verified ? (
                <Icon name="check" size={36} className="text-ur-primary" />
              ) : failed ? (
                <Icon name="verified_user" size={36} className="text-ur-error" />
              ) : (
                <Icon name="hourglass_empty" size={36} className="text-ur-cyan" />
              )}
            </div>
            <p className="font-bold text-ur-navy">
              {verified ? "Verification Successful" : failed ? "Verification Failed" : "Verification in Progress"}
            </p>
            <p className="mt-1 text-sm text-ur-text-secondary">
              {verified
                ? "Your proof was verified on-chain by the Soroban smart contract."
                : failed
                  ? "The smart contract rejected this proof."
                  : "The network is verifying your proof."}
            </p>

            <div className="mt-4 w-full space-y-2 text-left">
              {resultStages.map((stage, i) => (
                <p key={stage} className="flex items-center gap-2 text-sm text-ur-text-secondary">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      i < completedStages ? "bg-ur-primary" : verifying && i === completedStages ? "bg-ur-cyan" : "bg-ur-border"
                    }`}
                  />
                  {stage}
                </p>
              ))}
            </div>
          </div>

          <div className="ur-card p-5">
            <h2 className="font-bold text-ur-navy">Verification Details</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ur-text-secondary">Network</dt>
                <dd className="text-ur-text">Stellar Testnet</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ur-text-secondary">Protocol</dt>
                <dd className="text-ur-text">Soroban</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ur-text-secondary">Status</dt>
                <dd className={verified ? "font-semibold text-ur-primary" : failed ? "font-semibold text-ur-error" : "text-ur-cyan"}>
                  {verified ? "Verified" : failed ? "Failed" : verifying ? "Verifying..." : "Pending"}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-ur-text-secondary">Tx Hash</dt>
                <dd className="truncate text-ur-text">{result?.sorobanTxHash ?? "—"}</dd>
              </div>
            </dl>
            {result?.sorobanTxHash ? (
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${result.sorobanTxHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1 text-xs font-semibold text-ur-mint hover:underline"
              >
                View on Stellar Expert
                <Icon name="open_in_new" size={12} />
              </a>
            ) : null}
          </div>

          <div className="ur-card p-5">
            <div className="flex items-center gap-2">
              <Icon name="support_agent" size={16} className="text-ur-primary" />
              <h2 className="font-bold text-ur-navy">Need Help?</h2>
            </div>
            <p className="mt-2 text-sm text-ur-text-secondary">
              Our support team is here to help you with any verification issues.
            </p>
            <Button variant="outline" className="mt-3 w-full">
              Contact Support
            </Button>
          </div>

          <div className="rounded-ur border border-ur-border bg-ur-card-soft p-4">
            <p className="flex items-center gap-2 text-xs text-ur-text-secondary">
              <Icon name="lock" size={14} />
              Access will be granted after successful verification.
            </p>
            <Link href={`/requests/${params.id}/code`}>
              <Button className="mt-3 w-full" disabled={!verified}>
                Access Property Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
