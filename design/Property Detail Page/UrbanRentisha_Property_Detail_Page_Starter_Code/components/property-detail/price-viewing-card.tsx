import { ArrowRight, CalendarDays, KeyRound, LockKeyhole, ReceiptText } from "lucide-react";
import type { PropertyDetail } from "@/lib/property-detail-data";
import { Button } from "@/components/ui/button";

type PriceViewingCardProps = { property: PropertyDetail };

export function PriceViewingCard({ property }: PriceViewingCardProps) {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-5 shadow-soft-dark backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">Rent and viewing access</p>
      <div className="mt-4 rounded-ur-lg border border-white/10 bg-black/18 p-5"><p className="text-sm text-white/48">Monthly rent</p><p className="mt-1 text-4xl font-black tracking-[-0.05em] text-white">KES {property.rentKes.toLocaleString()}</p><p className="mt-2 text-sm text-white/48">Deposit: KES {property.depositKes.toLocaleString()}</p></div>
      <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-ur-lg border border-white/10 bg-black/16 p-4"><ReceiptText className="mb-3 h-5 w-5 text-ur-primary" /><p className="text-xs font-bold uppercase tracking-[0.12em] text-white/38">Viewing fee</p><p className="mt-1 text-xl font-black text-white">KES {property.viewingFeeKes.toLocaleString()}</p></div><div className="rounded-ur-lg border border-white/10 bg-black/16 p-4"><CalendarDays className="mb-3 h-5 w-5 text-ur-primary" /><p className="text-xs font-bold uppercase tracking-[0.12em] text-white/38">Availability</p><p className="mt-1 text-sm font-black text-white">{property.availableFrom}</p></div></div>
      <div className="mt-4 rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-4"><div className="flex gap-3"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" /><div><p className="text-sm font-black text-ur-success">Access remains locked</p><p className="mt-1 text-sm leading-6 text-ur-success/76">Viewing details unlock only after Stellar payment and private proof verification.</p></div></div></div>
      <Button className="mt-5 w-full" size="lg"><KeyRound className="h-4 w-4" />Request viewing<ArrowRight className="h-4 w-4" /></Button>
      <p className="mt-3 text-center text-xs leading-5 text-white/42">The viewing request starts the payment-proof workflow.</p>
    </section>
  );
}
