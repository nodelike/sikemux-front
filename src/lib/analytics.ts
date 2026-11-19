import type { PostHog } from "posthog-js";

const TAGS_KEY = "sikemux-tags";
const TAG_NAMES = ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

let client: Promise<PostHog> | null = null;

// Kept for the tab, so a Download click on a later page still says where the visitor came from.
function arrivalTags(): Record<string, string> {
    const params = new URLSearchParams(location.search);
    const fromLink = Object.fromEntries(TAG_NAMES.flatMap((name) => (params.has(name) ? [[name, params.get(name)!]] : [])));
    try {
        if (Object.keys(fromLink).length) sessionStorage.setItem(TAGS_KEY, JSON.stringify(fromLink));
        return JSON.parse(sessionStorage.getItem(TAGS_KEY) ?? "{}");
    } catch {
        return fromLink;
    }
}

function analytics(): Promise<PostHog> | null {
    if (!import.meta.env.PROD || location.hostname !== "sikemux.com") return null;
    client ??= import("posthog-js").then(({ default: posthog }) => {
        const tags = arrivalTags();
        posthog.init("phc_yGaffnPw38wHvQKgusATcKtYmkyDCbNNGpTo3sK9pQoD", {
            api_host: "/ingest",
            ui_host: "https://eu.posthog.com",
            defaults: "2026-05-30",
            cookieless_mode: "always",
            autocapture: false,
            disable_session_recording: true,
            capture_performance: false,
            advanced_disable_flags: true,
            loaded: (loaded) => {
                loaded.register(tags);
            },
        });
        return posthog;
    });
    return client;
}

export function startAnalytics() {
    void analytics();
}

export function capture(event: string, properties: Record<string, unknown> = {}) {
    void analytics()?.then((posthog) => posthog.capture(event, properties, { transport: "sendBeacon" }));
}
