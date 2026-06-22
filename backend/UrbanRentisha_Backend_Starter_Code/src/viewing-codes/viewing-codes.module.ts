import { Module } from "@nestjs/common";
import { ViewingCodesController } from "./viewing-codes.controller";
import { ViewingCodesService } from "./viewing-codes.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { ViewingRequestsModule } from "../viewing-requests/viewing-requests.module";

@Module({
  imports: [AuditLogsModule, NotificationsModule, ViewingRequestsModule],
  controllers: [ViewingCodesController],
  providers: [ViewingCodesService],
  exports: [ViewingCodesService],
})
export class ViewingCodesModule {}
