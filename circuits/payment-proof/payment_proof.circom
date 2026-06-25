pragma circom 2.1.0;

// Proves the tenant knows the private payment data (paymentSecret, paymentNonce)
// that produces the public paymentCommitment for a given viewing request, per
// docs/zkproof/UrbanRentisha_TrustLayer_ZK_Proof_Documentation.md section 8/4.
//
// Compiled with `--prime bls12381` to match the deployed Soroban verifier's
// BLS12-381 pairing host functions (contracts/trust-verifier).
//
// Commitment construction: MiMCFeistel(paymentSecret, paymentNonce), a
// minimal one-way permutation using the x^5 S-box (gcd(5, r-1) = 1 over the
// BLS12-381 scalar field r, so x -> x^5 is a bijection - the same S-box
// exponent Poseidon uses for this field). Round constants below are fixed,
// deterministically generated field elements (sha256 of a labelled seed,
// reduced mod r) - not an adversarially-chosen value, which is sufficient
// for MiMC's one-wayness argument.
//
// This replaces an earlier `secretSq + nonceSq == target` relation, which
// was NOT a binding commitment: that conic equation has on the order of r
// solutions over F_r, so any prover could choose an arbitrary secret and
// solve for a matching nonce via a modular square root, without ever
// knowing the real (secret, nonce) pair derived from the actual payment.
// MiMCFeistel has no known efficient inversion, so producing an alternate
// (secret, nonce) pair that yields the same commitment is intractable.
//
// Documented MVP limitation: this is NOT an independently audited
// Poseidon/MiMC parameter set. It is a minimal, self-contained
// construction sized for this MVP's binding requirement. Production use
// should adopt a standard, audited primitive matched to this field.
template MiMCFeistel(rounds) {
    signal input left;
    signal input right;
    signal output out;

    var c[16] = [
        27147793823878441697335518397435947331343405675391114107089645891423115864870,
        2130592604356396211886033430366158809641555041372538547288921098944299351840,
        14116188681833732135898805025597367001187164628586766431357512301804678496545,
        20763022300433569639194615673118221231444123607206829207232817765903291103793,
        1524327973003870966872997742467789520361435381882525270920542114004761303576,
        1325562768844460446874615518889746196186287466513362245836920014553956014753,
        43484050184970699068067359443959733412869863829704478866060697702337128139592,
        25804834913701614295228082443535552138824437984229786569987871114464572798951,
        408118065773249307046670557388179981960631039137615457207122187892916792842,
        10510829619657606315916592502785524263248201214387807033876231150030858491673,
        9001827358274994425598914527542062117420658537433088432011193045870097617080,
        30561442166700718019589589944917652552715327878971000315277104488271409366941,
        3790600832585850901191895693162985025859561151772001569518910999101028347265,
        8441936577605398322860913077828129425794745025578705945536555750047172599619,
        50172098884475042973533929933611544336349405213067781636425586671208297076574,
        8369128532752549104008540141224894551292343673833747999837739397642670498979
    ];

    signal state[rounds + 1];
    signal added[rounds];
    signal sq[rounds];
    signal qd[rounds];

    state[0] <== left;

    for (var i = 0; i < rounds; i++) {
        added[i] <== state[i] + right + c[i % 16];
        sq[i] <== added[i] * added[i];
        qd[i] <== sq[i] * sq[i];
        state[i + 1] <== qd[i] * added[i];
    }

    out <== state[rounds] + right;
}

template PaymentProof() {
    signal input requestId;
    signal input listingId;
    signal input requiredViewingFee;
    signal input paymentCommitment;

    signal input paymentSecret;
    signal input paymentNonce;

    component hasher = MiMCFeistel(12);
    hasher.left <== paymentSecret;
    hasher.right <== paymentNonce;

    signal mixed;
    mixed <== requestId * listingId;

    paymentCommitment === hasher.out + mixed + requiredViewingFee;
}

component main {public [requestId, listingId, requiredViewingFee, paymentCommitment]} = PaymentProof();
