import { requestContextMiddleware } from "./request-context.middleware";
import { getRequestId } from "../context/request-context";

function fakeReq(headers: Record<string, string> = {}) {
  return {
    method: "GET",
    path: "/api/v1/listings",
    header: (name: string) => headers[name.toLowerCase()],
  } as unknown as Parameters<typeof requestContextMiddleware>[0];
}

function fakeRes() {
  const handlers: Record<string, () => void> = {};
  return {
    statusCode: 200,
    setHeader: jest.fn(),
    on: jest.fn((event: string, handler: () => void) => {
      handlers[event] = handler;
    }),
    emitFinish: () => handlers.finish?.(),
  } as unknown as Parameters<typeof requestContextMiddleware>[1] & {
    setHeader: jest.Mock;
    emitFinish: () => void;
  };
}

describe("requestContextMiddleware", () => {
  it("generates a request ID and echoes it on the response when none is supplied", () => {
    const req = fakeReq();
    const res = fakeRes();
    let idInsideHandler: string | undefined;

    requestContextMiddleware(req, res, () => {
      idInsideHandler = getRequestId();
    });

    expect(idInsideHandler).toBeDefined();
    expect(res.setHeader).toHaveBeenCalledWith("x-request-id", idInsideHandler);
  });

  it("reuses a caller-supplied X-Request-Id instead of generating a new one", () => {
    const req = fakeReq({ "x-request-id": "caller-supplied-id" });
    const res = fakeRes();
    let idInsideHandler: string | undefined;

    requestContextMiddleware(req, res, () => {
      idInsideHandler = getRequestId();
    });

    expect(idInsideHandler).toBe("caller-supplied-id");
    expect(res.setHeader).toHaveBeenCalledWith(
      "x-request-id",
      "caller-supplied-id",
    );
  });

  it("logs a single structured (JSON) line with the request ID once the response finishes", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation();
    const req = fakeReq({ "x-request-id": "req-xyz" });
    const res = fakeRes();

    requestContextMiddleware(req, res, () => {});
    res.emitFinish();

    expect(logSpy).toHaveBeenCalledTimes(1);
    const logged = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(logged).toMatchObject({
      requestId: "req-xyz",
      method: "GET",
      path: "/api/v1/listings",
      statusCode: 200,
    });
    expect(typeof logged.durationMs).toBe("number");

    logSpy.mockRestore();
  });
});
