"use client";

import { useState } from "react";
import { ExternalLink, ShieldAlert, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusNotice } from "@/components/auth/status-notice";

export function WalletLoginPanel() {
  const [status, setStatus] = useState<"idle" | "connecting">("idle");

  function connectWallet() {
    setStatus("connecting");
    window.setTimeout(() => setStatus("idle"), 1100);
  }

  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/14 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-white/5 text-ur-mint">
          <Wallet className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-black tracking-[-0.02em] text-white">
            Wallet-based access
          </h2>
          <p className="mt-1 text-sm leading-5 text-white/58">
            Connect a Stellar-compatible wallet for payment and proof flows.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button variant="outline" onClick={connectWallet} disabled={status === "connecting"}>
          <Zap className="h-4 w-4" />
          {status === "connecting" ? "Connecting..." : "Connect wallet"}
        </Button>

        <Button variant="secondary">
          Wallet guide
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <StatusNotice
        className="mt-4"
        tone="warning"
        title="Security rule"
        description="Never enter seed phrases or private keys. This screen should only request safe wallet connection."
        icon={<ShieldAlert className="h-4 w-4" />}
      />
    </div>
  );
}
