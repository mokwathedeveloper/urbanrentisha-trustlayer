import { Test } from "@nestjs/testing";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRole, UserStatus } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { StellarService } from "../stellar/stellar.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";

describe("AuthService", () => {
  let service: AuthService;
  let prisma: {
    user: { findUnique: jest.Mock; create: jest.Mock; update: jest.Mock };
  };
  let jwt: { sign: jest.Mock };
  let notifications: { notifyAdmins: jest.Mock };
  let stellar: { generateWallet: jest.Mock; fundTestnetAccount: jest.Mock };
  let auditLogs: { create: jest.Mock };

  const baseUser = {
    id: "user-1",
    email: "tenant@example.com",
    name: "Tenant One",
    role: UserRole.TENANT,
    status: UserStatus.ACTIVE,
    avatarUrl: null,
    mustChangePassword: false,
    walletAddress: null,
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };
    jwt = { sign: jest.fn().mockReturnValue("signed-jwt") };
    notifications = { notifyAdmins: jest.fn().mockResolvedValue(undefined) };
    stellar = {
      generateWallet: jest.fn(),
      fundTestnetAccount: jest.fn().mockResolvedValue(true),
    };
    auditLogs = { create: jest.fn().mockResolvedValue(undefined) };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
        { provide: NotificationsService, useValue: notifications },
        { provide: StellarService, useValue: stellar },
        { provide: AuditLogsService, useValue: auditLogs },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
  });

  describe("register", () => {
    it("rejects an already-registered email, auditing the attempt, without creating a user", async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);

      await expect(
        service.register({
          email: baseUser.email,
          name: "Someone",
          password: "password123",
          role: UserRole.TENANT,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(prisma.user.create).not.toHaveBeenCalled();
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "auth.register_rejected",
          severity: "WARNING",
        }),
      );
    });

    it("creates a TENANT with a tenantProfile, hashes the password, and returns a signed token", async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ ...baseUser });
      stellar.generateWallet.mockResolvedValue({
        publicKey: "G_PUBLIC",
        secretKey: "S_SECRET",
      });

      const result = await service.register({
        email: baseUser.email,
        name: baseUser.name,
        password: "password123",
        role: UserRole.TENANT,
      });

      const createArgs = prisma.user.create.mock.calls[0][0];
      expect(createArgs.data.tenantProfile).toEqual({ create: {} });
      expect(createArgs.data.landlordProfile).toBeUndefined();
      expect(
        await bcrypt.compare("password123", createArgs.data.passwordHash),
      ).toBe(true);

      expect(notifications.notifyAdmins).toHaveBeenCalled();
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "auth.registered",
          severity: "INFO",
        }),
      );
      expect(result.accessToken).toBe("signed-jwt");
      expect(result.walletSecret).toBe("S_SECRET");
      expect(result.user.walletAddress).toBe("G_PUBLIC");
    });

    it("creates a LANDLORD with a landlordProfile instead of a tenantProfile", async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({
        ...baseUser,
        role: UserRole.LANDLORD,
      });
      stellar.generateWallet.mockResolvedValue({
        publicKey: "G_PUBLIC",
        secretKey: "S_SECRET",
      });

      await service.register({
        email: "landlord@example.com",
        name: "Landlord One",
        password: "password123",
        role: UserRole.LANDLORD,
      });

      const createArgs = prisma.user.create.mock.calls[0][0];
      expect(createArgs.data.landlordProfile).toEqual({ create: {} });
      expect(createArgs.data.tenantProfile).toBeUndefined();
    });

    it("still succeeds without a walletSecret when wallet generation fails", async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ ...baseUser });
      stellar.generateWallet.mockRejectedValue(new Error("stellar down"));

      const result = await service.register({
        email: baseUser.email,
        name: baseUser.name,
        password: "password123",
        role: UserRole.TENANT,
      });

      expect(result.walletSecret).toBeUndefined();
      expect(prisma.user.update).not.toHaveBeenCalled();
      expect(result.accessToken).toBe("signed-jwt");
    });
  });

  describe("login", () => {
    it("rejects an unknown email with a generic message and audits the attempt", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: "nobody@example.com", password: "x" }),
      ).rejects.toThrow(UnauthorizedException);
      await expect(
        service.login({ email: "nobody@example.com", password: "x" }),
      ).rejects.toThrow("Invalid email or password.");

      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "auth.login_failed",
          severity: "WARNING",
          metadata: expect.objectContaining({ reason: "user_not_found" }),
        }),
      );
    });

    it("rejects a wrong password with the same generic message as an unknown email (no user enumeration)", async () => {
      const passwordHash = await bcrypt.hash("correct-password", 10);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });

      const unknownEmailError = await service
        .login({ email: "nobody@example.com", password: "x" })
        .catch((e) => e.message);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });
      const wrongPasswordError = await service
        .login({ email: baseUser.email, password: "wrong-password" })
        .catch((e) => e.message);

      expect(wrongPasswordError).toBe(unknownEmailError);
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "auth.login_failed",
          severity: "WARNING",
          metadata: expect.objectContaining({ reason: "invalid_password" }),
        }),
      );
    });

    it("rejects a suspended account after verifying the password, and audits it", async () => {
      const passwordHash = await bcrypt.hash("correct-password", 10);
      prisma.user.findUnique.mockResolvedValue({
        ...baseUser,
        status: UserStatus.SUSPENDED,
        passwordHash,
      });

      await expect(
        service.login({ email: baseUser.email, password: "correct-password" }),
      ).rejects.toThrow("This account has been suspended.");

      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "auth.login_blocked",
          severity: "WARNING",
          metadata: expect.objectContaining({ reason: "account_suspended" }),
        }),
      );
    });

    it("returns a signed token and the user (without the password hash) on success, and audits it", async () => {
      const passwordHash = await bcrypt.hash("correct-password", 10);
      prisma.user.findUnique.mockResolvedValue({ ...baseUser, passwordHash });

      const result = await service.login({
        email: baseUser.email,
        password: "correct-password",
      });

      expect(result.accessToken).toBe("signed-jwt");
      expect(result.user).not.toHaveProperty("passwordHash");
      expect(result.user.email).toBe(baseUser.email);
      expect(auditLogs.create).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "auth.login_succeeded",
          severity: "SUCCESS",
        }),
      );
    });
  });

  describe("me", () => {
    it("throws when the user no longer exists", async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(service.me("missing-id")).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it("returns the user profile when found", async () => {
      prisma.user.findUnique.mockResolvedValue(baseUser);
      const result = await service.me(baseUser.id);
      expect(result).toEqual(baseUser);
    });
  });
});
