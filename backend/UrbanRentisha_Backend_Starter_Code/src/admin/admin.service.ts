import { Injectable } from "@nestjs/common";
import {
  ListingStatus,
  PaymentStatus,
  ProofStatus,
  ReportStatus,
  ViewingCodeStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [
      users,
      listings,
      viewingRequests,
      reports,
      proofVerifications,
      auditLogs,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.listing.count(),
      this.prisma.viewingRequest.count(),
      this.prisma.report.count(),
      this.prisma.proofVerification.count(),
      this.prisma.auditLog.count(),
    ]);

    return {
      users,
      listings,
      viewingRequests,
      reports,
      proofVerifications,
      auditLogs,
    };
  }

  async overview() {
    const [
      pendingListings,
      verifiedListings,
      openReports,
      inProgressReports,
      resolvedReports,
      dismissedReports,
      totalAgents,
      verifiedAgents,
      verifiedProofs,
      pendingProofs,
      receivedPayments,
      activeViewingCodes,
      totalUsers,
      totalProperties,
      totalBookings,
      agentTrustScores,
    ] = await Promise.all([
      this.prisma.listing.count({
        where: { verificationStatus: ListingStatus.PENDING_REVIEW },
      }),
      this.prisma.listing.count({
        where: { verificationStatus: ListingStatus.VERIFIED },
      }),
      this.prisma.report.count({ where: { status: ReportStatus.OPEN } }),
      this.prisma.report.count({
        where: {
          status: { in: [ReportStatus.UNDER_REVIEW, ReportStatus.ESCALATED] },
        },
      }),
      this.prisma.report.count({ where: { status: ReportStatus.RESOLVED } }),
      this.prisma.report.count({ where: { status: ReportStatus.DISMISSED } }),
      this.prisma.agentProfile.count(),
      this.prisma.agentProfile.count({
        where: { verificationStatus: "verified" },
      }),
      this.prisma.proofVerification.count({
        where: { status: ProofStatus.VERIFIED },
      }),
      this.prisma.proofVerification.count({
        where: { status: { not: ProofStatus.VERIFIED } },
      }),
      this.prisma.payment.findMany({
        where: { status: PaymentStatus.RECEIVED },
        select: { amount: true },
      }),
      this.prisma.viewingCode.count({
        where: { status: ViewingCodeStatus.ACTIVE },
      }),
      this.prisma.user.count(),
      this.prisma.listing.count(),
      this.prisma.viewingRequest.count(),
      this.prisma.agentProfile.findMany({ select: { trustScore: true } }),
    ]);

    const totalRevenue = receivedPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );
    const platformTrustScore = agentTrustScores.length
      ? agentTrustScores.reduce((sum, agent) => sum + agent.trustScore, 0) /
        agentTrustScores.length
      : 0;

    const [
      pendingListingRows,
      pendingAgentRows,
      agentList,
      recentProofs,
      recentAuditLogs,
      reportTypeCounts,
    ] = await Promise.all([
      this.prisma.listing.findMany({
        where: { verificationStatus: ListingStatus.PENDING_REVIEW },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { agent: { select: { agencyName: true } } },
      }),
      this.prisma.agentProfile.findMany({
        where: { verificationStatus: { not: "verified" } },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      }),
      this.prisma.agentProfile.findMany({
        take: 6,
        orderBy: { trustScore: "desc" },
        include: {
          user: { select: { name: true } },
          listings: { select: { id: true } },
        },
      }),
      this.prisma.proofVerification.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        include: {
          viewingRequest: { include: { listing: { select: { title: true } } } },
        },
      }),
      this.prisma.auditLog.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        include: { actor: { select: { name: true, role: true } } },
      }),
      this.prisma.report.groupBy({
        by: ["reportType"],
        _count: { reportType: true },
      }),
    ]);

    const listingsWithMultipleReports = await this.prisma.report.groupBy({
      by: ["listingId"],
      _count: { listingId: true },
      having: { listingId: { _count: { gt: 1 } } },
    });

    const flaggedListings = await this.prisma.listing.findMany({
      where: {
        id: {
          in: listingsWithMultipleReports
            .map((row) => row.listingId)
            .filter((id): id is string => Boolean(id)),
        },
      },
      select: { id: true, title: true },
    });

    const lowTrustAgents = await this.prisma.agentProfile.findMany({
      where: { trustScore: { lt: 70 } },
      take: 5,
      include: { user: { select: { name: true } } },
    });

    const suspiciousActivity = [
      ...flaggedListings.map((listing) => ({
        type: "MULTIPLE_REPORTS" as const,
        severity: "high" as const,
        message: `Multiple reports on listing "${listing.title}"`,
      })),
      ...lowTrustAgents.map((agent) => ({
        type: "LOW_TRUST_AGENT" as const,
        severity: "medium" as const,
        message: `Agent "${agent.user.name}" has a low trust score (${agent.trustScore}/100)`,
      })),
    ];

    return {
      stats: {
        pendingListings,
        verifiedListings,
        totalReports:
          openReports + inProgressReports + resolvedReports + dismissedReports,
        openReports,
        inProgressReports,
        resolvedReports,
        dismissedReports,
        totalAgents,
        verifiedAgents,
        pendingAgents: totalAgents - verifiedAgents,
        verifiedProofs,
        pendingProofs,
        escrowHoldsCount: receivedPayments.length,
        escrowHoldsAmount: totalRevenue,
        activeViewingCodes,
        platformTrustScore: Math.round(platformTrustScore * 10) / 10,
      },
      platformAnalytics: {
        totalUsers,
        totalProperties,
        totalBookings,
        totalRevenue,
      },
      pendingApprovals: {
        listings: pendingListingRows.map((listing) => ({
          id: listing.id,
          title: listing.title,
          agencyName: listing.agent?.agencyName ?? "Unknown",
          createdAt: listing.createdAt,
        })),
        agents: pendingAgentRows.map((agent) => ({
          id: agent.id,
          name: agent.user.name,
          email: agent.user.email,
          createdAt: agent.createdAt,
        })),
      },
      reportsByStatus: {
        OPEN: openReports,
        UNDER_REVIEW: inProgressReports,
        RESOLVED: resolvedReports,
        DISMISSED: dismissedReports,
      },
      topReportCategories: reportTypeCounts.map((row) => ({
        type: row.reportType,
        count: row._count.reportType,
      })),
      activeAgents: agentList.map((agent) => ({
        id: agent.id,
        agencyName: agent.agencyName ?? agent.user.name,
        listingCount: agent.listings.length,
        verificationStatus: agent.verificationStatus,
        trustScore: agent.trustScore,
      })),
      recentProofVerifications: recentProofs.map((proof) => ({
        id: proof.id,
        listingTitle: proof.viewingRequest.listing.title,
        status: proof.status,
        createdAt: proof.createdAt,
      })),
      suspiciousActivity,
      recentAuditLogs: recentAuditLogs.map((log) => ({
        id: log.id,
        action: log.action,
        actorName: log.actor?.name ?? "System",
        severity: log.severity,
        createdAt: log.createdAt,
      })),
    };
  }
}
