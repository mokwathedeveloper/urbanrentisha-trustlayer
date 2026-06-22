import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  BASE_FEE,
  Horizon,
  Keypair,
  Networks,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import { createHash } from "crypto";

@Injectable()
export class StellarService {
  private readonly server: Horizon.Server;

  constructor(private readonly config: ConfigService) {
    this.server = new Horizon.Server(
      this.config.get<string>("STELLAR_HORIZON_URL") ??
        "https://horizon-testnet.stellar.org",
    );
  }

  /**
   * Records a real, lightweight testnet attestation of an admin decision
   * (e.g. approving an invited agent) as a manageData entry on the
   * platform's own Stellar account. This is intentionally NOT a Soroban
   * contract call — TRUST_VERIFIER_CONTRACT_ID is a dedicated ZK proof
   * verifier, not a generic attestation registry, so reusing it here would
   * be semantically wrong. This is an MVP trust anchor: a real, verifiable,
   * timestamped testnet transaction, not a new smart contract.
   */
  async recordAttestation(input: {
    subjectId: string;
    approvedBy: string;
    role: string;
  }): Promise<{ txHash: string }> {
    const secret = this.config.get<string>("STELLAR_PLATFORM_SECRET_KEY");
    if (!secret) {
      throw new InternalServerErrorException(
        "STELLAR_PLATFORM_SECRET_KEY is not configured.",
      );
    }

    const keypair = Keypair.fromSecret(secret);
    const account = await this.server.loadAccount(keypair.publicKey());

    const hash = createHash("sha256")
      .update(
        `${input.subjectId}:${input.approvedBy}:${input.role}:${Date.now()}`,
      )
      .digest("hex")
      .slice(0, 64);

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase:
        this.config.get<string>("STELLAR_NETWORK_PASSPHRASE") ??
        Networks.TESTNET,
    })
      .addOperation(
        Operation.manageData({
          name: "urbanrentisha_attestation",
          value: hash,
        }),
      )
      .setTimeout(30)
      .build();

    transaction.sign(keypair);

    const result = await this.server.submitTransaction(transaction);
    return { txHash: result.hash };
  }

  getDestinationWallet() {
    return (
      this.config.get<string>("STELLAR_PLATFORM_PUBLIC_KEY") ??
      "GDESTINATION_TESTNET_PUBLIC_KEY"
    );
  }

  createMemoForRequest(viewingRequestId: string) {
    return viewingRequestId.slice(0, 28);
  }

  async findPaymentByTxHash(txHash: string) {
    try {
      return await this.server.transactions().transaction(txHash).call();
    } catch {
      return null;
    }
  }

  async verifyPaymentReference(input: {
    txHash: string;
    expectedMemo: string;
  }) {
    const tx = await this.findPaymentByTxHash(input.txHash);

    if (!tx) {
      return {
        ok: false,
        reason: "Transaction was not found on Stellar testnet.",
      };
    }

    return {
      ok: true,
      reason: "Transaction exists on Stellar testnet.",
      txHash: input.txHash,
      memo: tx.memo,
    };
  }
}
