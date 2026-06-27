import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { withTimeout } from "../common/utils/resilience.util";

export type DependencyStatus = "up" | "down" | "unknown";

export interface ReadinessResult {
  status: "ok" | "degraded" | "error";
  checks: {
    database: DependencyStatus;
    sorobanRpc: DependencyStatus;
    storageConfig: DependencyStatus;
  };
}

const DB_CHECK_TIMEOUT_MS = 3_000;
const RPC_CHECK_TIMEOUT_MS = 3_000;

/**
 * Readiness checks are deliberately lightweight, timeout-bounded, single
 * attempts - no retries here. A readiness probe is typically polled every
 * few seconds by an orchestrator; retrying inside it would just turn a
 * brief blip into a slow response instead of a fast, accurate "not ready
 * yet" answer.
 */
@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  liveness(): { status: "ok" } {
    // Proves the process itself is up and the event loop is responsive -
    // no dependency checks, deliberately. A process that can't even answer
    // this should be restarted regardless of why.
    return { status: "ok" };
  }

  async readiness(): Promise<ReadinessResult> {
    const [database, sorobanRpc, storageConfig] = await Promise.all([
      this.checkDatabase(),
      this.checkSorobanRpc(),
      Promise.resolve(this.checkStorageConfig()),
    ]);

    // The database is the one dependency almost nothing in this app can
    // function without, so its failure alone flips the whole process to
    // "error" (not ready - take this instance out of rotation). Soroban
    // RPC or storage being briefly unreachable is reported, but doesn't
    // by itself make the instance unfit to serve the (large) portion of
    // the app that doesn't touch them right this second.
    const status: ReadinessResult["status"] =
      database === "down"
        ? "error"
        : sorobanRpc === "down" || storageConfig === "down"
          ? "degraded"
          : "ok";

    return { status, checks: { database, sorobanRpc, storageConfig } };
  }

  private async checkDatabase(): Promise<DependencyStatus> {
    try {
      await withTimeout(
        () => this.prisma.$queryRaw`SELECT 1`,
        DB_CHECK_TIMEOUT_MS,
        "health.database",
      );
      return "up";
    } catch {
      return "down";
    }
  }

  private async checkSorobanRpc(): Promise<DependencyStatus> {
    const rpcUrl = this.config.get<string>("SOROBAN_RPC_URL");
    if (!rpcUrl) return "unknown";

    try {
      await withTimeout(
        async () => {
          const response = await fetch(rpcUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: "health-check",
              method: "getHealth",
            }),
          });
          if (!response.ok) {
            throw new Error(`Soroban RPC returned HTTP ${response.status}`);
          }
        },
        RPC_CHECK_TIMEOUT_MS,
        "health.sorobanRpc",
      );
      return "up";
    } catch {
      return "down";
    }
  }

  /**
   * Configuration-presence check only - deliberately not a live network
   * call to Supabase on every readiness poll. Startup env validation
   * (see src/config/env.validation.ts) already guarantees these are
   * present and not placeholders by the time the app is serving traffic
   * at all; re-checking presence here only catches something rewriting
   * config at runtime, not Supabase's actual reachability.
   */
  private checkStorageConfig(): DependencyStatus {
    const url = this.config.get<string>("SUPABASE_URL");
    const key = this.config.get<string>("SUPABASE_SERVICE_ROLE_KEY");
    return url && key ? "up" : "down";
  }
}
