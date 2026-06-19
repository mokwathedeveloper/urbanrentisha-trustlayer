"use client";

import { X, ArrowRight, LockKeyhole, ReceiptText, ShieldCheck, Wallet } from "lucide-react";
import type { PropertyListing } from "@/lib/listings-data";
import { Button } from "@/components/ui/button";

type RequestViewingPanelProps = { property: PropertyListing | null; onClose: () => void };

export function RequestViewingPanel({ property, onClose }: RequestViewingPanelProps) {
  const open = Boolean(property);
  return (
    <div className={open ? "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" : "pointer-events-none fixed inset-0 z-50 bg-black/0"} aria-hidden={!open}>
      <aside className={open ? "absolute right-0 top-0 h-full w-full max-w-[460px] translate-x-0 border-l border-white/10 bg-ur-bg p-5 shadow-soft-dark transition-transform duration-200" : "absolute right-0 top-0 h-full w-full max-w-[460px] translate-x-full border-l border-white/10 bg-ur-bg p-5 shadow-soft-dark transition-transform duration-200"} aria-label="Request viewing panel">
        {property ? (
          <div className="flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Secure viewing request</p><h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Request viewing</h2></div>
              <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/64 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="Close request viewing panel"><X className="h-4 w-4" /></button>
            </div>
            <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-lg font-black text-white">{property.title}</p><p className="mt-2 text-sm text-white/56">{property.location}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <InfoTile label="Rent" value={`KES ${property.priceKes.toLocaleString()}`} />
                <InfoTile label="Viewing fee" value={`KES ${property.viewingFeeKes.toLocaleString()}`} />
                <InfoTile label="Trust score" value={`${property.trustScore}%`} />
                <InfoTile label="Listing ID" value={property.id} mono />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <FlowItem icon={<ReceiptText className="h-5 w-5" />} title="1. Create viewing request" description="The request links the tenant, property, agent, and required viewing fee." />
              <FlowItem icon={<Wallet className="h-5 w-5" />} title="2. Pay through Stellar" description="The payment condition is tracked before viewing access is released." />
              <FlowItem icon={<LockKeyhole className="h-5 w-5" />} title="3. Generate ZK payment proof" description="Proof confirms payment without exposing unrelated wallet activity." />
              <FlowItem icon={<ShieldCheck className="h-5 w-5" />} title="4. Unlock viewing details" description="Viewing code unlocks only after proof verification succeeds." />
            </div>
            <div className="mt-auto pt-5"><Button className="w-full" size="lg">Continue to request<ArrowRight className="h-4 w-4" /></Button><p className="mt-3 text-center text-xs leading-5 text-white/42">Access details stay locked until payment proof verification is complete.</p></div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function InfoTile({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return <div className="rounded-ur-sm border border-white/10 bg-black/16 p-3"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">{label}</p><p className={mono ? "mt-1 font-mono text-xs font-bold text-ur-mint" : "mt-1 text-sm font-black text-white"}>{value}</p></div>;
}

function FlowItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return <div className="rounded-ur-lg border border-white/10 bg-white/[0.035] p-4"><div className="flex gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">{icon}</div><div><p className="text-sm font-black text-white">{title}</p><p className="mt-1 text-sm leading-6 text-white/56">{description}</p></div></div></div>;
}
