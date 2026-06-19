import Link from "next/link";
import { ArrowRight, ClipboardCheck, Database, ShieldAlert, ShieldCheck } from "lucide-react";
import { adminProfile } from "@/lib/admin-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminOverviewHero() {
  return (
    <section className="rounded-ur-xl border border-ur-primary/20 bg-ur-primary/8 p-6 shadow-soft-dark backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          <Badge variant="success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Trust operations live
          </Badge>

          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white">
            Platform control center
          </h2>

          <p className="mt-2 max-w-[780px] text-sm leading-6 text-white/62">
            Review approvals, monitor proof verification, resolve safety reports, investigate suspicious activity, and maintain a reliable audit trail across the UrbanRentisha trust layer.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <InfoTile icon={<ClipboardCheck className="h-4 w-4" />} label="Pending approvals" value={`${adminProfile.pendingApprovals}`} />
            <InfoTile icon={<ShieldAlert className="h-4 w-4" />} label="Risk flags" value={`${adminProfile.suspiciousFlags}`} />
            <InfoTile icon={<Database className="h-4 w-4" />} label="Admin ID" value={adminProfile.id} />
          </div>
        </div>

        <div className="min-w-[300px] rounded-ur-lg border border-ur-error/20 bg-ur-error-bg p-5">
          <ShieldAlert className="h-8 w-8 text-ur-error" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-ur-error/72">
            High priority
          </p>
          <p className="mt-2 text-3xl font-black text-white">{adminProfile.openReports} open reports</p>
          <p className="mt-2 text-sm leading-6 text-ur-error/72">
            Unsafe payment reports and suspicious listing patterns should be reviewed first.
          </p>

          <Link href="/admin/reports" className="mt-5 block">
            <Button variant="danger" className="w-full">
              Open report center
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function InfoTile({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-ur-lg border border-white/10 bg-black/16 p-4">
      <div className="mb-3 text-ur-primary">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">
        {label}
      </p>
      <p className="mt-2 truncate font-mono text-sm font-bold text-ur-mint">
        {value}
      </p>
    </div>
  );
}
