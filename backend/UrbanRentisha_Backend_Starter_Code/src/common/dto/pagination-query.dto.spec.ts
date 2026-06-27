import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  PaginationQueryDto,
} from "./pagination-query.dto";

function parse(query: Record<string, unknown>) {
  return plainToInstance(PaginationQueryDto, query, {
    enableImplicitConversion: true,
  });
}

describe("PaginationQueryDto", () => {
  it("applies the default page and limit when neither is provided", () => {
    const dto = parse({});

    expect(dto.page).toBe(DEFAULT_PAGE);
    expect(dto.limit).toBe(DEFAULT_LIMIT);
    expect(validateSync(dto)).toHaveLength(0);
  });

  it("accepts an explicit page and limit within bounds", () => {
    const dto = parse({ page: "3", limit: "50" });

    expect(dto.page).toBe(3);
    expect(dto.limit).toBe(50);
    expect(validateSync(dto)).toHaveLength(0);
  });

  it("rejects a limit greater than the hard maximum", () => {
    const dto = parse({ limit: String(MAX_LIMIT + 1) });

    const errors = validateSync(dto);
    expect(errors.some((e) => e.property === "limit")).toBe(true);
  });

  it("accepts a limit exactly at the hard maximum", () => {
    const dto = parse({ limit: String(MAX_LIMIT) });

    expect(validateSync(dto)).toHaveLength(0);
  });

  it("rejects a page below 1", () => {
    const dto = parse({ page: "0" });

    const errors = validateSync(dto);
    expect(errors.some((e) => e.property === "page")).toBe(true);
  });

  it("rejects a non-integer limit", () => {
    const dto = parse({ limit: "20.5" });

    const errors = validateSync(dto);
    expect(errors.some((e) => e.property === "limit")).toBe(true);
  });
});
