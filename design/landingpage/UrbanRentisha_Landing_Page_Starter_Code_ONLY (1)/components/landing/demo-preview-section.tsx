import { Activity, CheckCircle2, KeyRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DemoPreviewSection() {
  return (
    <section className="ur-section bg-ur-page">
      <div className="ur-container">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="ur-card p-6 lg:p-8">
            <Badge variant="verified">Hackathon demo mode</Badge>
            <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-ur-navy">
              One guided flow for tenants, admins, and judges.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ur-text-secondary">
              Demo mode should show the full story quickly: request viewing,
              confirm payment, generate proof, verify proof, unlock code, and
              record the action in the audit log.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button>Start demo mode</Button>
              <Button variant="outline">Open audit log</Button>
            </div>
          </div>

          <div className="ur-card p-6">
            <div className="space-y-4">
              <DemoStatus
                icon={<CheckCircle2 className="h-5 w-5" />}
                label="Proof verified"
                description="Soroban verification succeeded."
              />
              <DemoStatus
                icon={<KeyRound className="h-5 w-5" />}
                label="Code generated"
                description="Viewing code is ready."
              />
              <DemoStatus
                icon={<Activity className="h-5 w-5" />}
                label="Audit recorded"
                description="Admin sees complete event trail."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoStatus({
  icon,
  label,
  description
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-ur border border-ur-border bg-ur-card-soft p-4">
      <div className="grid h-11 w-11 place-items-center rounded-ur bg-white text-ur-primary">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-ur-navy">{label}</p>
        <p className="text-sm text-ur-text-secondary">{description}</p>
      </div>
    </div>
  );
}
