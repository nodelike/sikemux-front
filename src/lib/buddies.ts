import packs from "./buddies.generated.json";

export type BuddyState = "idle" | "working" | "waiting" | "done" | "error";

let drawn = 0;

export function buddy(pack: string, shape: string, state: BuddyState): { motion: string; markup: string } {
    const found = packs.find((candidate) => candidate.id === pack)?.shapes.find((candidate) => candidate.id === shape);
    if (!found) throw new Error(`No buddy ${pack}/${shape}; run pnpm buddies after the app adds one`);
    const pose = found.states[state];
    drawn += 1;
    return { motion: pose.motion, markup: pose.markup.replaceAll("__UID__", `b${drawn}`) };
}

/** Every pose of one buddy, for pages that change its state as they play. */
export function poses(pack: string, shape: string): Record<BuddyState, { motion: string; markup: string }> {
    const states: BuddyState[] = ["idle", "working", "waiting", "done", "error"];
    return Object.fromEntries(states.map((state) => [state, buddy(pack, shape, state)])) as Record<BuddyState, { motion: string; markup: string }>;
}
