import { Test } from "@nestjs/testing";
import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ReconciliationController } from "./reconciliation.controller";
import { ReconciliationService } from "./reconciliation.service";
import { CronSecretGuard } from "../common/guards/cron-secret.guard";

describe("ReconciliationController", () => {
  let controller: ReconciliationController;
  let reconciliation: { runLocked: jest.Mock };

  beforeEach(async () => {
    reconciliation = { runLocked: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      controllers: [ReconciliationController],
      providers: [
        { provide: ReconciliationService, useValue: reconciliation },
        CronSecretGuard,
        { provide: ConfigService, useValue: { get: () => "test-secret" } },
      ],
    }).compile();

    controller = moduleRef.get(ReconciliationController);
  });

  it("calls the existing ReconciliationService.runLocked and returns a safe summary only", async () => {
    reconciliation.runLocked.mockResolvedValue({
      status: "ok",
      depositsChecked: 3,
      releasesChecked: 1,
      repaired: 2,
      flagged: 0,
    });

    const result = await controller.reconcile();

    expect(reconciliation.runLocked).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: "ok",
      depositsChecked: 3,
      releasesChecked: 1,
      repaired: 2,
      flagged: 0,
    });
  });

  it("returns status 'skipped' when an overlapping run is already in progress (the DB-backed lock said no)", async () => {
    reconciliation.runLocked.mockResolvedValue({
      status: "skipped",
      depositsChecked: 0,
      releasesChecked: 0,
      repaired: 0,
      flagged: 0,
    });

    const result = await controller.reconcile();

    expect(result.status).toBe("skipped");
  });
});

describe("ReconciliationController route protection", () => {
  it("the reconcile() handler is guarded by CronSecretGuard", () => {
    const guards = Reflect.getMetadata(
      "__guards__",
      ReconciliationController.prototype.reconcile,
    );
    expect(guards).toContain(CronSecretGuard);
  });

  it("CronSecretGuard itself rejects an unauthenticated invocation with 401, independent of the controller", () => {
    const guard = new CronSecretGuard({
      get: () => "real-secret",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ header: () => undefined }),
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
