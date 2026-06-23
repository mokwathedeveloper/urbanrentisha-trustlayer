import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  NotificationType,
  PaymentStatus,
  ProofStatus,
  UserRole,
  ViewingRequestStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { SorobanService } from "../soroban/soroban.service";
import { EscrowService } from "../soroban/escrow.service";
import { NotificationsService } from "../notifications/notifications.service";
import { SubmitProofVerificationDto } from "./dto/submit-proof-verification.dto";
import { ViewingRequestAccessService } from "../viewing-requests/viewing-request-access.service";
import { ListingsService } from "../listings/listings.service";

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
    private readonly escrow: EscrowService,
    private readonly notifications: NotificationsService,
    private readonly access: ViewingRequestAccessService,
    private readonly listings: ListingsService,
  ) {}

  async submit(
    actorId: string,
    role: UserRole,
    dto: SubmitProofVerificationDto,
  ) {
    await this.access.assertAccess(dto.viewingRequestId, actorId, role);

    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: dto.viewingRequestId },
      include: {
        zkProof: true,
        payment: true,
        listing: { include: { owner: true } },
      },
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
      // Proof failed - this tenant did not secure the property after all,
      // so free it up for the next interested tenant immediately rather
      // than waiting for the reservation timer to lapse.
      await this.listings.releaseListing(
        request.listingId,
        actorId,
        "proof_failed",
        request.id,
      );
      throw new BadRequestException(
        "Proof verification failed. Viewing access remains locked.",
      );
    }

    await this.releaseEscrowIfHeld(actorId, request);

    return verification;
  }

  /**
   * Releases the held escrow payment to the landlord now that the proof is
   * verified. This is intentionally non-blocking: a release failure (no
   * landlord wallet yet, RPC hiccup, etc.) must not undo or fail proof
   * verification - they are separate concerns. Failures are audit-logged
   * as WARNING so an admin can release manually later.
   */
  private async releaseEscrowIfHeld(
    actorId: string,
    request: {
      id: string;
      payment: {
        id: string;
        status: PaymentStatus;
        escrowDepositTxHash: string | null;
      } | null;
      listing: { owner: { walletAddress: string | null } };
    },
  ): Promise<void> {
    const payment = request.payment;
    if (
      !payment ||
      !payment.escrowDepositTxHash ||
      payment.status !== PaymentStatus.RECEIVED
    ) {
      return;
    }

    const landlordWallet = request.listing.owner.walletAddress;
    if (!landlordWallet) {
      await this.auditLogs.create({
        actorId,
        action: "payment.escrow_release_skipped",
        entityType: "payment",
        entityId: payment.id,
        severity: "WARNING",
        metadata: {
          reason: "Landlord has no Stellar wallet yet; release pending.",
          viewingRequestId: request.id,
        },
      });
      return;
    }

    try {
      const releaseTxHash = await this.escrow.release(
        payment.id,
        landlordWallet,
      );
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.RELEASED,
          escrowReleaseTxHash: releaseTxHash,
          escrowReleasedAt: new Date(),
        },
      });
      await this.auditLogs.create({
        actorId,
        action: "payment.escrow_released",
        entityType: "payment",
        entityId: payment.id,
        severity: "SUCCESS",
        metadata: { releaseTxHash, viewingRequestId: request.id },
      });
    } catch (error) {
      await this.auditLogs.create({
        actorId,
        action: "payment.escrow_release_failed",
        entityType: "payment",
        entityId: payment.id,
        severity: "WARNING",
        metadata: {
          reason: (error as Error).message,
          viewingRequestId: request.id,
        },
      });
    }
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
