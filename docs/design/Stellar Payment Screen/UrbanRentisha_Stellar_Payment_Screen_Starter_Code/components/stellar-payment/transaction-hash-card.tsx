"use client";

import { Check, Copy, ExternalLink, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

type TransactionHashCardProps = {
  hash: string;
  copied: boolean;
  onCopy: () => void;
};

export function TransactionHashCard({
  hash,
  copied,
  onCopy
}: TransactionHashCardProps) {
  const shortHash = `${hash.slice(0, 16)}...${hash.slice(-16)}`;

  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5 flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
          <Hash className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
            Transaction hash
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
            Payment transaction confirmed.
          </h2>
          <p className="mt-2 text-sm leading-6 text-ur-success/78">
            Store this hash for proof generation and audit tracking.
          </p>
        </div>
      </div>

      <div className="rounded-ur-lg border border-ur-success/20 bg-black/18 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
          Full hash
        </p>
        <p className="mt-2 break-all font-mono text-sm leading-6 text-white">{hash}</p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button className="w-full" onClick={onCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy transaction hash"}
        </Button>

        <Button variant="outline" className="w-full">
          View on testnet explorer
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-3 font-mono text-xs text-ur-success/70">{shortHash}</p>
    </section>
  );
}
