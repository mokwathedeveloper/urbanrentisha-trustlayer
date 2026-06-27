import { Injectable } from "@nestjs/common";
import { AuditSeverity, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { getRequestId } from "../common/context/request-context";

type AuditInput = {
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  severity?: AuditSeverity;
  metadata?: Prisma.InputJsonValue;
};

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Accepts an optional Prisma transaction client so callers that need this
   * write to be atomic with other writes (e.g. payments.service.ts's
   * confirmEscrowDeposit) can pass their `tx` through instead of always
   * writing via a separate, independent connection.
   *
   * Automatically stamps the current HTTP request's correlation ID (see
   * common/middleware/request-context.middleware.ts) into metadata when
   * one exists, so a failed transaction's audit trail can be traced back
   * to the exact request that caused it via the same ID logged in the
   * structured access log line - no manual timestamp/entityId
   * correlation needed. Calls made outside an HTTP request (cron
   * schedulers, the reconciliation sweep) simply have no requestId.
   */
  create(
    input: AuditInput,
    client: PrismaService | Prisma.TransactionClient = this.prisma,
  ) {
    const requestId = getRequestId();
    const metadata = {
      ...((input.metadata as Record<string, unknown> | undefined) ?? {}),
      ...(requestId ? { requestId } : {}),
    };

    return client.auditLog.create({
      data: {
        actorId: input.actorId,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        severity: input.severity ?? "INFO",
        metadata,
      },
    });
  }

  findAll() {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        actor: { select: { id: true, email: true, name: true, role: true } },
      },
    });
  }

  async stats() {
    const [
      totalEvents,
      systemEvents,
      trustActivity,
      userActions,
      securityEvents,
    ] = await Promise.all([
      this.prisma.auditLog.count(),
      this.prisma.auditLog.count({ where: { severity: "INFO" } }),
      this.prisma.auditLog.count({
        where: { entityType: { in: ["proof_verification", "viewing_code"] } },
      }),
      this.prisma.auditLog.count({
        where: { entityType: { in: ["report", "payment", "viewing_request"] } },
      }),
      this.prisma.auditLog.count({
        where: { severity: { in: ["WARNING", "CRITICAL"] } },
      }),
    ]);

    return {
      totalEvents,
      systemEvents,
      trustActivity,
      userActions,
      securityEvents,
    };
  }
}
