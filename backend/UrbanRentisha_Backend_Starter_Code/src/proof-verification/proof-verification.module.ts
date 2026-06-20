import { Module } from "@nestjs/common";
import { ProofVerificationController } from "./proof-verification.controller";
import { ProofVerificationService } from "./proof-verification.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { SorobanModule } from "../soroban/soroban.module";

@Module({
  imports: [AuditLogsModule, SorobanModule],
  controllers: [ProofVerificationController],
  providers: [ProofVerificationService],
  exports: [ProofVerificationService],
})
export class ProofVerificationModule {}
