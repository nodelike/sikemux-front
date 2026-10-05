import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
    const pages = ["/", "/privacy", "/terms", "/delete-account", "/phone"];
    const today = new Date().toISOString().slice(0, 10);
    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${new URL(path, site)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
    return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
