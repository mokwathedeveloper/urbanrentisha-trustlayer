import { ArrowRight, ShieldCheck } from "lucide-react";
import { requestFlow } from "@/lib/request-viewing-data";

export function PaymentProofExplainer() {
  return (
    <section className="rounded-ur-xl border border-white/10 bg-white/[0.035] p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-mint">
          What happens after request creation
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          Your request moves into payment and proof verification.
        </h2>
        <p className="mt-3 max-w-[760px] text-sm leading-6 text-white/58">
          The request is only the first step. Viewing access remains locked until the payment condition is verified privately.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        {requestFlow.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="relative">
              <article className="h-full rounded-ur-lg border border-white/10 bg-black/16 p-5">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-ur bg-ur-primary/10 text-ur-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">{item.description}</p>
              </article>

              {index < requestFlow.length - 1 ? (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-ur-primary lg:block" />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-ur-lg border border-ur-primary/20 bg-ur-success-bg p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ur-success" />
          <div>
            <p className="text-sm font-black text-ur-success">Tenant privacy note</p>
            <p className="mt-1 text-sm leading-6 text-ur-success/78">
              The proof confirms the payment condition without exposing unrelated wallet activity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
