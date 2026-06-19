import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, KeyRound, ReceiptText } from "lucide-react";
import type { RequestFormState } from "@/components/request-viewing/request-viewing-page";
import type { ViewingProperty } from "@/lib/request-viewing-data";
import { Button } from "@/components/ui/button";

type RequestSuccessPanelProps = {
  requestId: string;
  property: ViewingProperty;
  formState: RequestFormState;
};

export function RequestSuccessPanel({
  requestId,
  property,
  formState
}: RequestSuccessPanelProps) {
  return (
    <section className="rounded-ur-xl border border-ur-success/25 bg-ur-success-bg p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="grid h-14 w-14 place-items-center rounded-ur-lg bg-ur-primary text-white shadow-green-glow">
        <CheckCircle2 className="h-7 w-7" />
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-success">
        Viewing request created
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">
        Request saved. Payment proof is next.
      </h2>
      <p className="mt-3 max-w-[720px] text-sm leading-6 text-ur-success/80">
        Your viewing request has been created for {property.title}. Access details are still locked until the viewing fee payment and proof verification are completed.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SuccessMetric icon={<KeyRound className="h-4 w-4" />} label="Request ID" value={requestId} mono />
        <SuccessMetric icon={<ReceiptText className="h-4 w-4" />} label="Viewing fee" value={`KES ${property.viewingFeeKes.toLocaleString()}`} />
        <SuccessMetric icon={<CalendarDays className="h-4 w-4" />} label="Date" value={formState.date} />
        <SuccessMetric icon={<Clock3 className="h-4 w-4" />} label="Time" value={formState.time} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={`/stellar-payment/${requestId}`} className="w-full sm:w-auto">
          <Button size="lg" className="w-full">
            Continue to Stellar payment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/tenant/dashboard" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full">
            View dashboard
          </Button>
        </Link>
      </div>
    </section>
  );
}

function SuccessMetric({
  icon,
  label,
  value,
  mono
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-ur-sm border border-ur-success/20 bg-black/16 p-3">
      <div className="mb-2 text-ur-success">{icon}</div>
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ur-success/64">{label}</p>
      <p className={mono ? "mt-1 font-mono text-sm font-bold text-white" : "mt-1 text-sm font-black text-white"}>
        {value}
      </p>
    </div>
  );
}
