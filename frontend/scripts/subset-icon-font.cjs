// Regenerates public/fonts/material-symbols-outlined-subset.woff2 from the
// glyph names actually used in components/ui/icon.tsx's ICON_GLYPHS. Run
// this again any time a new icon is added to that map.
//
// Usage: node scripts/subset-icon-font.cjs
//
// Downloads the current Google-served Material Symbols Outlined variable
// font (axes already pinned to opsz=20/wght=400/GRAD=0 via the URL query,
// FILL left as a 0..1 range since components/ui/icon.tsx toggles it live),
// then subsets it via harfbuzz (through the subset-font package) down to
// only the glyphs reachable from the icon names actually used - ligature
// closure (GSUB) is performed automatically so the icon ligatures keep
// working, not just literal characters.
const fs = require("fs");
const path = require("path");
const https = require("https");
const subsetFont = require("subset-font");

const ICON_TSX_PATH = path.join(__dirname, "../components/ui/icon.tsx");
const OUTPUT_PATH = path.join(
  __dirname,
  "../public/fonts/material-symbols-outlined-subset.woff2",
);
const CSS_URL =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0..1,0&display=swap";
const CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": CHROME_UA } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": CHROME_UA } }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
  });
}

function extractGlyphNames(iconTsxSource) {
  const match = iconTsxSource.match(/ICON_GLYPHS = \{([\s\S]*?)\}/);
  if (!match) throw new Error("Could not find ICON_GLYPHS in icon.tsx");
  const names = [...match[1].matchAll(/\w+:\s*"(\w+)"/g)].map((m) => m[1]);
  return [...new Set(names)].sort();
}

(async () => {
  const iconSource = fs.readFileSync(ICON_TSX_PATH, "utf8");
  const glyphNames = extractGlyphNames(iconSource);
  console.log(`Subsetting for ${glyphNames.length} glyphs: ${glyphNames.join(", ")}`);

  const css = await fetchText(CSS_URL);
  const fontUrlMatch = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/);
  if (!fontUrlMatch) throw new Error("Could not find font URL in Google's CSS response");

  const fullFont = await fetchBuffer(fontUrlMatch[1]);
  const subsetBuffer = await subsetFont(fullFont, glyphNames.join(""), {
    targetFormat: "woff2",
  });

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, subsetBuffer);
  console.log(
    `Wrote ${OUTPUT_PATH}: ${fullFont.length} -> ${subsetBuffer.length} bytes`,
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
