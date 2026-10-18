// Films the notch video from the island's design page in the app's checkout, on the same wallpaper as the screenshots.
// SIKEMUX_REPO points at the app's checkout and SIKEMUX_WALLPAPER at the picture behind the island.
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { homedir } from "node:os";
import { extname, resolve } from "node:path";
import { chromium } from "playwright-core";

const site = resolve(import.meta.dirname, "..");
const app = process.env.SIKEMUX_REPO ?? resolve(homedir(), "proj/pers/sikemux");
const wallpaper = process.env.SIKEMUX_WALLPAPER ?? resolve(homedir(), "wallpaper/midnight-garden.jpeg");
const video = resolve(site, "public/video");

const WIDTH = 720;
const HEIGHT = 288;
const FPS = 30;
const STEP = 1000 / FPS;
const POSTER_FRAME = 30;

const TYPES = { ".html": "text/html", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png" };

// The page reads the app's icons and fonts by relative path, so it is served from the app's checkout.
const server = createServer(async (request, response) => {
    const path = resolve(app, `.${decodeURIComponent(new URL(request.url, "http://localhost").pathname)}`);
    if (!path.startsWith(app)) return response.writeHead(403).end();
    const body = await readFile(path).catch(() => null);
    if (!body) return response.writeHead(404).end();
    response.writeHead(200, { "content-type": TYPES[extname(path)] ?? "text/plain" }).end(body);
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));

const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 2400 / WIDTH, colorScheme: "dark" });
const START = new Date("2026-09-26T09:41:00").getTime();
await context.clock.install({ time: START });
await context.clock.pauseAt(START + 1000);
const page = await context.newPage();
await page.route("**/__wallpaper", async (route) => route.fulfill({ body: await readFile(wallpaper), contentType: "image/jpeg" }));
await page.goto(`http://127.0.0.1:${server.address().port}/src-tauri/notch/design/screens.html`);
await page.evaluate(() => document.fonts.ready);

await page.addStyleTag({
    content: `
        body * { visibility: hidden; }
        #live, #live *, .film-cursor, .film-cursor * { visibility: visible; }
        #live { position: fixed !important; inset: 0; width: 100vw; max-width: none; height: 100vh !important; margin: 0; border: 0; border-radius: 0; }
        #live .screen { top: 0; border-radius: 0; }
        #live .wallpaper { position: fixed; inset: 0; background: #0b0a10 url("/__wallpaper") center 40% / cover no-repeat; }
        #live .window-peek, #live .menubar { display: none; }
        .film-cursor { position: fixed; z-index: 99; width: 15px; height: 21px; pointer-events: none; transform: translate(-1px, -1px); }
    `,
});
await page.evaluate(() => {
    const cursor = document.createElement("div");
    cursor.className = "film-cursor";
    cursor.innerHTML = `<svg viewBox="0 0 22 30" width="15" height="21"><path d="M2 2v22l6-5.5 4 9 3.5-1.6-4-8.8H20z" fill="#fff" stroke="#000" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
    document.body.append(cursor);
});

let elapsed = 0;
const REST = { x: 520, y: 205 };
const cursor = { ...REST };
const frames = [];

// The page's timers run on the paused clock, and its CSS transitions are held and stepped to the same time.
async function frame() {
    elapsed += STEP;
    await page.mouse.move(cursor.x, cursor.y);
    await page.clock.runFor(STEP);
    await page.evaluate(
        ([now, { x, y }]) => {
            for (const animation of document.getAnimations()) {
                animation.bornAt ??= now - (animation.currentTime ?? 0);
                animation.pause();
                animation.currentTime = now - animation.bornAt;
            }
            const drawn = document.querySelector(".film-cursor");
            drawn.style.left = `${x}px`;
            drawn.style.top = `${y}px`;
        },
        [elapsed, cursor],
    );
    frames.push(await page.screenshot({ type: "png" }));
}

async function wait(ms) {
    for (let index = 0; index < Math.round(ms / STEP); index++) await frame();
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

async function glide(to, ms) {
    const from = { ...cursor };
    const count = Math.round(ms / STEP);
    for (let index = 1; index <= count; index++) {
        const p = ease(index / count);
        cursor.x = from.x + (to.x - from.x) * p;
        cursor.y = from.y + (to.y - from.y) * p - Math.sin(p * Math.PI) * 12;
        await frame();
    }
}

const act = (name) => page.evaluate((name) => document.querySelector(`[data-act="${name}"]`).click(), name);

async function centre(selector) {
    const box = await page.locator(selector).first().boundingBox();
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

await wait(600);
await act("start");
await wait(1200);
await act("block");
await wait(1200);
await glide(await centre('#live .layer.peek [data-answer="allow"]'), 700);
await glide(await centre('#live .layer.peek [data-answer="allow"]'), 120);
await wait(150);
await page.mouse.down();
await wait(80);
await page.mouse.up();
await wait(900);
await glide(await centre("#live .layer.open .row >> nth=1"), 700);
await wait(1200);
await glide(REST, 600);
await wait(600);
await act("finish");
await wait(4000);
await browser.close();
server.close();

function encode(args, path) {
    return new Promise((done, fail) => {
        const ffmpeg = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-", ...args, path], {
            stdio: ["pipe", "inherit", "inherit"],
        });
        ffmpeg.on("exit", (code) => (code === 0 ? done() : fail(new Error(`ffmpeg exited with ${code} for ${path}`))));
        for (const png of frames) ffmpeg.stdin.write(png);
        ffmpeg.stdin.end();
    });
}

await Promise.all([
    encode(["-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart"], resolve(video, "notch.mp4")),
    encode(["-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p"], resolve(video, "notch.webm")),
]);
await new Promise((done, fail) => {
    const ffmpeg = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "png_pipe", "-i", "-", "-vf", "scale=1200:-1", "-q:v", "5", resolve(video, "notch-poster.jpg")], {
        stdio: ["pipe", "inherit", "inherit"],
    });
    ffmpeg.on("exit", (code) => (code === 0 ? done() : fail(new Error(`ffmpeg exited with ${code} for the poster`))));
    ffmpeg.stdin.end(frames[POSTER_FRAME]);
});
console.log(`filmed ${(frames.length / FPS).toFixed(1)} s of the notch into public/video`);
