import type { APIRoute } from "astro";
import { AGENTS, agentPath } from "../lib/agents";
import { COMPARISONS, comparisonPath } from "../lib/comparisons";

export const GET: APIRoute = ({ site }) => {
    const pages = ["/", "/phone", "/changelog", "/agents", ...AGENTS.map(agentPath), "/vs", ...COMPARISONS.map(comparisonPath), "/privacy", "/terms"];
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join("\n")}
</urlset>
`;
    return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
