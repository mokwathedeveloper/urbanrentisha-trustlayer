import { Module } from "@nestjs/common";
import { ProofVerificationController } from "./proof-verification.controller";
import { ProofVerificationService } from "./proof-verification.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [AuditLogsModule],
  controllers: [ProofVerificationController],
  providers: [ProofVerificationService],
  exports: [ProofVerificationService],
})
export class ProofVerificationModule {}
