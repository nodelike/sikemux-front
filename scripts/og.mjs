import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { preview } from "astro";

const root = resolve(import.meta.dirname, "..");
const server = await preview({ root, logLevel: "warn", server: { port: 4399 } });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:4399/og/", { waitUntil: "networkidle" });
await page.screenshot({ path: resolve(root, "public/og.png") });
await browser.close();
await server.stop();
console.log("wrote public/og.png");
