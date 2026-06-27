import "reflect-metadata";
import { PaymentsController } from "../../payments/payments.controller";
import { ProofVerificationController } from "../../proof-verification/proof-verification.controller";
import { ZkProofsController } from "../../zk-proofs/zk-proofs.controller";
import { UploadsController } from "../../uploads/uploads.controller";
import { LandlordController } from "../../landlord/landlord.controller";
import { ViewingRequestsController } from "../../viewing-requests/viewing-requests.controller";
import { AuthController } from "../../auth/auth.controller";
import {
  FINANCIAL_MUTATION_THROTTLE,
  PAYMENT_POLL_THROTTLE,
  PROOF_THROTTLE,
  UPLOAD_THROTTLE,
} from "./throttle-limits";

// @nestjs/throttler's own internal metadata keys (see
// node_modules/@nestjs/throttler/dist/throttler.constants.js). Not
// re-exported from the package's public entrypoint, so the literal string
// values are reproduced here - they are part of this major version's
// stable decorator contract, not an implementation detail likely to shift
// underneath a patch/minor bump.
const THROTTLER_LIMIT = "THROTTLER:LIMIT";
const THROTTLER_TTL = "THROTTLER:TTL";

function getThrottleLimit(
  handler: object,
  name = "default",
): number | undefined {
  return Reflect.getMetadata(THROTTLER_LIMIT + name, handler);
}

function getThrottleTtl(handler: object, name = "default"): number | undefined {
  return Reflect.getMetadata(THROTTLER_TTL + name, handler);
}

function expectThrottle(
  handler: object,
  expected: { default: { limit: number; ttl: number } },
) {
  expect(getThrottleLimit(handler)).toBe(expected.default.limit);
  expect(getThrottleTtl(handler)).toBe(expected.default.ttl);
}

function expectNoThrottle(handler: object) {
  expect(getThrottleLimit(handler)).toBeUndefined();
  expect(getThrottleTtl(handler)).toBeUndefined();
}

describe("financial/expensive endpoint throttling", () => {
  it("payments: confirm, pay-now, prepare-deposit, and confirm-deposit carry the financial-mutation tier", () => {
    expectThrottle(
      PaymentsController.prototype.confirm,
      FINANCIAL_MUTATION_THROTTLE,
    );
    expectThrottle(
      PaymentsController.prototype.payNow,
      FINANCIAL_MUTATION_THROTTLE,
    );
    expectThrottle(
      PaymentsController.prototype.prepareEscrowDeposit,
      FINANCIAL_MUTATION_THROTTLE,
    );
    expectThrottle(
      PaymentsController.prototype.confirmEscrowDeposit,
      FINANCIAL_MUTATION_THROTTLE,
    );
  });

  it("payments: poll carries the payment-poll tier, and read-only/createIntent/findOne are untouched (inherit the global default)", () => {
    expectThrottle(
      PaymentsController.prototype.pollStatus,
      PAYMENT_POLL_THROTTLE,
    );
    expectNoThrottle(PaymentsController.prototype.createIntent);
    expectNoThrottle(PaymentsController.prototype.findOne);
  });

  it("proof-verification: submit carries the proof tier; findOne is untouched", () => {
    expectThrottle(
      ProofVerificationController.prototype.submit,
      PROOF_THROTTLE,
    );
    expectNoThrottle(ProofVerificationController.prototype.findOne);
  });

  it("zk-proofs: generate carries the proof tier; findOne is untouched", () => {
    expectThrottle(ZkProofsController.prototype.generate, PROOF_THROTTLE);
    expectNoThrottle(ZkProofsController.prototype.findOne);
  });

  it("uploads: avatar, listing-image, and documents all carry the upload tier", () => {
    expectThrottle(UploadsController.prototype.uploadAvatar, UPLOAD_THROTTLE);
    expectThrottle(
      UploadsController.prototype.uploadListingImage,
      UPLOAD_THROTTLE,
    );
    expectThrottle(UploadsController.prototype.uploadDocument, UPLOAD_THROTTLE);
  });

  it("landlord: inviteAgent and activate (both document-upload flows) carry the upload tier", () => {
    expectThrottle(LandlordController.prototype.inviteAgent, UPLOAD_THROTTLE);
    expectThrottle(LandlordController.prototype.activate, UPLOAD_THROTTLE);
  });

  it("viewing-requests: create carries the financial-mutation tier; reads are untouched", () => {
    expectThrottle(
      ViewingRequestsController.prototype.create,
      FINANCIAL_MUTATION_THROTTLE,
    );
    expectNoThrottle(ViewingRequestsController.prototype.findMine);
    expectNoThrottle(ViewingRequestsController.prototype.findOne);
    expectNoThrottle(ViewingRequestsController.prototype.status);
  });

  it("does not change the existing auth login/register throttle limits", () => {
    // 5/min, unchanged - this task must not touch the brute-force guard
    // already in place for these two endpoints.
    expectThrottle(AuthController.prototype.login, {
      default: { limit: 5, ttl: 60_000 },
    });
    expectThrottle(AuthController.prototype.register, {
      default: { limit: 5, ttl: 60_000 },
    });
  });
});
