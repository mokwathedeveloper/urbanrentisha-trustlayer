import { Module } from "@nestjs/common";
import { AgentsController } from "./agents.controller";
import { AgentsService } from "./agents.service";
import { EscrowReportingModule } from "../escrow-reporting/escrow-reporting.module";

@Module({
  imports: [EscrowReportingModule],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
