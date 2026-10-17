export const REPO_URL = "https://github.com/nodelike/sikemux";
export const DISCORD_URL = "https://discord.gg/UKfmHpF9kX";
export const RELEASES_URL = `${REPO_URL}/releases/latest`;
export const INSTALL_COMMAND = "curl -fsSL https://sikemux.com/install | sh";

export interface Release {
    version: string;
    dmgUrl: string;
    dmgBytes: number | null;
    publishedAt: string | null;
}

interface GithubAsset {
    name: string;
    size: number;
    browser_download_url: string;
}

export interface GithubRelease {
    tag_name: string;
    published_at: string;
    assets: GithubAsset[];
    html_url?: string;
    body?: string | null;
    body_html?: string;
    prerelease?: boolean;
    draft?: boolean;
}

export interface ReleaseNote {
    version: string;
    url: string;
    publishedAt: string;
    summary: string;
}

function firstParagraph(body: string | null | undefined): string {
    const line = (body ?? "").split("\n").find((text) => text.trim() && !text.startsWith("#"));
    return line?.trim() ?? "";
}

export async function recentReleases(count = 3): Promise<ReleaseNote[]> {
    try {
        const releases = await github<GithubRelease[]>("/repos/nodelike/sikemux/releases?per_page=100");
        return releases
            .filter((release) => !release.prerelease && !release.draft)
            .slice(0, count)
            .map((release) => ({
                version: release.tag_name.replace(/^v/, ""),
                url: release.html_url ?? RELEASES_URL,
                publishedAt: release.published_at,
                summary: firstParagraph(release.body),
            }));
    } catch {
        return [];
    }
}

export interface ChangelogEntry {
    version: string;
    url: string;
    publishedAt: string;
    html: string;
}

export async function stableChangelog(): Promise<ChangelogEntry[]> {
    const entries: ChangelogEntry[] = [];
    for (let page = 1; page <= 5; page++) {
        let releases: GithubRelease[];
        try {
            releases = await github<GithubRelease[]>(`/repos/nodelike/sikemux/releases?per_page=100&page=${page}`, "application/vnd.github.html+json");
        } catch {
            return entries;
        }
        for (const release of releases) {
            if (release.prerelease || release.draft) continue;
            entries.push({
                version: release.tag_name.replace(/^v/, ""),
                url: release.html_url ?? RELEASES_URL,
                publishedAt: release.published_at,
                html: (release.body_html ?? "").replace(/^\s*<h1>.*?<\/h1>/s, "").replace(/<(\/?)h2>/g, "<$1h3>"),
            });
        }
        if (releases.length < 100) break;
    }
    return entries;
}

const githubAnswers = new Map<string, Promise<unknown>>();

// Each build or dev server asks GitHub once per URL, since anonymous calls are capped at 60 an hour.
function github<T>(path: string, accept = "application/vnd.github+json"): Promise<T> {
    const key = `${accept} ${path}`;
    const known = githubAnswers.get(key);
    if (known) return known as Promise<T>;
    const headers: Record<string, string> = { Accept: accept };
    if (import.meta.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
    const answer = fetch(`https://api.github.com${path}`, { headers }).then((response) => {
        if (!response.ok) throw new Error(`GitHub answered ${response.status} for ${path}`);
        return response.json() as Promise<T>;
    });
    answer.catch(() => githubAnswers.delete(key));
    githubAnswers.set(key, answer);
    return answer;
}

export async function starCount(): Promise<number | null> {
    try {
        const repo = await github<{ stargazers_count: number }>("/repos/nodelike/sikemux");
        return repo.stargazers_count;
    } catch {
        return null;
    }
}

const FALLBACK: Release = { version: "0.5.1", dmgUrl: RELEASES_URL, dmgBytes: 15_656_758, publishedAt: null };

export const LATEST_RELEASE_API = "https://api.github.com/repos/nodelike/sikemux/releases/latest";

export function formatSize(bytes: number): string {
    return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

export function toRelease(release: GithubRelease): Release {
    const dmg = release.assets.find((asset) => asset.name.endsWith("_aarch64.dmg"));
    return {
        version: release.tag_name.replace(/^v/, ""),
        dmgUrl: dmg?.browser_download_url ?? RELEASES_URL,
        dmgBytes: dmg?.size ?? null,
        publishedAt: release.published_at,
    };
}

export async function latestRelease(): Promise<Release> {
    try {
        return toRelease(await github<GithubRelease>("/repos/nodelike/sikemux/releases/latest"));
    } catch {
        return FALLBACK;
    }
}
