import { Module } from "@nestjs/common";
import { EscrowReportingService } from "./escrow-reporting.service";

@Module({
  providers: [EscrowReportingService],
  exports: [EscrowReportingService],
})
export class EscrowReportingModule {}
