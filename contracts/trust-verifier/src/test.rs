#![cfg(test)]
extern crate std;

use ark_bls12_381::{Fq, Fq2};
use ark_serialize::CanonicalSerialize;
use core::str::FromStr;
use soroban_sdk::{
    crypto::bls12_381::{Fr, G1Affine, G2Affine, G1_SERIALIZED_SIZE, G2_SERIALIZED_SIZE},
    Bytes, Env, Vec, U256,
};

use crate::{UrbanRentishaTrustVerifier, UrbanRentishaTrustVerifierClient, Proof, VerificationKey};

fn g1_from_coords(env: &Env, x: &str, y: &str) -> G1Affine {
    let ark_g1 = ark_bls12_381::G1Affine::new(Fq::from_str(x).unwrap(), Fq::from_str(y).unwrap());
    let mut buf = [0u8; G1_SERIALIZED_SIZE];
    ark_g1.serialize_uncompressed(&mut buf[..]).unwrap();
    G1Affine::from_array(env, &buf)
}

fn g2_from_coords(env: &Env, x1: &str, x2: &str, y1: &str, y2: &str) -> G2Affine {
    let x = Fq2::new(Fq::from_str(x1).unwrap(), Fq::from_str(x2).unwrap());
    let y = Fq2::new(Fq::from_str(y1).unwrap(), Fq::from_str(y2).unwrap());
    let ark_g2 = ark_bls12_381::G2Affine::new(x, y);
    let mut buf = [0u8; G2_SERIALIZED_SIZE];
    ark_g2.serialize_uncompressed(&mut buf[..]).unwrap();
    G2Affine::from_array(env, &buf)
}

/// Public signals can exceed u128 (the payment commitment is a full
/// BLS12-381 scalar field element), so they are constructed from their
/// big-endian byte representation rather than `U256::from_u128`.
fn fr_from_be_bytes(env: &Env, bytes: &[u8; 32]) -> Fr {
    Fr::from_u256(U256::from_be_bytes(env, &Bytes::from_array(env, bytes)))
}

fn create_client(e: &Env) -> UrbanRentishaTrustVerifierClient<'_> {
    UrbanRentishaTrustVerifierClient::new(e, &e.register(UrbanRentishaTrustVerifier {}, ()))
}

