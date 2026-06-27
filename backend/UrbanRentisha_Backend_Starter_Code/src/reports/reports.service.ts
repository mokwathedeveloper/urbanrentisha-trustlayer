import { Injectable, NotFoundException } from "@nestjs/common";
import { NotificationType, ReportSeverity, ReportType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import {
  buildPaginatedResult,
  paginationArgs,
} from "../common/utils/pagination.util";
import { CreateReportDto } from "./dto/create-report.dto";
import { RespondToReportDto } from "./dto/respond-to-report.dto";

/**
 * Deadline for a human to first acknowledge a report - not for it to reach
 * a final resolution, which can legitimately take longer. Computed on read
 * from createdAt rather than stored, since the rule (24h) can change
 * without needing to backfill old rows.
 */
export const REPORT_RESPONSE_SLA_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly notifications: NotificationsService,
  ) {}

  async create(reporterId: string, dto: CreateReportDto) {
    const report = await this.prisma.report.create({
      data: {
        reporterId,
        listingId: dto.listingId,
        viewingRequestId: dto.viewingRequestId,
        reportType: dto.reportType,
        description: dto.description,
        severity:
          dto.severity ??
          (dto.reportType === ReportType.UNSAFE_PAYMENT
            ? ReportSeverity.HIGH
            : ReportSeverity.MEDIUM),
        allowContact: dto.allowContact ?? false,
      },
    });

    await this.auditLogs.create({
      actorId: reporterId,
      action: "report.submitted",
      entityType: "report",
      entityId: report.id,
      severity:
        report.severity === ReportSeverity.HIGH ? "CRITICAL" : "WARNING",
      metadata: { ...dto },
    });

    await this.notifications.create({
      userId: reporterId,
      type: NotificationType.REPORT,
      title: "Report Received",
      message: "Your fake listing report has been submitted for review.",
      viewingRequestId: dto.viewingRequestId,
      listingId: dto.listingId,
    });

    await this.notifications.notifyAdmins({
      type: NotificationType.REPORT,
      title: "New Report Filed",
      message: `A ${report.severity.toLowerCase()}-severity ${report.reportType.toLowerCase().replace(/_/g, " ")} report was filed and needs review.`,
      viewingRequestId: dto.viewingRequestId,
      listingId: dto.listingId,
    });

    return report;
  }

  private withResponseDeadline<
    T extends { createdAt: Date; firstRespondedAt: Date | null },
  >(report: T) {
    return {
      ...report,
      responseDeadline: new Date(
        report.createdAt.getTime() + REPORT_RESPONSE_SLA_MS,
      ),
    };
  }

  /** Paginated (page/limit, default 20, hard max 100) - previously
   * unbounded, returning every report in the table with no `where` at all. */
  async findAll(pagination: PaginationQueryDto) {
    const { page, limit } = pagination;
    const [reports, total] = await Promise.all([
      this.prisma.report.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          listing: true,
          reporter: {
            select: { id: true, email: true, name: true, role: true },
          },
          respondedBy: { select: { id: true, name: true } },
        },
        ...paginationArgs(page, limit),
      }),
      this.prisma.report.count(),
    ]);
    const items = reports.map((report) => this.withResponseDeadline(report));
    return buildPaginatedResult(items, total, page, limit);
  }

  /** Paginated (page/limit, default 20, hard max 100) - previously
   * unbounded for any reporter with a large report history. */
  async findMine(reporterId: string, pagination: PaginationQueryDto) {
    const { page, limit } = pagination;
    const where = { reporterId };
    const [reports, total] = await Promise.all([
      this.prisma.report.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          listing: true,
          respondedBy: { select: { id: true, name: true } },
        },
        ...paginationArgs(page, limit),
      }),
      this.prisma.report.count({ where }),
    ]);
    const items = reports.map((report) => this.withResponseDeadline(report));
    return buildPaginatedResult(items, total, page, limit);
  }

  /**
   * The first admin/platform user to act on a report sets firstRespondedAt
   * - subsequent responses can still change status, but don't move the
   * "first response" timestamp, since that's specifically about how long
   * the reporter waited for someone to start looking at it.
   */
  async respond(reportId: string, actorId: string, dto: RespondToReportDto) {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
    });
    if (!report) throw new NotFoundException("Report not found.");

    const isFirstResponse = !report.firstRespondedAt;
    const updated = await this.prisma.report.update({
      where: { id: reportId },
      data: {
        status: dto.status,
        responseNote: dto.note,
        firstRespondedAt: report.firstRespondedAt ?? new Date(),
        respondedById: report.respondedById ?? actorId,
      },
    });

    await this.auditLogs.create({
      actorId,
      action: isFirstResponse ? "report.first_response" : "report.updated",
      entityType: "report",
      entityId: reportId,
      severity: "INFO",
      metadata: { status: dto.status },
    });

    await this.notifications.create({
      userId: report.reporterId,
      type: NotificationType.REPORT,
      title: "Report Update",
      message: `Your report has been updated to: ${dto.status.replace(/_/g, " ").toLowerCase()}.`,
      listingId: report.listingId ?? undefined,
      viewingRequestId: report.viewingRequestId ?? undefined,
    });

    return this.withResponseDeadline(updated);
  }
}
