import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Wallet
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-ur-border bg-ur-page">
      <div className="absolute inset-0 ur-muted-grid" aria-hidden="true" />
      <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-ur-success/10 blur-3xl" />
      <div className="absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-ur-secondary/10 blur-3xl" />

      <div className="ur-container relative grid gap-12 py-20 lg:grid-cols-[1.04fr_0.96fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <Badge variant="verified" className="w-fit">
            <ShieldCheck className="h-3.5 w-3.5" />
            ZK rental payment proof on Stellar
          </Badge>

          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] text-ur-navy sm:text-6xl lg:text-7xl">
            Safer rental viewing through private payment proof.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-ur-text-secondary">
            UrbanRentisha TrustLayer helps tenants request verified property
            access, prove payment privately, and unlock viewing codes only after
            Stellar verification succeeds.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg">
              Try guided demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View API docs
            </Button>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-ur-text-secondary sm:grid-cols-3">
            {["Verified listings", "Private payment proof", "Soroban verification"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ur-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ur-card relative p-4 shadow-ur-soft lg:p-5">
          <div className="rounded-ur-lg border border-ur-border bg-ur-card-soft p-4">
            <div className="flex items-center justify-between border-b border-ur-border pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-text-muted">
                  Viewing request
                </p>
                <h2 className="mt-1 text-xl font-bold text-ur-navy">
                  Kilimani Studio Apartment
                </h2>
              </div>
              <Badge variant="verified">Verified</Badge>
            </div>

            <div className="mt-5 space-y-4">
              <HeroFlowCard
                icon={<Wallet className="h-5 w-5" />}
                label="Payment"
                title="Viewing fee received"
                status="Stellar testnet"
              />
              <HeroFlowCard
                icon={<LockKeyhole className="h-5 w-5" />}
                label="ZK Proof"
                title="Private proof generated"
                status="No wallet history exposed"
              />
              <HeroFlowCard
                icon={<ShieldCheck className="h-5 w-5" />}
                label="Verification"
                title="Soroban proof verified"
                status="Access unlocked"
              />
            </div>

            <div className="mt-5 rounded-ur border border-ur-primary/20 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ur-text-muted">
                Viewing Code
              </p>
              <div className="mt-2 flex items-center justify-between gap-4">
                <code className="rounded-ur-sm bg-ur-success-bg px-3 py-2 font-mono text-sm font-semibold text-ur-primary">
                  VIEW-8K29XQ
                </code>
                <Badge variant="verified">Ready</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroFlowCard({
  icon,
  label,
  title,
  status
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-ur border border-ur-border bg-white p-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-ur bg-ur-success-bg text-ur-primary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-ur-text-muted">
          {label}
        </p>
        <p className="mt-1 font-semibold text-ur-navy">{title}</p>
      </div>
      <span className="hidden text-right text-xs font-medium text-ur-text-secondary sm:block">
        {status}
      </span>
    </div>
  );
}
