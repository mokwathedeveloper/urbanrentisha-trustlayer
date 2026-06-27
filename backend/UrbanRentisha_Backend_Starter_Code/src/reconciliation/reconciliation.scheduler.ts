import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ReconciliationService } from "./reconciliation.service";

/**
 * Recovers from the specific failure window a server crash or network
 * failure between an on-chain call and the database write meant to record
 * it can leave behind. Runs less often than the listing/viewing-request
 * sweeps - on-chain calls normally resolve in seconds, so a payment only
 * ever qualifies once it has been stuck well past that, by design (see
 * the thresholds in reconciliation.service.ts).
 */
@Injectable()
export class ReconciliationScheduler {
  private readonly logger = new Logger(ReconciliationScheduler.name);

  constructor(private readonly reconciliation: ReconciliationService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async sweep() {
    const deposits = await this.reconciliation.reconcileDeposits();
    if (deposits.repaired > 0 || deposits.ambiguous > 0) {
      this.logger.log(
        `Deposit reconciliation: repaired ${deposits.repaired}, ${deposits.ambiguous} ambiguous case(s) flagged for review.`,
      );
    }

    const releases = await this.reconciliation.reconcileReleases();
    if (
      releases.repaired > 0 ||
      releases.lockCleared > 0 ||
      releases.ambiguous > 0
    ) {
      this.logger.log(
        `Release reconciliation: repaired ${releases.repaired}, cleared ${releases.lockCleared} stale lock(s), ${releases.ambiguous} ambiguous case(s) flagged for review.`,
      );
    }
  }
}
