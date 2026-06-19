import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ProofStatus, ViewingRequestStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { sha256 } from "../common/utils/hash.util";
import { SubmitProofVerificationDto } from "./dto/submit-proof-verification.dto";

@Injectable()
export class ProofVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService
  ) {}

  async submit(actorId: string, dto: SubmitProofVerificationDto) {
    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: dto.viewingRequestId },
      include: { zkProof: true }
    });

    if (!request) throw new NotFoundException("Viewing request not found.");
    if (!request.zkProof || request.zkProof.status !== ProofStatus.GENERATED) {
      throw new BadRequestException("Generated proof is required before verification.");
    }

    const sorobanTxHash = `mock_soroban_${sha256(`${request.id}:${request.zkProof.proofHash}`).slice(0, 32)}`;

    const verification = await this.prisma.proofVerification.upsert({
      where: { viewingRequestId: request.id },
      update: {
        proofId: request.zkProof.id,
        sorobanTxHash,
        verifierAddress: "UrbanRentishaTrustVerifier",
        status: ProofStatus.VERIFIED,
        verifiedAt: new Date()
      },
      create: {
        viewingRequestId: request.id,
        proofId: request.zkProof.id,
        sorobanTxHash,
        verifierAddress: "UrbanRentishaTrustVerifier",
        status: ProofStatus.VERIFIED,
        verifiedAt: new Date()
      }
    });

    await this.prisma.zkProof.update({
      where: { id: request.zkProof.id },
      data: { status: ProofStatus.VERIFIED }
    });

    await this.prisma.viewingRequest.update({
      where: { id: request.id },
      data: { status: ViewingRequestStatus.PROOF_VERIFIED }
    });

    await this.auditLogs.create({
      actorId,
      action: "proof.verified",
      entityType: "proof_verification",
      entityId: verification.id,
      severity: "SUCCESS",
      metadata: {
        viewingRequestId: request.id,
        sorobanTxHash,
        proofHash: request.zkProof.proofHash
      }
    });

    return verification;
  }

  findOne(id: string) {
    return this.prisma.proofVerification.findUnique({ where: { id } });
  }
}
