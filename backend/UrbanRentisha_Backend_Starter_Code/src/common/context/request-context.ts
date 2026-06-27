import { AsyncLocalStorage } from "async_hooks";

interface RequestContextStore {
  requestId: string;
}

/**
 * Carries the current request's correlation ID through any async call
 * chain (controller -> service -> audit log write) without needing to
 * thread it through every function signature. No new dependency - Node's
 * AsyncLocalStorage already does exactly this.
 */
const storage = new AsyncLocalStorage<RequestContextStore>();

export function runWithRequestId<T>(requestId: string, fn: () => T): T {
  return storage.run({ requestId }, fn);
}

export function getRequestId(): string | undefined {
  return storage.getStore()?.requestId;
}
