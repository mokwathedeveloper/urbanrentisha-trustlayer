import { Module } from "@nestjs/common";
import { ExternalApiController } from "./external-api.controller";
import { ExternalApiService } from "./external-api.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [AuditLogsModule],
  controllers: [ExternalApiController],
  providers: [ExternalApiService],
  exports: [ExternalApiService]
})
export class ExternalApiModule {}
