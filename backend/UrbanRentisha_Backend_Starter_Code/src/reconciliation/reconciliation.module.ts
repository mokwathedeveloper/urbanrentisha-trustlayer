import { Module } from "@nestjs/common";
import { ReconciliationService } from "./reconciliation.service";
import { ReconciliationScheduler } from "./reconciliation.scheduler";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { ListingsModule } from "../listings/listings.module";
import { SorobanModule } from "../soroban/soroban.module";

@Module({
  imports: [
    AuditLogsModule,
    NotificationsModule,
    ListingsModule,
    SorobanModule,
  ],
  providers: [ReconciliationService, ReconciliationScheduler],
  exports: [ReconciliationService],
})
export class ReconciliationModule {}
