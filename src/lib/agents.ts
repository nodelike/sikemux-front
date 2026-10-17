export type AgentIconId = "claude" | "codex" | "hermes" | "pi" | "opencode" | "omp" | "grok";

export interface AgentPage {
    slug: string;
    icon: AgentIconId;
    name: string;
    maker: string;
    color: string;
    command: string;
    install: string;
    signIn: string;
    plan: string;
    runs: string;
    chat: boolean;
    accounts: boolean;
}

export const AGENTS: AgentPage[] = [
    {
        slug: "claude-code",
        icon: "claude",
        name: "Claude Code",
        maker: "Anthropic",
        color: "var(--brand-claude)",
        command: "claude",
        install: "curl -fsSL https://claude.ai/install.sh | bash",
        signIn: "claude auth login",
        plan: "your Claude subscription or an Anthropic Console key",
        runs: "A Claude chat speaks Claude Code's own stream-json control protocol, the one Anthropic's Agent SDK uses with the claude binary. Replies, tool calls and thinking stream into the chat, Sikemux answers its permission questions, and you can steer it mid-reply. Switch to TUI to run claude in a terminal with everything its own interface offers.",
        chat: true,
        accounts: true,
    },
    {
        slug: "codex",
        icon: "codex",
        name: "Codex",
        maker: "OpenAI",
        color: "var(--brand-codex)",
        command: "codex",
        install: "curl -fsSL https://chatgpt.com/codex/install.sh | sh",
        signIn: "codex login",
        plan: "your ChatGPT plan or an OpenAI API key",
        runs: "A Codex chat talks to codex app-server, Codex's own JSON-RPC server, so every message, command, file change and plan shows up in the chat as it happens. Sikemux also finds the copy of Codex inside the ChatGPT app. Switch to TUI for Codex's terminal interface.",
        chat: true,
        accounts: true,
    },
    {
        slug: "opencode",
        icon: "opencode",
        name: "OpenCode",
        maker: "the OpenCode project",
        color: "var(--brand-opencode)",
        command: "opencode",
        install: "curl -fsSL https://opencode.ai/install | bash",
        signIn: "opencode auth login",
        plan: "any model provider OpenCode supports",
        runs: "A chat runs opencode acp, OpenCode's Agent Client Protocol mode. OpenCode keeps its own approvals, and Sikemux adds its skills library to OpenCode's skill paths for each chat.",
        chat: true,
        accounts: false,
    },
    {
        slug: "hermes",
        icon: "hermes",
        name: "Hermes",
        maker: "Nous Research",
        color: "var(--brand-hermes)",
        command: "hermes",
        install: "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash",
        signIn: "hermes model",
        plan: "the provider and model you choose for it",
        runs: "A chat runs hermes acp, and the chat's model picker lists the models Hermes offers. Hermes runs in a private home Sikemux prepares, so nothing is written to your own Hermes folders.",
        chat: true,
        accounts: false,
    },
    {
        slug: "grok",
        icon: "grok",
        name: "Grok",
        maker: "xAI",
        color: "var(--brand-grok)",
        command: "grok",
        install: "curl -fsSL https://x.ai/cli/install.sh | bash",
        signIn: "grok login",
        plan: "your xAI account",
        runs: "Each chat runs its own grok agent process, so one chat's approvals never reach another. Grok runs in a private home Sikemux prepares, with the Sikemux skills library alongside its own.",
        chat: true,
        accounts: false,
    },
    {
        slug: "omp",
        icon: "omp",
        name: "OMP",
        maker: "the oh-my-pi project",
        color: "var(--brand-omp)",
        command: "omp",
        install: "curl -fsSL https://omp.sh/install | sh",
        signIn: "omp login",
        plan: "your own provider accounts",
        runs: "A chat runs omp acp, the Agent Client Protocol, and Sikemux hands OMP its skills library alongside OMP's own skills.",
        chat: true,
        accounts: false,
    },
    {
        slug: "pi",
        icon: "pi",
        name: "Pi",
        maker: "the Pi project",
        color: "var(--brand-pi)",
        command: "pi",
        install: "curl -fsSL https://pi.dev/install.sh | sh",
        signIn: "/login inside pi",
        plan: "your own provider accounts",
        runs: "Pi runs in its own terminal inside the project, where you use it as you would anywhere else. If Pi crashes, Sikemux starts it again on the same session.",
        chat: false,
        accounts: false,
    },
];

export const agentPath = (agent: AgentPage) => `/agents/${agent.slug}`;
