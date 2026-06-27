import { readFileSync } from "fs";
import { join } from "path";
import { importEsm } from "./dynamic-import.util";

describe("importEsm", () => {
  // Jest's VM sandbox disables dynamic import() from code evaluated via
  // `new Function` (TypeError: "A dynamic import callback was invoked
  // without --experimental-vm-modules") - a Jest-environment limitation,
  // not a production one. Real end-to-end behavior (resolving
  // @stellar/stellar-sdk's ESM build, not its broken CJS build) was
  // verified manually via a standalone `node -e` script outside Jest; see
  // the commit message for that transcript. This spec instead asserts the
  // structural property that actually prevents the regression: the
  // specifier is handed to a literal `import(...)` expression that tsc
  // cannot see (and therefore cannot downlevel into require()).
  it("hides a literal import() call inside new Function, invisible to tsc's commonjs downleveling", () => {
    const source = readFileSync(
      join(__dirname, "dynamic-import.util.ts"),
      "utf8",
    );

    expect(source).toMatch(/new Function\(\s*"specifier"/);
    expect(source).toMatch(/"return import\(specifier\)"/);
  });

  it("is callable and returns a promise", () => {
    const result = importEsm("node:crypto");
    expect(result).toBeInstanceOf(Promise);
    // Avoid letting the unresolved promise's rejection (if any, under
    // Jest's VM restriction) become an unhandled rejection in this test run.
    result.catch(() => undefined);
  });
});
