import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://sikemux.com",
    trailingSlash: "never",
    build: { format: "file" },
    i18n: {
        locales: ["en", "zh", "ja"],
        defaultLocale: "en",
        routing: { prefixDefaultLocale: false },
    },
});
