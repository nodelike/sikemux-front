import { AGENTS, agentPath, type AgentIconId } from "./agents";
import { COMPARISONS, comparisonPath } from "./comparisons";

export type CardAgent = { id: AgentIconId; color: string };
export type CardApp = { name: string; bytes: number };

export type CardVisual = { kind: "hero" } | { kind: "phone" } | { kind: "brand" } | { kind: "marks"; agents: CardAgent[] } | { kind: "sizes"; apps: CardApp[] };

export interface Card {
    path: string;
    label: string;
    title: string;
    chip?: string;
    body: string;
    visual: CardVisual;
}

const HERO: CardVisual = { kind: "hero" };
const sized = COMPARISONS.flatMap((comparison) => (comparison.bytes === undefined ? [] : [{ name: comparison.name, bytes: comparison.bytes }]));

export const CARDS: Card[] = [
    { path: "/phone", label: "Phone app", title: "Your agents,", chip: "in your pocket.", body: "Watch your coding agents work, answer what they ask and start new chats from your phone.", visual: { kind: "phone" } },
    { path: "/changelog", label: "Changelog", title: "What’s new", chip: "in Sikemux.", body: "Every stable release and what changed in it, newest first.", visual: HERO },
    {
        path: "/agents",
        label: "Agents",
        title: "Bring the coding agent",
        chip: "you already use.",
        body: "Claude Code, Codex, OpenCode, Hermes, Grok, OMP and Pi, signed in with your own plan.",
        visual: { kind: "marks", agents: AGENTS.map((agent) => ({ id: agent.icon, color: agent.color })) },
    },
    ...AGENTS.map((agent) => ({
        path: agentPath(agent),
        label: "Agents",
        title: `${agent.name}, with`,
        chip: "a whole IDE around it.",
        body: `Run ${agent.name} ${agent.chat ? "in a chat" : "in a terminal"} beside your code, with its own browser tab, Git review and your tools.`,
        visual: { kind: "marks", agents: [{ id: agent.icon, color: agent.color }] } satisfies CardVisual,
    })),
    {
        path: "/vs",
        label: "Compared",
        title: "Sikemux and the tools",
        chip: "you’re weighing it against.",
        body: "T3 Code, Orca, Conductor, Paradev, herdr, Paseo and more, and when each one is the better pick.",
        visual: { kind: "sizes", apps: sized },
    },
    ...COMPARISONS.map((comparison) => ({
        path: comparisonPath(comparison),
        label: "Compared",
        title: "Sikemux vs",
        chip: comparison.name,
        body: `How a free agentic IDE for Claude Code and Codex compares with ${comparison.name}, the ${comparison.kind}.`,
        visual: comparison.bytes === undefined ? HERO : ({ kind: "sizes", apps: [{ name: comparison.name, bytes: comparison.bytes }] } satisfies CardVisual),
    })),
    { path: "/brand", label: "Brand", title: "Sikemux", chip: "brand.", body: "The wordmark, the mark, the icon and the colours, to download.", visual: { kind: "brand" } },
    { path: "/privacy", label: "Legal", title: "Privacy policy", body: "What Sikemux collects, why, who handles it, and how to have it deleted.", visual: HERO },
    { path: "/terms", label: "Legal", title: "Terms of use", body: "The terms for using Sikemux, its phone app and Sikemux accounts.", visual: HERO },
    { path: "/delete-account", label: "Account", title: "Delete your account", body: "How to delete your Sikemux account, and what is deleted when you do.", visual: HERO },
];

export const DOCS_CARD: Card = {
    path: "/docs",
    label: "Docs",
    title: "Sikemux",
    chip: "docs.",
    body: "Install Sikemux, run your coding agents in it, and drive it from the keyboard, the CLI or an agent.",
    visual: HERO,
};

export const cardHeadline = (card: Pick<Card, "title" | "chip">) => (card.chip ? `${card.title} ${card.chip}` : card.title);

export const cardImagePath = (path: string) => `/og${path}.jpg`;
