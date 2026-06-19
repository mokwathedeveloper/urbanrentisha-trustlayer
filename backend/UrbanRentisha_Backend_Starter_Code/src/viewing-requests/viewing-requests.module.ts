import { Module } from "@nestjs/common";
import { ViewingRequestsController } from "./viewing-requests.controller";
import { ViewingRequestsService } from "./viewing-requests.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [AuditLogsModule],
  controllers: [ViewingRequestsController],
  providers: [ViewingRequestsService],
  exports: [ViewingRequestsService]
})
export class ViewingRequestsModule {}
