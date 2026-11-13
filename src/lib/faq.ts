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
        question: "Which agents does it work with?",
        answer: `<a href="/agents/claude-code">Claude Code</a>, <a href="/agents/codex">Codex</a>, <a href="/agents/hermes">Hermes</a>, <a href="/agents/pi">Pi</a>, <a href="/agents/opencode">OpenCode</a>, <a href="/agents/omp">OMP</a> and <a href="/agents/grok">Grok</a>. Install one the usual way and sign in, and Sikemux finds it and starts it with your own login.`,
    },
    {
        question: "Does Sikemux send my code to a model?",
        answer: "No. Sikemux has no AI of its own. Your code only goes to the agent you choose, through that agent's own account. Some agents can also use an API key you add in Settings, but you never need one.",
    },
    {
        question: "Linux, Windows, Intel Macs?",
        answer: "Apple Silicon Macs on macOS 11 or later, and x86_64 Linux as a .deb, .rpm or AppImage. Windows and Intel Macs can build it from source, but there's no download for them yet. Leave your email at the top of this page and we'll write when there is.",
    },
    {
        question: "What does it cost?",
        answer: "Nothing, at home or at work, and the source is MIT. You only pay for the agents' own plans, the ones you already have.",
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
