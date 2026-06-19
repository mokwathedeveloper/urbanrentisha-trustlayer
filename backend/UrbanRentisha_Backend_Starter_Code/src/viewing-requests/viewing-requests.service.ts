import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ViewingRequestStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { CreateViewingRequestDto } from "./dto/create-viewing-request.dto";

@Injectable()
export class ViewingRequestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async create(userId: string, dto: CreateViewingRequestDto) {
    const tenant = await this.prisma.tenantProfile.findUnique({
      where: { userId },
    });
    if (!tenant) throw new BadRequestException("Tenant profile is required.");

    const listing = await this.prisma.listing.findUnique({
      where: { id: dto.listingId },
    });
    if (!listing) throw new NotFoundException("Listing not found.");

    const request = await this.prisma.viewingRequest.create({
      data: {
        tenantId: tenant.id,
        listingId: listing.id,
        preferredDate: dto.preferredDate
          ? new Date(dto.preferredDate)
          : undefined,
        preferredTime: dto.preferredTime,
        status: ViewingRequestStatus.AWAITING_PAYMENT,
      },
      include: { listing: true },
    });

    await this.auditLogs.create({
      actorId: userId,
      action: "viewing_request.created",
      entityType: "viewing_request",
      entityId: request.id,
      severity: "INFO",
      metadata: { listingId: listing.id, viewingFee: listing.viewingFee },
    });

    return request;
  }

  async findOne(id: string) {
    const request = await this.prisma.viewingRequest.findUnique({
      where: { id },
      include: {
        listing: true,
        payment: true,
        zkProof: true,
        proofVerification: true,
        viewingCode: true,
      },
    });

    if (!request) throw new NotFoundException("Viewing request not found.");
    return request;
  }

  async status(id: string) {
    const request = await this.findOne(id);
    return {
      id: request.id,
      status: request.status,
      paymentStatus: request.payment?.status ?? "NOT_CREATED",
      proofStatus: request.zkProof?.status ?? "NOT_STARTED",
      verificationStatus: request.proofVerification?.status ?? "NOT_SUBMITTED",
      viewingCodeStatus: request.viewingCode?.status ?? "LOCKED",
    };
  }

  updateStatus(id: string, status: ViewingRequestStatus) {
    return this.prisma.viewingRequest.update({
      where: { id },
      data: { status },
    });
  }
}
