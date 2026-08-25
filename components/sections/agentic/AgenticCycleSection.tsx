"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SwipeHint } from "@/components/sections/agentic/SwipeHint";
import { researchCycle } from "@/data/agentic";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function AgenticCycleSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.pages.agenticAi.cycle;
  const [active, setActive] = useState(0);

  return (
    <section id="cycle" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{c.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{c.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {c.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 md:mt-16">
          <SwipeHint label={dict.pages.agenticAi.ecosystem.swipe} />
          <div
            className="flex gap-2 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-6 md:gap-0 md:overflow-visible md:border-t md:border-white/10 md:pb-0"
            role="tablist"
            aria-label={c.label}
          >
            {researchCycle.map((step, index) => {
              const isActive = active === index;
              const isAttack = step.id === "attack";
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={cx(
                    "min-w-[7.5rem] shrink-0 border px-3 py-4 text-left transition-colors md:min-w-0 md:border-0 md:border-r md:border-white/10 md:px-4 md:py-6 md:last:border-r-0",
                    isActive
                      ? "border-accent/50 bg-accent/[0.05] md:bg-transparent"
                      : "border-white/10 opacity-55 hover:opacity-90 md:opacity-100",
                  )}
                >
                  <p className="label-mono text-[9px] tracking-[0.14em] text-ink/35">
                    {step.code}
                  </p>
                  <p
                    className={cx(
                      "label-mono mt-2 text-[11px] tracking-[0.14em]",
                      isAttack && isActive ? "text-accent" : "text-ink",
                    )}
                  >
                    {step.title[locale]}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            className="mt-8 border border-white/10 p-6 md:mt-0 md:border-t-0 md:p-8"
            role="tabpanel"
          >
            <p className="label-mono text-[11px] tracking-[0.14em] text-accent">
              {researchCycle[active].code} / {researchCycle[active].title[locale]}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {researchCycle[active].text[locale]}
            </p>
            {researchCycle[active].id === "attack" ? (
              <p className="label-mono mt-6 text-[10px] tracking-[0.12em] text-ink/40">
                {c.attackNote}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
