import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminDashboardService } from "./admin-dashboard.service";
import { AdminVerificationService } from "./admin-verification.service";
import { AdminUserService } from "./admin-user.service";
import { AdminLandlordService } from "./admin-landlord.service";
import { AdminPaymentOpsService } from "./admin-payment-ops.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { StorageModule } from "../storage/storage.module";
import { StellarModule } from "../stellar/stellar.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { SorobanModule } from "../soroban/soroban.module";
import { ListingsModule } from "../listings/listings.module";

@Module({
  imports: [
    AuditLogsModule,
    StorageModule,
    StellarModule,
    NotificationsModule,
    SorobanModule,
    ListingsModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminDashboardService,
    AdminVerificationService,
    AdminUserService,
    AdminLandlordService,
    AdminPaymentOpsService,
  ],
})
export class AdminModule {}
