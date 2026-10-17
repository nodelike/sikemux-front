import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://sikemux.com",
    trailingSlash: "never",
    build: { format: "file" },
});
