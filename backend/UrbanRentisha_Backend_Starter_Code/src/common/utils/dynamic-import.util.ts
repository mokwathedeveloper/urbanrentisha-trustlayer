/**
 * A real, runtime `import()` - even though this project compiles to
 * CommonJS. A literal `await import(specifier)` written anywhere else in
 * this codebase gets downleveled by tsc (module: "commonjs") into
 * `Promise.resolve().then(() => require(specifier))`, which is just
 * `require()` in disguise. For most packages that's harmless, but
 * @stellar/stellar-sdk is a dual CJS/ESM package whose CJS build does a
 * synchronous require() of its own pure-ESM dependencies (@noble/hashes,
 * @noble/ed25519) - safe on some Node builds, but a hard ERR_REQUIRE_ESM
 * crash on Vercel's serverless Node runtime. Routing the specifier through
 * `new Function` hides it from tsc's static rewrite, so this resolves via
 * Node's real ESM loader and the package's "import" condition (its actual
 * ESM build) instead of "require" (the broken CJS build).
 */

const realDynamicImport = new Function(
  "specifier",
  "return import(specifier)",
) as (specifier: string) => Promise<unknown>;

export function importEsm<T>(specifier: string): Promise<T> {
  return realDynamicImport(specifier) as Promise<T>;
}

/**
 * Unreachable at runtime - exists purely so Vercel's build-time dependency
 * tracer (@vercel/nft) bundles @stellar/stellar-sdk into the deployed
 * function. NFT only includes a node_modules package it can statically see
 * referenced via a literal require()/import() call graph; the specifier
 * passed through `new Function` above is invisible to that static scan (by
 * design, to dodge tsc's downleveling), so without this, the package never
 * ships and every call site here fails in production with "Cannot find
 * package '@stellar/stellar-sdk'" despite working locally and in tests
 * (where the full node_modules tree is always present on disk). NFT parses
 * source statically rather than executing it, so it finds and traces this
 * require() regardless of the condition guarding it.
 *
 * If importEsm is ever used for a different ESM-only package, that
 * specifier needs the same treatment here.
 */
if ((process.env.VERCEL_NFT_TRACE_HINT as string | undefined) === "never") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("@stellar/stellar-sdk");
}
