pragma circom 2.1.0;

// Proves the tenant knows the private payment data (paymentSecret, paymentNonce)
// that produces the public paymentCommitment for a given viewing request, per
// docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md section 8/4.
//
// Uses a field-native quadratic binding rather than Poseidon: this circuit is
// compiled with `--prime bls12381` to match Stellar's native BLS12-381 Groth16
// verifier host functions, and circomlib's Poseidon round constants are only
// valid over the BN254 scalar field. Per the ZK proof doc, the exact hash
// primitive may be substituted to match verifier compatibility.
template PaymentProof() {
    signal input requestId;
    signal input listingId;
    signal input requiredViewingFee;
    signal input paymentCommitment;

    signal input paymentSecret;
    signal input paymentNonce;

    signal secretSq;
    signal nonceSq;
    signal mixed;

    secretSq <== paymentSecret * paymentSecret;
    nonceSq <== paymentNonce * paymentNonce;
    mixed <== requestId * listingId;

    paymentCommitment === secretSq + nonceSq + mixed + requiredViewingFee;
}

component main {public [requestId, listingId, requiredViewingFee, paymentCommitment]} = PaymentProof();
