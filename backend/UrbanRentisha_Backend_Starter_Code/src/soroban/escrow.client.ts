import type { contract, Keypair, rpc } from "@stellar/stellar-sdk";

// Contract spec (XDR) extracted via `stellar contract bindings typescript`
// for the deployed UrbanRentishaEscrow contract - see contracts/escrow/.
const CONTRACT_SPEC = [
  "AAAAAQAAAAAAAAAAAAAABEhvbGQAAAAEAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAABXBheWVyAAAAAAAAEwAAAAAAAAAGc3RhdHVzAAAAAAfQAAAACkhvbGRTdGF0dXMAAAAAAAAAAAAFdG9rZW4AAAAAAAAT",
  "AAAAAgAAAAAAAAAAAAAACkhvbGRTdGF0dXMAAAAAAAMAAAAAAAAAAAAAAARIZWxkAAAAAAAAAAAAAAAIUmVsZWFzZWQAAAAAAAAAAAAAAAhSZWZ1bmRlZA==",
  "AAAABAAAAAAAAAAAAAAAC0VzY3Jvd0Vycm9yAAAAAAYAAAAAAAAAEkFscmVhZHlJbml0aWFsaXplZAAAAAAAAQAAAAAAAAAOTm90SW5pdGlhbGl6ZWQAAAAAAAIAAAAAAAAAEUhvbGRBbHJlYWR5RXhpc3RzAAAAAAAAAwAAAAAAAAAMSG9sZE5vdEZvdW5kAAAABAAAAAAAAAALSG9sZE5vdEhlbGQAAAAABQAAAAAAAAANSW52YWxpZEZlZUJwcwAAAAAAAAY=",
  "AAAAAAAAAIpTZXRzIHRoZSBwbGF0Zm9ybSBhZG1pbiAodGhlIG9ubHkgYWRkcmVzcyBhbGxvd2VkIHRvIGNhbGwgYHJlbGVhc2VgCmFuZCBgcmVmdW5kYCkgYW5kIHRoZSBwbGF0Zm9ybSBmZWUsIGluIGJhc2lzIHBvaW50cywgdGFrZW4gb24gcmVsZWFzZS4AAAAAAARpbml0AAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAABBwbGF0Zm9ybV9mZWVfYnBzAAAABAAAAAEAAAPpAAAAAgAAB9AAAAALRXNjcm93RXJyb3IA",
  "AAAAAAAAAGpSZWZ1bmRzIGEgaGVsZCBwYXltZW50IGJhY2sgdG8gdGhlIG9yaWdpbmFsIHBheWVyLiBPbmx5IGNhbGxhYmxlIGJ5CnRoZSBhZG1pbiwgZm9yIGRpc3B1dGVzL2NhbmNlbGxhdGlvbnMuAAAAAAAGcmVmdW5kAAAAAAABAAAAAAAAAApwYXltZW50X2lkAAAAAAPuAAAAIAAAAAEAAAPpAAAAAgAAB9AAAAALRXNjcm93RXJyb3IA",
  "AAAAAAAAAKJEZXBvc2l0cyBgYW1vdW50YCBvZiBgdG9rZW5gIGZyb20gYHBheWVyYCBpbnRvIGVzY3Jvdywga2V5ZWQgYnkKYHBheW1lbnRfaWRgLiBSZXF1aXJlcyB0aGUgcGF5ZXIncyBvd24gc2lnbmF0dXJlIC0gdGhlIHBsYXRmb3JtCmNhbm5vdCBkZXBvc2l0IG9uIGEgdXNlcidzIGJlaGFsZi4AAAAAAAdkZXBvc2l0AAAAAAQAAAAAAAAABXBheWVyAAAAAAAAEwAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAApwYXltZW50X2lkAAAAAAPuAAAAIAAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAA+kAAAACAAAH0AAAAAtFc2Nyb3dFcnJvcgA=",
  "AAAAAAAAAMJSZWxlYXNlcyBhIGhlbGQgcGF5bWVudCB0byB0aGUgbGFuZGxvcmQsIG1pbnVzIHRoZSBwbGF0Zm9ybSBmZWUuCk9ubHkgY2FsbGFibGUgYnkgdGhlIGFkbWluIHNldCBhdCBgaW5pdGAgKHRoZSBwbGF0Zm9ybSksIGFmdGVyIGl0IGhhcwpjb25maXJtZWQgdGhlIG9mZi1jaGFpbiBjb25kaXRpb24gKGUuZy4gWksgcHJvb2YgdmVyaWZpZWQpLgAAAAAAB3JlbGVhc2UAAAAAAgAAAAAAAAAKcGF5bWVudF9pZAAAAAAD7gAAACAAAAAAAAAACGxhbmRsb3JkAAAAEwAAAAEAAAPpAAAAAgAAB9AAAAALRXNjcm93RXJyb3IA",
  "AAAAAAAAACRSZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlIG9mIGEgaG9sZC4AAAAIZ2V0X2hvbGQAAAABAAAAAAAAAApwYXltZW50X2lkAAAAAAPuAAAAIAAAAAEAAAPpAAAH0AAAAARIb2xkAAAH0AAAAAtFc2Nyb3dFcnJvcgA=",
];

