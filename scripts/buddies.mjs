// Draws every buddy the app ships, in every state and one colour each, with the app's own code, so the site shows the same ones.
// SIKEMUX_REPO points at the app's checkout.
import { copyFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { resolve } from "node:path";
import { build } from "esbuild";
import { chromium } from "playwright-core";

const site = resolve(import.meta.dirname, "..");
const app = process.env.SIKEMUX_REPO ?? resolve(homedir(), "proj/pers/sikemux");

const bundle = await build({
    stdin: {
        contents: `export { BUDDY_PACKS } from "./catalogue"; export { buddyBox, buddyMarkup, bodyMotion } from "./render";`,
        resolveDir: resolve(app, "shared/buddies"),
        loader: "ts",
    },
    bundle: true,
    format: "iife",
    globalName: "buddies",
    write: false,
});

// Shapes are cropped by measuring their drawing, which needs a real page.
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.setContent("<!doctype html><body></body>");
await page.addScriptTag({ content: bundle.outputFiles[0].text });
const drawn = await page.evaluate(() => {
    const { BUDDY_PACKS, buddyBox, buddyMarkup, bodyMotion } = window.buddies;
    const states = ["idle", "working", "waiting", "done", "error"];
    return BUDDY_PACKS.map((pack) => ({
        id: pack.id,
        name: pack.name,
        shapes: pack.shapes.map((shape, index) => {
            const box = buddyBox(pack, shape);
            const color = pack.colors[(index * 3) % pack.colors.length];
            return {
                id: shape.id,
                name: shape.name,
                box,
                states: Object.fromEntries(states.map((state) => [state, { motion: bodyMotion(state), markup: buddyMarkup(pack, shape, color, state, "__UID__", box) }])),
            };
        }),
    }));
});
await browser.close();

await writeFile(resolve(site, "src/lib/buddies.generated.json"), JSON.stringify(drawn));
await copyFile(resolve(app, "server/app/src/chat/buddies/buddies.css"), resolve(site, "src/styles/buddies.css"));
console.log(`Drew ${drawn.reduce((sum, pack) => sum + pack.shapes.length, 0)} buddies from ${drawn.length} packs.`);
