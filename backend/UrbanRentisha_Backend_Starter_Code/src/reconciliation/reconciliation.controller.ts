import { Controller, Get, UseGuards } from "@nestjs/common";
import { CronSecretGuard } from "../common/guards/cron-secret.guard";
import { ReconciliationService } from "./reconciliation.service";

/**
 * The reliable production trigger for the reconciliation sweep - Vercel
 * Cron calls this on a schedule (see vercel.json) since this backend has
 * no persistent process to host @Cron's internal timer reliably. GET, not
 * POST - Vercel Cron Jobs invoke their configured path with an HTTP GET
 * request. Protected by CronSecretGuard, not JWT auth - this isn't a
 * user-facing endpoint. Response is a safe summary only: counts, never
 * payment IDs, on-chain details, or anything else that would leak into a
 * 401 or a misrouted log line.
 */
@Controller("internal/cron")
export class ReconciliationController {
  constructor(private readonly reconciliation: ReconciliationService) {}

  @UseGuards(CronSecretGuard)
  @Get("reconcile")
  async reconcile() {
    const result = await this.reconciliation.runLocked();
    return {
      status: result.status,
      depositsChecked: result.depositsChecked,
      releasesChecked: result.releasesChecked,
      repaired: result.repaired,
      flagged: result.flagged,
    };
  }
}
