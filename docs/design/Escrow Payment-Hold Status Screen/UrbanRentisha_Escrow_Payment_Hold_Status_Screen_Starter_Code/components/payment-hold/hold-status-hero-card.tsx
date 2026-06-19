"use client";

import { Check, Copy, LockKeyhole, WalletCards } from "lucide-react";
import {
  simplifiedStatusCopy,
  type PaymentHoldRecord
} from "@/lib/payment-hold-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type HoldStatusHeroCardProps = {
  record: PaymentHoldRecord;
  copied: boolean;
  onCopy: () => void;
};

export function HoldStatusHeroCard({
  record,
  copied,
  onCopy
}: HoldStatusHeroCardProps) {
  const copy = simplifiedStatusCopy[record.status];

  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant={copy.badge}>
            <LockKeyhole className="h-3.5 w-3.5" />
            {copy.label}
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            {copy.label}
          </h2>

          <p className="mt-3 max-w-[700px] text-sm leading-6 text-white/64">
            {copy.description}
          </p>

          <div className="mt-5 rounded-ur-lg border border-white/10 bg-black/18 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/42">
              Hold reference
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm font-bold text-ur-mint">{record.holdId}</p>
              <Button size="sm" variant="outline" onClick={onCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy hold ID"}
              </Button>
            </div>
          </div>
        </div>

        <div className="min-w-[270px] rounded-ur-lg border border-white/10 bg-black/20 p-5 text-right">
          <WalletCards className="ml-auto h-7 w-7 text-ur-primary" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/42">
            Held amount
          </p>
          <p className="mt-2 text-4xl font-black tracking-[-0.05em] text-white">
            KES {record.holdAmountKes.toLocaleString()}
          </p>
          <p className="mt-2 font-mono text-lg font-bold text-ur-mint">
            {record.holdAmountXlm}
          </p>
        </div>
      </div>
    </section>
  );
}
