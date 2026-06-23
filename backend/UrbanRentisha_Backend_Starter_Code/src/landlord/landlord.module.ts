import { Module } from "@nestjs/common";
import { LandlordController } from "./landlord.controller";
import { LandlordService } from "./landlord.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { StorageModule } from "../storage/storage.module";
import { StellarModule } from "../stellar/stellar.module";
import { EscrowReportingModule } from "../escrow-reporting/escrow-reporting.module";

@Module({
  imports: [
    AuditLogsModule,
    NotificationsModule,
    StorageModule,
    StellarModule,
    EscrowReportingModule,
  ],
  controllers: [LandlordController],
  providers: [LandlordService],
})
export class LandlordModule {}
