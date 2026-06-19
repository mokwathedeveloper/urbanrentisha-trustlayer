import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section className="bg-white py-10">
      <div className="ur-container">
        <div className="rounded-ur-xl border border-ur-primary/20 bg-ur-success-bg p-8 text-center lg:p-12">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-ur-primary">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-[-0.04em] text-ur-navy sm:text-4xl">
            Prove the payment. Protect the tenant. Unlock trusted rental access.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ur-text-secondary">
            Build one clean flow that shows ZK and Stellar working together for
            real-world rental trust.
          </p>
          <div className="mt-7">
            <Button size="lg">
              Start guided demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
