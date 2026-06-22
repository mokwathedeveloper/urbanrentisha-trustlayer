import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";
import { StellarModule } from "../stellar/stellar.module";

@Module({
  imports: [AuditLogsModule, StellarModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
