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
    ["limits", "accounts.png", { left: 2940, top: 1500, width: 510, height: 650 }],
    ["splits", "terminals.png", { left: 556, top: 86, width: 2350, height: 2052 }],
    ["deck", "command-deck-deck.png", { left: 0, top: 0, width: 960, height: 600 }],
    ["agents", "agents-chat.png", { left: 360, top: 170, width: 1600, height: 1110 }],
    ["simulator", "simulator.png", { left: 560, top: 84, width: 2346, height: 2056 }],
    ["database", "database.png", { left: 1110, top: 100, width: 2340, height: 1260 }],
    ["visual-diagram", "visual-diagram-stage.png", { left: 380, top: 340, width: 1580, height: 900 }],
    ["visual-chart", "visual-chart-stage.png", { left: 380, top: 340, width: 1580, height: 900 }],
    ["visual-mockup", "visual-mockup-stage.png", { left: 380, top: 340, width: 1580, height: 900 }],
    ["tools", "agent-tools.png", { left: 820, top: 505, width: 1120, height: 700 }],
];

const pnpm = (cwd, ...args) => execFileSync("pnpm", args, { cwd, stdio: "inherit" });

const only = process.argv.slice(2);
const wants = (part) => only.length === 0 || only.includes(part);

// The phone goes first: the Mac's Simulator scene shows the phone app's own screen.
if (wants("phone")) pnpm(resolve(app, "mobile"), "showcase", "--site", phone, "device", "asking");
if (wants("mac")) {
    pnpm(app, "showcase", "--site", shots);
    // The hero is taken on an ultrawide screen: the rails keep their width and the chat and browser get the room.
    pnpm(app, "showcase", "--width", "1760", "--height", "900", "--out", resolve(app, "showcase/out/hero-wide"), "--site", resolve(site, "src/assets/hero"), "hero");
}
if (wants("mac") || wants("cards")) {
    await mkdir(cards, { recursive: true });
    for (const [name, source, region] of CARDS) {
        await sharp(resolve(shots, source)).extract(region).png().toFile(resolve(cards, `${name}.png`));
    }
    console.log(`cut ${CARDS.length} cards`);
}
