export const REPO_URL = "https://github.com/nodelike/sikemux";
export const RELEASES_URL = `${REPO_URL}/releases/latest`;

export interface Release {
    version: string;
    dmgUrl: string;
    publishedAt: string | null;
}

interface GithubAsset {
    name: string;
    browser_download_url: string;
}

interface GithubRelease {
    tag_name: string;
    published_at: string;
    assets: GithubAsset[];
}

const FALLBACK: Release = { version: "0.4.1", dmgUrl: RELEASES_URL, publishedAt: null };

export async function latestRelease(): Promise<Release> {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (import.meta.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;

    try {
        const response = await fetch("https://api.github.com/repos/nodelike/sikemux/releases/latest", { headers });
        if (!response.ok) return FALLBACK;
        const release = (await response.json()) as GithubRelease;
        const dmg = release.assets.find((asset) => asset.name.endsWith("_aarch64.dmg"));
        return {
            version: release.tag_name.replace(/^v/, ""),
            dmgUrl: dmg?.browser_download_url ?? RELEASES_URL,
            publishedAt: release.published_at,
        };
    } catch {
        return FALLBACK;
    }
}
