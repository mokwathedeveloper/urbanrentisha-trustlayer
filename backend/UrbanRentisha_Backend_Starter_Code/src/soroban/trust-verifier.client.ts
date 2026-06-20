import { contract, Keypair } from "@stellar/stellar-sdk";

// Contract spec (XDR) extracted from `stellar contract bindings typescript`
// for the deployed UrbanRentishaTrustVerifier contract. Forked from
// stellar/soroban-examples/groth16_verifier - see contracts/trust-verifier/.
const CONTRACT_SPEC = [
  "AAAAAQAAAAAAAAAAAAAABVByb29mAAAAAAAAAwAAAAAAAAABYQAAAAAAA+4AAABgAAAAAAAAAAFiAAAAAAAD7gAAAMAAAAAAAAAAAWMAAAAAAAPuAAAAYA==",
  "AAAABAAAAAAAAAAAAAAADEdyb3RoMTZFcnJvcgAAAAEAAAAAAAAAFU1hbGZvcm1lZFZlcmlmeWluZ0tleQAAAAAAAAA=",
  "AAAAAQAAAAAAAAAAAAAAD1ZlcmlmaWNhdGlvbktleQAAAAAFAAAAAAAAAAVhbHBoYQAAAAAAA+4AAABgAAAAAAAAAARiZXRhAAAD7gAAAMAAAAAAAAAABWRlbHRhAAAAAAAD7gAAAMAAAAAAAAAABWdhbW1hAAAAAAAD7gAAAMAAAAAAAAAAAmljAAAAAAPqAAAD7gAAAGA=",
  "AAAAAAAAAAAAAAAMdmVyaWZ5X3Byb29mAAAAAwAAAAAAAAACdmsAAAAAB9AAAAAPVmVyaWZpY2F0aW9uS2V5AAAAAAAAAAAFcHJvb2YAAAAAAAfQAAAABVByb29mAAAAAAAAAAAAAAtwdWJfc2lnbmFscwAAAAPqAAAADAAAAAEAAAPpAAAAAQAAB9AAAAAMR3JvdGgxNkVycm9y",
];

export interface ProofPoints {
  a: Buffer;
  b: Buffer;
  c: Buffer;
}

export interface VerificationKeyPoints {
  alpha: Buffer;
  beta: Buffer;
  delta: Buffer;
  gamma: Buffer;
  ic: Buffer[];
}

export interface TrustVerifierConfig {
  contractId: string;
  rpcUrl: string;
  networkPassphrase: string;
  signerSecretKey: string;
}

type VerifyProofFn = (args: {
  vk: VerificationKeyPoints;
  proof: ProofPoints;
  pub_signals: string[];
}) => Promise<contract.AssembledTransaction<contract.Result<boolean>>>;

export class TrustVerifierClient {
  private readonly client: contract.Client & { verify_proof: VerifyProofFn };

  constructor(private readonly config: TrustVerifierConfig) {
    const keypair = Keypair.fromSecret(config.signerSecretKey);
    const signer = contract.basicNodeSigner(keypair, config.networkPassphrase);

    this.client = new contract.Client(new contract.Spec(CONTRACT_SPEC), {
      contractId: config.contractId,
      rpcUrl: config.rpcUrl,
      networkPassphrase: config.networkPassphrase,
      publicKey: keypair.publicKey(),
      ...signer,
    }) as contract.Client & { verify_proof: VerifyProofFn };
  }

  /**
   * Calls verify_proof on-chain and submits the transaction, returning the
   * real Soroban transaction hash alongside the verification result.
   */
  async verifyProof(
    vk: VerificationKeyPoints,
    proof: ProofPoints,
    pubSignals: string[],
  ): Promise<{ verified: boolean; txHash: string }> {
    const assembled = await this.client.verify_proof({
      vk,
      proof,
      pub_signals: pubSignals,
    });

    // verify_proof has no host-function calls that write ledger state, so the
    // SDK's static analysis treats it as a read-only call and refuses to
    // submit a transaction unless explicitly forced. We force submission to
    // get a real, on-chain, auditable Soroban transaction hash.
    const sent = await assembled.signAndSend({ force: true });
    const result = sent.result;

    if (result.isErr()) {
      throw new Error(
        `Soroban verifier returned an error: ${result.unwrapErr().message}`,
      );
    }

    return {
      verified: result.unwrap(),
      txHash: sent.sendTransactionResponse?.hash ?? "",
    };
  }
}
