import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        status: true,
        tenantProfile: true,
        agentProfile: true,
        createdAt: true,
      },
    });

    if (!user) throw new NotFoundException("User not found.");
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { name: dto.name, phone: dto.phone },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    await this.auditLogs.create({
      actorId: userId,
      action: "user.profile_updated",
      entityType: "user",
      entityId: userId,
      severity: "INFO",
      metadata: { name: dto.name, phone: dto.phone },
    });

    return user;
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found.");

    const currentOk = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!currentOk)
      throw new BadRequestException("Current password is incorrect.");

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    await this.auditLogs.create({
      actorId: userId,
      action: "user.password_changed",
      entityType: "user",
      entityId: userId,
      severity: "SUCCESS",
      metadata: {},
    });

    return { success: true };
  }
}
