import { randomUUID } from "crypto";
import type { NextFunction, Request, Response } from "express";
import { runWithRequestId } from "../context/request-context";

const REQUEST_ID_HEADER = "x-request-id";

/**
 * Reads a caller-supplied X-Request-Id (so a request can be traced across
 * frontend -> backend -> logs/audit rows) or generates one, echoes it back
 * on the response, and makes it available to the rest of the request's
 * async call chain via AsyncLocalStorage. Every structured log line and
 * audit log row written during this request carries the same ID, so a
 * failed transaction can be traced end-to-end without manually correlating
 * by timestamp/entityId.
 */
export function requestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const incoming = req.header(REQUEST_ID_HEADER);
  const requestId =
    incoming && incoming.trim().length > 0 ? incoming : randomUUID();
  res.setHeader(REQUEST_ID_HEADER, requestId);

  const startedAt = Date.now();
  res.on("finish", () => {
    // One structured (JSON) line per request, carrying the same requestId
    // as any audit log row written during it - the actual correlation
    // mechanism, not just a header that goes nowhere.
    console.log(
      JSON.stringify({
        requestId,
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      }),
    );
  });

  runWithRequestId(requestId, next);
}
