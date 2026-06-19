"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ReportListingModalProps = { open: boolean; propertyTitle: string; onClose: () => void };

const reportReasons = ["Fake or suspicious listing", "Agent requested payment outside platform", "Incorrect property information", "Unsafe communication", "Other concern"];

export function ReportListingModal({ open, propertyTitle, onClose }: ReportListingModalProps) {
  const [selectedReason, setSelectedReason] = useState(reportReasons[0]);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-sm">
      <section className="w-full max-w-[560px] rounded-ur-xl border border-white/10 bg-ur-bg p-5 shadow-soft-dark">
        <div className="mb-5 flex items-start justify-between gap-4"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ur-error/25 bg-ur-error-bg px-3 py-1 text-xs font-bold text-ur-error"><AlertTriangle className="h-3.5 w-3.5" />Report listing</div><h2 className="text-2xl font-black tracking-[-0.04em] text-white">Report a concern</h2><p className="mt-2 text-sm leading-6 text-white/58">Report suspicious activity for <span className="font-bold text-white">{propertyTitle}</span>.</p></div><button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-ur-sm border border-white/10 text-white/64 transition-colors hover:border-ur-primary/50 hover:bg-white/5 hover:text-white ur-focus" aria-label="Close report modal"><X className="h-4 w-4" /></button></div>
        {submitted ? (
          <div className="rounded-ur-lg border border-ur-success/20 bg-ur-success-bg p-5"><div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-ur-success" /><div><p className="font-black text-ur-success">Report submitted</p><p className="mt-2 text-sm leading-6 text-ur-success/78">The UrbanRentisha trust team can now review the listing and agent activity.</p></div></div><Button className="mt-5 w-full" onClick={onClose}>Done</Button></div>
        ) : (
          <>
            <div className="space-y-2">{reportReasons.map((reason) => <label key={reason} className="flex cursor-pointer items-center gap-3 rounded-ur-sm border border-white/10 bg-white/[0.035] p-3 transition-colors hover:border-white/20 hover:bg-white/[0.055]"><input type="radio" name="report-reason" value={reason} checked={selectedReason === reason} onChange={() => setSelectedReason(reason)} className="h-4 w-4 accent-ur-error" /><span className="text-sm font-bold text-white/72">{reason}</span></label>)}</div>
            <div className="mt-4 space-y-2"><label htmlFor="report-details" className="block text-xs font-semibold tracking-[0.04em] text-white/78">Extra details</label><textarea id="report-details" placeholder="Add details that can help the trust team investigate..." className="min-h-[120px] w-full resize-y rounded-ur-sm border border-white/12 bg-ur-input p-3 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-ur-primary" /></div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row"><Button variant="danger" className="w-full" onClick={() => setSubmitted(true)}>Submit report</Button><Button variant="outline" className="w-full" onClick={onClose}>Cancel</Button></div>
          </>
        )}
      </section>
    </div>
  );
}
