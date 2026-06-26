# UrbanRentishaTrustVerifier

A real Groth16 zero-knowledge proof verifier deployed as a Soroban smart contract on Stellar testnet, using native BLS12-381 host functions.

Forked from Stellar's official reference implementation ([stellar/soroban-examples/groth16_verifier](https://github.com/stellar/soroban-examples/tree/main/groth16_verifier)). The contract logic is unchanged — it's a generic Groth16 verifier that accepts any verification key, proof, and public signals at call time. The `data/` directory was replaced with the real verification key, proof, and public inputs for UrbanRentisha's payment-proof circuit (see `circuits/payment-proof/` at the repo root).

## What it proves

The tenant knows private payment data (`paymentSecret`, `paymentNonce`) that produces a public `paymentCommitment` for a given viewing request — see `docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md` sections 4 and 8.

## Deployed contract (Stellar testnet)

```text
Contract ID: CAO2EEH75TIJWGQEMKIO2RLDPWHQJ7HLDTG7HVYYGS6ZEV62HZQYDGSW
Network: Test SDF Network ; September 2015
```

Verified live on testnet:

```bash
stellar contract invoke \
  --id CAO2EEH75TIJWGQEMKIO2RLDPWHQJ7HLDTG7HVYYGS6ZEV62HZQYDGSW \
  --source <your-identity> \
  --network testnet \
  --send=no \
  -- verify_proof \
  --vk '<see data/verification_key.json>' \
  --proof '<see data/proof.json>' \
  --pub_signals '["12345","9876","10","36448661883152570573923503639632223392617604890390749318817700377169827659117"]'
# => true

# Tampering with the public commitment correctly fails:
# --pub_signals '["12345","9876","10","999999"]'
# => false
```

## Build and test

```bash
cargo test --release       # runs the unit test in src/test.rs against the real proof
stellar contract build      # produces target/wasm32v1-none/release/urbanrentisha_trust_verifier.wasm
```

## ⚠️ Demonstration / hackathon use only

This contract is not audited. The verification key was generated from a single-contributor, non-ceremonial Powers of Tau setup, which is fine for a hackathon MVP but not appropriate for production use with real funds.
