#!/usr/bin/env node
/**
 * Inline an image into lib/client.js as a data URL. Zero dependencies.
 *
 * Usage:
 *   node tools/embed-image.mjs assets/brand.jpg
 *   node tools/embed-image.mjs C:/path/to/your.png
 *
 * The image is used at the sidebar brand-mark size (roughly 24-32 CSS px), so a
 * square source around 192x192 is plenty and keeps the repository small.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = process.argv[2];

if (!input) {
  console.error("usage: node tools/embed-image.mjs <image path>");
  process.exit(1);
}

const mime = input.toLowerCase().endsWith(".png") ? "png" : "jpeg";
const absolute = resolve(root, input);

let base64;
try {
  base64 = readFileSync(absolute).toString("base64");
} catch (error) {
  console.error(`cannot read ${absolute}: ${error.message}`);
  process.exit(1);
}

const target = resolve(root, "lib/client.js");
const before = readFileSync(target, "utf8");
const after = before.replace(
  /data:image\/(?:jpeg|png);base64,[A-Za-z0-9+/=]+/,
  `data:image/${mime};base64,${base64}`,
);

if (after === before) {
  console.error("no inline image data URL found in lib/client.js — nothing replaced");
  process.exit(1);
}

writeFileSync(target, after);
console.log(`inlined ${input} into lib/client.js (${base64.length} base64 chars)`);
