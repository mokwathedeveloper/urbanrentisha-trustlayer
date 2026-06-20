import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import { TrustVerifierClient } from "./trust-verifier.client";
import { g1Point, g2Point } from "./bls-points.util";

interface SnarkjsG16Proof {
  pi_a: [string, string, string];
  pi_b: [[string, string], [string, string], [string, string]];
  pi_c: [string, string, string];
}

interface SnarkjsVerificationKey {
  vk_alpha_1: [string, string, string];
  vk_beta_2: [[string, string], [string, string], [string, string]];
  vk_gamma_2: [[string, string], [string, string], [string, string]];
  vk_delta_2: [[string, string], [string, string], [string, string]];
  IC: [string, string, string][];
}

@Injectable()
export class SorobanService {
  private readonly client: TrustVerifierClient;
  private readonly verificationKey: SnarkjsVerificationKey;

  constructor(private readonly config: ConfigService) {
    this.client = new TrustVerifierClient({
      contractId: this.config.getOrThrow<string>("TRUST_VERIFIER_CONTRACT_ID"),
      rpcUrl: this.config.getOrThrow<string>("SOROBAN_RPC_URL"),
      networkPassphrase: this.config.getOrThrow<string>(
        "STELLAR_NETWORK_PASSPHRASE",
      ),
      signerSecretKey: this.config.getOrThrow<string>(
        "STELLAR_PLATFORM_SECRET_KEY",
      ),
    });

    const vkPath = path.join(
      __dirname,
      "..",
      "zk-proofs",
      "circuit-artifacts",
      "verification_key.json",
    );
    this.verificationKey = JSON.parse(fs.readFileSync(vkPath, "utf-8"));
  }

  /**
   * Verifies a real Groth16 proof on-chain against the deployed
   * UrbanRentishaTrustVerifier contract (contracts/trust-verifier/),
   * submitting an actual Stellar testnet transaction.
   */
  async verifyOnChain(
    proof: SnarkjsG16Proof,
    publicSignals: string[],
  ): Promise<{ verified: boolean; txHash: string }> {
    const vk = this.verificationKey;

    return this.client.verifyProof(
      {
        alpha: g1Point(vk.vk_alpha_1[0], vk.vk_alpha_1[1]),
        beta: g2Point(
          vk.vk_beta_2[0][0],
          vk.vk_beta_2[0][1],
          vk.vk_beta_2[1][0],
          vk.vk_beta_2[1][1],
        ),
        gamma: g2Point(
          vk.vk_gamma_2[0][0],
          vk.vk_gamma_2[0][1],
          vk.vk_gamma_2[1][0],
          vk.vk_gamma_2[1][1],
        ),
        delta: g2Point(
          vk.vk_delta_2[0][0],
          vk.vk_delta_2[0][1],
          vk.vk_delta_2[1][0],
          vk.vk_delta_2[1][1],
        ),
        ic: vk.IC.map((point) => g1Point(point[0], point[1])),
      },
      {
        a: g1Point(proof.pi_a[0], proof.pi_a[1]),
        b: g2Point(
          proof.pi_b[0][0],
          proof.pi_b[0][1],
          proof.pi_b[1][0],
          proof.pi_b[1][1],
        ),
        c: g1Point(proof.pi_c[0], proof.pi_c[1]),
      },
      publicSignals,
    );
  }
}
