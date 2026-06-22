import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createHash } from "crypto";
import { EscrowClient, Hold } from "./escrow.client";

const STROOPS_PER_XLM = 10_000_000n;

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

  async prepareDeposit(
    payerPublicKey: string,
    paymentId: string,
    amount: number,
  ): Promise<string> {
    return this.client.prepareDeposit(
      payerPublicKey,
      this.nativeAssetContractId,
      this.paymentIdBytes(paymentId),
      this.toStroops(amount),
    );
  }

  async submitSignedDeposit(signedXdr: string): Promise<string> {
    return this.client.submitSignedDeposit(signedXdr);
  }

  async getHold(paymentId: string): Promise<Hold | null> {
    return this.client.getHold(this.paymentIdBytes(paymentId));
  }

  async release(paymentId: string, landlordPublicKey: string): Promise<string> {
    return this.client.release(
      this.paymentIdBytes(paymentId),
      landlordPublicKey,
    );
  }

  async refund(paymentId: string): Promise<string> {
    return this.client.refund(this.paymentIdBytes(paymentId));
  }
}
