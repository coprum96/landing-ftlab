"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { publications } from "@/data/publications";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

const EVIDENCE_IDS = [
  "pub-tosunyan-medyanik-2026",
  "pub-bank-employee-portrait-2026",
] as const;

export function AgenticEvidenceSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.pages.agenticAi.evidence;
  const items = EVIDENCE_IDS.map((id) =>
    publications.find((p) => p.id === id),
  ).filter(Boolean);

  return (
    <section
      id="evidence"
      className="agentic-anchor border-t border-white/15 py-10 md:py-14"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 className="mt-4 max-w-3xl text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {copy.supporting}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75 md:text-[15px]">
              {copy.note}
            </p>
          </FadeIn>
        </div>

        <ul className="col-span-12 mt-8 divide-y divide-white/15 border-t border-white/15">
          {items.map((item) =>
            item ? (
              <li key={item.id} className="py-5">
                <p className="label-mono text-xs tracking-[0.1em] text-ink/60">
                  {item.year} · {item.authors}
                </p>
                <p className="mt-2 max-w-3xl text-base font-medium leading-snug tracking-[-0.015em] text-ink">
                  {item.title[locale]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.venue[locale]}
                  {item.note ? ` — ${item.note[locale]}` : ""}
                </p>
              </li>
            ) : null,
          )}
        </ul>

        <div className="col-span-12 mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <Link
            href={getLocalizedPath(locale, "publications")}
            className="label-mono inline-flex min-h-11 items-center text-xs tracking-[0.1em] text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.viewAll} →
          </Link>
          <Link
            href={getLocalizedPath(locale, "people")}
            className="label-mono inline-flex min-h-11 items-center text-xs tracking-[0.1em] text-ink/75 underline decoration-white/20 underline-offset-4 transition-colors hover:text-ink hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.viewTeam} →
          </Link>
        </div>
      </div>
    </section>
  );
}
