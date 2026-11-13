import type { PostHog } from "posthog-js";

const REF_KEY = "sikemux-ref";

let client: Promise<PostHog> | null = null;

function arrivalRef(): string | null {
    const fromLink = new URLSearchParams(location.search).get("ref");
    try {
        if (fromLink) sessionStorage.setItem(REF_KEY, fromLink);
        return fromLink ?? sessionStorage.getItem(REF_KEY);
    } catch {
        return fromLink;
    }
}

function analytics(): Promise<PostHog> | null {
    if (!import.meta.env.PROD || location.hostname !== "sikemux.com") return null;
    client ??= import("posthog-js").then(({ default: posthog }) => {
        const ref = arrivalRef();
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
                if (ref) loaded.register({ ref });
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
