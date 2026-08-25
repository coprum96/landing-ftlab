"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { radarHorizons, researchConcepts } from "@/data/agentic";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function AgenticHorizonCompactSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const h = dict.pages.agenticAi.horizon;
  const [active, setActive] = useState(0);

  return (
    <section
      id="horizon"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-16 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{h.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{h.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {h.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-10 md:mt-12">
          <div className="flex flex-wrap gap-2" role="tablist">
            {h.tabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
                className={cx(
                  "label-mono min-h-11 border px-4 py-3 text-[10px] tracking-[0.14em] transition-colors",
                  active === index
                    ? "border-accent/50 text-ink"
                    : "border-white/10 text-ink/45 hover:text-ink/80",
                )}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-8" role="tabpanel">
            {active < 2 ? (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {radarHorizons[active].items.map((item) => (
                  <li
                    key={item.en}
                    className="border-b border-white/10 py-3 text-sm leading-snug text-muted"
                  >
                    {item[locale]}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-0">
                {researchConcepts.slice(0, 5).map((concept) => (
                  <li
                    key={concept.id}
                    className="grid grid-cols-12 gap-3 border-b border-white/10 py-5 md:items-baseline"
                  >
                    <span className="col-span-2 label-mono text-[11px] text-accent md:col-span-1">
                      {concept.code}
                    </span>
                    <span className="col-span-10 label-mono text-[11px] tracking-[0.1em] text-ink md:col-span-3">
                      {concept.title[locale]}
                    </span>
                    <span className="col-span-12 text-sm text-muted md:col-span-8">
                      {concept.text[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
