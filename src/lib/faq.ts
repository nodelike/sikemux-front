import { REPO_URL } from "./release";

export interface FaqEntry {
    question: string;
    answer: string;
}

export const FAQ: FaqEntry[] = [
    {
        question: "What is Sikemux, in one sentence?",
        answer: "A Mac app where you work on a project together with AI coding agents: they write and test the code, and you watch, review and ship, without juggling an editor, terminals, Git and a browser in separate apps.",
    },
    {
        question: "What is a coding agent?",
        answer: "An AI tool, like Claude Code or Codex, that reads your project, edits files and runs commands to finish a task you describe in plain words. Sikemux doesn't include one; it runs the ones you already use.",
    },
    {
        question: "Is this Electron?",
        answer: "No. Sikemux is built with Tauri and Rust and uses the web engine macOS already has, which is why it's small and quick to start.",
    },
    {
        question: "How is Sikemux different from Cursor?",
        answer: `Cursor is an AI code editor with its own agent, models and subscription, made for writing code by hand with AI help. Sikemux has no AI of its own: it runs Claude Code, Codex and the other agents you already pay for, and builds the window around them. <a href="/vs/cursor">Sikemux vs Cursor</a>`,
    },
    {
        question: "How is this different from Superset, Conductor or cmux?",
        answer: `Those are built around the agents. <a href="/vs/superset">Superset</a> and <a href="/vs/conductor">Conductor</a> run a crowd of agents in parallel, on your Mac or in the cloud, and <a href="/vs/cmux">cmux</a> is a terminal made for juggling many sessions. Sikemux is built around the project: agents share one window with the editor, Git, a real browser and your GitHub, GitLab, Bitbucket, Jira, database, AWS, Rundeck, SigNoz and Bruno views, all on the same folder. It's also a 16 MB download.`,
    },
    {
        question: "Why not Zed and a terminal?",
        answer: `If you mostly write code by hand, <a href="/vs/zed">Zed</a> is the better editor. Sikemux assumes the agents do most of the typing: it runs several of them on one repo, each with its own browser tab, and keeps the editor, Git and your deploy tools a key away.`,
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
        question: "Is there a phone app?",
        answer: `Yes. Android is in testing on Google Play, and iPhone is coming soon. <a href="/phone">Get it here</a>, sign in with the same account as Sikemux on your computer, and allow the phone once on the computer. The Mac app itself never needs an account.`,
    },
    {
        question: "Intel Macs, Windows, Linux?",
        answer: "Downloads are for Apple Silicon Macs on macOS 11 or later, signed and notarized by Apple. The notch island needs macOS 14, and the iOS Simulator needs macOS 15 with Xcode. Linux builds are coming soon. Windows and Intel Macs can build it from source, but there's no download for them yet.",
    },
    {
        question: "Is Sikemux open source?",
        answer: `It's source-available. The <a href="${REPO_URL}">source is on GitHub</a> under the <a href="${REPO_URL}/blob/main/LICENSE">FSL license</a>, which lets you read, use and change it but not sell a copy.`,
    },
    {
        question: "What does it cost?",
        answer: "Nothing, at home or at work. You only pay for the agents' own plans, the ones you already have.",
    },
];

export const faqStructuredData = (entries: FaqEntry[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: { "@type": "Answer", text: entry.answer.replace(/<[^>]+>/g, "") },
    })),
});
