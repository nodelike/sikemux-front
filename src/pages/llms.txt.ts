import type { APIRoute } from "astro";
import { AGENTS, agentPath } from "../lib/agents";
import { COMPARISONS, comparisonPath } from "../lib/comparisons";
import { FAQ } from "../lib/faq";
import { INSTALL_COMMAND, REPO_URL } from "../lib/release";

export const GET: APIRoute = ({ site }) => {
    const url = (path: string) => new URL(path, site).href;
    const body = `# Sikemux

> Sikemux is a free, source-available agentic IDE for Apple Silicon Macs. It runs the coding agents you already use (Claude Code, Codex, OpenCode, Hermes, Grok, OMP and Pi), signed in with your own plan, in one window with a code editor, terminals, Git review, a real browser tab for each agent, an iOS Simulator, and your GitHub, GitLab, Bitbucket, Jira, database, AWS, Rundeck, SigNoz and Bruno views. Sikemux has no AI of its own and never sends code anywhere except to the agent you choose.

- Download: ${url("/")} (about 16 MB, macOS 11 or later, Apple Silicon)
- Install from a terminal: \`${INSTALL_COMMAND}\`
- Source: ${REPO_URL} (Functional Source License)
- Docs: https://docs.sikemux.com

## Agents

${AGENTS.map((agent) => `- [${agent.name}](${url(agentPath(agent))}): ${agent.maker}'s coding agent, run ${agent.chat ? "in a chat or its own terminal UI" : "in a terminal"} inside Sikemux`).join("\n")}

## Compared

${COMPARISONS.map((comparison) => `- [Sikemux vs ${comparison.name}](${url(comparisonPath(comparison))}): ${comparison.name} is a ${comparison.kind}`).join("\n")}

## Questions

${FAQ.map((entry) => `### ${entry.question}\n\n${entry.answer.replace(/<[^>]+>/g, "")}`).join("\n\n")}

## More

- [Phone app](${url("/phone")}): watch agents and answer them from Android, iPhone coming soon
- [Changelog](${url("/changelog")})
`;
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
