"use client";

import { Check, Copy, Eye, EyeOff, KeyRound, LockKeyhole, TimerReset } from "lucide-react";
import type { ViewingCodeRecord } from "@/lib/viewing-code-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ViewingCodeHeroCardProps = {
  record: ViewingCodeRecord;
  visible: boolean;
  copied: boolean;
  onToggleVisible: () => void;
  onCopy: () => void;
};

export function ViewingCodeHeroCard({
  record,
  visible,
  copied,
  onToggleVisible,
  onCopy
}: ViewingCodeHeroCardProps) {
  const displayedCode = visible ? record.viewingCode : "•••• •••• ••••";

  return (
    <section className="overflow-hidden rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <KeyRound className="h-3.5 w-3.5" />
            Viewing code unlocked
          </Badge>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
            Use this code for property access.
          </h2>

          <p className="mt-3 max-w-[680px] text-sm leading-6 text-ur-success/78">
            The code is active for the selected property and viewing time only. Share it with the verified agent or the designated access point.
          </p>
        </div>

        <div className="min-w-[260px] rounded-ur-lg border border-ur-success/20 bg-black/18 p-5 text-right">
          <TimerReset className="ml-auto h-7 w-7 text-ur-success" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-success/64">
            Code expires
          </p>
          <p className="mt-2 text-sm font-black text-white">{record.codeExpiresAt}</p>
        </div>
      </div>

      <div className="mt-6 rounded-ur-xl border border-ur-success/20 bg-black/24 p-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-success/70">
          Viewing access code
        </p>
        <p className="mt-3 break-all font-mono text-[38px] font-black tracking-[0.08em] text-white sm:text-[54px]">
          {displayedCode}
        </p>

        <div className="mx-auto mt-5 flex max-w-[520px] flex-col gap-3 sm:flex-row">
          <Button className="w-full" onClick={onCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy code"}
          </Button>

          <Button variant="outline" className="w-full" onClick={onToggleVisible}>
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {visible ? "Hide code" : "Show code"}
          </Button>
        </div>
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-primary/8 p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-primary" />
          <p className="text-sm leading-6 text-white/62">
            This code was unlocked only after Stellar payment, ZK proof generation, and proof verification were completed.
          </p>
        </div>
      </div>
    </section>
  );
}
