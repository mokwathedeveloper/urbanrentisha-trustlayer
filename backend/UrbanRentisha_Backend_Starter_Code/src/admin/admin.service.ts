import { Injectable } from "@nestjs/common";
import {
  ListingStatus,
  PaymentStatus,
  ProofStatus,
  ReportStatus,
  VerificationStage,
  ViewingCodeStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { StorageService } from "../storage/storage.service";
import { VerificationDecision } from "./dto/review-verification.dto";

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly storage: StorageService,
  ) {}

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
      Promise.all([
        this.prisma.agentProfile.count(),
        this.prisma.managerProfile.count(),
      ]).then(([a, m]) => a + m),
      Promise.all([
        this.prisma.agentProfile.count({
          where: { verificationStatus: "verified" },
        }),
        this.prisma.managerProfile.count({
          where: { verificationStatus: "verified" },
        }),
      ]).then(([a, m]) => a + m),
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
      Promise.all([
        this.prisma.agentProfile.findMany({ select: { trustScore: true } }),
        this.prisma.managerProfile.findMany({ select: { trustScore: true } }),
      ]).then(([a, m]) => [...a, ...m]),
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
      Promise.all([
        this.prisma.agentProfile.findMany({
          where: { verificationStatus: { not: "verified" } },
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { user: { select: { name: true, email: true } } },
        }),
        this.prisma.managerProfile.findMany({
          where: { verificationStatus: { not: "verified" } },
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { user: { select: { name: true, email: true } } },
        }),
      ]).then(([a, m]) =>
        [...a, ...m]
          .sort((x, y) => y.createdAt.getTime() - x.createdAt.getTime())
          .slice(0, 5),
      ),
      Promise.all([
        this.prisma.agentProfile.findMany({
          take: 6,
          orderBy: { trustScore: "desc" },
          include: {
            user: { select: { name: true } },
            listings: { select: { id: true } },
          },
        }),
        this.prisma.managerProfile.findMany({
          take: 6,
          orderBy: { trustScore: "desc" },
          include: {
            user: { select: { name: true } },
            listings: { select: { id: true } },
          },
        }),
      ]).then(([a, m]) =>
        [...a, ...m].sort((x, y) => y.trustScore - x.trustScore).slice(0, 6),
      ),
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

    const [lowTrustAgentRows, lowTrustManagerRows] = await Promise.all([
      this.prisma.agentProfile.findMany({
        where: { trustScore: { lt: 70 } },
        take: 5,
        include: { user: { select: { name: true } } },
      }),
      this.prisma.managerProfile.findMany({
        where: { trustScore: { lt: 70 } },
        take: 5,
        include: { user: { select: { name: true } } },
      }),
    ]);
    const lowTrustAgents = [...lowTrustAgentRows, ...lowTrustManagerRows].slice(
      0,
      5,
    );

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

  async listVerifications() {
    const pendingStages: VerificationStage[] = [
      VerificationStage.DOCUMENTS_UPLOADED,
      VerificationStage.UNDER_REVIEW,
      VerificationStage.NEEDS_CORRECTION,
    ];

    const [tenants, landlords, agents, managers] = await Promise.all([
      this.prisma.tenantProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { name: true, email: true } },
          documents: true,
        },
      }),
      this.prisma.landlordProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { name: true, email: true } },
          documents: true,
        },
      }),
      this.prisma.agentProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { name: true, email: true } },
          documents: true,
          landlord: { include: { user: { select: { name: true } } } },
        },
      }),
      this.prisma.managerProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { name: true, email: true } },
          documents: true,
          landlord: { include: { user: { select: { name: true } } } },
        },
      }),
    ]);

    type VerifiableProfile = {
      id: string;
      createdAt: Date;
      verificationStage: VerificationStage;
      user: { name: string; email: string };
      landlord?: { user: { name: string } } | null;
      documents: {
        id: string;
        fileUrl: string;
        fileName: string;
        status: string;
        createdAt: Date;
      }[];
    };

    const toRow = async (profile: VerifiableProfile, profileType: string) => ({
      profileType,
      profileId: profile.id,
      name: profile.user.name,
      email: profile.user.email,
      verificationStage: profile.verificationStage,
      linkedLandlordName: profile.landlord?.user.name ?? null,
      documents: await Promise.all(
        profile.documents.map(async (doc) => ({
          id: doc.id,
          fileName: doc.fileName,
          status: doc.status,
          createdAt: doc.createdAt,
          signedUrl: await this.storage.getDocumentSignedUrl(doc.fileUrl),
        })),
      ),
      createdAt: profile.createdAt,
    });

    const rows = await Promise.all([
      ...tenants.map((p) => toRow(p, "tenant")),
      ...landlords.map((p) => toRow(p, "landlord")),
      ...agents.map((p) => toRow(p, "agent")),
      ...managers.map((p) => toRow(p, "manager")),
    ]);

    return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async reviewVerification(
    profileType: "tenant" | "landlord" | "agent" | "manager",
    profileId: string,
    decision: VerificationDecision,
    note: string | undefined,
    actorId: string,
  ) {
    const stage =
      decision === VerificationDecision.APPROVED
        ? VerificationStage.APPROVED
        : decision === VerificationDecision.REJECTED
          ? VerificationStage.REJECTED
          : VerificationStage.NEEDS_CORRECTION;

    let updated;
    switch (profileType) {
      case "tenant":
        updated = await this.prisma.tenantProfile.update({
          where: { id: profileId },
          data: {
            verificationStage: stage,
            verifiedBadge: decision === VerificationDecision.APPROVED,
          },
        });
        break;
      case "landlord":
        updated = await this.prisma.landlordProfile.update({
          where: { id: profileId },
          data: { verificationStage: stage },
        });
        break;
      case "agent":
        updated = await this.prisma.agentProfile.update({
          where: { id: profileId },
          data: {
            verificationStage: stage,
            verificationStatus:
              decision === VerificationDecision.APPROVED
                ? "verified"
                : "pending",
          },
        });
        break;
      case "manager":
        updated = await this.prisma.managerProfile.update({
          where: { id: profileId },
          data: {
            verificationStage: stage,
            verificationStatus:
              decision === VerificationDecision.APPROVED
                ? "verified"
                : "pending",
          },
        });
        break;
    }

    await this.auditLogs.create({
      actorId,
      action: `verification.${decision.toLowerCase()}`,
      entityType: profileType,
      entityId: profileId,
      severity:
        decision === VerificationDecision.REJECTED ? "WARNING" : "SUCCESS",
      metadata: { note },
    });

    return updated;
  }
}
