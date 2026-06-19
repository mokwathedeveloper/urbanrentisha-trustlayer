import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { StellarModule } from "../stellar/stellar.module";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [StellarModule, AuditLogsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule {}
