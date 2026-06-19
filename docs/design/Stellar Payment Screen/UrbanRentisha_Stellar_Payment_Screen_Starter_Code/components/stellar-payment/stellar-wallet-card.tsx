"use client";

import { ArrowRight, CheckCircle2, Loader2, Send, Wallet } from "lucide-react";
import type { PaymentStatus, StellarPaymentRequest } from "@/lib/stellar-payment-data";
import { Button } from "@/components/ui/button";

type StellarWalletCardProps = {
  request: StellarPaymentRequest;
  status: PaymentStatus;
  onConnectWallet: () => void;
  onSubmitPayment: () => void;
};

export function StellarWalletCard({
  request,
  status,
  onConnectWallet,
  onSubmitPayment
}: StellarWalletCardProps) {
  const walletConnected = status !== "idle";
  const busy = status === "submitting" || status === "confirming";
  const confirmed = status === "confirmed";

  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Stellar testnet wallet
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Connect wallet and submit payment.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/58">
          This starter simulates the wallet connection and payment confirmation. Connect this UI to Freighter or another Stellar-compatible wallet later.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <WalletTile label="Tenant wallet" value={request.tenantWallet} connected={walletConnected} />
        <WalletTile label="Platform receiving wallet" value={request.platformWallet} connected />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          variant={walletConnected ? "secondary" : "primary"}
          className="w-full"
          onClick={onConnectWallet}
          disabled={walletConnected}
        >
          {walletConnected ? <CheckCircle2 className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
          {walletConnected ? "Wallet connected" : "Connect testnet wallet"}
        </Button>

        <Button
          size="lg"
          className="w-full"
          onClick={onSubmitPayment}
          disabled={!walletConnected || busy || confirmed}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {confirmed ? "Payment confirmed" : busy ? "Submitting payment..." : "Pay viewing fee"}
          {!busy && !confirmed ? <ArrowRight className="h-4 w-4" /> : null}
        </Button>
      </div>
    </section>
  );
}

function WalletTile({
  label,
  value,
  connected
}: {
  label: string;
  value: string;
  connected?: boolean;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{label}</p>
        {connected ? (
          <span className="rounded-full border border-ur-success/25 bg-ur-success-bg px-2 py-1 text-[11px] font-bold text-ur-success">
            Connected
          </span>
        ) : (
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-bold text-white/42">
            Not connected
          </span>
        )}
      </div>
      <p className="font-mono text-sm font-bold text-white">{value}</p>
    </div>
  );
}
