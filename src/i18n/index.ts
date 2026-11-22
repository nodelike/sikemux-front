import { en, type Copy } from "./en";
import { zh } from "./zh";
import { ja } from "./ja";

const COPY: Record<string, Copy> = { en, zh, ja };

export const LANGUAGES = [en, zh, ja].map(({ root, lang, langName }) => ({ root, lang, langName }));

export const copyFor = (locale: string | undefined): Copy => COPY[locale ?? "en"] ?? en;
