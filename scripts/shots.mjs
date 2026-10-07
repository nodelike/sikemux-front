// Retakes every product picture on the site: the Mac app's showcase, the phone app's
// showcase, then the feature cards cut from them. SIKEMUX_REPO points at the app's checkout.
import { execFileSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import { resolve } from "node:path";
import sharp from "sharp";

const site = resolve(import.meta.dirname, "..");
const app = process.env.SIKEMUX_REPO ?? resolve(homedir(), "proj/pers/sikemux");
const shots = resolve(site, "src/assets/shots");
const phone = resolve(site, "src/assets/phone");
const cards = resolve(site, "src/assets/cards");

const CARDS = [
    ["spaces", "projects-rail-rail.png", { left: 0, top: 92, width: 516, height: 612 }],
    ["ssh", "spaces-rail.png", { left: 0, top: 590, width: 516, height: 340 }],
    ["limits", "accounts.png", { left: 2930, top: 1565, width: 510, height: 570 }],
    ["splits", "terminals.png", { left: 556, top: 86, width: 2350, height: 2052 }],
    ["deck", "command-deck-deck.png", { left: 0, top: 0, width: 960, height: 600 }],
    ["tools", "agent-tools.png", { left: 790, top: 530, width: 1000, height: 625 }],
];

const pnpm = (cwd, ...args) => execFileSync("pnpm", args, { cwd, stdio: "inherit" });

const only = process.argv.slice(2);
const wants = (part) => only.length === 0 || only.includes(part);

if (wants("mac")) {
    pnpm(app, "showcase", "--site", shots);
    // The hero is shown wide, so it is taken on a smaller screen to keep the app's text large.
    pnpm(app, "showcase", "--width", "1440", "--height", "900", "--out", resolve(app, "showcase/out/hero-1440"), "--site", resolve(site, "src/assets/hero"), "hero");
}
if (wants("phone")) pnpm(resolve(app, "mobile"), "showcase", "--site", phone, "device", "asking");
if (wants("mac") || wants("cards")) {
    await mkdir(cards, { recursive: true });
    for (const [name, source, region] of CARDS) {
        await sharp(resolve(shots, source)).extract(region).png().toFile(resolve(cards, `${name}.png`));
    }
    console.log(`cut ${CARDS.length} cards`);
}
