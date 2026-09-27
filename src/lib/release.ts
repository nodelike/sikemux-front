export const REPO_URL = "https://github.com/nodelike/sikemux";
export const RELEASES_URL = `${REPO_URL}/releases/latest`;

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
}

function githubHeaders(): Record<string, string> {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (import.meta.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
    return headers;
}

export async function starCount(): Promise<number | null> {
    try {
        const response = await fetch("https://api.github.com/repos/nodelike/sikemux", { headers: githubHeaders() });
        if (!response.ok) return null;
        const repo = (await response.json()) as { stargazers_count: number };
        return repo.stargazers_count;
    } catch {
        return null;
    }
}

const FALLBACK: Release = { version: "0.4.1", dmgUrl: RELEASES_URL, dmgBytes: 10_119_241, publishedAt: null };

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
        const response = await fetch(LATEST_RELEASE_API, { headers: githubHeaders() });
        if (!response.ok) return FALLBACK;
        return toRelease((await response.json()) as GithubRelease);
    } catch {
        return FALLBACK;
    }
}
