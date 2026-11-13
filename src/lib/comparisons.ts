export interface Comparison {
    slug: string;
    name: string;
    kind: string;
    what: string;
    difference: string;
    pickThem: string[];
    pickSikemux: string[];
    bytes?: number;
    measuredAs?: string;
}

const LIMITS = "You want each plan's limit in view, and a chat that carries on in Codex when Claude runs out.";

export const COMPARISONS: Comparison[] = [
    {
        slug: "t3code",
        name: "T3 Code",
        kind: "agent chat app",
        what: "T3 Code is a free, MIT-licensed app for driving Claude Code, Codex, OpenCode, Cursor, Grok and other agents from one place, on Mac, Windows and Linux, with a phone app that reaches your computer.",
        difference:
            "Both run the agent CLIs on the plans you already pay for. T3 Code is a chat front end for them, built on Electron. Sikemux is a native app of about 25 MB, drawn on the GPU, that puts each chat in its project with the editor, terminals, Git and a browser tab for each agent.",
        pickThem: ["You need Windows.", "You want Cursor's or Antigravity's agent in the same list.", "You want a large community and nightly releases."],
        pickSikemux: ["You want a small native app that stays quick with many agents open.", LIMITS, "You want the editor, Git and a browser for each agent on the same project."],
    },
    {
        slug: "orca",
        name: "Orca",
        kind: "agent development environment",
        what: "Orca, from Stably, is a free, MIT-licensed app for running a fleet of coding agents such as Claude Code and Codex on your own subscriptions, each in its own Git worktree, with a browser, an iOS Simulator and a phone app beside them. It runs on Apple Silicon and Intel Macs, Windows and Linux.",
        difference:
            "Orca and Sikemux cover much of the same ground: many agents on your own plans, a browser and a Simulator for them, and a phone app. Orca is built around worktrees and a long list of agents, and ships several releases a day. Sikemux is a native app of about 25 MB built around the project and its chats, where a @Chief starts and steers the other agents for you.",
        pickThem: ["You need Windows or an Intel Mac.", "You want an agent Sikemux doesn't run; Orca lists more than 35.", "You want each task in its own worktree by default."],
        pickSikemux: ["You want a small native app that stays quick with many agents open.", LIMITS, "You want your Git host, CI, issues, logs and databases on the same project."],
    },
    {
        slug: "conductor",
        name: "Conductor",
        kind: "parallel agent runner",
        what: "Conductor is a Mac app that runs several Claude Code and Codex agents in parallel, each in its own Git worktree, with a diff to review for each, and Conductor Cloud for agents on hosted machines. It joined Meta on 4 November 2026, and on 12 November said it will keep developing the app, with sign-ups open again.",
        difference:
            "Conductor is built around running many agents side by side and reviewing their diffs. Sikemux is independent and built around the project: one window with the agents, the editor, Git, a browser for each agent and your CI, issues and logs on the same folder. It has no hosted cloud; any computer on your account, or an SSH box you turn into one, runs the agents instead.",
        pickThem: ["You want to fan one task out to many agents and pick the best result.", "You want agents on hosted cloud machines.", "Your workspaces are already there and they work for you."],
        pickSikemux: ["You want an independent, MIT-licensed app on machines you own.", "You want agents to test in their own browser tab or iOS Simulator.", LIMITS],
    },
    {
        slug: "paradev",
        name: "Paradev",
        kind: "parallel agent runner",
        what: "Paradev, called Superset until 26 October 2026, runs many coding agents at once on your own subscriptions, each task in its own Git worktree and branch, and lets you review and merge what they produce. It is free for one person on local workspaces; remote access, automations and its phone app are in Pro at $20 a month, and cloud hours in Team.",
        difference:
            "Paradev is built around the agents. Sikemux is built around the project: agents share one window with the editor, Git, a real browser and your GitHub, GitLab, Bitbucket, Jira, database, AWS, Rundeck, SigNoz and Bruno views, all on the same folder.",
        pickThem: ["You want to run a crowd of agents in parallel and merge the best results.", "Worktree-per-task is the way you want to work.", "You want hosted cloud machines for a team."],
        pickSikemux: ["You want the phone app and your other computers free, not in a paid plan.", "You want agents to test in their own browser tab or iOS Simulator.", "You want a small app: Sikemux is a fraction of Paradev's download."],
        bytes: 453_107_779,
        measuredAs: "Superset",
    },
    {
        slug: "herdr",
        name: "herdr",
        kind: "agent multiplexer",
        what: "herdr is an open-source agent multiplexer that lives in your terminal. Agents run in panes that keep going after you close the window, it shows at a glance which of them need you, and one command installs it on a server over SSH. A desktop app and a phone app sit on top.",
        difference:
            "herdr keeps the agents in terminals and stays out of the way. Sikemux reads each agent's session as a chat you can steer, with the editor, Git review and a browser for each agent on the same project, and shows which agent needs you in the window, over the MacBook notch and on your phone.",
        pickThem: ["You live in the terminal and want your agents there, the way tmux works.", "You want the thinnest layer over your agents' own CLIs."],
        pickSikemux: ["You want agents' work as chats with diffs, not terminal scrollback.", "You want the editor, Git, CI and a browser for each agent in one window.", LIMITS],
    },
    {
        slug: "paseo",
        name: "Paseo",
        kind: "desktop and phone agent app",
        what: "Paseo orchestrates several coding agents from desktop and mobile. It began as a push-to-talk voice remote for Claude Code, is built by one maintainer, and publishes its source on GitHub under its own licence.",
        difference:
            "Paseo is built for reaching your agents from anywhere, by phone and by voice. Sikemux is built around the project at your desk: chats beside the editor, terminals, Git and a browser for each agent, with the phone and the notch for answering them when you're away.",
        pickThem: ["You mostly talk to your agents by voice or from your phone."],
        pickSikemux: ["You want an app under the MIT licence.", "You want the editor, Git review and a browser for each agent at your desk.", LIMITS],
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
];

export const comparisonPath = (comparison: Comparison) => `/vs/${comparison.slug}`;
