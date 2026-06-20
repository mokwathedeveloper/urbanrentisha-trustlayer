import { Injectable, NotFoundException } from "@nestjs/common";
import {
  ListingStatus,
  ReportStatus,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AgentsService {
  constructor(private readonly prisma: PrismaService) {}

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

    const [
      activeListings,
      inactiveListings,
      openReports,
      resolvedReports,
      completedViewings,
      recentViewingRequests,
    ] = await Promise.all([
      this.prisma.listing.count({
        where: { agentId: id, verificationStatus: ListingStatus.VERIFIED },
      }),
      this.prisma.listing.count({
        where: {
          agentId: id,
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
        activeListings,
        inactiveListings,
        openReports,
        resolvedReports,
        completedViewings,
      },
      listings: agent.listings,
      recentViewingRequests: recentViewingRequests.map((request) => ({
        id: request.id,
        tenantName: request.tenant.user.name,
        listingTitle: request.listing.title,
        updatedAt: request.updatedAt,
        status: request.status,
      })),
    };
  }
}
