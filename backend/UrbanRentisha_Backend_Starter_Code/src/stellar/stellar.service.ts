import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Horizon } from "stellar-sdk";

@Injectable()
export class StellarService {
  private readonly server: Horizon.Server;

  constructor(private readonly config: ConfigService) {
    this.server = new Horizon.Server(
      this.config.get<string>("STELLAR_HORIZON_URL") ?? "https://horizon-testnet.stellar.org"
    );
  }

  getDestinationWallet() {
    return this.config.get<string>("STELLAR_PLATFORM_PUBLIC_KEY") ?? "GDESTINATION_TESTNET_PUBLIC_KEY";
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
        reason: "Transaction was not found on Stellar testnet."
      };
    }

    return {
      ok: true,
      reason: "Transaction exists on Stellar testnet.",
      txHash: input.txHash,
      memo: tx.memo
    };
  }
}
