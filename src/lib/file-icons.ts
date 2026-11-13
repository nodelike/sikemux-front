const BY_ENDING: [string, string][] = [
    [".test.mjs", "test-js"],
    [".mjs", "javascript"],
    [".js", "javascript"],
    [".md", "markdown"],
];

/** The app's own file icon for a file name, from the copies in public/file-icons. */
export function fileIcon(name: string): string {
    const icon = BY_ENDING.find(([ending]) => name.endsWith(ending))?.[1] ?? "file";
    return `/file-icons/${icon}.svg`;
}