#[test]
fn test() {
    // Initialize the test environment
    let env = Env::default();

    // Verification key components, copied from
    // circuits/payment-proof/build_v2/verification_key.json. This is the real
    // verification key for the UrbanRentisha payment-proof circuit (4 public
    // inputs: requestId, listingId, requiredViewingFee, paymentCommitment),
    // compiled with `circom --prime bls12381`. The commitment is built by
    // mimcPermutation(paymentSecret, paymentNonce), 220 rounds - see
    // payment_proof.circom for why 220 (not a smaller, arbitrary number) is
    // required for this S-box's algebraic-attack security margin.
    let alphax = "2144415529219812941879273594775259217929502675791250734146589175247719873769629190182098779936045044242224270844416";
    let alphay = "676882275969298465334609813181401734951629931805729328455315630597740629980484387294398843323432716115262699482278";

    let betax1 = "1088156325589893234427892188634760996074259085377725006496822737515857310844065455395456351864215316704408180187690";
    let betax2 = "750522335438487527664865602597190125728866809200339610197890131237108713748811255341425873919444777544618107877996";
    let betay1 = "1287359104340576185042995475549380769645534312020139058007151486780482879026174293385671661642640473162826186960937";
    let betay2 = "1158020048438993322146764233472649201930959986836955453973705283345813900345263208263012966072601118995971265468718";

    let gammax1 = "352701069587466618187139116011060144890029952792775240219908644239793785735715026873347600343865175952761926303160";
    let gammax2 = "3059144344244213709971259814753781636986470325476647558659373206291635324768958432433509563104347017837885763365758";
    let gammay1 = "1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905";
    let gammay2 = "927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582";

    let deltax1 = "3756828374334897822554030634587797706499058798747394857560115030823406214607131765456730271486989752373892135056459";
    let deltax2 = "1360706997797219981767282780551267247396520148572863479535556464849788655726512884480492354951049886376103386938251";
    let deltay1 = "2999588226389948797044677955761573662852878128145251265532382578114610372194705175641785143001221283079611100957433";
    let deltay2 = "942664006672070841433723122806547887683533240907400384671163395761540796404926984723943539727845070644355504725750";

    let ic0x = "1845126017275931801501243776626137487174454180235240075169639946453142820510372788044344291290313096103696012511699";
    let ic0y = "3619268514642331749437698568020339467685741377466050805117643410556338144623646671783899286289466856603962642329190";

    let ic1x = "3171646779271733658452117911336979177229528949363333976804735490947259233771130629719191358138985229825279208067213";
    let ic1y = "1773690893762835482299000955304666049551435074434669370680175561022739387741807314308045278836284268228223927792839";

    let ic2x = "3646160605135942896316854702179647788479307408034844406835679398195829802574358908230161257211284405626501647798015";
    let ic2y = "2609154800166650688405953279966609026344487623539130527131060452840950785976073551903648346458240991815996433239370";

    let ic3x = "2763626846688927625064190183545184201524813685128270006161706990733852369826538469730735975032943928111821850908494";
    let ic3y = "2795417217141925577727336646971420800127085241459780127840220022698872247376483815668864773769267770983065875219753";

    let ic4x = "3181109186735215631310171500623809351996135979312163044265386584197919881029414201565013882376902259298131479398518";
    let ic4y = "2924102554161626736598916170412655597715946201610933860492824218092276539061666477835046504835889718214888103058779";

    // Construct the verification key from the pre-computed components
    let vk = VerificationKey {
        alpha: g1_from_coords(&env, alphax, alphay),
        beta: g2_from_coords(&env, betax1, betax2, betay1, betay2),
        gamma: g2_from_coords(&env, gammax1, gammax2, gammay1, gammay2),
        delta: g2_from_coords(&env, deltax1, deltax2, deltay1, deltay2),
        ic: Vec::from_array(
            &env,
            [
                g1_from_coords(&env, ic0x, ic0y),
                g1_from_coords(&env, ic1x, ic1y),
                g1_from_coords(&env, ic2x, ic2y),
                g1_from_coords(&env, ic3x, ic3y),
                g1_from_coords(&env, ic4x, ic4y)
            ],
        ),
    };

    // Proof components, copied from circuits/payment-proof/build_v2/proof.json.
    // This proof was generated for: requestId=12345, listingId=9876,
    // requiredViewingFee=10, paymentSecret=111, paymentNonce=222, with
    // paymentCommitment = mimcPermutation(111, 222) + requestId*listingId + fee
    // = 36448661883152570573923503639632223392617604890390749318817700377169827659117.
    let pi_ax = "3462781806828307861980116745003690053100849249342454256134464231100217652722890432925520596309879626904072423159059";
    let pi_ay = "885517272635057200455444834835431664437702203738108494133273111099797555341679117561371166749598073202849176151120";
    let pi_bx1 = "24737129711968180815915491291983577634377994977120889007653370586697449973140339009502999214846605809064117727164";
    let pi_bx2 = "1476108585020197353613423720546004369201355555872051144975476976677680203791148312738926266536526063037117007939602";
    let pi_by1 = "2692765753439333431080076597590840734114708208881193230581113392116993218437501965776243610040190458306512244874953";
    let pi_by2 = "3944362998412921638105878545742569839920542502031417777511759821611644521226225978813855552235501993768736309983312";
    let pi_cx = "2347415888561432588467923497527869166776757017930511707139754254744644046504240353013259935641613272986132977856327";
    let pi_cy = "3150527511773386892892669780784900238889079182735728688918241114250965042521050728118264536363139084569045862432655";

    let proof = Proof {
        a: g1_from_coords(&env, pi_ax, pi_ay),
        b: g2_from_coords(&env, pi_bx1, pi_bx2, pi_by1, pi_by2),
        c: g1_from_coords(&env, pi_cx, pi_cy),
    };

    let client = create_client(&env);

    // Test Case 1: verify with the correct public inputs
    // (copied from circuits/payment-proof/build_v2/public.json)
    let correct_public = Vec::from_array(
        &env,
        [
            fr_from_be_bytes(&env, &[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39]),
            fr_from_be_bytes(&env, &[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x26, 0x94]),
            fr_from_be_bytes(&env, &[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0a]),
            fr_from_be_bytes(&env, &[0x50, 0x95, 0x36, 0x28, 0x69, 0xc4, 0xa5, 0xda, 0x20, 0x16, 0xcc, 0xb3, 0x9f, 0x15, 0x66, 0xdc, 0xd5, 0xa0, 0xa7, 0xd5, 0xb7, 0x36, 0xab, 0xab, 0x7c, 0x5a, 0x76, 0x0a, 0xfe, 0x42, 0xfd, 0x6d]),
        ],
    );
    let res = client.verify_proof(&vk, &proof, &correct_public);
    assert_eq!(res, true);

    env.cost_estimate().budget().print();

    // Test Case 2: verify with a tampered public commitment - must fail
    let tampered_public = Vec::from_array(
        &env,
        [
            fr_from_be_bytes(&env, &[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39]),
            fr_from_be_bytes(&env, &[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x26, 0x94]),
            fr_from_be_bytes(&env, &[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x0a]),
            Fr::from_u256(U256::from_u128(&env, 999999)),
        ],
    );
    let res = client.verify_proof(&vk, &proof, &tampered_public);
    assert_eq!(res, false);
}
