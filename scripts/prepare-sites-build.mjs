#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "client", "index.html");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");

for (const file of [index, worker, hosting]) {
  if (!existsSync(file)) throw new Error("Missing Sites build input: " + file);
}

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });
copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

const announcementDirectory = path.join(dist, "client", "news");
const announcementHtml = readFileSync(index, "utf8")
  .replaceAll("Mandvia — Accountable agent payments", "Mandvia joins the TipHub portfolio")
  .replaceAll(
    "Mandvia is the control and evidence layer for autonomous software spend.",
    "TipHub announces a $525K portfolio allocation to Mandvia, supporting its work across fintech and agent payments.",
  )
  .replace('content="https://www.mandvia.com/"', 'content="https://www.mandvia.com/news/tiphub-allocation"')
  .replace('href="https://www.mandvia.com/"', 'href="https://www.mandvia.com/news/tiphub-allocation"');

mkdirSync(announcementDirectory, { recursive: true });
writeFileSync(path.join(announcementDirectory, "tiphub-allocation.html"), announcementHtml);

console.log("Prepared Sites build and route metadata for /news/tiphub-allocation");
