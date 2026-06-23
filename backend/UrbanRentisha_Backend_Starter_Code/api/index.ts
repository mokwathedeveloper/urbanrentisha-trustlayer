import type { Request, Response } from "express";

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

    console.error("Serverless bootstrap/request error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ message: "Internal server error." }));
    }
  }
}
