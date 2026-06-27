import { Icon, type IconName } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const toneClasses = {
  cyan: { border: "border-ur-cyan/30", bg: "bg-ur-bg-soft", text: "text-ur-cyan" },
  primary: { border: "border-ur-primary/25", bg: "bg-ur-success-bg", text: "text-ur-primary" },
  warning: { border: "border-ur-warning/30", bg: "bg-ur-warning-bg", text: "text-ur-warning" },
} as const;

/**
 * Shared visual shell for "this is actively happening" banners - same
 * border/background language already used on the proof and verify pages
 * (rounded-ur border + tinted bg + leading icon), now with a real spinner
 * driving the motion instead of a plain animate-pulse icon, and a
 * consistent title/subtitle slot so payment/escrow/proof/verify pages
 * don't each hand-roll their own copy of this banner.
 */
export function ProcessingBanner({
  icon,
  tone = "cyan",
  title,
  subtitle,
  className,
}: {
  icon: IconName;
  tone?: keyof typeof toneClasses;
  title: string;
  subtitle: string;
  className?: string;
}) {
  const t = toneClasses[tone];
  return (
    <div
      role="status"
      className={cn("flex items-center gap-3 rounded-ur border p-4", t.border, t.bg, className)}
    >
      <div className={cn("relative grid h-9 w-9 shrink-0 place-items-center", t.text)}>
        <Spinner size="lg" className="absolute inset-0" aria-label="" />
        <Icon name={icon} size={16} />
      </div>
      <div>
        <p className={cn("text-sm font-bold", t.text)}>{title}</p>
        <p className="text-xs text-ur-text-secondary">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Never claims success on its own - it only renders while the caller's
 * own `paying`/mutation-pending state is true, and that state is only
 * ever set from a real pending request (see requests/[id]/payment/page.tsx).
 * The actual "Payment Received" state is a separate, distinct render
 * branch driven by the backend's response, not this component.
 */
export function PaymentProcessingState({
  title = "Confirming payment on Stellar...",
  subtitle = "Submitting your transaction to the network. This usually takes a few seconds.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return <ProcessingBanner icon="credit_card" tone="cyan" title={title} subtitle={subtitle} />;
}

/**
 * Shared between the ZK proof generation and proof verification pages -
 * same "actively working, don't navigate away" signal, different copy per
 * stage via props. Like PaymentProcessingState, never implies success;
 * the VERIFIED/FAILED branches are rendered separately once the backend
 * actually responds.
 */
export function VerificationProcessingState({
  title = "Verifying proof securely...",
  subtitle = "Your zero-knowledge proof is being checked. This usually takes 15-30 seconds.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return <ProcessingBanner icon="verified_user" tone="cyan" title={title} subtitle={subtitle} />;
}
