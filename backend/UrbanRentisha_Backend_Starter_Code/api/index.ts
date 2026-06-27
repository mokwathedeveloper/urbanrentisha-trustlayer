import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { redactSecrets } from "../src/common/utils/redact.util";

/**
 * Vercel serverless entrypoint. Unlike main.ts (app.listen() for a
 * persistent local/Railway/Render process), this initializes Nest once
 * per cold start against a bare Express instance and forwards each
 * invocation's req/res into it - no app.listen(), since Vercel Functions
 * don't hold a long-lived socket.
 *
 * Note: RealtimeGateway's Socket.IO connections cannot persist across
 * serverless invocations. The frontend already falls back to its 30s
 * notification poll when no socket is available, so this is a graceful
 * degradation (instant push -> periodic poll), not a broken feature.
 *
 * Everything is required lazily inside the handler (not imported at
 * module top-level) so that a synchronous throw anywhere in the import
 * graph - not just inside bootstrap()'s async code - is still caught
 * and surfaced in the response below, instead of failing before this
 * file's exported function is ever reached.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any = null;
let bootstrapped: Promise<void> | null = null;

async function bootstrap(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const express = require("express");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { NestFactory } = require("@nestjs/core");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ExpressAdapter } = require("@nestjs/platform-express");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { AppModule } = require("../src/app.module");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { configureApp } = require("../src/configure-app");

  server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  configureApp(app);
  await app.init();
}

export default async function handler(req: Request, res: Response) {
  try {
    if (!bootstrapped) {
      bootstrapped = bootstrap();
    }
    await bootstrapped;
    server(req, res);
  } catch (err) {
    bootstrapped = null;

    // The middleware chain (and its requestContextMiddleware-assigned ID)
    // never got registered if bootstrap itself failed - read any
    // caller-supplied id directly off the raw request instead, falling
    // back to a fresh one, so this failure is still traceable.
    const requestId =
      (req.headers["x-request-id"] as string | undefined) ?? randomUUID();
    const errorMessage =
      err instanceof Error ? redactSecrets(err.message) : "Unknown error";
    // Never console.error(err) directly here - the raw error object (e.g.
    // a Postgres connection failure) can embed DATABASE_URL, including its
    // password, in its message. Only a redacted message and the error's
    // name are logged, never the full object/stack.
    console.error(
      JSON.stringify({
        requestId,
        message: "Serverless bootstrap/request error",
        errorName: err instanceof Error ? err.name : "UnknownError",
        errorMessage,
      }),
    );
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json");
      res.setHeader("x-request-id", requestId);
      res.end(JSON.stringify({ message: "Internal server error.", requestId }));
    }
  }
}
