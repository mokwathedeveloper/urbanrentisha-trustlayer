import Link from "next/link";

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const statusLabels: Record<string, { label: string; tone: string }> = {
  CREATED: { label: "Created", tone: "text-ur-text-muted border-ur-border" },
  AWAITING_PAYMENT: { label: "Pending", tone: "text-ur-warning border-ur-warning/40" },
  PAYMENT_RECEIVED: { label: "Payment Received", tone: "text-ur-cyan border-ur-cyan/40" },
  PROOF_GENERATING: { label: "Generating Proof", tone: "text-ur-cyan border-ur-cyan/40" },
  PROOF_READY: { label: "Proof Ready", tone: "text-ur-cyan border-ur-cyan/40" },
  PROOF_VERIFIED: { label: "Proof Verified", tone: "text-ur-primary border-ur-primary/40" },
  ACCESS_UNLOCKED: { label: "Approved", tone: "text-ur-primary border-ur-primary/40" },
  EXPIRED: { label: "Expired", tone: "text-ur-error border-ur-error/40" },
  REVOKED: { label: "Revoked", tone: "text-ur-error border-ur-error/40" },
  CANCELLED: { label: "Cancelled", tone: "text-ur-text-muted border-ur-border" },
};

export function StatusBadge({ status }: { status: string }) {
  const meta = statusLabels[status] ?? { label: status, tone: "text-ur-text-muted border-ur-border" };
  return <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.tone}`}>{meta.label}</span>;
}

export const activeStatuses = ["CREATED", "AWAITING_PAYMENT", "PAYMENT_RECEIVED", "PROOF_GENERATING", "PROOF_READY", "PROOF_VERIFIED"];

export function nextStepHref(requestId: string, status: string): string {
  switch (status) {
    case "CREATED":
    case "AWAITING_PAYMENT":
      return `/requests/${requestId}/payment`;
    case "PAYMENT_RECEIVED":
      return `/requests/${requestId}/proof`;
    case "PROOF_GENERATING":
    case "PROOF_READY":
      return `/requests/${requestId}/proof`;
    case "PROOF_VERIFIED":
      return `/requests/${requestId}/verify`;
    case "ACCESS_UNLOCKED":
      return `/requests/${requestId}/code`;
    default:
      return `/requests/${requestId}/escrow`;
  }
}

export function nextStepLabel(status: string): string {
  switch (status) {
    case "CREATED":
    case "AWAITING_PAYMENT":
      return "Complete Payment";
    case "PAYMENT_RECEIVED":
    case "PROOF_GENERATING":
    case "PROOF_READY":
      return "Generate Proof";
    case "PROOF_VERIFIED":
      return "Verify Proof";
    case "ACCESS_UNLOCKED":
      return "View Code";
    default:
      return "View Details";
  }
}

export function Panel({
  title,
  viewAllHref,
  children,
}: {
  title: string;
  viewAllHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ur-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ur-navy">{title}</p>
        {viewAllHref ? (
          <Link href={viewAllHref} className="text-xs font-semibold text-ur-primary hover:underline">
            View All
          </Link>
        ) : null}
      </div>
      <div className="mt-3 divide-y divide-ur-border">{children}</div>
    </div>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-3 py-2.5">{children}</div>;
}

export function EmptyRow({ text }: { text: string }) {
  return <p className="py-3 text-sm text-ur-text-muted">{text}</p>;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  color,
  loading,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  color: string;
  loading?: boolean;
}) {
  return (
    <div className="ur-card p-4">
      <Icon className={`h-4 w-4 ${color}`} />
      <p className="mt-2 text-xs text-ur-text-secondary">{label}</p>
      <p className="text-xl font-black text-ur-navy">{loading ? "—" : value}</p>
    </div>
  );
}
