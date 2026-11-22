import { github } from "./release";

export interface Mod {
    repo: string;
    name: string;
    owner: string;
    description: string;
    stars: number;
}

export const MODS_TOPIC = "sikemux-mod";
export const MODS_SEARCH = `/search/repositories?q=topic:${MODS_TOPIC}&sort=stars&order=desc&per_page=100`;
export const MODS_DOCS = "https://docs.sikemux.com/getting-started/mods";

interface SearchAnswer {
    items: { full_name: string; name: string; owner: { login: string }; description: string | null; stargazers_count: number }[];
}

export const toMods = (answer: SearchAnswer): Mod[] =>
    answer.items.map((item) => ({
        repo: item.full_name,
        name: item.name,
        owner: item.owner.login,
        description: item.description ?? "",
        stars: item.stargazers_count,
    }));

export async function listedMods(): Promise<Mod[]> {
    try {
        return toMods(await github<SearchAnswer>(MODS_SEARCH));
    } catch {
        return [];
    }
}

export const installLink = (repo: string) => `sikemux://install-mod?repo=${repo}`;
export const repoLink = (repo: string) => `https://github.com/${repo}`;
