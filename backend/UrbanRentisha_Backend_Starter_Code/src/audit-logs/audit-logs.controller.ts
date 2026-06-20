import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { AuditLogsService } from "./audit-logs.service";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("audit-logs")
export class AuditLogsController {
  constructor(private readonly auditLogs: AuditLogsService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.auditLogs.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Get("stats")
  stats() {
    return this.auditLogs.stats();
  }
}
