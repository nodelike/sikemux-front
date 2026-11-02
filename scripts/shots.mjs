// Retakes the product pictures on the site: the phone app's showcase, then the Mac app's own
// window drawn offscreen by the app repo's film scenes, and the cards cut from them. The scene
// `hero` is the hero: the agent's chat beside its desk's browser on a checkout page the film
// serves on localhost. The scene `site` draws every card. SIKEMUX_REPO points at the app's checkout.
import { execFileSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { resolve } from "node:path";
import sharp from "sharp";

const site = resolve(import.meta.dirname, "..");
const app = process.env.SIKEMUX_REPO ?? resolve(homedir(), "proj/pers/sikemux");
const window = resolve(app, "film/out/site");
const hero = resolve(app, "film/out/hero");
const phone = resolve(site, "src/assets/phone");
const cards = resolve(site, "src/assets/cards");

// Regions in the window's pixels: it is drawn at 1760 by 900 points, at 2x. The answers keep
// the composer in view, so they read as a chat.
const chat = { left: 900, top: 240, width: 1680, height: 1510 };
const CARDS = [
    ["agents", "agents.png", { left: 940, top: 300, width: 1600, height: 1080 }],
    ["visual-diagram", "visual-diagram.png", chat],
    ["visual-chart", "visual-chart.png", chat],
    ["visual-mockup", "visual-mockup.png", chat],
    ["terminals", "terminals.png", { left: 630, top: 175, width: 1300, height: 760 }],
    ["git", "git.png", { left: 622, top: 168, width: 1640, height: 850 }],
    ["activity", "activity.png", { left: 1170, top: 200, width: 1560, height: 1470 }],
];

const only = process.argv.slice(2);
const wants = (part) => only.length === 0 || only.includes(part);

if (wants("phone")) execFileSync("pnpm", ["showcase", "--site", phone, "device", "asking"], { cwd: resolve(app, "mobile"), stdio: "inherit" });
if (wants("mac")) {
    execFileSync(resolve(app, "film/film.sh"), ["hero", "--snaps", "--out", hero], { stdio: "inherit" });
    execFileSync(resolve(app, "film/film.sh"), ["site", "--snaps", "--out", window], { stdio: "inherit" });
}
if (wants("mac") || wants("cards")) {
    await mkdir(cards, { recursive: true });
    await sharp(resolve(hero, "hero.png")).png().toFile(resolve(site, "src/assets/hero/hero.png"));
    for (const [name, source, region] of CARDS) {
        await sharp(resolve(window, source)).extract(region).png().toFile(resolve(cards, `${name}.png`));
    }
    console.log(`cut the hero and ${CARDS.length} cards`);
}
