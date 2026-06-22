import { Module } from "@nestjs/common";
import { SorobanService } from "./soroban.service";
import { EscrowService } from "./escrow.service";

@Module({
  providers: [SorobanService, EscrowService],
  exports: [SorobanService, EscrowService],
})
export class SorobanModule {}
