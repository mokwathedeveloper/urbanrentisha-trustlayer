import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";

@Injectable()
export class AdminUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async setUserStatus(userId: string, status: UserStatus, actorId: string) {
    if (userId === actorId) {
      throw new BadRequestException(
        "You cannot change your own account status.",
      );
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found.");

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { status },
      select: { id: true, email: true, name: true, role: true, status: true },
    });

    await this.auditLogs.create({
      actorId,
      action:
        status === UserStatus.SUSPENDED ? "user.suspended" : "user.reactivated",
      entityType: "user",
      entityId: userId,
      severity: status === UserStatus.SUSPENDED ? "WARNING" : "SUCCESS",
      metadata: { email: user.email },
    });

    return updated;
  }
}
