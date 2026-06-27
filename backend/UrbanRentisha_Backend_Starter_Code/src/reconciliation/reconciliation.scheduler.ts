import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ReconciliationService } from "./reconciliation.service";

/**
 * Local/dev convenience only - @Cron relies on a persistent process to
 * host its internal timer, which this backend's production deployment
 * (a Vercel serverless function, see api/index.ts) does not reliably
 * provide. Production's actual reconciliation trigger is Vercel Cron
 * calling POST /api/v1/internal/cron/reconcile (see
 * reconciliation.controller.ts) - this scheduler explicitly no-ops when
 * NODE_ENV is production so there is exactly one reliable path, not two
 * that can silently diverge. Both paths call the same
 * ReconciliationService.runLocked(), which is itself safe to call
 * concurrently (DB-row lock) regardless.
 */
@Injectable()
export class ReconciliationScheduler {
  private readonly logger = new Logger(ReconciliationScheduler.name);

  constructor(
    private readonly reconciliation: ReconciliationService,
    private readonly config: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async sweep() {
    if (this.config.get<string>("NODE_ENV") === "production") {
      return;
    }

    const result = await this.reconciliation.runLocked();
    if (result.status === "skipped") {
      this.logger.log(
        "Reconciliation sweep skipped - a run is already in progress.",
      );
      return;
    }
    if (result.repaired > 0 || result.flagged > 0) {
      this.logger.log(
        `Reconciliation: checked ${result.depositsChecked} deposit(s) and ${result.releasesChecked} release(s), repaired ${result.repaired}, flagged ${result.flagged} for review.`,
      );
    }
  }
}
