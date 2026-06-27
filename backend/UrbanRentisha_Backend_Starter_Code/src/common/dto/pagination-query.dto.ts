import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 20;
export const MAX_LIMIT = 100;

/**
 * Page-based pagination query params, shared by every previously-unbounded
 * list endpoint (listings browse, reports, notifications, viewing
 * requests, message threads). `limit` is hard-capped at `MAX_LIMIT` - the
 * global ValidationPipe (whitelist + forbidNonWhitelisted) rejects a
 * request for more than that with a 400, rather than silently clamping it
 * down to a different result set than what was asked for.
 */
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = DEFAULT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_LIMIT)
  limit: number = DEFAULT_LIMIT;
}
