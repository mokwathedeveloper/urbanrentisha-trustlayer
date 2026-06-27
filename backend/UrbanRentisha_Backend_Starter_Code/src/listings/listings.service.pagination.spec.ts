import { Test } from "@nestjs/testing";
import { ListingStatus, UserRole } from "@prisma/client";
import { ListingsService } from "./listings.service";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeGateway } from "../realtime/realtime.gateway";
import { ViewingRequestsService } from "../viewing-requests/viewing-requests.service";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "../common/dto/pagination-query.dto";

describe("ListingsService pagination", () => {
  let service: ListingsService;
  let prisma: {
    listing: { findMany: jest.Mock; count: jest.Mock };
    agentProfile: { findUnique: jest.Mock };
    managerProfile: { findUnique: jest.Mock };
    savedListing: { findMany: jest.Mock; count: jest.Mock };
    viewingRequest: { findMany: jest.Mock };
  };

  beforeEach(async () => {
    prisma = {
      listing: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
      agentProfile: { findUnique: jest.fn() },
      managerProfile: { findUnique: jest.fn() },
      savedListing: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
      viewingRequest: { findMany: jest.fn().mockResolvedValue([]) },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ListingsService,
        { provide: PrismaService, useValue: prisma },
        { provide: AuditLogsService, useValue: { create: jest.fn() } },
        {
          provide: NotificationsService,
          useValue: { notifyAdmins: jest.fn() },
        },
        { provide: RealtimeGateway, useValue: { emitToListing: jest.fn() } },
        { provide: ViewingRequestsService, useValue: {} },
      ],
    }).compile();

    service = moduleRef.get(ListingsService);
  });

  describe("findAll (public marketplace browse - highest-risk unbounded endpoint)", () => {
    it("applies the default page/limit and only ever queries verified listings", async () => {
      await service.findAll({ page: DEFAULT_PAGE, limit: DEFAULT_LIMIT });

      expect(prisma.listing.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { verificationStatus: ListingStatus.VERIFIED },
          skip: 0,
          take: DEFAULT_LIMIT,
        }),
      );
      expect(prisma.listing.count).toHaveBeenCalledWith({
        where: { verificationStatus: ListingStatus.VERIFIED },
      });
    });

    it("never exposes more than the requested page's rows, even if asked for an out-of-range page", async () => {
      prisma.listing.findMany.mockResolvedValue([]);
      prisma.listing.count.mockResolvedValue(5);

      await service.findAll({ page: 3, limit: 20 });

      expect(prisma.listing.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 40, take: 20 }),
      );
    });

    it("returns page/limit/total/hasNextPage metadata alongside items", async () => {
      const rows = [{ id: "listing-1" }, { id: "listing-2" }];
      prisma.listing.findMany.mockResolvedValue(rows);
      prisma.listing.count.mockResolvedValue(45);

      const result = await service.findAll({ page: 1, limit: 20 });

      expect(result).toEqual({
        items: rows,
        page: 1,
        limit: 20,
        total: 45,
        hasNextPage: true,
      });
    });

    it("uses the caller's page/limit verbatim (within DTO bounds) for skip/take", async () => {
      await service.findAll({ page: 2, limit: 50 });

      expect(prisma.listing.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 50, take: 50 }),
      );
    });
  });

  describe("findMine - existing role-based filters keep working alongside pagination", () => {
    it("filters by agentId for an AGENT and still paginates", async () => {
      prisma.agentProfile.findUnique.mockResolvedValue({ id: "agent-1" });

      await service.findMine("user-1", UserRole.AGENT, { page: 1, limit: 20 });

      expect(prisma.listing.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { agentId: "agent-1" },
          skip: 0,
          take: 20,
        }),
      );
      expect(prisma.listing.count).toHaveBeenCalledWith({
        where: { agentId: "agent-1" },
      });
    });

    it("filters by ownerId for a LANDLORD and still paginates", async () => {
      await service.findMine("owner-1", UserRole.LANDLORD, {
        page: 2,
        limit: 10,
      });

      expect(prisma.listing.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { ownerId: "owner-1" },
          skip: 10,
          take: 10,
        }),
      );
    });

    it("returns an empty paginated result (not an error) when the agent has no profile yet", async () => {
      prisma.agentProfile.findUnique.mockResolvedValue(null);

      const result = await service.findMine("user-1", UserRole.AGENT, {
        page: 1,
        limit: 20,
      });

      expect(result).toEqual({
        items: [],
        page: 1,
        limit: 20,
        total: 0,
        hasNextPage: false,
      });
      expect(prisma.listing.findMany).not.toHaveBeenCalled();
    });
  });

  describe("findSaved", () => {
    it("filters by userId and paginates", async () => {
      await service.findSaved("user-1", { page: 1, limit: 20 });

      expect(prisma.savedListing.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: "user-1" },
          skip: 0,
          take: 20,
        }),
      );
      expect(prisma.savedListing.count).toHaveBeenCalledWith({
        where: { userId: "user-1" },
      });
    });
  });
});
