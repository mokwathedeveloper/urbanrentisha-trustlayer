import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { StellarService } from "../stellar/stellar.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly stellar: StellarService,
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
        avatarUrl: true,
        mustChangePassword: true,
        walletAddress: true,
        tenantProfile: true,
        landlordProfile: true,
        agentProfile: true,
        managerProfile: true,
        createdAt: true,
      },
    });

    if (!user) throw new NotFoundException("User not found.");
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: dto.name,
        phone: dto.phone,
        walletAddress: dto.walletAddress,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        status: true,
        walletAddress: true,
        createdAt: true,
      },
    });

    await this.auditLogs.create({
      actorId: userId,
      action: "user.profile_updated",
      entityType: "user",
      entityId: userId,
      severity: "INFO",
      metadata: {
        name: dto.name,
        phone: dto.phone,
        walletAddress: dto.walletAddress,
      },
    });

    return user;
  }

  async generateWallet(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found.");
    if (user.walletAddress) {
      throw new BadRequestException(
        "A wallet is already linked to this account. Use the manual entry option to replace it.",
      );
    }

    const wallet = await this.stellar.generateWallet();
    await this.prisma.user.update({
      where: { id: userId },
      data: { walletAddress: wallet.publicKey },
    });
    this.stellar.fundTestnetAccount(wallet.publicKey).catch(() => undefined);

    await this.auditLogs.create({
      actorId: userId,
      action: "user.wallet_generated",
      entityType: "user",
      entityId: userId,
      severity: "INFO",
      metadata: { publicKey: wallet.publicKey },
    });

    return wallet;
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found.");

    if (!user.mustChangePassword) {
      if (!dto.currentPassword) {
        throw new BadRequestException("Current password is required.");
      }
      const currentOk = await bcrypt.compare(
        dto.currentPassword,
        user.passwordHash,
      );
      if (!currentOk)
        throw new BadRequestException("Current password is incorrect.");
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash, mustChangePassword: false },
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
