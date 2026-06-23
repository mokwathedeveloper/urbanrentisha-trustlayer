import { PaymentStatus, ProofStatus } from "@prisma/client";

export type EscrowPhaseCode =
  | "BOOKING_PENDING"
  | "PAYMENT_RECEIVED"
  | "ESCROW_FUNDED"
  | "RELEASED"
  | "REFUNDED"
  | "FAILED";

export interface EscrowPhase {
  phase: EscrowPhaseCode;
  label: string;
  isEscrow: boolean;
  tenantId: string;
  tenantName: string;
  amount: number;
  currency: string;
  paymentId: string | null;
}

interface PaymentLike {
  id: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  escrowDepositTxHash: string | null;
}

interface RequestLike {
  payment: PaymentLike | null;
  proofVerification: { status: ProofStatus } | null;
  tenant: { user: { id: string; name: string } };
}

/**
 * Derives a human-readable escrow/booking phase from the real Payment and
 * ProofVerification state - never invents a status the backend doesn't
 * actually have. "Escrow Funded" is only claimed when escrowDepositTxHash
 * is set; the one-click treasury/manual-confirm payment paths don't use
 * the on-chain escrow contract at all, so they're labeled "Payment
 * Received" instead rather than overclaiming escrow involvement.
 */
export function computeEscrowPhase(request: RequestLike): EscrowPhase {
  const payment = request.payment;
  const tenantId = request.tenant.user.id;
  const tenantName = request.tenant.user.name;
  const amount = payment?.amount ?? 0;
  const currency = payment?.currency ?? "KES";
  const paymentId = payment?.id ?? null;
  const isEscrow = Boolean(payment?.escrowDepositTxHash);

  const base = { tenantId, tenantName, amount, currency, paymentId, isEscrow };

  if (
    !payment ||
    payment.status === PaymentStatus.AWAITING_PAYMENT ||
    payment.status === PaymentStatus.CREATED
  ) {
    return {
      ...base,
      phase: "BOOKING_PENDING",
      label: "Booking Pending - Awaiting Payment",
    };
  }
  if (payment.status === PaymentStatus.RECEIVED) {
    if (!isEscrow) {
      return { ...base, phase: "PAYMENT_RECEIVED", label: "Payment Received" };
    }
    const verified = request.proofVerification?.status === ProofStatus.VERIFIED;
    return {
      ...base,
      phase: "ESCROW_FUNDED",
      label: verified
        ? "Escrow Funded - Awaiting Release"
        : "Escrow Funded - Verification In Progress",
    };
  }
  if (payment.status === PaymentStatus.RELEASED) {
    return { ...base, phase: "RELEASED", label: "Funds Released to Landlord" };
  }
  if (payment.status === PaymentStatus.REFUNDED) {
    return { ...base, phase: "REFUNDED", label: "Refunded to Tenant" };
  }
  return { ...base, phase: "FAILED", label: "Payment Failed or Expired" };
}
