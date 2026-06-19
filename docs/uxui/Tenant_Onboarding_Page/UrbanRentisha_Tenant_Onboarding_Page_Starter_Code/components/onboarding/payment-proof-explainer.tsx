import { LockKeyhole, ShieldCheck } from "lucide-react";
import { proofReasons } from "@/lib/onboarding-data";

export function PaymentProofExplainer() {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
        <div className="grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
          <LockKeyhole className="h-6 w-6" />
        </div>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          Why payment proof is required
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          The platform must confirm the viewing payment condition before showing private access details.
        </h2>

        <p className="mt-4 text-sm leading-6 text-white/62">
          A payment proof protects the tenant and the platform. It confirms the
          required condition was met before releasing the viewing code, agent
          instructions, or private appointment details.
        </p>

        <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-4">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
            <div>
              <p className="text-sm font-black text-ur-success">Privacy rule</p>
              <p className="mt-1 text-sm leading-6 text-ur-success/78">
                Prove the payment condition. Do not expose unrelated wallet activity.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {proofReasons.map((reason) => {
          const Icon = reason.icon;

          return (
            <article key={reason.title} className="rounded-ur-lg border border-white/10 bg-black/16 p-5 transition-colors hover:bg-white/[0.045]">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-white">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/58">{reason.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
