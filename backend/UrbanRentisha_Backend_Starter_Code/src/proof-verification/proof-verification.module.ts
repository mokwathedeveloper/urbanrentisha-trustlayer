import { Module } from "@nestjs/common";
import { ProofVerificationController } from "./proof-verification.controller";
import { ProofVerificationService } from "./proof-verification.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { SorobanModule } from "../soroban/soroban.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { ViewingRequestsModule } from "../viewing-requests/viewing-requests.module";

@Module({
  imports: [
    AuditLogsModule,
    SorobanModule,
    NotificationsModule,
    ViewingRequestsModule,
  ],
  controllers: [ProofVerificationController],
  providers: [ProofVerificationService],
  exports: [ProofVerificationService],
})
export class ProofVerificationModule {}
