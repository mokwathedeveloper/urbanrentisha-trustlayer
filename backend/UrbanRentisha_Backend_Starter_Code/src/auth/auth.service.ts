import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NotificationType, UserRole, UserStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { StellarService } from "../stellar/stellar.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly notifications: NotificationsService,
    private readonly stellar: StellarService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      await this.auditLogs.create({
        action: "auth.register_rejected",
        entityType: "user",
        severity: "WARNING",
        metadata: { email: dto.email, reason: "email_already_registered" },
      });
      throw new BadRequestException("Email is already registered.");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        passwordHash,
        role: dto.role,
        tenantProfile:
          dto.role === UserRole.TENANT ? { create: {} } : undefined,
        landlordProfile:
          dto.role === UserRole.LANDLORD ? { create: {} } : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatarUrl: true,
        mustChangePassword: true,
        walletAddress: true,
      },
    });

    await this.auditLogs.create({
      actorId: user.id,
      action: "auth.registered",
      entityType: "user",
      entityId: user.id,
      severity: "INFO",
      metadata: { email: user.email, role: user.role },
    });

    await this.notifications.notifyAdmins({
      type: NotificationType.SYSTEM,
      title: "New Signup",
      message: `${user.name} signed up as a ${user.role.toLowerCase()}.`,
    });

    let walletSecret: string | undefined;
    try {
      const wallet = await this.stellar.generateWallet();
      await this.prisma.user.update({
        where: { id: user.id },
        data: { walletAddress: wallet.publicKey },
      });
      this.stellar.fundTestnetAccount(wallet.publicKey).catch(() => undefined);
      user.walletAddress = wallet.publicKey;
      walletSecret = wallet.secretKey;
    } catch {
      // Non-critical: the user can generate a wallet later from their profile.
    }

    return {
      user,
      accessToken: this.sign(user.id, user.email, user.role),
      walletSecret,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      await this.auditLogs.create({
        action: "auth.login_failed",
        entityType: "user",
        severity: "WARNING",
        metadata: { email: dto.email, reason: "user_not_found" },
      });
      throw new UnauthorizedException("Invalid email or password.");
    }

    const passwordOk = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordOk) {
      await this.auditLogs.create({
        actorId: user.id,
        action: "auth.login_failed",
        entityType: "user",
        entityId: user.id,
        severity: "WARNING",
        metadata: { email: user.email, reason: "invalid_password" },
      });
      throw new UnauthorizedException("Invalid email or password.");
    }

    if (user.status === UserStatus.SUSPENDED) {
      await this.auditLogs.create({
        actorId: user.id,
        action: "auth.login_blocked",
        entityType: "user",
        entityId: user.id,
        severity: "WARNING",
        metadata: { email: user.email, reason: "account_suspended" },
      });
      throw new UnauthorizedException("This account has been suspended.");
    }

    await this.auditLogs.create({
      actorId: user.id,
      action: "auth.login_succeeded",
      entityType: "user",
      entityId: user.id,
      severity: "SUCCESS",
      metadata: { email: user.email },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        avatarUrl: user.avatarUrl,
        mustChangePassword: user.mustChangePassword,
        walletAddress: user.walletAddress,
      },
      accessToken: this.sign(user.id, user.email, user.role),
    };
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatarUrl: true,
        mustChangePassword: true,
        walletAddress: true,
      },
    });
    if (!user) throw new UnauthorizedException("User not found.");
    return user;
  }

  private sign(id: string, email: string, role: UserRole) {
    return this.jwt.sign({ sub: id, email, role });
  }
}
