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
