import { PaymentStatus, ProofStatus } from "@prisma/client";

export interface EscrowSummary {
  currency: string;
  totalReceived: number;
  totalManaged: number;
  escrowHeldAmount: number;
  escrowHeldCount: number;
  pendingReleaseAmount: number;
  pendingReleaseCount: number;
  totalReleased: number;
  totalRefunded: number;
  completedTransactions: number;
  activePropertiesWithEscrow: number;
  activeBookings: number;
  completedBookings: number;
}

interface PaymentLike {
  amount: number;
  currency: string;
  status: PaymentStatus;
  listingId: string;
  isEscrow: boolean;
  proofStatus: ProofStatus | null;
}

const NON_TERMINAL_REQUEST_VALUE_STATUSES = new Set<PaymentStatus>([
  PaymentStatus.RECEIVED,
  PaymentStatus.RELEASED,
]);

/**
 * Pure summarization - takes the same payment rows EscrowReportingService
 * already fetches and reduces them to the dashboard card numbers. Kept
 * separate from the Prisma queries so the arithmetic is easy to verify
 * and reused identically for tenant, landlord, and agent/manager views.
 */
export function summarizePayments(
  payments: PaymentLike[],
): Omit<EscrowSummary, "activeBookings" | "completedBookings"> {
  const currency = payments[0]?.currency ?? "KES";
  let totalReceived = 0;
  let totalManaged = 0;
  let escrowHeldAmount = 0;
  let escrowHeldCount = 0;
  let pendingReleaseAmount = 0;
  let pendingReleaseCount = 0;
  let totalReleased = 0;
  let totalRefunded = 0;
  let completedTransactions = 0;
  const activeListingIds = new Set<string>();

  for (const payment of payments) {
    if (NON_TERMINAL_REQUEST_VALUE_STATUSES.has(payment.status)) {
      totalReceived += payment.amount;
    }
    if (
      payment.status !== PaymentStatus.FAILED &&
      payment.status !== PaymentStatus.EXPIRED
    ) {
      totalManaged += payment.amount;
    }
    if (payment.status === PaymentStatus.RECEIVED) {
      activeListingIds.add(payment.listingId);
      if (payment.isEscrow) {
        escrowHeldAmount += payment.amount;
        escrowHeldCount += 1;
        if (payment.proofStatus === ProofStatus.VERIFIED) {
          pendingReleaseAmount += payment.amount;
          pendingReleaseCount += 1;
        }
      }
    }
    if (payment.status === PaymentStatus.RELEASED) {
      totalReleased += payment.amount;
      completedTransactions += 1;
    }
    if (payment.status === PaymentStatus.REFUNDED) {
      totalRefunded += payment.amount;
      completedTransactions += 1;
    }
  }

  return {
    currency,
    totalReceived,
    totalManaged,
    escrowHeldAmount,
    escrowHeldCount,
    pendingReleaseAmount,
    pendingReleaseCount,
    totalReleased,
    totalRefunded,
    completedTransactions,
    activePropertiesWithEscrow: activeListingIds.size,
  };
}