export enum HoldStatus {
  Held = "Held",
  Released = "Released",
  Refunded = "Refunded",
}

interface RawHoldStatus {
  tag: "Held" | "Released" | "Refunded";
}

interface RawHold {
  payer: string;
  token: string;
  amount: bigint;
  status: RawHoldStatus;
}

export interface Hold {
  payer: string;
  token: string;
  amount: bigint;
  status: HoldStatus;
}

export interface EscrowConfig {
  contractId: string;
  rpcUrl: string;
  networkPassphrase: string;
  adminSecretKey: string;
}

type DepositFn = (args: {
  payer: string;
  token: string;
  payment_id: Buffer;
  amount: bigint;
}) => Promise<contract.AssembledTransaction<contract.Result<void>>>;

type ReleaseFn = (args: {
  payment_id: Buffer;
  landlord: string;
}) => Promise<contract.AssembledTransaction<contract.Result<void>>>;

type RefundFn = (args: {
  payment_id: Buffer;
}) => Promise<contract.AssembledTransaction<contract.Result<void>>>;

type GetHoldFn = (args: {
  payment_id: Buffer;
}) => Promise<contract.AssembledTransaction<contract.Result<RawHold>>>;

type EscrowContractClient = contract.Client & {
  deposit: DepositFn;
  release: ReleaseFn;
  refund: RefundFn;
  get_hold: GetHoldFn;
};

export class EscrowClient {
  private adminKeypair!: Keypair;
  private server!: rpc.Server;
  private adminClient!: EscrowContractClient;
  private spec!: contract.Spec;
  private ready: Promise<void> | null = null;

  constructor(private readonly config: EscrowConfig) {}

  /**
   * The Stellar SDK's CJS build requires ESM-only @noble/* crypto packages
   * internally, which Vercel's serverless runtime can't require()
   * synchronously - so the SDK is loaded lazily via dynamic import() on
   * first use instead of at module/constructor time, which works in every
   * environment.
   */
  private ensureReady(): Promise<void> {
    if (!this.ready) {
      this.ready = (async () => {
        const { Keypair, contract, rpc } = await import("@stellar/stellar-sdk");
        this.adminKeypair = Keypair.fromSecret(this.config.adminSecretKey);
        this.server = new rpc.Server(this.config.rpcUrl);
        this.spec = new contract.Spec(CONTRACT_SPEC);

        const signer = contract.basicNodeSigner(
          this.adminKeypair,
          this.config.networkPassphrase,
        );

        this.adminClient = new contract.Client(this.spec, {
          contractId: this.config.contractId,
          rpcUrl: this.config.rpcUrl,
          networkPassphrase: this.config.networkPassphrase,
          publicKey: this.adminKeypair.publicKey(),
          ...signer,
        }) as EscrowContractClient;
      })();
    }
    return this.ready;
  }

