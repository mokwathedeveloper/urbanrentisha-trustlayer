import { Module } from "@nestjs/common";
import { LandlordController } from "./landlord.controller";
import { LandlordService } from "./landlord.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [AuditLogsModule],
  controllers: [LandlordController],
  providers: [LandlordService],
})
export class LandlordModule {}
