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
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly notifications: NotificationsService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException("Email is already registered.");

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
      },
    });

    await this.notifications.notifyAdmins({
      type: NotificationType.SYSTEM,
      title: "New Signup",
      message: `${user.name} signed up as a ${user.role.toLowerCase()}.`,
    });

    return {
      user,
      accessToken: this.sign(user.id, user.email, user.role),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException("Invalid email or password.");

    const passwordOk = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordOk)
      throw new UnauthorizedException("Invalid email or password.");

    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedException("This account has been suspended.");
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        avatarUrl: user.avatarUrl,
        mustChangePassword: user.mustChangePassword,
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
      },
    });
    if (!user) throw new UnauthorizedException("User not found.");
    return user;
  }

  private sign(id: string, email: string, role: UserRole) {
    return this.jwt.sign({ sub: id, email, role });
  }
}
