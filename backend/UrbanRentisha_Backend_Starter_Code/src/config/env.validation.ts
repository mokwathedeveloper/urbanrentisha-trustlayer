import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Min,
  MinLength,
  ValidationError,
  validateSync,
} from "class-validator";

export enum NodeEnv {
  Development = "development",
  Test = "test",
  Production = "production",
}

/**
 * Required at boot, in every environment - validated by class-validator
 * via the `validate` function below, wired into ConfigModule.forRoot in
 * app.module.ts. Anything missing or malformed here fails the process
 * fast, before it ever starts accepting requests, rather than surfacing as
 * a confusing runtime error the first time some unrelated code path
 * happens to touch the missing value.
 */
export class EnvironmentVariables {
  @IsOptional()
  @IsIn(Object.values(NodeEnv))
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @IsOptional()
  @IsInt()
  @Min(1)
  PORT?: number;

  @IsString()
  @Matches(/^postgres(ql)?:\/\//, {
    message: "DATABASE_URL must be a postgres/postgresql connection string",
  })
  DATABASE_URL!: string;

  @IsString()
  @MinLength(16, {
    message: "JWT_SECRET must be at least 16 characters",
  })
  JWT_SECRET!: string;

  @IsString()
  CORS_ORIGIN!: string;

  @IsString()
  STELLAR_NETWORK_PASSPHRASE!: string;

  @IsString()
  @MinLength(16)
  STELLAR_PLATFORM_SECRET_KEY!: string;

  @IsUrl({ require_tld: false })
  SOROBAN_RPC_URL!: string;

  @IsString()
  ESCROW_CONTRACT_ID!: string;

  @IsString()
  TRUST_VERIFIER_CONTRACT_ID!: string;

  @IsString()
  NATIVE_ASSET_CONTRACT_ID!: string;

  @IsUrl({ require_tld: false })
  SUPABASE_URL!: string;

  @IsString()
  @MinLength(16)
  SUPABASE_SERVICE_ROLE_KEY!: string;

  // Required in production only (see the production-only check below) -
  // a local/dev environment with no one testing the cron endpoint doesn't
  // need one, unlike JWT_SECRET etc. which every environment needs to
  // function at all.
  @IsOptional()
  @IsString()
  @MinLength(16, {
    message: "CRON_SECRET must be at least 16 characters",
  })
  CRON_SECRET?: string;
}

/** Secrets checked for obvious placeholder values before production may boot. */
const PRODUCTION_SECRET_FIELDS: (keyof EnvironmentVariables)[] = [
  "JWT_SECRET",
  "STELLAR_PLATFORM_SECRET_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "CRON_SECRET",
];

/** Secrets required in production only - unlike the always-required ones
 * above, these have a real, valid "unset" state outside production. */
const PRODUCTION_ONLY_REQUIRED_FIELDS: (keyof EnvironmentVariables)[] = [
  "CRON_SECRET",
];

/**
 * Catches the specific, common ways a placeholder ends up left in
 * production - the literal text patterns from .env.example, and runs of a
 * single repeated character (the "SXXXXXXXX..." style filler used for
 * secret-shaped values there). Deliberately a denylist of known-bad
 * patterns, not an attempt to judge real secret strength - that's a
 * different concern from "did someone forget to replace the example file".
 */
export function looksLikePlaceholderSecret(value: string): boolean {
  const lower = value.toLowerCase();
  if (
    /replace.?with|change.?me|your.?secret|example\.com|project-ref|placeholder/.test(
      lower,
    )
  ) {
    return true;
  }
  return /(.)\1{9,}/.test(value);
}

function formatErrors(errors: ValidationError[]): string {
  return errors
    .map((error) =>
      Object.values(error.constraints ?? {})
        .map((message) => `  - ${message}`)
        .join("\n"),
    )
    .join("\n");
}

export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(
      `Invalid environment configuration:\n${formatErrors(errors)}`,
    );
  }

  if (validatedConfig.NODE_ENV === NodeEnv.Production) {
    const missingFields = PRODUCTION_ONLY_REQUIRED_FIELDS.filter(
      (field) => !validatedConfig[field],
    );
    if (missingFields.length > 0) {
      throw new Error(
        `Refusing to boot in production without required secret(s): ${missingFields.join(", ")}.`,
      );
    }

    const placeholderFields = PRODUCTION_SECRET_FIELDS.filter((field) => {
      const value = validatedConfig[field] as string | undefined;
      return Boolean(value) && looksLikePlaceholderSecret(value as string);
    });
    if (placeholderFields.length > 0) {
      throw new Error(
        `Refusing to boot in production with placeholder secret(s): ${placeholderFields.join(", ")}. Replace these with real values before deploying.`,
      );
    }
  }

  return validatedConfig;
}
