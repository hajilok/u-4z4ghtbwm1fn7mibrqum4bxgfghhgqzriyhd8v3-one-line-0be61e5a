import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

function resolveOutputPath(argv: string[]): string {
  const flagIndex = argv.indexOf("--out");
  if (flagIndex !== -1 && argv[flagIndex + 1]) {
    return argv[flagIndex + 1];
  }
  return "/output/entry.txt";
}

const OUTPUT_PATH: string = resolveOutputPath(process.argv.slice(2));

// Generation-2 tournament champion (67 bytes, pure ASCII, single line).
const ONE_LINER: string =
  "I built an AI to call my mom on Sundays, and she left it the house.";

function buildEntry(raw: string): string {
  const line = raw.replace(/\s+/g, " ").trim();
  const charCount = Array.from(line).length;
  if (charCount < 1 || charCount > 140) {
    throw new Error(`Invalid entry length: ${charCount} chars (expected 1..140)`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Entry must be a single line without line breaks");
  }
  return line;
}

const entry = buildEntry(ONE_LINER);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, entry, { encoding: "utf8" });
