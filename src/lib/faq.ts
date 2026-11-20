import type { FaqEntry } from "../i18n/en";

export const faqStructuredData = (entries: FaqEntry[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: { "@type": "Answer", text: entry.answer.replace(/<[^>]+>/g, "") },
    })),
});
