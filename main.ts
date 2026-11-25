import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH: string = process.argv[2] ?? "/output/entry.txt";

// Round 1 working candidate (pre-tournament baseline).
const ONE_LINER: string =
  "My anesthesiologist had me count back from ten, and at seven he asked my mother's maiden name.";

function buildEntry(raw: string): string {
  const line = raw.replace(/\s+/g, " ").trim();
  const charCount = Array.from(line).length;
  if (charCount < 1 || charCount > 140) {
    throw new Error(`Invalid entry length: ${charCount} chars (expected 1..140)`);
  }
  return line;
}

const entry = buildEntry(ONE_LINER);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, entry, { encoding: "utf8" });
