import { Injectable } from "@nestjs/common";
import {
  NotificationType,
  PaymentStatus,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { ListingsService } from "../listings/listings.service";
import { EscrowService } from "../soroban/escrow.service";
import { HoldStatus } from "../soroban/escrow.client";

/**
 * How long a payment may sit in a transitional state before this sweep
 * treats it as stale rather than merely "still in flight". Deliberately
 * generous relative to how fast these on-chain calls actually resolve
 * (seconds, on testnet) - this sweep exists for crash/network-failure
 * recovery, not as a faster path than the normal flow, so a payment that's
 * just a little slow must never get touched by it.
 */
export const DEPOSIT_RECONCILIATION_THRESHOLD_MS = 15 * 60 * 1000;
export const RELEASE_RECONCILIATION_THRESHOLD_MS = 15 * 60 * 1000;

/** Fixed id of the single row every instance/invocation contends for -
 * seeded once by the add_reconciliation_lock migration, never created by
 * application code. */
const RECONCILIATION_LOCK_ID = "reconciliation";

/**
 * How long a claimed lock is honored before it's treated as abandoned and
 * a later run may reclaim it - self-healing if a run crashes mid-sweep
 * without reaching the `finally` release. Comfortably longer than a real
 * run should ever take (every on-chain check inside is timeout-bounded),
 * comfortably shorter than the gap between scheduled runs (10 minutes in
 * local/dev's @Cron; once daily in production's Vercel Cron trigger, see
 * vercel.json - Vercel's Hobby plan caps cron frequency at once per day),
 * so a stuck lock can never survive to block the next legitimate run.
 */
const RECONCILIATION_LEASE_MS = 5 * 60 * 1000;

export interface ReconciliationRunSummary {
  status: "ok" | "skipped";
  depositsChecked: number;
  releasesChecked: number;
  repaired: number;
  flagged: number;
}

/**
 * Recovery for the gap between an on-chain operation and the database
 * write meant to record it - the exact window a server crash or network
 * failure can land in. Two independent sweeps:
 *
 *  - reconcileDeposits: AWAITING_PAYMENT rows whose deposit actually landed
 *    on-chain but never got marked RECEIVED.
 *  - reconcileReleases: RECEIVED rows whose escrow.release was claimed
 *    (see ProofVerificationService.releaseEscrowIfHeld) but never resolved
 *    in the database - either because the on-chain call never actually
 *    succeeded (clear the stale claim) or because it did and only the
 *    follow-up write was lost (mark RELEASED).
 *
 * Every on-chain check happens as a plain network call, never inside a
 * Prisma transaction. Every notification/admin fan-out happens only after
 * the relevant database write has already committed.
 */
@Injectable()
export class ReconciliationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly notifications: NotificationsService,
    private readonly listings: ListingsService,
    private readonly escrow: EscrowService,
  ) {}

  async reconcileDeposits(): Promise<{
    checked: number;
    repaired: number;
    ambiguous: number;
  }> {
    const stalePayments = await this.prisma.payment.findMany({
      where: {
        status: PaymentStatus.AWAITING_PAYMENT,
        createdAt: {
          lt: new Date(Date.now() - DEPOSIT_RECONCILIATION_THRESHOLD_MS),
        },
      },
      include: {
        viewingRequest: { include: { tenant: true, listing: true } },
      },
    });

    let repaired = 0;
    let ambiguous = 0;

    for (const payment of stalePayments) {
      try {
        const hold = await this.escrow.getHold(payment.id);

        if (!hold) {
          // No on-chain hold exists at all - this tenant simply never paid.
          // Extremely common and entirely expected; not an anomaly worth an
          // audit entry on every single sweep.
          continue;
        }

        if (hold.status !== HoldStatus.Held) {
          // Funds moved on-chain (Released/Refunded) while the database
          // never even recorded the original deposit - structurally
          // shouldn't be possible given the rest of the payment flow, so
          // this is a genuine anomaly, not something to auto-repair.
          ambiguous += 1;
          await this.auditLogs.create({
            action: "payment.reconciliation_ambiguous_deposit",
            entityType: "payment",
            entityId: payment.id,
            severity: "CRITICAL",
            metadata: {
              viewingRequestId: payment.viewingRequestId,
              dbStatus: payment.status,
              onChainHoldStatus: hold.status,
              reason:
                "On-chain hold is not Held, but the database never recorded a deposit at all. Needs manual review.",
            },
          });
          await this.notifications.notifyAdmins({
            type: NotificationType.SYSTEM,
            title: "Reconciliation: Ambiguous Payment State",
            message: `Payment ${payment.id} shows on-chain status "${hold.status}" but the database still says AWAITING_PAYMENT. Manual review needed.`,
          });
          continue;
        }

        // Held confirmed on-chain - the deposit genuinely succeeded; only
        // the follow-up database write never landed (crash/network failure).
        const tenantUserId = payment.viewingRequest.tenant.userId;

        const listingId = payment.viewingRequest.listingId;

        const { reservation, notification } = await this.prisma.$transaction(
          async (tx) => {
            const updated = await tx.payment.update({
              where: { id: payment.id },
              data: {
                status: PaymentStatus.RECEIVED,
                payerWallet: hold.payer,
                paidAt: new Date(),
              },
            });

            if (
              payment.viewingRequest.status ===
              ViewingRequestStatus.AWAITING_PAYMENT
            ) {
              await tx.viewingRequest.update({
                where: { id: payment.viewingRequestId },
                data: { status: ViewingRequestStatus.PAYMENT_RECEIVED },
              });
            }

            const reservation = await this.listings.reserveForRequest(
              listingId,
              payment.viewingRequestId,
              tenantUserId,
              tx,
            );

            await this.auditLogs.create(
              {
                action: "payment.reconciliation_deposit_repaired",
                entityType: "payment",
                entityId: payment.id,
                severity: "WARNING",
                metadata: {
                  viewingRequestId: payment.viewingRequestId,
                  payer: hold.payer,
                  amountStroops: hold.amount.toString(),
                  reason:
                    "On-chain hold confirmed Held; the database was stuck at AWAITING_PAYMENT past the reconciliation threshold.",
                },
              },
              tx,
            );

            const notification = await this.notifications.createRecord(
              {
                userId: tenantUserId,
                type: NotificationType.PAYMENT,
                title: "Payment Confirmed",
                message: `Your payment of ${updated.amount} ${updated.stellarAsset} has been confirmed in escrow.`,
                viewingRequestId: payment.viewingRequestId,
              },
              tx,
            );

            return { reservation, notification };
          },
        );

        await reservation.runPostCommitEffects();
        this.notifications.emitCreated(notification);
        await this.notifications.notifyAdmins({
          type: NotificationType.SYSTEM,
          title: "Reconciliation: Payment Repaired",
          message: `Payment ${payment.id} was stuck at AWAITING_PAYMENT despite a confirmed on-chain deposit. It has been automatically marked RECEIVED.`,
          listingId,
        });

        repaired += 1;
      } catch (error) {
        // One payment's on-chain check (or repair write) failing - a real
        // RPC blip, sequence-number contention, anything - must never abort
        // the whole sweep. Every other candidate still deserves its own
        // chance this run; this one is simply left for the next sweep to
        // retry, with a paper trail of why it didn't get fixed this time.
        await this.auditLogs.create({
          action: "payment.reconciliation_check_failed",
          entityType: "payment",
          entityId: payment.id,
          severity: "WARNING",
          metadata: {
            viewingRequestId: payment.viewingRequestId,
            reason: (error as Error).message,
          },
        });
      }
    }

    return { checked: stalePayments.length, repaired, ambiguous };
  }

  async reconcileReleases(): Promise<{
    checked: number;
    repaired: number;
    lockCleared: number;
    ambiguous: number;
  }> {
    const staleClaims = await this.prisma.payment.findMany({
      where: {
        status: PaymentStatus.RECEIVED,
        escrowReleaseTxHash: null,
        escrowReleaseClaimedAt: {
          not: null,
          lt: new Date(Date.now() - RELEASE_RECONCILIATION_THRESHOLD_MS),
        },
      },
      include: {
        viewingRequest: { include: { tenant: true, listing: true } },
      },
    });

    let repaired = 0;
    let lockCleared = 0;
    let ambiguous = 0;

    for (const payment of staleClaims) {
      try {
        const hold = await this.escrow.getHold(payment.id);

        if (!hold) {
          // A release was claimed but no on-chain hold record exists at all
          // - conflicting/missing signal, not something to resolve alone.
          ambiguous += 1;
          await this.auditLogs.create({
            action: "payment.reconciliation_ambiguous_release",
            entityType: "payment",
            entityId: payment.id,
            severity: "CRITICAL",
            metadata: {
              viewingRequestId: payment.viewingRequestId,
              reason:
                "A release was claimed for this payment, but no on-chain hold record was found at all. Needs manual review.",
            },
          });
          await this.notifications.notifyAdmins({
            type: NotificationType.SYSTEM,
            title: "Reconciliation: Ambiguous Release State",
            message: `Payment ${payment.id} has a stale release claim but no on-chain hold record was found. Manual review needed.`,
          });
          continue;
        }

        if (hold.status === HoldStatus.Held) {
          // The claim was taken but escrow.release never actually succeeded
          // on-chain - clear the stale lock so a future, legitimate release
          // attempt (the next proof submission, or a manual admin action)
          // can claim it again. Status was never touched by the claim, so
          // there is nothing to revert there.
          await this.prisma.payment.update({
            where: { id: payment.id },
            data: { escrowReleaseClaimedAt: null },
          });
          await this.auditLogs.create({
            action: "payment.reconciliation_release_lock_cleared",
            entityType: "payment",
            entityId: payment.id,
            severity: "WARNING",
            metadata: {
              viewingRequestId: payment.viewingRequestId,
              reason:
                "Release was claimed but on-chain funds are still Held past the reconciliation threshold; lock cleared for a future retry.",
            },
          });
          lockCleared += 1;
          continue;
        }

        if (hold.status === HoldStatus.Released) {
          // Confirmed on-chain - the release genuinely happened, only the
          // follow-up database write was lost (crash/network failure right
          // after the on-chain call succeeded).
          await this.prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: PaymentStatus.RELEASED,
              escrowReleasedAt: new Date(),
            },
          });
          await this.auditLogs.create({
            action: "payment.reconciliation_release_repaired",
            entityType: "payment",
            entityId: payment.id,
            severity: "WARNING",
            metadata: {
              viewingRequestId: payment.viewingRequestId,
              reason:
                "On-chain hold confirmed Released; the database never recorded it. The exact release transaction hash could not be recovered from on-chain state (get_hold does not return one) and is left unset.",
            },
          });

          const tenantUserId = payment.viewingRequest.tenant.userId;
          const listingTitle = payment.viewingRequest.listing.title;
          const contacts = await this.listings.getEscrowContacts(
            payment.viewingRequest.listingId,
          );
          await Promise.all(
            contacts.map((userId) =>
              this.notifications.create({
                userId,
                type: NotificationType.PAYMENT,
                title: "Escrow Released",
                message: `Escrow funds of ${payment.amount} ${payment.stellarAsset} for "${listingTitle}" have been released to the landlord's wallet.`,
                viewingRequestId: payment.viewingRequestId,
              }),
            ),
          );
          await this.notifications.create({
            userId: tenantUserId,
            type: NotificationType.PAYMENT,
            title: "Escrow Released",
            message: `Your escrow payment of ${payment.amount} ${payment.stellarAsset} for "${listingTitle}" has been released to the landlord.`,
            viewingRequestId: payment.viewingRequestId,
          });
          await this.notifications.notifyAdmins({
            type: NotificationType.SYSTEM,
            title: "Reconciliation: Escrow Release Repaired",
            message: `Payment ${payment.id} was confirmed Released on-chain but the database never recorded it. The release transaction hash could not be recovered automatically and may need manual lookup.`,
            listingId: payment.viewingRequest.listingId,
          });

          repaired += 1;
          continue;
        }

        // hold.status === HoldStatus.Refunded: conflicting signals - a
        // release was claimed, but the chain says this payment was actually
        // refunded. Resolving which is correct requires a human, not an
        // autonomous repair.
        ambiguous += 1;
        await this.auditLogs.create({
          action: "payment.reconciliation_ambiguous_release",
          entityType: "payment",
          entityId: payment.id,
          severity: "CRITICAL",
          metadata: {
            viewingRequestId: payment.viewingRequestId,
            onChainHoldStatus: hold.status,
            reason:
              "A release was claimed for this payment, but on-chain state shows Refunded instead. Needs manual review.",
          },
        });
        await this.notifications.notifyAdmins({
          type: NotificationType.SYSTEM,
          title: "Reconciliation: Ambiguous Release State",
          message: `Payment ${payment.id} has a stale release claim, but on-chain state shows it was Refunded instead. Manual review needed.`,
        });
      } catch (error) {
        // Same defensive guard as reconcileDeposits above - one payment's
        // on-chain check or DB write failing must never abort the sweep for
        // every other candidate.
        await this.auditLogs.create({
          action: "payment.reconciliation_check_failed",
          entityType: "payment",
          entityId: payment.id,
          severity: "WARNING",
          metadata: {
            viewingRequestId: payment.viewingRequestId,
            reason: (error as Error).message,
          },
        });
      }
    }

    return { checked: staleClaims.length, repaired, lockCleared, ambiguous };
  }

  /**
   * Single entry point for both the local/dev @Cron schedule and the
   * production Vercel Cron HTTP endpoint - exactly one place runs
   * reconcileDeposits/reconcileReleases, so neither path can drift from
   * the other. Guards against overlapping runs (e.g. a slow run still in
   * flight when the next scheduled trigger fires, or two Vercel Cron
   * invocations landing on different serverless instances at once) with a
   * DB-row lock, not an in-memory flag - serverless instances don't share
   * memory, so an in-memory guard would do nothing across instances.
   */
  async runLocked(): Promise<ReconciliationRunSummary> {
    const acquired = await this.tryAcquireLock();
    if (!acquired) {
      return {
        status: "skipped",
        depositsChecked: 0,
        releasesChecked: 0,
        repaired: 0,
        flagged: 0,
      };
    }

    try {
      const deposits = await this.reconcileDeposits();
      const releases = await this.reconcileReleases();

      return {
        status: "ok",
        depositsChecked: deposits.checked,
        releasesChecked: releases.checked,
        // Clearing a stale release-claim lock is itself an automatic
        // correction (the lock no longer matched on-chain reality), not
        // something waiting on a human - counted as repaired, alongside
        // the deposit/release rows actually fixed.
        repaired: deposits.repaired + releases.repaired + releases.lockCleared,
        flagged: deposits.ambiguous + releases.ambiguous,
      };
    } finally {
      await this.releaseLock();
    }
  }

  /** Atomic conditional claim - the same idiom as the listing-reservation
   * and escrow-release-claim fixes elsewhere in this codebase, not a
   * Postgres advisory lock (see the ReconciliationLock model's doc
   * comment in schema.prisma for why). */
  private async tryAcquireLock(): Promise<boolean> {
    const now = new Date();
    const result = await this.prisma.reconciliationLock.updateMany({
      where: {
        id: RECONCILIATION_LOCK_ID,
        OR: [{ lockedUntil: null }, { lockedUntil: { lt: now } }],
      },
      data: {
        lockedAt: now,
        lockedUntil: new Date(now.getTime() + RECONCILIATION_LEASE_MS),
      },
    });
    return result.count === 1;
  }

  /** Best-effort release - if this never runs (process killed mid-sweep),
   * the lease's own expiry is what actually guarantees recovery, not this
   * call succeeding. */
  private async releaseLock(): Promise<void> {
    await this.prisma.reconciliationLock.update({
      where: { id: RECONCILIATION_LOCK_ID },
      data: { lockedUntil: null },
    });
  }
}
