import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  PaymentStatus,
  Prisma,
  ProofStatus,
  UserRole,
  ViewingRequestStatus,
} from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import * as path from "path";
import * as snarkjs from "snarkjs";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { sha256 } from "../common/utils/hash.util";
import {
  addMod,
  fieldHash,
  mimcPermutation,
  mulMod,
  randomField,
} from "./field.util";
import { GenerateProofDto } from "./dto/generate-proof.dto";
import { ViewingRequestAccessService } from "../viewing-requests/viewing-request-access.service";

const WASM_PATH = path.join(
  __dirname,
  "circuit-artifacts",
  "payment_proof.wasm",
);
const ZKEY_PATH = path.join(
  __dirname,
  "circuit-artifacts",
  "payment_proof_final.zkey",
);

@Injectable()
export class ZkProofsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly auditLogs: AuditLogsService,
    private readonly access: ViewingRequestAccessService,
  ) {}

  async generate(actorId: string, role: UserRole, dto: GenerateProofDto) {
    await this.access.assertAccess(dto.viewingRequestId, actorId, role);

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

    // Map the request's identifiers and the payment's private data into the
    // circuit's scalar field. See docs/zkproof/.../section 7-8 for the proof
    // statement and circuits/payment-proof/payment_proof.circom for the circuit.
    const requestIdField = fieldHash(request.id);
    const listingIdField = fieldHash(request.listingId);
    const feeField = BigInt(request.listing.viewingFee);
    const secretField = fieldHash(
      `${request.payment.txHash}:${this.config.get<string>("ZK_PROOF_SALT") ?? "dev-proof-salt"}`,
    );
    const nonceField = randomField();
    const paymentCommitment = addMod(
      mimcPermutation(secretField, nonceField),
      mulMod(requestIdField, listingIdField),
      feeField,
    );

    const circuitInput = {
      requestId: requestIdField.toString(),
      listingId: listingIdField.toString(),
      requiredViewingFee: feeField.toString(),
      paymentCommitment: paymentCommitment.toString(),
      paymentSecret: secretField.toString(),
      paymentNonce: nonceField.toString(),
    };

    let snarkProof: unknown;
    try {
      const { proof } = await snarkjs.groth16.fullProve(
        circuitInput,
        WASM_PATH,
        ZKEY_PATH,
      );
      snarkProof = proof;
    } catch (error) {
      // Revert to PAYMENT_RECEIVED (not a dedicated FAILED state - none exists
      // on ViewingRequestStatus) so proof generation can be retried.
      await this.prisma.viewingRequest.update({
        where: { id: request.id },
        data: { status: ViewingRequestStatus.PAYMENT_RECEIVED },
      });
      await this.prisma.zkProof.upsert({
        where: { viewingRequestId: request.id },
        update: { status: ProofStatus.FAILED },
        create: { viewingRequestId: request.id, status: ProofStatus.FAILED },
      });
      await this.auditLogs.create({
        actorId,
        action: "zk_proof.generation_failed",
        entityType: "viewing_request",
        entityId: request.id,
        severity: "CRITICAL",
        metadata: { reason: (error as Error).message },
      });
      throw new BadRequestException("Proof could not be generated.");
    }

    const proofHash = sha256(JSON.stringify(snarkProof));
    const publicInputs: Prisma.InputJsonValue = {
      requestId: circuitInput.requestId,
      listingId: circuitInput.listingId,
      requiredViewingFee: circuitInput.requiredViewingFee,
      paymentCommitment: circuitInput.paymentCommitment,
      proof: snarkProof as Prisma.InputJsonValue,
    };
    // Private witness material is never persisted in the clear - only its hash.
    const privateHintHash = sha256(
      `${secretField.toString()}:${nonceField.toString()}`,
    );

    const proofRecord = await this.prisma.zkProof.upsert({
      where: { viewingRequestId: request.id },
      update: {
        proofHash,
        publicInputs,
        privateHintHash,
        status: ProofStatus.GENERATED,
        generatedAt: new Date(),
      },
      create: {
        viewingRequestId: request.id,
        proofHash,
        publicInputs,
        privateHintHash,
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
      entityId: proofRecord.id,
      severity: "SUCCESS",
      metadata: { viewingRequestId: request.id, proofHash },
    });

    return proofRecord;
  }

  async findOne(id: string, userId: string, role: UserRole) {
    const proof = await this.prisma.zkProof.findUnique({ where: { id } });
    if (!proof) throw new NotFoundException("ZK proof not found.");
    await this.access.assertAccess(proof.viewingRequestId, userId, role);
    return proof;
  }
}
