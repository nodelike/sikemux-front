import { en, type Copy } from "./en";
import { zh } from "./zh";

const COPY: Record<string, Copy> = { en, zh };

export const copyFor = (locale: string | undefined): Copy => COPY[locale ?? "en"] ?? en;
