import type { AgentIconId } from "./agents";

export const TEAM: { id: string; name: string; agent: AgentIconId; pack: string; shape: string; task: string }[] = [
    { id: "otter", name: "Otter", agent: "claude", pack: "buddies", shape: "mochi", task: "Sign-in test fails in Safari" },
    { id: "heron", name: "Heron", agent: "codex", pack: "japan", shape: "neko", task: "Fix the session cookie" },
    { id: "wren", name: "Wren", agent: "claude", pack: "screens", shape: "telly", task: "Check sign-in in the browser" },
    { id: "badger", name: "Badger", agent: "pi", pack: "personas", shape: "engineer", task: "Sign-in on the iPhone" },
    { id: "finch", name: "Finch", agent: "hermes", pack: "chibi", shape: "hood", task: "Release notes" },
    { id: "lynx", name: "Lynx", agent: "grok", pack: "soot", shape: "soot", task: "Watch CI on main" },
];

export const PICKED = { agent: "Otter", pack: "buddies", shape: "mochi" };


const ELSEWHERE = [{ name: "Kaito", pack: "personas", shape: "data" }];

/** The buddy an agent wears wherever its @name shows; @Chief wears the Sikemux mark instead. */
export function faceOf(name: string): { pack: string; shape: string } | undefined {
    return [...TEAM, ...ELSEWHERE].find((agent) => agent.name === name);
}
