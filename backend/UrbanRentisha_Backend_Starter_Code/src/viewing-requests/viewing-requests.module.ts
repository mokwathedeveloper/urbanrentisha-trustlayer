import { Module } from "@nestjs/common";
import { ViewingRequestsController } from "./viewing-requests.controller";
import { ViewingRequestsService } from "./viewing-requests.service";
import { ViewingRequestAccessService } from "./viewing-request-access.service";
import { ViewingRequestsScheduler } from "./viewing-requests.scheduler";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [AuditLogsModule, NotificationsModule],
  controllers: [ViewingRequestsController],
  providers: [
    ViewingRequestsService,
    ViewingRequestAccessService,
    ViewingRequestsScheduler,
  ],
  exports: [ViewingRequestsService, ViewingRequestAccessService],
})
export class ViewingRequestsModule {}
