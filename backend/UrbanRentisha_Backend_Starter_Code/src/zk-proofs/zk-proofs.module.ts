import { Module } from "@nestjs/common";
import { ZkProofsController } from "./zk-proofs.controller";
import { ZkProofsService } from "./zk-proofs.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [AuditLogsModule],
  controllers: [ZkProofsController],
  providers: [ZkProofsService],
  exports: [ZkProofsService],
})
export class ZkProofsModule {}
