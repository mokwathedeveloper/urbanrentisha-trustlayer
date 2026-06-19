import { Module } from "@nestjs/common";
import { ViewingCodesController } from "./viewing-codes.controller";
import { ViewingCodesService } from "./viewing-codes.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [AuditLogsModule],
  controllers: [ViewingCodesController],
  providers: [ViewingCodesService],
  exports: [ViewingCodesService]
})
export class ViewingCodesModule {}
