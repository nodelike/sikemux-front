export interface Comparison {
    slug: string;
    name: string;
    kind: string;
    what: string;
    difference: string;
    pickThem: string[];
    pickSikemux: string[];
    bytes?: number;
}

export const COMPARISONS: Comparison[] = [
    {
        slug: "cursor",
        name: "Cursor",
        kind: "AI code editor",
        what: "Cursor is an AI code editor built on VS Code. It comes with its own agent, its own models and its own subscription, and it is at its best while you write code by hand with AI completing it.",
        difference:
            "Sikemux has no AI of its own. It runs the coding agents you already pay for, such as Claude Code and Codex, and builds the window around them: each agent gets its own browser tab, an iOS Simulator and your Git, CI, issues and logs on the same project.",
        pickThem: ["You write most of the code yourself and want AI completions as you type.", "You want one subscription that bundles the editor and the models.", "You need Windows today."],
        pickSikemux: [
            "Claude Code or Codex does most of the typing, and you want to watch, steer and review it.",
            "You want to keep your Claude or ChatGPT plan instead of paying for another one.",
            "You want agents to test your app in a real browser or iOS Simulator before you look.",
        ],
        bytes: 291_841_306,
    },
    {
        slug: "zed",
        name: "Zed",
        kind: "code editor",
        what: "Zed is a fast, native code editor written in Rust, with an agent panel and support for external agents. It is built first for writing code by hand.",
        difference:
            "Sikemux assumes the agents do most of the typing. It runs several of them on one repo, each with its own chat, browser tab and terminals, and keeps the editor, Git and your deploy tools a key away.",
        pickThem: ["You mostly write code by hand and want the best editor for it.", "You pair with other people in the editor in real time."],
        pickSikemux: [
            "You spend your day giving tasks to Claude Code or Codex and reviewing what comes back.",
            "You want several agents on one project without juggling terminal windows.",
            "You want your CI, issues, logs and deploys next to the code the agent is changing.",
        ],
        bytes: 122_610_677,
    },
    {
        slug: "warp",
        name: "Warp",
        kind: "AI terminal",
        what: "Warp is a terminal with AI agents built in. Its agents run in the terminal, with Warp's own models and plans.",
        difference:
            "Sikemux is a whole IDE around the agents you already use: chats with Claude Code, Codex and others, a code editor, Git review, a browser per agent and terminals that keep running after you quit.",
        pickThem: ["You want a terminal first, with AI help on commands.", "You want Warp's own agent and models.", "You need Windows today."],
        pickSikemux: [
            "You want the agent's work as a chat you can read, steer and review, not only a terminal scroll.",
            "You want to keep your Claude or ChatGPT plan.",
            "You want the editor, Git and a browser on the same project as the agent.",
        ],
        bytes: 334_774_677,
    },
    {
        slug: "superset",
        name: "Superset",
        kind: "parallel agent runner",
        what: "Superset runs many coding agents at once, each task in its own Git worktree and branch, and lets you review and merge what they produce.",
        difference:
            "Superset is built around the agents. Sikemux is built around the project: agents share one window with the editor, Git, a real browser and your GitHub, GitLab, Bitbucket, Jira, database, AWS, Rundeck, SigNoz and Bruno views, all on the same folder.",
        pickThem: ["You want to run a crowd of agents in parallel and merge the best results.", "Worktree-per-task is the way you want to work."],
        pickSikemux: [
            "You work on one project at a time with a few agents beside you.",
            "You want agents to test in their own browser tab or iOS Simulator.",
            "You want a small app: Sikemux is a fraction of Superset's download.",
        ],
        bytes: 453_107_779,
    },
    {
        slug: "conductor",
        name: "Conductor",
        kind: "parallel agent runner",
        what: "Conductor is a Mac app that runs several Claude Code and Codex agents in parallel, each in its own Git worktree, with a diff to review for each.",
        difference:
            "Conductor is built around running many agents side by side. Sikemux is built around the project: one window with the agents, the editor, Git, a browser for each agent and your CI, issues and logs on the same folder.",
        pickThem: ["You want to fan one task out to many agents and pick the best result.", "You want cloud workspaces for your agents."],
        pickSikemux: [
            "You want to watch and steer agents as they work, not only review their diffs.",
            "You want agents to test in their own browser tab or iOS Simulator.",
            "You want a real code editor, terminals and deploy tools in the same window.",
        ],
    },
    {
        slug: "cmux",
        name: "cmux",
        kind: "terminal for agents",
        what: "cmux is a native macOS terminal built on Ghostty's engine for running many coding agent sessions, with a sidebar of workspaces and notifications when an agent needs you.",
        difference:
            "cmux is a terminal made for juggling many sessions. Sikemux is an IDE: chats you can read and steer, a code editor, Git review, a browser for each agent and your CI, issues and logs, on one project.",
        pickThem: ["You live in the terminal and want the agents there too.", "You want the lightest possible layer over your shell."],
        pickSikemux: [
            "You want agents' work as chats with diffs, not raw terminal output.",
            "You want the editor, Git and your deploy tools in the same window.",
            "You want to answer your agents from your phone or the notch.",
        ],
    },
];

export const comparisonPath = (comparison: Comparison) => `/vs/${comparison.slug}`;
