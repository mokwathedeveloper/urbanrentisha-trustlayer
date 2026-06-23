import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  DocumentType,
  ListingStatus,
  NotificationType,
  PaymentStatus,
  ProofStatus,
  ReportStatus,
  UserStatus,
  VerificationStage,
  ViewingCodeStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { StorageService } from "../storage/storage.service";
import { StellarService } from "../stellar/stellar.service";
import { EscrowService } from "../soroban/escrow.service";
import { HoldStatus } from "../soroban/escrow.client";
import { NotificationsService } from "../notifications/notifications.service";
import { ListingsService } from "../listings/listings.service";
import { VerificationDecision } from "./dto/review-verification.dto";

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly storage: StorageService,
    private readonly stellar: StellarService,
    private readonly escrow: EscrowService,
    private readonly notifications: NotificationsService,
    private readonly listings: ListingsService,
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
          user: { select: { id: true, name: true, email: true, status: true } },
          documents: true,
        },
      }),
      this.prisma.landlordProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
          documents: true,
        },
      }),
      this.prisma.agentProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
          documents: true,
          landlord: { include: { user: { select: { name: true } } } },
        },
      }),
      this.prisma.managerProfile.findMany({
        where: { verificationStage: { in: pendingStages } },
        include: {
          user: { select: { id: true, name: true, email: true, status: true } },
          documents: true,
          landlord: { include: { user: { select: { name: true } } } },
        },
      }),
    ]);

    type VerifiableProfile = {
      id: string;
      createdAt: Date;
      verificationStage: VerificationStage;
      user: { id: string; name: string; email: string; status: UserStatus };
      landlord?: { user: { name: string } } | null;
      documents: {
        id: string;
        fileUrl: string;
        fileName: string;
        documentType: DocumentType | null;
        status: string;
        createdAt: Date;
      }[];
    };

    const toRow = async (profile: VerifiableProfile, profileType: string) => ({
      profileType,
      profileId: profile.id,
      userId: profile.user.id,
      name: profile.user.name,
      email: profile.user.email,
      userStatus: profile.user.status,
      verificationStage: profile.verificationStage,
      linkedLandlordName: profile.landlord?.user.name ?? null,
      documents: await Promise.all(
        profile.documents.map(async (doc) => ({
          id: doc.id,
          fileName: doc.fileName,
          documentType: doc.documentType,
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

    if (
      (profileType === "agent" || profileType === "manager") &&
      decision === VerificationDecision.APPROVED
    ) {
      await this.attestAndNotifyLandlord(profileType, profileId, actorId);
    }

    return updated;
  }

  private async attestAndNotifyLandlord(
    profileType: "agent" | "manager",
    profileId: string,
    actorId: string,
  ) {
    try {
      const { txHash } = await this.stellar.recordAttestation({
        subjectId: profileId,
        approvedBy: actorId,
        role: profileType,
      });

      if (profileType === "agent") {
        await this.prisma.agentProfile.update({
          where: { id: profileId },
          data: { attestationTxHash: txHash, attestedAt: new Date() },
        });
      } else {
        await this.prisma.managerProfile.update({
          where: { id: profileId },
          data: { attestationTxHash: txHash, attestedAt: new Date() },
        });
      }

      await this.auditLogs.create({
        actorId,
        action: "agent.attested",
        entityType: profileType,
        entityId: profileId,
        severity: "SUCCESS",
        metadata: { txHash },
      });
    } catch (error) {
      await this.auditLogs.create({
        actorId,
        action: "agent.attestation_failed",
        entityType: profileType,
        entityId: profileId,
        severity: "CRITICAL",
        metadata: {
          error: error instanceof Error ? error.message : String(error),
        },
      });
    }

    const profile =
      profileType === "agent"
        ? await this.prisma.agentProfile.findUnique({
            where: { id: profileId },
            include: { landlord: { select: { userId: true } } },
          })
        : await this.prisma.managerProfile.findUnique({
            where: { id: profileId },
            include: { landlord: { select: { userId: true } } },
          });

    if (profile?.landlord?.userId) {
      await this.notifications.create({
        userId: profile.landlord.userId,
        type: NotificationType.SYSTEM,
        title: "Agent Invite Approved",
        message:
          "Your invited team member has been approved. Generate their activation code from My Team.",
      });
    }
  }

  async setUserStatus(userId: string, status: UserStatus, actorId: string) {
    if (userId === actorId) {
      throw new BadRequestException(
        "You cannot change your own account status.",
      );
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found.");

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { status },
      select: { id: true, email: true, name: true, role: true, status: true },
    });

    await this.auditLogs.create({
      actorId,
      action:
        status === UserStatus.SUSPENDED ? "user.suspended" : "user.reactivated",
      entityType: "user",
      entityId: userId,
      severity: status === UserStatus.SUSPENDED ? "WARNING" : "SUCCESS",
      metadata: { email: user.email },
    });

    return updated;
  }

  async listLandlords() {
    const landlords = await this.prisma.landlordProfile.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });

    return landlords.map((landlord) => ({
      id: landlord.id,
      companyName: landlord.companyName,
      name: landlord.user.name,
      email: landlord.user.email,
    }));
  }

  async setAgentLandlord(
    profileType: "agent" | "manager",
    profileId: string,
    landlordProfileId: string | null,
    actorId: string,
  ) {
    if (landlordProfileId) {
      const landlord = await this.prisma.landlordProfile.findUnique({
        where: { id: landlordProfileId },
      });
      if (!landlord) throw new NotFoundException("Landlord profile not found.");
    }

    const existing =
      profileType === "agent"
        ? await this.prisma.agentProfile.findUnique({
            where: { id: profileId },
          })
        : await this.prisma.managerProfile.findUnique({
            where: { id: profileId },
          });
    if (!existing)
      throw new NotFoundException(`${profileType} profile not found.`);

    const updated =
      profileType === "agent"
        ? await this.prisma.agentProfile.update({
            where: { id: profileId },
            data: { landlordId: landlordProfileId },
            include: { user: { select: { name: true, email: true } } },
          })
        : await this.prisma.managerProfile.update({
            where: { id: profileId },
            data: { landlordId: landlordProfileId },
            include: { user: { select: { name: true, email: true } } },
          });

    await this.auditLogs.create({
      actorId,
      action: "landlord.relinked",
      entityType: profileType,
      entityId: profileId,
      severity: "INFO",
      metadata: { landlordProfileId },
    });

    return updated;
  }

  async getLandlordTeam(landlordProfileId: string) {
    const landlord = await this.prisma.landlordProfile.findUnique({
      where: { id: landlordProfileId },
      include: {
        user: { select: { id: true, name: true, email: true, status: true } },
        agents: {
          include: {
            user: {
              select: { id: true, name: true, email: true, status: true },
            },
            listings: {
              select: { id: true, title: true, verificationStatus: true },
            },
          },
        },
        managers: {
          include: {
            user: {
              select: { id: true, name: true, email: true, status: true },
            },
            listings: {
              select: { id: true, title: true, verificationStatus: true },
            },
          },
        },
      },
    });

    if (!landlord) throw new NotFoundException("Landlord profile not found.");

    return {
      id: landlord.id,
      companyName: landlord.companyName,
      verificationStage: landlord.verificationStage,
      trustScore: landlord.trustScore,
      user: landlord.user,
      agents: landlord.agents.map((agent) => ({
        id: agent.id,
        profileType: "agent" as const,
        agencyName: agent.agencyName,
        verificationStatus: agent.verificationStatus,
        trustScore: agent.trustScore,
        user: agent.user,
        listings: agent.listings,
      })),
      managers: landlord.managers.map((manager) => ({
        id: manager.id,
        profileType: "manager" as const,
        agencyName: manager.agencyName,
        verificationStatus: manager.verificationStatus,
        trustScore: manager.trustScore,
        user: manager.user,
        listings: manager.listings,
      })),
    };
  }

  /**
   * Refunds a held escrow payment back to the tenant. Manual admin action
   * for disputes/cancellations - this codebase has no automated
   * cancellation flow to hook a refund into yet.
   */
  async refundPayment(paymentId: string, adminId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        viewingRequest: {
          include: {
            tenant: true,
            listing: { select: { id: true, title: true } },
          },
        },
      },
    });
    if (!payment) throw new NotFoundException("Payment not found.");
    if (
      payment.status !== PaymentStatus.RECEIVED ||
      !payment.escrowDepositTxHash
    ) {
      throw new BadRequestException(
        "Only a payment held in escrow can be refunded.",
      );
    }

    const hold = await this.escrow.getHold(payment.id);
    if (!hold || hold.status !== HoldStatus.Held) {
      throw new BadRequestException(
        "No held funds were found on-chain for this payment.",
      );
    }

    const refundTxHash = await this.escrow.refund(payment.id);

    const updated = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.REFUNDED,
        escrowReleaseTxHash: refundTxHash,
      },
    });

    await this.auditLogs.create({
      actorId: adminId,
      action: "payment.escrow_refunded",
      entityType: "payment",
      entityId: payment.id,
      severity: "SUCCESS",
      metadata: {
        refundTxHash,
        viewingRequestId: payment.viewingRequestId,
      },
    });

    await this.notifications.create({
      userId: payment.viewingRequest.tenant.userId,
      type: NotificationType.PAYMENT,
      title: "Payment Refunded",
      message: `Your payment of ${updated.amount} ${updated.stellarAsset} has been refunded.`,
      viewingRequestId: payment.viewingRequestId,
    });

    // The landlord/agent/manager were expecting these funds - a refund
    // means the booking fell through, which is exactly the kind of thing
    // they shouldn't have to discover after the fact.
    const contacts = await this.listings.getEscrowContacts(
      payment.viewingRequest.listing.id,
    );
    await Promise.all(
      contacts
        .filter((userId) => userId !== payment.viewingRequest.tenant.userId)
        .map((userId) =>
          this.notifications.create({
            userId,
            type: NotificationType.PAYMENT,
            title: "Escrow Refunded",
            message: `Escrow funds of ${updated.amount} ${updated.stellarAsset} for "${payment.viewingRequest.listing.title}" were refunded to the tenant. This booking did not go through.`,
            viewingRequestId: payment.viewingRequestId,
          }),
        ),
    );

    return updated;
  }
}
