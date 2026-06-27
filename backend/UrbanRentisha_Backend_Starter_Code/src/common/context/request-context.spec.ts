import { getRequestId, runWithRequestId } from "./request-context";

describe("request-context", () => {
  it("returns undefined when called outside any request context", () => {
    expect(getRequestId()).toBeUndefined();
  });

  it("makes the request ID available anywhere inside the sync/async call chain", async () => {
    const result = await runWithRequestId("req-123", async () => {
      const immediate = getRequestId();
      await Promise.resolve();
      const afterAwait = getRequestId();
      return { immediate, afterAwait };
    });

    expect(result).toEqual({ immediate: "req-123", afterAwait: "req-123" });
  });

  it("isolates concurrent request contexts from each other", async () => {
    const [a, b] = await Promise.all([
      runWithRequestId("req-a", async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return getRequestId();
      }),
      runWithRequestId("req-b", async () => {
        return getRequestId();
      }),
    ]);

    expect(a).toBe("req-a");
    expect(b).toBe("req-b");
  });
});
