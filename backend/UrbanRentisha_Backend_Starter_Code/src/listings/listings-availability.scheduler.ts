import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ListingsService } from "./listings.service";

/**
 * Reservations are also released eagerly on proof failure and manual agent
 * action - this sweep only catches the case nothing else watches: a tenant
 * who pays and then simply goes silent (never submits a proof at all), so
 * the listing would otherwise stay reserved forever.
 */
@Injectable()
export class ListingsAvailabilityScheduler {
  private readonly logger = new Logger(ListingsAvailabilityScheduler.name);

  constructor(private readonly listings: ListingsService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async sweepExpiredReservations() {
    const released = await this.listings.releaseExpiredReservations();
    if (released > 0) {
      this.logger.log(`Released ${released} expired listing reservation(s).`);
    }
  }
}
