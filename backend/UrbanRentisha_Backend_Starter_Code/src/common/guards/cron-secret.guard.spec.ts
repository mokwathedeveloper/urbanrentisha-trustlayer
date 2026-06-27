import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CronSecretGuard } from "./cron-secret.guard";

function contextWithHeaders(headers: Record<string, string>): ExecutionContext {
  const request = {
    header: (name: string) => headers[name.toLowerCase()],
  };
  return {
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext;
}

describe("CronSecretGuard", () => {
  let config: { get: jest.Mock };
  let guard: CronSecretGuard;

  beforeEach(() => {
    config = { get: jest.fn().mockReturnValue("real-cron-secret-value") };
    guard = new CronSecretGuard(config as unknown as ConfigService);
  });

  it("rejects with 401 when no secret header is present at all", () => {
    expect(() => guard.canActivate(contextWithHeaders({}))).toThrow(
      UnauthorizedException,
    );
  });

  it("accepts a matching Authorization: Bearer <secret> header", () => {
    expect(
      guard.canActivate(
        contextWithHeaders({ authorization: "Bearer real-cron-secret-value" }),
      ),
    ).toBe(true);
  });

  it("accepts a matching x-cron-secret header", () => {
    expect(
      guard.canActivate(
        contextWithHeaders({ "x-cron-secret": "real-cron-secret-value" }),
      ),
    ).toBe(true);
  });

  it("rejects with 401 when the Bearer token does not match", () => {
    expect(() =>
      guard.canActivate(
        contextWithHeaders({ authorization: "Bearer wrong-value" }),
      ),
    ).toThrow(UnauthorizedException);
  });

  it("rejects with 401 when the x-cron-secret header does not match", () => {
    expect(() =>
      guard.canActivate(contextWithHeaders({ "x-cron-secret": "wrong-value" })),
    ).toThrow(UnauthorizedException);
  });

  it("fails closed (401) if CRON_SECRET is somehow unset, rather than accepting any request", () => {
    config.get.mockReturnValue(undefined);

    expect(() =>
      guard.canActivate(
        contextWithHeaders({ authorization: "Bearer anything" }),
      ),
    ).toThrow(UnauthorizedException);
  });
});
