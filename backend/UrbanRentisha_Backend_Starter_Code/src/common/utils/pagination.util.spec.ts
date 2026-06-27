import { buildPaginatedResult, paginationArgs } from "./pagination.util";

describe("paginationArgs", () => {
  it("computes skip/take for the first page", () => {
    expect(paginationArgs(1, 20)).toEqual({ skip: 0, take: 20 });
  });

  it("computes skip/take for a later page", () => {
    expect(paginationArgs(3, 20)).toEqual({ skip: 40, take: 20 });
  });

  it("computes skip/take for a non-default limit", () => {
    expect(paginationArgs(2, 50)).toEqual({ skip: 50, take: 50 });
  });
});

describe("buildPaginatedResult", () => {
  it("reports hasNextPage = true when more rows exist past this page", () => {
    const result = buildPaginatedResult(["a", "b"], 45, 1, 20);

    expect(result).toEqual({
      items: ["a", "b"],
      page: 1,
      limit: 20,
      total: 45,
      hasNextPage: true,
    });
  });

  it("reports hasNextPage = false on the last page", () => {
    const result = buildPaginatedResult(["a", "b"], 42, 3, 20);

    expect(result.hasNextPage).toBe(false);
  });

  it("reports hasNextPage = false when there are no rows at all", () => {
    const result = buildPaginatedResult([], 0, 1, 20);

    expect(result).toEqual({
      items: [],
      page: 1,
      limit: 20,
      total: 0,
      hasNextPage: false,
    });
  });
});
