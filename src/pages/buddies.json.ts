import type { APIRoute } from "astro";
import packs from "../lib/buddies.generated.json";
import { buddy, poses } from "../lib/buddies";
import { PICKED, TEAM } from "../lib/showcase-buddies";

export const GET: APIRoute = () => {
    const team = Object.fromEntries(
        TEAM.map((agent) => {
            const drawn = poses(agent.pack, agent.shape);
            return [agent.id, { working: drawn.working, done: drawn.done }];
        }),
    );
    const pack = packs.find((candidate) => candidate.id === PICKED.pack)!;
    const picker = {
        packs: packs.map((candidate) => ({ id: candidate.id, name: candidate.name, face: buddy(candidate.id, candidate.shapes[0].id, "idle").markup })),
        shapes: pack.shapes.map((shape) => ({ id: shape.id, name: shape.name, face: buddy(pack.id, shape.id, "idle").markup })),
        face: poses(PICKED.pack, PICKED.shape),
    };
    return new Response(JSON.stringify({ team, picker }), { headers: { "content-type": "application/json" } });
};
