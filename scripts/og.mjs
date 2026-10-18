import { glob, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright-core";
import { preview } from "astro";

const root = resolve(import.meta.dirname, "..");
const server = await preview({ root, logLevel: "warn", server: { port: 4399 } });
const browser = await chromium.launch({ channel: "chrome" });
const cards = [];
for await (const file of glob("card/**/*.html", { cwd: resolve(root, "dist") })) cards.push(file.slice("card".length, -".html".length));

const shots = [
    { page: "/og", path: "public/og.png", width: 1200, height: 630 },
    { page: "/og", path: "public/og-github.png", width: 1280, height: 640 },
    ...cards.map((path) => ({ page: `/card${path}`, path: `public/og${path}.jpg`, width: 1200, height: 630 })),
];
for (const { page: url, path, width, height } of shots) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`http://localhost:4399${url}`, { waitUntil: "networkidle" });
    await mkdir(dirname(resolve(root, path)), { recursive: true });
    await page.screenshot({ path: resolve(root, path), ...(path.endsWith(".jpg") && { type: "jpeg", quality: 86 }) });
    await page.close();
    console.log(`wrote ${path}`);
}
await browser.close();
await server.stop();
