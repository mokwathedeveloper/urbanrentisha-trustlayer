import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ViewingRequestsService } from "./viewing-requests.service";

/**
 * Catches the case nothing else watches: a tenant who claims a turn and
 * then never pays at all (rather than failing proof, which the existing
 * listing-availability hooks already cover).
 */
@Injectable()
export class ViewingRequestsScheduler {
  private readonly logger = new Logger(ViewingRequestsScheduler.name);

  constructor(private readonly viewingRequests: ViewingRequestsService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async sweepLapsedTurns() {
    const expired = await this.viewingRequests.expireLapsedTurns();
    if (expired > 0) {
      this.logger.log(`Expired ${expired} lapsed viewing request turn(s).`);
    }
  }
}
