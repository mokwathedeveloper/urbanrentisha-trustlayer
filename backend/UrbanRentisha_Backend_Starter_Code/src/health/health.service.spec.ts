import { Test } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { HealthService } from "./health.service";
import { PrismaService } from "../prisma/prisma.service";

describe("HealthService", () => {
  let service: HealthService;
  let prisma: { $queryRaw: jest.Mock };
  let config: { get: jest.Mock };
  let fetchMock: jest.Mock;

  beforeEach(async () => {
    prisma = { $queryRaw: jest.fn().mockResolvedValue([{ "?column?": 1 }]) };
    config = {
      get: jest.fn((key: string) => {
        const values: Record<string, string> = {
          SOROBAN_RPC_URL: "https://soroban-testnet.stellar.org",
          SUPABASE_URL: "https://project-ref.supabase.co",
          SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
        };
        return values[key];
      }),
    };
    fetchMock = jest.fn().mockResolvedValue({ ok: true, status: 200 });
    (global as unknown as { fetch: jest.Mock }).fetch = fetchMock;

    const moduleRef = await Test.createTestingModule({
      providers: [
        HealthService,
        { provide: PrismaService, useValue: prisma },
        { provide: ConfigService, useValue: config },
      ],
    }).compile();

    service = moduleRef.get(HealthService);
  });

  describe("liveness", () => {
    it("returns healthy without touching any dependency", () => {
      const result = service.liveness();

      expect(result).toEqual({ status: "ok" });
      expect(prisma.$queryRaw).not.toHaveBeenCalled();
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  describe("readiness", () => {
    it("reports healthy ('ok') when every dependency is mocked healthy", async () => {
      const result = await service.readiness();

      expect(result).toEqual({
        status: "ok",
        checks: { database: "up", sorobanRpc: "up", storageConfig: "up" },
      });
    });

    it("reports unhealthy ('error') when the database check fails", async () => {
      prisma.$queryRaw.mockRejectedValue(new Error("connection refused"));

      const result = await service.readiness();

      expect(result.status).toBe("error");
      expect(result.checks.database).toBe("down");
    });

    it("degrades (but does not error) when only the Soroban RPC check fails", async () => {
      fetchMock.mockRejectedValue(new Error("ECONNREFUSED"));

      const result = await service.readiness();

      expect(result.status).toBe("degraded");
      expect(result.checks).toEqual({
        database: "up",
        sorobanRpc: "down",
        storageConfig: "up",
      });
    });

    it("never includes any actual secret/config value in the response", async () => {
      const result = await service.readiness();

      const serialized = JSON.stringify(result);
      expect(serialized).not.toContain("service-role-key");
      expect(serialized).not.toContain("soroban-testnet.stellar.org");
    });
  });
});
