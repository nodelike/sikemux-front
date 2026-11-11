import { ANDROID, APPLE, LINUX, type Mark } from "./marks";
import { APP_STORE_URL } from "./release";

type Platform = "mac" | "linux" | "windows" | "iphone" | "android";

interface Offer {
    mark: Mark | null;
    label: string;
    href: string;
}

function visitorPlatform(): Platform {
    const agent = navigator.userAgent;
    if (/android/i.test(agent)) return "android";
    if (/iphone|ipad|ipod/i.test(agent)) return "iphone";
    // iPadOS asks for desktop pages and reads as a Mac, but no Mac has a touch screen.
    if (/macintosh/i.test(agent)) return navigator.maxTouchPoints > 1 ? "iphone" : "mac";
    if (/windows/i.test(agent)) return "windows";
    if (/linux|x11|cros/i.test(agent)) return "linux";
    return "mac";
}

function offerFor(platform: Platform, link: HTMLAnchorElement): Offer {
    switch (platform) {
        case "mac":
            return { mark: APPLE, label: "Download for Mac", href: link.dataset.dmg ?? link.href };
        case "linux":
            return { mark: LINUX, label: "Download for Linux", href: link.dataset.appimage ?? link.href };
        case "iphone":
            return { mark: APPLE, label: "Download on the App Store", href: APP_STORE_URL };
        case "android":
            return { mark: ANDROID, label: "Get the Android app", href: "/phone" };
        case "windows":
            return { mark: null, label: "Get it for Mac or Linux", href: "/#download" };
    }
}

export function pointDownloads() {
    const platform = visitorPlatform();
    for (const link of document.querySelectorAll<HTMLAnchorElement>("a[data-download]")) {
        const offer = offerFor(platform, link);
        link.href = offer.href;
        link.dataset.platform = platform;
        const label = link.querySelector("span");
        if (label) label.textContent = offer.label;
        const icon = link.querySelector("svg");
        if (!icon) continue;
        icon.toggleAttribute("hidden", offer.mark === null);
        if (offer.mark === null) continue;
        icon.setAttribute("viewBox", offer.mark.viewBox);
        icon.querySelector("path")?.setAttribute("d", offer.mark.path);
    }
}
