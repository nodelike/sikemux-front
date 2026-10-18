import { AGENTS, agentPath, type AgentIconId } from "./agents";
import { COMPARISONS, comparisonPath } from "./comparisons";

export interface Card {
    path: string;
    label: string;
    title: string;
    body: string;
    agents?: { id: AgentIconId; color: string }[];
}

export const CARDS: Card[] = [
    { path: "/phone", label: "Phone app", title: "Your agents, in your pocket.", body: "Watch your coding agents work, answer what they ask and start new chats from your phone." },
    { path: "/changelog", label: "Changelog", title: "What's new in Sikemux.", body: "Every stable release and what changed in it, newest first." },
    { path: "/agents", label: "Agents", title: "Bring the coding agent you already use.", body: "Claude Code, Codex, OpenCode, Hermes, Grok, OMP and Pi, signed in with your own plan." },
    ...AGENTS.map((agent) => ({
        path: agentPath(agent),
        label: "Agents",
        title: `${agent.name}, with a whole IDE around it.`,
        body: `Run ${agent.name} ${agent.chat ? "in a chat" : "in a terminal"} beside your code, with its own browser tab, Git review and your tools.`,
        agents: [{ id: agent.icon, color: agent.color }],
    })),
    { path: "/vs", label: "Compared", title: "Sikemux and the tools you're weighing it against.", body: "Cursor, Zed, Warp, Superset, Conductor and cmux, and when each one is the better pick." },
    ...COMPARISONS.map((comparison) => ({
        path: comparisonPath(comparison),
        label: "Compared",
        title: `Sikemux vs ${comparison.name}`,
        body: `How a free agentic IDE for Claude Code and Codex compares with ${comparison.name}, the ${comparison.kind}.`,
    })),
    { path: "/brand", label: "Brand", title: "Sikemux brand.", body: "The wordmark, the mark, the icon and the colours, to download." },
    { path: "/privacy", label: "Legal", title: "Privacy policy", body: "What Sikemux collects, why, who handles it, and how to have it deleted." },
    { path: "/terms", label: "Legal", title: "Terms of use", body: "The terms for using Sikemux, its phone app and Sikemux accounts." },
    { path: "/delete-account", label: "Account", title: "Delete your account", body: "How to delete your Sikemux account, and what is deleted when you do." },
];

export const DOCS_CARD: Card = {
    path: "/docs",
    label: "Docs",
    title: "Sikemux docs.",
    body: "Install Sikemux, run your coding agents in it, and drive it from the keyboard, the CLI or an agent.",
};

export const cardImagePath = (path: string) => `/og${path}.jpg`;
