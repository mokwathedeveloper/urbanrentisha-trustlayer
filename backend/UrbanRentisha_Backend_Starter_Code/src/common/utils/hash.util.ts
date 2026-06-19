import * as crypto from "crypto";

export function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function randomCode(prefix = "UR", length = 6) {
  const raw = crypto
    .randomBytes(4)
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
  return `${prefix}-${raw}`;
}
