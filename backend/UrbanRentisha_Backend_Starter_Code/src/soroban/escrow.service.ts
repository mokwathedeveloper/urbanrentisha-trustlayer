import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHash } from "crypto";
import { EscrowClient, Hold } from "./escrow.client";
import { withRetry, withTimeout } from "../common/utils/resilience.util";

const STROOPS_PER_XLM = 10_000_000n;

// Pure reads (and the unsigned-tx build below, which submits nothing) -
// safe to retry on a transient RPC failure.
const READ_TIMEOUT_MS = 8_000;
// Anything that submits a transaction and mutates on-chain escrow state -
// timeout-bounded only, never blindly retried (see submitSignedDeposit,
// release, refund below). 30s is generous relative to typical testnet
// submit+confirm latency so a genuinely slow-but-succeeding call isn't cut
// off prematurely.
const SUBMIT_TIMEOUT_MS = 30_000;

@Injectable()
export class EscrowService {
  private readonly client: EscrowClient;
  private readonly nativeAssetContractId: string;

  constructor(private readonly config: ConfigService) {
    this.client = new EscrowClient({
      contractId: this.config.getOrThrow<string>("ESCROW_CONTRACT_ID"),
      rpcUrl: this.config.getOrThrow<string>("SOROBAN_RPC_URL"),
      networkPassphrase: this.config.getOrThrow<string>(
        "STELLAR_NETWORK_PASSPHRASE",
      ),
      adminSecretKey: this.config.getOrThrow<string>(
        "STELLAR_PLATFORM_SECRET_KEY",
      ),
    });
    this.nativeAssetContractId = this.config.getOrThrow<string>(
      "NATIVE_ASSET_CONTRACT_ID",
    );
  }

  /**
   * Derives the contract's 32-byte payment_id from the Payment's cuid, so
   * every Payment maps to exactly one on-chain Hold.
   */
  paymentIdBytes(paymentId: string): Buffer {
    return createHash("sha256").update(paymentId).digest();
  }

  /**
   * Converts a Payment.amount (the listing's viewingFee, an MVP-simplified
   * 1:1 XLM amount - this codebase has no fiat/XLM FX conversion module) into
   * stroops for the on-chain call.
   */
  toStroops(amount: number): bigint {
    return BigInt(amount) * STROOPS_PER_XLM;
  }

  /** Builds an unsigned deposit tx - never submitted here, so safe to retry. */
  async prepareDeposit(
    payerPublicKey: string,
    paymentId: string,
    amount: number,
  ): Promise<string> {
    return withRetry(
      () =>
        this.client.prepareDeposit(
          payerPublicKey,
          this.nativeAssetContractId,
          this.paymentIdBytes(paymentId),
          this.toStroops(amount),
        ),
      { timeoutMs: READ_TIMEOUT_MS, label: "escrow.prepareDeposit" },
    );
  }

  /**
   * Submits the tenant-signed deposit transaction - mutates on-chain
   * escrow state. Timeout-bounded only: never blindly retried, since a
   * retry here could double-submit a deposit. A failure (including a
   * timeout) must surface to the caller's own audit-logged failure path
   * (see PaymentsService.confirmEscrowDeposit) and is recoverable via the
   * reconciliation sweep, not an automatic resubmission.
   */
  async submitSignedDeposit(signedXdr: string): Promise<string> {
    return withTimeout(
      () => this.client.submitSignedDeposit(signedXdr),
      SUBMIT_TIMEOUT_MS,
      "escrow.submitSignedDeposit",
    );
  }

  /** Read-only on-chain status check - safe to retry. */
  async getHold(paymentId: string): Promise<Hold | null> {
    return withRetry(
      () => this.client.getHold(this.paymentIdBytes(paymentId)),
      {
        timeoutMs: READ_TIMEOUT_MS,
        label: "escrow.getHold",
      },
    );
  }

  /**
   * Releases held funds on-chain - mutates state. Timeout-bounded only,
   * never blindly retried (see submitSignedDeposit above; the same
   * reasoning applies - this is exactly the call
   * ProofVerificationService.releaseEscrowIfHeld's atomic claim exists to
   * ensure only ever runs once per payment).
   */
  async release(paymentId: string, landlordPublicKey: string): Promise<string> {
    return withTimeout(
      () =>
        this.client.release(this.paymentIdBytes(paymentId), landlordPublicKey),
      SUBMIT_TIMEOUT_MS,
      "escrow.release",
    );
  }

  /** Refunds held funds on-chain - mutates state; timeout-bounded only,
   * never blindly retried, for the same reason as release above. */
  async refund(paymentId: string): Promise<string> {
    return withTimeout(
      () => this.client.refund(this.paymentIdBytes(paymentId)),
      SUBMIT_TIMEOUT_MS,
      "escrow.refund",
    );
  }
}
