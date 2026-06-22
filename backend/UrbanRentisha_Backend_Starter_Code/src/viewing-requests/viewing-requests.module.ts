import { Module } from "@nestjs/common";
import { ViewingRequestsController } from "./viewing-requests.controller";
import { ViewingRequestsService } from "./viewing-requests.service";
import { ViewingRequestAccessService } from "./viewing-request-access.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [AuditLogsModule],
  controllers: [ViewingRequestsController],
  providers: [ViewingRequestsService, ViewingRequestAccessService],
  exports: [ViewingRequestsService, ViewingRequestAccessService],
})
export class ViewingRequestsModule {}
