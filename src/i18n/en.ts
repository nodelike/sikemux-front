export const en = {
    root: "/",
    lang: "en",
    langName: "English",
    home: {
        title: "Sikemux · a whole team of AI coders, in one window",
        description:
            "Out of Claude? The chat carries on in Codex. Sikemux is a free, MIT-licensed native app for Mac, Windows and Linux that runs Claude Code, Codex and other coding agents on your own plans and shows which one needs you.",
        featureList: [
            "Runs Claude Code, Codex, OpenCode, Hermes, Grok, OMP and Pi with your own plan",
            "A real browser tab for each agent",
            "Agents test iOS apps in a live Simulator",
            "Code editor, terminals and Git review in one window",
            "Pull requests and CI from GitHub, GitLab and Bitbucket",
            "Jira, databases, AWS, Rundeck, SigNoz and Bruno views",
            "Terminals and agents keep running after the app quits",
            "Answer agents from the MacBook notch or the phone app",
        ],
        shareAlt: "Sikemux: a whole team of AI coders, in one window. A Mac window with a coding agent, its browser tab and the project's other agents beside it.",
        operatingSystem: "macOS 11 or later, Linux, Windows 10 or later",
    },
    nav: {
        home: "Sikemux home",
        main: "Main",
        features: "Features",
        agents: "Agents",
        docs: "Docs",
        compare: "Compare",
        changelog: "Changelog",
        theme: "Switch between light and dark",
        download: "Download",
        menu: "Menu",
        languages: "Language",
    },
    install: {
        tabs: "Install with",
        copy: "Copy",
        copied: "Copied",
        copyLabel: "Copy the install command",
    },
    hero: {
        title: { first: "A whole team of AI", second: "coders, ", chip: "in one window." },
        lede: "Claude Code, Codex and more, side by side in one native app. See who’s working, who’s stuck and who needs you.",
        download: "Download for Mac",
        star: "Star",
        aboutSize: "about 30 MB",
        systems: "Apple Silicon Mac, Windows and Linux",
        free: "free, MIT",
        shot: "Sikemux with Claude Code fixing a checkout bug, its browser tab open on the shop's cart page and the project's other agents listed on the right",
        points: {
            plans: { title: "Your subscriptions.", body: "Claude Code, Codex and five more, on the subscriptions you already have." },
            native: { title: "Native, not Electron.", body: (size: string) => `Drawn on the GPU. The whole app downloads at ${size}.` },
            talk: { title: "Agents that talk.", body: "They message each other, hand off work and ask only what's yours to decide." },
            anywhere: { title: "Answer from anywhere.", body: "The MacBook notch asks for you. Away from the desk, your phone does." },
        },
    },
    hub: {
        tag: "How it fits",
        title: { lead: "No AI of its own.", chip: "It runs yours." },
        body: [
            "Install an agent the usual way and sign in. Sikemux finds it and starts it with your login, on this computer or any host you link.",
            "Watch and answer from the app, the notch or your phone.",
        ],
        places: { app: "Mac, Windows or Linux app", notch: "Notch island", iphone: "iPhone", android: "Android", hosts: "Linked hosts" },
        testing: "in testing",
        core: "Sikemux core",
        coreNote: "keeps agents running after you quit the app",
    },
    features: {
        carryOn: {
            tag: "Carry on",
            title: { lead: "Out of Claude?", chip: "The chat carries on in Codex." },
            body: "Start an agent next to your code. It reads the project, edits files and runs commands while you watch. When one plan runs dry, the same chat carries on with another agent.",
        },
        more: {
            label: "More in every chat",
            mentions: { tag: "Mentions", body: "# hands over an issue, ! a pull request, + a file." },
            limits: { tag: "Limits", body: "What every account has used, per window." },
            stash: { tag: "Stash", body: "Drop in what you saved from your phone." },
        },
        chief: {
            tag: "Chief",
            title: { lead: "Every project", chip: "gets a chief." },
            ask: { before: "Tell ", after: " what you want. It hands the work to Claude Code, Codex and your other agents, answers what it can, and brings you only the calls that need you." },
            back: "Back after an hour away? It tells you what landed and what was decided for you, and you can overrule any decision.",
        },
        teammates: {
            tag: "Teammates",
            title: { lead: "Your agents", chip: "talk to each other." },
            body: "They message each other, hand off work and start helpers beside them, across Claude Code, Codex, Pi, Hermes and Grok. In your chat it folds into one line you can open.",
        },
        cells: {
            label: "Buddies, the browser and drawn answers",
            buddies: {
                tag: "Buddies",
                title: { lead: "Spot each one", chip: "at a glance." },
                body: "Each agent wears a buddy that shows what it’s doing: working, waiting on you or done. Pick a pack and a face for each agent.",
            },
            browser: {
                tag: "Browser",
                title: { lead: "Opens your app.", chip: "Checks its own work." },
                body: "Every agent gets a real browser tab on the engine Safari uses. It opens your app, clicks, types and takes screenshots like a tester would. Type in the tab yourself and the agent leaves it where it is.",
            },
            answers: {
                tag: "Answers you can see",
                title: { lead: "When words aren’t enough,", chip: "it draws." },
                body: "Ask how something works. It reads the code and draws the answer in a browser tab of its own. The chat keeps a card that brings the tab back, and any page it builds opens the same way.",
            },
        },
        review: {
            tag: "Review and ship",
            title: { lead: "See which agent", chip: "wrote each change." },
            body: [
                "Every file an agent touched, marked with who wrote it. An agent writes the commit message, and you commit from the same window.",
                "Quit Sikemux, or let it update: terminals and agents keep running.",
            ],
        },
        notch: {
            tag: "Notch and phone",
            title: { lead: "It asks.", chip: "You answer from anywhere." },
            body: [
                "An island over the MacBook notch shows who's working and asks when an agent needs permission, even with Sikemux behind another app.",
                "Away from the desk, the iPhone app asks you instead; Android is in testing.",
            ],
        },
    },
    tools: {
        tag: "Your tools",
        title: { lead: "CI, issues and production,", chip: "without leaving ", nowrap: "the window." },
        body: "Turn on what your team already runs. Anything you find, hand to an agent.",
        names: { databases: "Databases", actions: "GitHub Actions", issues: "Jira and Linear" },
        handoff: "takes it from there",
    },
    numbers: {
        tag: "Size",
        title: { lead: "Light as", chip: "a feather." },
        lede: "Everything in one window, and still lighter than a terminal.",
        whole: "The whole app, Mac, Windows or Linux.",
        thanCursor: "smaller than Cursor.",
        thanGhostty: "smaller than Ghostty.",
        free: "Free and MIT-licensed.",
        why: "Drawn natively on the GPU. Browser tabs use the WebKit already in macOS instead of shipping a browser of their own.",
        note: "Apple Silicon installers from each project’s own download link, checked 13 November 2026.",
    },
    beliefs: {
        tag: "What we hold to",
        title: "Built by people who use it all day.",
        list: [
            { title: "Your AI, your login.", body: "We don’t sell models. Sikemux runs the plan you already pay for, or free models when you have none." },
            { title: "Native, or nothing.", body: "Typing and scrolling come first, even with twenty agents streaming." },
            { title: "Agents are teammates.", body: "They get names, talk to each other and ask you only what’s yours to decide." },
            { title: "If we don’t use it, it goes.", body: "Every feature here is one we reach for daily. The rest gets cut." },
        ],
    },
    downloads: {
        tag: "Download",
        title: { lead: "Get ", chip: "Sikemux." },
        body: "Free and MIT-licensed. No account needed on your own computer.",
        whatsNew: "what’s new",
        everyRelease: "every release",
        terminal: "Terminal",
        commands: { brew: "Mac, with Homebrew", curl: "Mac or Linux", scoop: "Windows, with Scoop", host: "Any server: core only, x86_64 and arm64" },
        copyFor: (note: string) => `Copy the command for ${note}`,
        needs: {
            macOS: "Apple Silicon · macOS 11 or later",
            linux: "x86_64 or arm64 · Ubuntu 24.04, Debian 13 or newer",
            windows: "x64 or arm64 · Windows 10 22H2 or later",
            iPhone: "iOS 17 or later",
            android: "In testing",
        },
        appStore: "App Store",
        joinTest: "Join the test",
    },
    faq: {
        tag: "Questions",
        title: { lead: "Asked", chip: "often." },
        more: "Something else?",
        discord: "Ask on Discord.",
        entries: [
            {
                question: "What is Sikemux, in one sentence?",
                answer: "A desktop app for Mac, Windows and Linux where you work on a project together with AI coding agents: they write and test the code, and you watch, review and ship, without juggling an editor, terminals, Git and a browser in separate apps.",
            },
            {
                question: "Which agents does it work with?",
                answer: `<a href="/agents/claude-code">Claude Code</a>, <a href="/agents/codex">Codex</a>, <a href="/agents/hermes">Hermes</a>, <a href="/agents/pi">Pi</a>, <a href="/agents/opencode">OpenCode</a>, <a href="/agents/omp">OMP</a> and <a href="/agents/grok">Grok</a>. Install one the usual way and sign in, and Sikemux finds it and starts it with your own login.`,
            },
            {
                question: "Does Sikemux send my code to a model?",
                answer: "No. Sikemux has no AI of its own. Your code only goes to the agent you choose, through that agent's own account. Some agents can also use an API key you add in Settings, but you never need one.",
            },
            {
                question: "Linux, Windows, Intel Macs?",
                answer: "Apple Silicon Macs on macOS 11 or later, Windows 10 22H2 or later on x64 and arm64, and Linux on x86_64 and arm64 as a .deb or AppImage from <a href='https://github.com/nodelike/sikemux/releases/latest'>GitHub Releases</a>. The Linux app needs Ubuntu 24.04, Debian 13 or newer; on older systems, install only the core with --host. Intel Macs can build it from source, but there's no download for them yet. Join the Discord or watch the GitHub repository to hear when there is.",
            },
            {
                question: "Is it free?",
                answer: "Yes. Sikemux is free and MIT-licensed, and it needs no account on your own computer. It runs the Claude Code, Codex and other subscriptions you already pay for, or free models if you have none. We don't resell models or take a cut.",
                open: true,
            },
            {
                question: "How does it stay alive?",
                answer: "Nothing is for sale today. Sikemux is built by people who use it all day. If we charge later, it will be for things that cost us money to run, such as a machine we host for your agents, sync between your computers, and team features. The app you download stays free and MIT, and the licence means nobody can take that back, us included.",
                open: true,
            },
        ] as FaqEntry[],
    },
    closing: {
        title: { lead: "Bring your agents.", chip: "Keep your plans." },
        body: "Sikemux runs the agents you already pay for and gives them the rest of your tools, on a Mac, a Windows PC or a Linux box.",
        download: "Download for Mac",
        all: "All downloads",
    },
    footer: {
        tagline: "A whole team of AI coders, in one window.",
        product: "Product",
        help: "Help",
        company: "Company",
        phone: "Phone app",
        brand: "Brand",
        privacy: "Privacy",
        terms: "Terms",
        refunds: "Refunds",
        contact: "Contact",
        free: "free and MIT",
    },
};

export interface FaqEntry {
    question: string;
    answer: string;
    open?: boolean;
}

export type Copy = typeof en;
