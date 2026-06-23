import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import express, { type Request, type Response } from "express";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/configure-app";

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
 */
const server = express();
let bootstrapped: Promise<void> | null = null;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  configureApp(app);
  await app.init();
}

export default async function handler(req: Request, res: Response) {
  if (!bootstrapped) {
    bootstrapped = bootstrap();
  }
  await bootstrapped;
  server(req, res);
}
