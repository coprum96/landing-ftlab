"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  actionRiskDecisions,
  attackSurfaces,
  defensiveAgentStages,
  offensiveAgentStages,
} from "@/data/agentic";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function AgenticThreatSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.pages.agenticAi.threat;
  const [active, setActive] = useState(0);
  const tab = t.tabs[active];

  return (
    <section
      id="threat"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-16 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{t.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{t.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {t.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-10 md:mt-12">
          <div
            className="flex gap-2 overflow-x-auto pb-2 md:gap-0 md:overflow-visible md:border-b md:border-white/10"
            role="tablist"
          >
            {t.tabs.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
                className={cx(
                  "min-h-11 shrink-0 border px-4 py-3 text-left transition-colors md:border-0 md:border-b-2 md:px-5 md:pb-4",
                  active === index
                    ? "border-accent/50 bg-accent/[0.05] md:border-b-accent md:bg-transparent"
                    : "border-white/10 text-ink/50 md:border-b-transparent md:hover:text-ink/80",
                )}
              >
                <span className="label-mono text-[10px] tracking-[0.12em] text-ink">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 border border-white/10 p-6 md:mt-10 md:p-8" role="tabpanel">
            <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {tab.text}
            </p>

            {tab.id === "action" ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {actionRiskDecisions.map((d) => (
                  <li
                    key={d.en}
                    className="label-mono border border-white/10 px-3 py-2 text-[10px] tracking-[0.12em] text-ink"
                  >
                    {d[locale]}
                  </li>
                ))}
              </ul>
            ) : null}

            {tab.id === "conflict" ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="label-mono text-[10px] tracking-[0.14em] text-accent">
                    Offensive
                  </p>
                  <ul className="mt-4 space-y-2">
                    {offensiveAgentStages.map((s) => (
                      <li
                        key={s.en}
                        className="label-mono text-[11px] tracking-[0.1em] text-muted"
                      >
                        {s[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-mono text-[10px] tracking-[0.14em] text-ink/50">
                    Defensive
                  </p>
                  <ul className="mt-4 space-y-2">
                    {defensiveAgentStages.map((s) => (
                      <li
                        key={s.en}
                        className="label-mono text-[11px] tracking-[0.1em] text-muted"
                      >
                        {s[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {tab.id === "break" ? (
              <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {attackSurfaces.slice(0, 9).map((surface) => (
                  <li
                    key={surface.en}
                    className="label-mono border border-white/10 px-3 py-3 text-[10px] tracking-[0.1em] text-muted"
                  >
                    {surface[locale]}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <p className="mt-8 max-w-3xl text-[clamp(1.15rem,2.2vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
            {t.goal}
          </p>
        </div>
      </div>
    </section>
  );
}
