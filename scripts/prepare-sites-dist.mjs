import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const openNextDir = join(root, ".open-next");
const distDir = join(root, "dist");
const serverDir = join(distDir, "server");
const workerPath = join(openNextDir, "worker.js");
const hostingPath = join(root, ".openai", "hosting.json");

if (!existsSync(workerPath)) {
  throw new Error("Missing .open-next/worker.js. Run the OpenNext Cloudflare build first.");
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(serverDir, { recursive: true });
cpSync(openNextDir, distDir, { recursive: true });
cpSync(workerPath, join(serverDir, "index.js"));

if (existsSync(hostingPath)) {
  mkdirSync(join(distDir, ".openai"), { recursive: true });
  cpSync(hostingPath, join(distDir, ".openai", "hosting.json"));
}

writeFileSync(join(distDir, "README.txt"), "Cloudflare OpenNext build output prepared for Sites deployment.\n");
