import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  PaymentStatus,
  ProofStatus,
  ViewingRequestStatus,
} from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { sha256 } from "../common/utils/hash.util";
import { GenerateProofDto } from "./dto/generate-proof.dto";

@Injectable()
export class ZkProofsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async generate(actorId: string, dto: GenerateProofDto) {
    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: dto.viewingRequestId },
      include: { payment: true, listing: true },
    });

    if (!request) throw new NotFoundException("Viewing request not found.");
    if (!request.payment || request.payment.status !== PaymentStatus.RECEIVED) {
      throw new BadRequestException(
        "Payment must be received before proof generation.",
      );
    }

    await this.prisma.viewingRequest.update({
      where: { id: request.id },
      data: { status: ViewingRequestStatus.PROOF_GENERATING },
    });

    const proofHash = sha256(
      [
        request.id,
        request.listingId,
        request.payment.txHash,
        request.listing.viewingFee,
        this.config.get<string>("ZK_PROOF_SALT") ?? "dev-proof-salt",
      ].join(":"),
    );

    const proof = await this.prisma.zkProof.upsert({
      where: { viewingRequestId: request.id },
      update: {
        proofHash,
        publicInputs: {
          requestId: request.id,
          listingId: request.listingId,
          requiredViewingFee: request.listing.viewingFee,
          paymentCommitment: sha256(`${request.payment.txHash}:${request.id}`),
        },
        privateHintHash: sha256(
          `${request.payment.txHash}:${request.payment.payerWallet ?? "wallet"}`,
        ),
        status: ProofStatus.GENERATED,
        generatedAt: new Date(),
      },
      create: {
        viewingRequestId: request.id,
        proofHash,
        publicInputs: {
          requestId: request.id,
          listingId: request.listingId,
          requiredViewingFee: request.listing.viewingFee,
          paymentCommitment: sha256(`${request.payment.txHash}:${request.id}`),
        },
        privateHintHash: sha256(
          `${request.payment.txHash}:${request.payment.payerWallet ?? "wallet"}`,
        ),
        status: ProofStatus.GENERATED,
        generatedAt: new Date(),
      },
    });

    await this.prisma.viewingRequest.update({
      where: { id: request.id },
      data: { status: ViewingRequestStatus.PROOF_READY },
    });

    await this.auditLogs.create({
      actorId,
      action: "zk_proof.generated",
      entityType: "zk_proof",
      entityId: proof.id,
      severity: "SUCCESS",
      metadata: { viewingRequestId: request.id, proofHash },
    });

    return proof;
  }

  async findOne(id: string) {
    const proof = await this.prisma.zkProof.findUnique({ where: { id } });
    if (!proof) throw new NotFoundException("ZK proof not found.");
    return proof;
  }
}
