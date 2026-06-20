import { Module } from "@nestjs/common";
import { ViewingCodesController } from "./viewing-codes.controller";
import { ViewingCodesService } from "./viewing-codes.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [AuditLogsModule, NotificationsModule],
  controllers: [ViewingCodesController],
  providers: [ViewingCodesService],
  exports: [ViewingCodesService],
})
export class ViewingCodesModule {}
