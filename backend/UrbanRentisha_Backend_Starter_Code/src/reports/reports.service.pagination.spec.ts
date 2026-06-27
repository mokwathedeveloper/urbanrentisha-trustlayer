import { Test } from "@nestjs/testing";
import { ReportsService } from "./reports.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";

describe("ReportsService pagination", () => {
  let service: ReportsService;
  let prisma: { report: { findMany: jest.Mock; count: jest.Mock } };

  const report = (id: string) => ({
    id,
    createdAt: new Date("2026-01-01T00:00:00Z"),
    firstRespondedAt: null,
  });

  beforeEach(async () => {
    prisma = {
      report: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ReportsService,
        { provide: PrismaService, useValue: prisma },
        { provide: AuditLogsService, useValue: { create: jest.fn() } },
        {
          provide: NotificationsService,
          useValue: { notifyAdmins: jest.fn() },
        },
      ],
    }).compile();

    service = moduleRef.get(ReportsService);
  });

  describe("findAll (admin - previously had no where clause and no limit at all)", () => {
    it("applies default page/limit", async () => {
      await service.findAll({ page: 1, limit: 20 });

      expect(prisma.report.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 0, take: 20 }),
      );
      expect(prisma.report.count).toHaveBeenCalledWith();
    });

    it("computes skip for a later page", async () => {
      await service.findAll({ page: 4, limit: 25 });

      expect(prisma.report.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 75, take: 25 }),
      );
    });

    it("returns paginated metadata and still attaches the response-deadline field to each item", async () => {
      prisma.report.findMany.mockResolvedValue([report("report-1")]);
      prisma.report.count.mockResolvedValue(1);

      const result = await service.findAll({ page: 1, limit: 20 });

      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.total).toBe(1);
      expect(result.items[0]).toHaveProperty("responseDeadline");
    });
  });

  describe("findMine - existing reporterId filter keeps working alongside pagination", () => {
    it("filters by reporterId and paginates", async () => {
      await service.findMine("reporter-1", { page: 2, limit: 10 });

      expect(prisma.report.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { reporterId: "reporter-1" },
          skip: 10,
          take: 10,
        }),
      );
      expect(prisma.report.count).toHaveBeenCalledWith({
        where: { reporterId: "reporter-1" },
      });
    });
  });
});
