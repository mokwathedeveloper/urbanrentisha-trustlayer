import { PaymentStatus, ProofStatus } from "@prisma/client";
import { summarizePayments } from "./escrow-summary.util";

function payment(overrides: {
  amount: number;
  status: PaymentStatus;
  listingId?: string;
  isEscrow?: boolean;
  proofStatus?: ProofStatus | null;
  currency?: string;
}) {
  return {
    amount: overrides.amount,
    currency: overrides.currency ?? "KES",
    status: overrides.status,
    listingId: overrides.listingId ?? "listing-1",
    isEscrow: overrides.isEscrow ?? false,
    proofStatus: overrides.proofStatus ?? null,
  };
}

describe("summarizePayments", () => {
  it("returns all-zero defaults for an empty payment list", () => {
    const result = summarizePayments([]);
    expect(result.totalReceived).toBe(0);
    expect(result.escrowHeldAmount).toBe(0);
    expect(result.currency).toBe("KES");
    expect(result.activePropertiesWithEscrow).toBe(0);
  });

  it("counts RECEIVED and RELEASED payments toward totalReceived, but not FAILED/EXPIRED", () => {
    const result = summarizePayments([
      payment({ amount: 100, status: PaymentStatus.RECEIVED }),
      payment({ amount: 200, status: PaymentStatus.RELEASED }),
      payment({ amount: 50, status: PaymentStatus.FAILED }),
      payment({ amount: 75, status: PaymentStatus.EXPIRED }),
    ]);
    expect(result.totalReceived).toBe(300);
  });

  it("excludes only FAILED/EXPIRED from totalManaged", () => {
    const result = summarizePayments([
      payment({ amount: 100, status: PaymentStatus.RECEIVED }),
      payment({ amount: 200, status: PaymentStatus.RELEASED }),
      payment({ amount: 30, status: PaymentStatus.REFUNDED }),
      payment({ amount: 50, status: PaymentStatus.FAILED }),
      payment({ amount: 75, status: PaymentStatus.EXPIRED }),
    ]);
    expect(result.totalManaged).toBe(330);
  });

  it("only counts RECEIVED + isEscrow toward escrowHeldAmount/Count", () => {
    const result = summarizePayments([
      payment({ amount: 100, status: PaymentStatus.RECEIVED, isEscrow: true }),
      payment({
        amount: 999,
        status: PaymentStatus.RECEIVED,
        isEscrow: false,
      }),
      payment({ amount: 50, status: PaymentStatus.RELEASED, isEscrow: true }),
    ]);
    expect(result.escrowHeldAmount).toBe(100);
    expect(result.escrowHeldCount).toBe(1);
  });

  it("only counts pendingRelease when escrow-held AND proof is VERIFIED", () => {
    const result = summarizePayments([
      payment({
        amount: 100,
        status: PaymentStatus.RECEIVED,
        isEscrow: true,
        proofStatus: ProofStatus.VERIFIED,
      }),
      payment({
        amount: 200,
        status: PaymentStatus.RECEIVED,
        isEscrow: true,
        proofStatus: ProofStatus.SUBMITTED,
      }),
      payment({
        amount: 300,
        status: PaymentStatus.RECEIVED,
        isEscrow: false,
        proofStatus: ProofStatus.VERIFIED,
      }),
    ]);
    expect(result.pendingReleaseAmount).toBe(100);
    expect(result.pendingReleaseCount).toBe(1);
  });

  it("tracks totalReleased/totalRefunded and completedTransactions independently", () => {
    const result = summarizePayments([
      payment({ amount: 100, status: PaymentStatus.RELEASED }),
      payment({ amount: 50, status: PaymentStatus.RELEASED }),
      payment({ amount: 30, status: PaymentStatus.REFUNDED }),
    ]);
    expect(result.totalReleased).toBe(150);
    expect(result.totalRefunded).toBe(30);
    expect(result.completedTransactions).toBe(3);
  });

  it("counts distinct listing IDs with a RECEIVED payment toward activePropertiesWithEscrow", () => {
    const result = summarizePayments([
      payment({ amount: 1, status: PaymentStatus.RECEIVED, listingId: "a" }),
      payment({ amount: 1, status: PaymentStatus.RECEIVED, listingId: "a" }),
      payment({ amount: 1, status: PaymentStatus.RECEIVED, listingId: "b" }),
      payment({ amount: 1, status: PaymentStatus.RELEASED, listingId: "c" }),
    ]);
    expect(result.activePropertiesWithEscrow).toBe(2);
  });

  it("uses the first payment's currency, defaulting to KES when there are no payments", () => {
    const result = summarizePayments([
      payment({ amount: 1, status: PaymentStatus.RECEIVED, currency: "USD" }),
    ]);
    expect(result.currency).toBe("USD");
  });
});