  /**
   * Builds an unsigned `deposit` invocation for `payerPublicKey` and returns
   * its XDR. The backend never signs this - `deposit` calls
   * `payer.require_auth()` on-chain, so only the payer's own wallet
   * (Freighter) can produce a valid signature.
   */
  async prepareDeposit(
    payerPublicKey: string,
    token: string,
    paymentId: Buffer,
    amountStroops: bigint,
  ): Promise<string> {
    await this.ensureReady();
    const { contract } = await import("@stellar/stellar-sdk");
    const payerClient = new contract.Client(this.spec, {
      contractId: this.config.contractId,
      rpcUrl: this.config.rpcUrl,
      networkPassphrase: this.config.networkPassphrase,
      publicKey: payerPublicKey,
    }) as EscrowContractClient;

    const assembled = await payerClient.deposit({
      payer: payerPublicKey,
      token,
      payment_id: paymentId,
      amount: amountStroops,
    });

    return assembled.toXDR();
  }

  /**
   * Submits a deposit transaction that the payer has already signed
   * (via Freighter), then polls for completion. Returns the real,
   * on-chain Soroban transaction hash.
   */
  async submitSignedDeposit(signedXdr: string): Promise<string> {
    await this.ensureReady();
    const { TransactionBuilder, rpc } = await import("@stellar/stellar-sdk");
    const transaction = TransactionBuilder.fromXDR(
      signedXdr,
      this.config.networkPassphrase,
    );
    const sent = await this.server.sendTransaction(transaction);

    if (sent.status === "ERROR") {
      throw new Error(
        `Escrow deposit submission failed: ${sent.errorResult?.toXDR("base64") ?? "unknown error"}`,
      );
    }

    const result = await this.server.pollTransaction(sent.hash);
    if (result.status !== rpc.Api.GetTransactionStatus.SUCCESS) {
      throw new Error(
        `Escrow deposit transaction did not succeed on-chain (status: ${result.status}).`,
      );
    }

    return sent.hash;
  }

  /**
   * Releases a held payment to the landlord, minus the platform fee.
   * Admin-signed (the platform), submitted and confirmed in this call.
   */
  async release(paymentId: Buffer, landlordPublicKey: string): Promise<string> {
    await this.ensureReady();
    const assembled = await this.adminClient.release({
      payment_id: paymentId,
      landlord: landlordPublicKey,
    });
    return this.signAndSend(assembled);
  }

  /** Refunds a held payment back to the original payer. Admin-signed. */
  async refund(paymentId: Buffer): Promise<string> {
    await this.ensureReady();
    const assembled = await this.adminClient.refund({ payment_id: paymentId });
    return this.signAndSend(assembled);
  }

  /** Read-only lookup of a hold's current on-chain state. */
  async getHold(paymentId: Buffer): Promise<Hold | null> {
    await this.ensureReady();
    const assembled = await this.adminClient.get_hold({
      payment_id: paymentId,
    });
    const sent = await assembled.signAndSend({ force: true });
    const result = sent.result;

    if (result.isErr()) {
      return null;
    }

    const hold = result.unwrap();
    return {
      payer: hold.payer,
      token: hold.token,
      amount: hold.amount,
      status: HoldStatus[hold.status.tag],
    };
  }

  private async signAndSend(
    assembled: contract.AssembledTransaction<contract.Result<void>>,
  ): Promise<string> {
    const sent = await assembled.signAndSend({ force: true });
    const result = sent.result;

    if (result.isErr()) {
      throw new Error(
        `Escrow contract call failed: ${result.unwrapErr().message}`,
      );
    }

    return sent.sendTransactionResponse?.hash ?? "";
  }
}
