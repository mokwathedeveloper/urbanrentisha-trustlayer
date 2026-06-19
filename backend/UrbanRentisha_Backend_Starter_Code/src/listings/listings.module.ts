import { Module } from "@nestjs/common";
import { ListingsController } from "./listings.controller";
import { ListingsService } from "./listings.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [AuditLogsModule],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
