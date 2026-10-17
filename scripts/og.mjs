import { resolve } from "node:path";
import { chromium } from "playwright-core";
import { preview } from "astro";

const root = resolve(import.meta.dirname, "..");
const server = await preview({ root, logLevel: "warn", server: { port: 4399 } });
const browser = await chromium.launch({ channel: "chrome" });
const cards = [
    { path: "public/og.png", width: 1200, height: 630 },
    { path: "public/og-github.png", width: 1280, height: 640 },
];
for (const { path, width, height } of cards) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto("http://localhost:4399/og", { waitUntil: "networkidle" });
    await page.screenshot({ path: resolve(root, path) });
    await page.close();
    console.log(`wrote ${path}`);
}
await browser.close();
await server.stop();
