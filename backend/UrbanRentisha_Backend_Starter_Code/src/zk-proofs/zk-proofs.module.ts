import { Module } from "@nestjs/common";
import { ZkProofsController } from "./zk-proofs.controller";
import { ZkProofsService } from "./zk-proofs.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { ViewingRequestsModule } from "../viewing-requests/viewing-requests.module";

@Module({
  imports: [AuditLogsModule, ViewingRequestsModule],
  controllers: [ZkProofsController],
  providers: [ZkProofsService],
  exports: [ZkProofsService],
})
export class ZkProofsModule {}
