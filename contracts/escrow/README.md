# UrbanRentishaEscrow

A real Soroban smart contract deployed on Stellar testnet that holds a tenant's viewing-fee payment until the platform confirms the off-chain condition (a verified ZK proof of payment), then auto-releases the funds to the landlord minus a platform fee. Refunds back to the original payer are also supported, for disputes/cancellations.

## What it does

- `deposit`: the payer signs a real transfer of `amount` of `token` into the contract, keyed by `payment_id`. The platform cannot deposit on a user's behalf — this requires the payer's own signature.
- `release`: only the platform admin (set at `init`) can call this, after confirming the off-chain condition is met. Pays the landlord `amount - fee`, the fee to the admin, in the same transaction.
- `refund`: only the platform admin can call this, for disputes. Returns the full `amount` to the original payer.
- `get_hold`: read-only lookup of a hold's current state (`Held` / `Released` / `Refunded`).

## Deployed contract (Stellar testnet)

```text
Contract ID: CCDYGIL6TW3CDBYUOOZFEY7LJXCY35AFTS3FGIMIG37PYMKAAJW5ESTY
Network: Test SDF Network ; September 2015
Admin: GAT6VERKZWFCEORGLYSSRUW5UW6C3XPQ5FMA7QPUKTM45KQHQMI7WWPD (same key as STELLAR_PLATFORM_SECRET_KEY)
Platform fee: 500 bps (5%)
```

Verified live on testnet — a real deposit → release round trip, with the landlord's actual XLM balance increasing by exactly the expected payout:

```bash
# Deposit (signed by the payer)
stellar contract invoke --id CCDYGIL6TW3CDBYUOOZFEY7LJXCY35AFTS3FGIMIG37PYMKAAJW5ESTY \
  --source <payer-identity> --network testnet \
  -- deposit --payer <payer-address> \
  --token CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC \
  --payment_id <32-byte-hex> --amount 50000000
# => real "transfer" event, payer -> contract, 50000000 stroops (5 XLM)

# Release (signed by the admin, after the off-chain condition is met)
stellar contract invoke --id CCDYGIL6TW3CDBYUOOZFEY7LJXCY35AFTS3FGIMIG37PYMKAAJW5ESTY \
  --source urbanrentisha-deployer --network testnet \
  -- release --payment_id <same-id> --landlord <landlord-address>
# => two real "transfer" events: contract -> landlord (47500000, 95%), contract -> admin (2500000, 5%)
# Landlord's real Horizon balance confirmed +4.75 XLM exactly.

# Refund (signed by the admin)
stellar contract invoke --id CCDYGIL6TW3CDBYUOOZFEY7LJXCY35AFTS3FGIMIG37PYMKAAJW5ESTY \
  --source urbanrentisha-deployer --network testnet \
  -- refund --payment_id <a-different-id>
# => real "transfer" event, contract -> payer, full amount, no fee deducted.
```

## Build and test

```bash
cargo test --release       # 4 real unit tests: release-with-fee-split, refund, duplicate-deposit rejection, double-release rejection
stellar contract build      # produces target/wasm32v1-none/release/urbanrentisha_escrow.wasm
```

## ⚠️ Demonstration / hackathon use only

This contract is not audited. It moves real (testnet) funds — do not deploy to mainnet or use with real assets without a proper security audit. The admin key currently has unilateral power to release or refund any hold; a production version would need a real dispute-resolution and timeout mechanism, not a single trusted key.
