import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Horizon } from "@stellar/stellar-sdk";
import { createHash } from "crypto";
import { importEsm } from "../common/utils/dynamic-import.util";

type StellarSdk = typeof import("@stellar/stellar-sdk");

@Injectable()
export class StellarService {
  private server: Horizon.Server | null = null;

  constructor(private readonly config: ConfigService) {}

  /**
   * The Stellar SDK's CJS build requires ESM-only @noble/* crypto packages
   * internally, which Vercel's serverless runtime can't require()
   * synchronously - so the SDK (and this server instance) are loaded lazily
   * on first use via importEsm, a real runtime import() that resolves the
   * SDK's proper ESM build instead of tsc's downleveled `await import()`
   * (which compiles to a plain require() under module: "commonjs" and
   * would still hit the broken CJS build - see dynamic-import.util.ts).
   */
  private async getServer(): Promise<Horizon.Server> {
    if (!this.server) {
      const { Horizon: HorizonNs } = await importEsm<StellarSdk>(
        "@stellar/stellar-sdk",
      );
      this.server = new HorizonNs.Server(
        this.config.get<string>("STELLAR_HORIZON_URL") ??
          "https://horizon-testnet.stellar.org",
      );
    }
    return this.server;
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

    const { Keypair, TransactionBuilder, BASE_FEE, Networks, Operation } =
      await importEsm<StellarSdk>("@stellar/stellar-sdk");
    const server = await this.getServer();

    const keypair = Keypair.fromSecret(secret);
    const account = await server.loadAccount(keypair.publicKey());

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

    const result = await server.submitTransaction(transaction);
    return { txHash: result.hash };
  }

  /**
   * Generates a fresh Stellar keypair. The secret is returned once and is
   * NEVER persisted server-side - only the public key should be stored by
   * the caller. This keeps wallet generation non-custodial: after this
   * call returns, the platform has no way to sign for this account again.
   */
  async generateWallet(): Promise<{ publicKey: string; secretKey: string }> {
    const { Keypair } = await importEsm<StellarSdk>("@stellar/stellar-sdk");
    const keypair = Keypair.random();
    return { publicKey: keypair.publicKey(), secretKey: keypair.secret() };
  }

  /**
   * Funds a testnet account via Friendbot. Fire-and-forget: never throws,
   * always resolves to a boolean, so callers can safely ignore the result
   * (wallet generation must succeed even if Friendbot is briefly down).
   */
  async fundTestnetAccount(publicKey: string): Promise<boolean> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const res = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`,
        { signal: controller.signal },
      );
      return res.ok;
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
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
      const server = await this.getServer();
      return await server.transactions().transaction(txHash).call();
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

  /**
   * Looks for an incoming payment to the platform's own destination wallet
   * whose memo matches a given viewing request, without requiring the payer
   * to find or paste a transaction hash themselves. The memo is derived
   * from the viewing request's cuid (see createMemoForRequest), which is
   * effectively unique, so a memo match is a safe way to identify the
   * payment automatically.
   */
  async findIncomingPaymentByMemo(memo: string): Promise<string | null> {
    try {
      const server = await this.getServer();
      const page = await server
        .transactions()
        .forAccount(this.getDestinationWallet())
        .order("desc")
        .limit(50)
        .call();

      const match = page.records.find(
        (tx) => tx.successful && tx.memo === memo,
      );
      return match?.hash ?? null;
    } catch {
      return null;
    }
  }

  /**
   * Demo-only: pays the viewing fee into the platform's own wallet from a
   * platform-funded testnet treasury, standing in for the tenant's own
   * payment source. This only exists because testnet XLM is free via
   * Friendbot - it is NOT a production payment method. A real deployment
   * would need an actual fiat/crypto on-ramp here (M-Pesa, card, etc.); the
   * platform cannot "spot" tenants real money. Returns the real, on-chain
   * testnet transaction hash.
   */
  async payFromTreasury(amount: number, memo: string): Promise<string> {
    const secret = this.config.get<string>("STELLAR_DEMO_TREASURY_SECRET_KEY");
    if (!secret) {
      throw new InternalServerErrorException(
        "STELLAR_DEMO_TREASURY_SECRET_KEY is not configured.",
      );
    }

    const {
      Keypair,
      TransactionBuilder,
      BASE_FEE,
      Networks,
      Operation,
      Asset,
      Memo,
    } = await importEsm<StellarSdk>("@stellar/stellar-sdk");
    const server = await this.getServer();

    const keypair = Keypair.fromSecret(secret);
    const account = await server.loadAccount(keypair.publicKey());

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase:
        this.config.get<string>("STELLAR_NETWORK_PASSPHRASE") ??
        Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: this.getDestinationWallet(),
          asset: Asset.native(),
          amount: amount.toString(),
        }),
      )
      .addMemo(Memo.text(memo))
      .setTimeout(30)
      .build();

    transaction.sign(keypair);

    const result = await server.submitTransaction(transaction);
    return result.hash;
  }
}
