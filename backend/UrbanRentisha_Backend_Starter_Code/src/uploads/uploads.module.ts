import { Module } from "@nestjs/common";
import { UploadsController } from "./uploads.controller";
import { UploadsService } from "./uploads.service";
import { StorageModule } from "../storage/storage.module";
import { AuditLogsModule } from "../audit-logs/audit-logs.module";

@Module({
  imports: [StorageModule, AuditLogsModule],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
