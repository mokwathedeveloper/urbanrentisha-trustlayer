import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  NotificationType,
  ProofStatus,
  UserRole,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { SorobanService } from "../soroban/soroban.service";
import { NotificationsService } from "../notifications/notifications.service";
import { SubmitProofVerificationDto } from "./dto/submit-proof-verification.dto";
import { ViewingRequestAccessService } from "../viewing-requests/viewing-request-access.service";

interface StoredPublicInputs {
  requestId: string;
  listingId: string;
  requiredViewingFee: string;
  paymentCommitment: string;
  proof: {
    pi_a: [string, string, string];
    pi_b: [[string, string], [string, string], [string, string]];
    pi_c: [string, string, string];
  };
}

@Injectable()
export class ProofVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
    private readonly soroban: SorobanService,
    private readonly notifications: NotificationsService,
    private readonly access: ViewingRequestAccessService,
  ) {}

  async submit(
    actorId: string,
    role: UserRole,
    dto: SubmitProofVerificationDto,
  ) {
    await this.access.assertAccess(dto.viewingRequestId, actorId, role);

    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: dto.viewingRequestId },
      include: { zkProof: true },
    });

    if (!request) throw new NotFoundException("Viewing request not found.");
    if (!request.zkProof || request.zkProof.status !== ProofStatus.GENERATED) {
      throw new BadRequestException(
        "Generated proof is required before verification.",
      );
    }

    const publicInputs = request.zkProof
      .publicInputs as unknown as StoredPublicInputs;
    const publicSignals = [
      publicInputs.requestId,
      publicInputs.listingId,
      publicInputs.requiredViewingFee,
      publicInputs.paymentCommitment,
    ];

    let verified: boolean;
    let sorobanTxHash: string;
    try {
      const result = await this.soroban.verifyOnChain(
        publicInputs.proof,
        publicSignals,
      );
      verified = result.verified;
      sorobanTxHash = result.txHash;
    } catch (error) {
      await this.prisma.zkProof.update({
        where: { id: request.zkProof.id },
        data: { status: ProofStatus.FAILED },
      });
      await this.auditLogs.create({
        actorId,
        action: "proof.verification_error",
        entityType: "viewing_request",
        entityId: request.id,
        severity: "CRITICAL",
        metadata: { reason: (error as Error).message },
      });
      throw new BadRequestException(
        "Proof verification could not be completed.",
      );
    }

    const verification = await this.prisma.proofVerification.upsert({
      where: { viewingRequestId: request.id },
      update: {
        proofId: request.zkProof.id,
        sorobanTxHash,
        verifierAddress: "UrbanRentishaTrustVerifier",
        status: verified ? ProofStatus.VERIFIED : ProofStatus.FAILED,
        verifiedAt: verified ? new Date() : null,
      },
      create: {
        viewingRequestId: request.id,
        proofId: request.zkProof.id,
        sorobanTxHash,
        verifierAddress: "UrbanRentishaTrustVerifier",
        status: verified ? ProofStatus.VERIFIED : ProofStatus.FAILED,
        verifiedAt: verified ? new Date() : null,
      },
    });

    await this.prisma.zkProof.update({
      where: { id: request.zkProof.id },
      data: { status: verified ? ProofStatus.VERIFIED : ProofStatus.FAILED },
    });

    await this.prisma.viewingRequest.update({
      where: { id: request.id },
      data: {
        status: verified
          ? ViewingRequestStatus.PROOF_VERIFIED
          : ViewingRequestStatus.PAYMENT_RECEIVED,
      },
    });

    await this.auditLogs.create({
      actorId,
      action: verified ? "proof.verified" : "proof.failed",
      entityType: "proof_verification",
      entityId: verification.id,
      severity: verified ? "SUCCESS" : "CRITICAL",
      metadata: {
        viewingRequestId: request.id,
        sorobanTxHash,
        proofHash: request.zkProof.proofHash,
      },
    });

    await this.notifications.create({
      userId: actorId,
      type: NotificationType.PROOF,
      title: verified
        ? "Proof Verified Successfully"
        : "Proof Verification Failed",
      message: verified
        ? "Your zero-knowledge proof has been verified on Stellar Testnet."
        : "Your zero-knowledge proof could not be verified. Viewing access remains locked.",
      viewingRequestId: request.id,
    });

    if (!verified) {
      throw new BadRequestException(
        "Proof verification failed. Viewing access remains locked.",
      );
    }

    return verification;
  }

  async findOne(id: string, userId: string, role: UserRole) {
    const verification = await this.prisma.proofVerification.findUnique({
      where: { id },
    });
    if (!verification)
      throw new NotFoundException("Proof verification not found.");
    await this.access.assertAccess(verification.viewingRequestId, userId, role);
    return verification;
  }
}
