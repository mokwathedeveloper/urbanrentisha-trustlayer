import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  NotificationType,
  ProofStatus,
  ViewingCodeStatus,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { NotificationsService } from "../notifications/notifications.service";
import { randomCode } from "../common/utils/hash.util";
import { GenerateViewingCodeDto } from "./dto/generate-viewing-code.dto";

@Injectable()
export class ViewingCodesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly notifications: NotificationsService,
  ) {}

  async generate(actorId: string, dto: GenerateViewingCodeDto) {
    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: dto.viewingRequestId },
      include: { proofVerification: true, viewingCode: true },
    });

    if (!request) throw new NotFoundException("Viewing request not found.");
    if (
      !request.proofVerification ||
      request.proofVerification.status !== ProofStatus.VERIFIED
    ) {
      throw new BadRequestException(
        "Proof must be verified before viewing code unlock.",
      );
    }

    if (request.viewingCode) return request.viewingCode;

    const code = await this.prisma.viewingCode.create({
      data: {
        viewingRequestId: request.id,
        code: randomCode("UR", 6),
        status: ViewingCodeStatus.ACTIVE,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    await this.prisma.viewingRequest.update({
      where: { id: request.id },
      data: { status: ViewingRequestStatus.ACCESS_UNLOCKED },
    });

    await this.auditLogs.create({
      actorId,
      action: "viewing_code.unlocked",
      entityType: "viewing_code",
      entityId: code.id,
      severity: "SUCCESS",
      metadata: { viewingRequestId: request.id },
    });

    await this.notifications.create({
      userId: actorId,
      type: NotificationType.VIEWING_CODE,
      title: "Viewing Code Generated",
      message:
        "Your viewing code is ready. Share it with the agent to schedule your visit.",
      viewingRequestId: request.id,
    });

    return code;
  }

  async verify(code: string) {
    const viewingCode = await this.prisma.viewingCode.findUnique({
      where: { code },
      include: { viewingRequest: { include: { listing: true } } },
    });

    if (!viewingCode) throw new NotFoundException("Viewing code not found.");

    const expired = viewingCode.expiresAt.getTime() < Date.now();

    return {
      valid: viewingCode.status === ViewingCodeStatus.ACTIVE && !expired,
      status: expired ? "EXPIRED" : viewingCode.status,
      viewingCode,
    };
  }
}
