import { Injectable, NotFoundException } from "@nestjs/common";
import {
  ListingStatus,
  ReportStatus,
  UserRole,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AgentsService {
  constructor(private readonly prisma: PrismaService) {}

  private async computeStats(
    profileKey: "agentId" | "managerId",
    profileId: string,
    listingIds: string[],
  ) {
    const [
      activeListings,
      inactiveListings,
      openReports,
      resolvedReports,
      completedViewings,
      recentViewingRequests,
    ] = await Promise.all([
      this.prisma.listing.count({
        where: {
          [profileKey]: profileId,
          verificationStatus: ListingStatus.VERIFIED,
        },
      }),
      this.prisma.listing.count({
        where: {
          [profileKey]: profileId,
          verificationStatus: { not: ListingStatus.VERIFIED },
        },
      }),
      this.prisma.report.count({
        where: { listingId: { in: listingIds }, status: ReportStatus.OPEN },
      }),
      this.prisma.report.count({
        where: {
          listingId: { in: listingIds },
          status: { in: [ReportStatus.RESOLVED, ReportStatus.DISMISSED] },
        },
      }),
      this.prisma.viewingRequest.count({
        where: {
          listingId: { in: listingIds },
          status: ViewingRequestStatus.ACCESS_UNLOCKED,
        },
      }),
      this.prisma.viewingRequest.findMany({
        where: {
          listingId: { in: listingIds },
          status: ViewingRequestStatus.ACCESS_UNLOCKED,
        },
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: {
          tenant: { include: { user: { select: { name: true } } } },
          listing: { select: { title: true } },
        },
      }),
    ]);

    return {
      activeListings,
      inactiveListings,
      openReports,
      resolvedReports,
      completedViewings,
      recentViewingRequests: recentViewingRequests.map((request) => ({
        id: request.id,
        tenantName: request.tenant.user.name,
        listingTitle: request.listing.title,
        updatedAt: request.updatedAt,
        status: request.status,
      })),
    };
  }

  async findOne(id: string) {
    const agent = await this.prisma.agentProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        },
        listings: true,
      },
    });

    if (!agent) throw new NotFoundException("Agent not found.");

    const listingIds = agent.listings.map((listing) => listing.id);
    const computed = await this.computeStats("agentId", agent.id, listingIds);

    return {
      id: agent.id,
      agencyName: agent.agencyName,
      licenseNumber: agent.licenseNumber,
      verificationStatus: agent.verificationStatus,
      trustScore: agent.trustScore,
      reportCount: agent.reportCount,
      createdAt: agent.createdAt,
      user: agent.user,
      stats: {
        totalListings: agent.listings.length,
        activeListings: computed.activeListings,
        inactiveListings: computed.inactiveListings,
        openReports: computed.openReports,
        resolvedReports: computed.resolvedReports,
        completedViewings: computed.completedViewings,
      },
      listings: agent.listings,
      recentViewingRequests: computed.recentViewingRequests,
    };
  }

  async findMyDashboard(userId: string, role: UserRole) {
    const profileKey = role === UserRole.MANAGER ? "managerId" : "agentId";
    const agent =
      role === UserRole.MANAGER
        ? await this.prisma.managerProfile.findUnique({
            where: { userId },
            include: { listings: true },
          })
        : await this.prisma.agentProfile.findUnique({
            where: { userId },
            include: { listings: true },
          });

    if (!agent) throw new NotFoundException("Agent profile not found.");

    const listingIds = agent.listings.map((listing) => listing.id);
    const computed = await this.computeStats(profileKey, agent.id, listingIds);

    const [allViewingRequests, reports, verifiedTenantRows] = await Promise.all(
      [
        this.prisma.viewingRequest.findMany({
          where: { listingId: { in: listingIds } },
          orderBy: { createdAt: "desc" },
          include: {
            listing: { select: { title: true } },
            tenant: {
              include: {
                user: { select: { name: true, email: true, phone: true } },
              },
            },
            payment: true,
            viewingCode: true,
          },
        }),
        this.prisma.report.findMany({
          where: { listingId: { in: listingIds } },
          orderBy: { createdAt: "desc" },
          take: 10,
          include: { listing: { select: { title: true } } },
        }),
        this.prisma.tenantProfile.findMany({
          where: {
            viewingRequests: { some: { listingId: { in: listingIds } } },
          },
          include: {
            user: {
              select: { name: true, email: true, phone: true, status: true },
            },
          },
          take: 10,
        }),
      ],
    );

    const escrowHolds = allViewingRequests.filter(
      (r) =>
        r.payment?.status === "RECEIVED" && r.viewingCode?.status !== "ACTIVE",
    );
    const activeViewingCodes = allViewingRequests.filter(
      (r) => r.viewingCode?.status === "ACTIVE",
    );

    return {
      id: agent.id,
      agencyName: agent.agencyName,
      verificationStatus: agent.verificationStatus,
      verificationStage: agent.verificationStage,
      trustScore: agent.trustScore,
      listings: agent.listings,
      stats: {
        totalListings: agent.listings.length,
        activeListings: computed.activeListings,
        inactiveListings: computed.inactiveListings,
        totalViewingRequests: allViewingRequests.length,
        verifiedTenants: verifiedTenantRows.length,
        escrowHolds: escrowHolds.length,
        activeViewingCodes: activeViewingCodes.length,
        openReports: computed.openReports,
        resolvedReports: computed.resolvedReports,
      },
      viewingRequests: allViewingRequests.slice(0, 6).map((r) => ({
        id: r.id,
        tenantName: r.tenant.user.name,
        listingTitle: r.listing.title,
        status: r.status,
        preferredDate: r.preferredDate,
        createdAt: r.createdAt,
      })),
      verifiedTenants: verifiedTenantRows.map((tenant) => ({
        name: tenant.user.name,
        email: tenant.user.email,
        phone: tenant.user.phone,
        status: tenant.user.status,
      })),
      escrowHolds: escrowHolds.slice(0, 5).map((r) => ({
        id: r.id,
        listingTitle: r.listing.title,
        amount: r.payment?.amount ?? 0,
        currency: r.payment?.currency ?? "KES",
        paymentId: r.payment?.id ?? "",
      })),
      activeViewingCodes: activeViewingCodes.slice(0, 5).map((r) => ({
        id: r.id,
        listingTitle: r.listing.title,
        code: r.viewingCode?.code ?? "",
        expiresAt: r.viewingCode?.expiresAt ?? null,
      })),
      reports: reports.map((report) => ({
        id: report.id,
        listingTitle: report.listing?.title ?? "Listing",
        reportType: report.reportType,
        status: report.status,
        createdAt: report.createdAt,
      })),
    };
  }
}
