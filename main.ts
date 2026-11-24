// The Long Roast: Lawmakers and the File They Cannot Convert
// Writes one satirical sentence to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: no network, no clock, no randomness. Never deletes
// anything in the output directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The senator drafting the law to govern artificial intelligence just emailed his staff a Word file named FINAL_final_v7 and asked an intern to turn it into a PDF.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const charCount = [...LINE].length;
if (charCount < 1 || charCount > 320) {
  throw new Error(`entry must be 1-320 characters, got ${charCount}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single non-blank line");
}

// Write exactly the sentence, no trailing newline, so the file content
// is the entry itself. Then read it back and verify it matches, so a
// partial or failed write can never pass silently.
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, LINE, "utf8");
if (readFileSync(entryPath, "utf8") !== LINE) {
  throw new Error("entry.txt does not match the expected line");
}
console.log(`wrote ${charCount}-character entry to ${entryPath}`);
