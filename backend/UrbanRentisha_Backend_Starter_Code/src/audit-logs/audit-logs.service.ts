import { Injectable } from "@nestjs/common";
import { AuditSeverity } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

type AuditInput = {
  actorId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  severity?: AuditSeverity;
  metadata?: Record<string, unknown>;
};

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: AuditInput) {
    return this.prisma.auditLog.create({
      data: {
        actorId: input.actorId,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        severity: input.severity ?? "INFO",
        metadata: input.metadata ?? {}
      }
    });
  }

  findAll() {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { actor: { select: { id: true, email: true, name: true, role: true } } }
    });
  }
}
