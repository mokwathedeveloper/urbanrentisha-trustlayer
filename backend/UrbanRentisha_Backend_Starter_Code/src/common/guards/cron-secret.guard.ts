import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { timingSafeEqual } from "crypto";
import type { Request } from "express";

/** Constant-time string comparison so the response timing can't be used
 * to infer how many leading characters of a guessed secret were correct. */
function secretsMatch(provided: string, expected: string): boolean {
  const providedBuf = Buffer.from(provided);
  const expectedBuf = Buffer.from(expected);
  if (providedBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(providedBuf, expectedBuf);
}

/**
 * Protects the reconciliation cron endpoint from anyone but Vercel Cron
 * (or an operator with the secret). Accepts the secret via either header
 * - `Authorization: Bearer <CRON_SECRET>` (what Vercel Cron sends
 * automatically when the env var is literally named CRON_SECRET) or
 * `x-cron-secret: <CRON_SECRET>` (for manual/non-Vercel triggering).
 * Missing or mismatched secret -> 401, with no detail about which case it
 * was (no "secret was present but wrong" vs "no secret at all" leak).
 */
@Injectable()
export class CronSecretGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const expected = this.config.get<string>("CRON_SECRET");

    if (!expected) {
      // Should be unreachable in production (env validation requires
      // CRON_SECRET there) - if it's somehow still unset, fail closed
      // rather than accepting any request.
      throw new UnauthorizedException("Cron endpoint is not configured.");
    }

    const bearer = request.header("authorization");
    const provided =
      (bearer?.startsWith("Bearer ") ? bearer.slice("Bearer ".length) : null) ??
      request.header("x-cron-secret") ??
      null;

    if (!provided || !secretsMatch(provided, expected)) {
      throw new UnauthorizedException("Invalid or missing cron secret.");
    }

    return true;
  }
}
