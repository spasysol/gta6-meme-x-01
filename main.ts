// SPDX-License-Identifier: MIT
// gta6-meme-x-01 — entry program for make.fun's "Post a GTA 6 meme on X" bounty.
// The post itself is the entry: the house reads it from X. This program only
// copies the repository's POST.json (which holds the post's URL) into /output.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const postPath = new URL("./POST.json", import.meta.url);
const post = JSON.parse(readFileSync(postPath, "utf8"));
if (typeof post !== "object" || post === null || typeof post.url !== "string") {
  throw new Error("POST.json must be a JSON object with a string url field");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(postPath, `${outDir}/POST.json`);
console.log(`POST.json copied to ${outDir}/POST.json (${post.url})`);
