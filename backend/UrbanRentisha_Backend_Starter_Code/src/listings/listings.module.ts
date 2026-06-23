import { Module } from "@nestjs/common";
import { ListingsController } from "./listings.controller";
import { ListingsService } from "./listings.service";
import { ListingsAvailabilityScheduler } from "./listings-availability.scheduler";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [AuditLogsModule, NotificationsModule],
  controllers: [ListingsController],
  providers: [ListingsService, ListingsAvailabilityScheduler],
  exports: [ListingsService],
})
export class ListingsModule {}
