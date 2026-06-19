import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { CreateReportDto } from "./dto/create-report.dto";

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async create(reporterId: string, dto: CreateReportDto) {
    const report = await this.prisma.report.create({
      data: {
        reporterId,
        listingId: dto.listingId,
        viewingRequestId: dto.viewingRequestId,
        reportType: dto.reportType,
        description: dto.description,
        severity: dto.reportType === "UNSAFE_PAYMENT" ? "high" : "medium",
      },
    });

    await this.auditLogs.create({
      actorId: reporterId,
      action: "report.submitted",
      entityType: "report",
      entityId: report.id,
      severity: report.severity === "high" ? "CRITICAL" : "WARNING",
      metadata: { ...dto },
    });

    return report;
  }

  findAll() {
    return this.prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        listing: true,
        reporter: { select: { id: true, email: true, name: true, role: true } },
      },
    });
  }
}
