"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  actionRiskDecisions,
  actionRiskInputs,
  defensiveAgentStages,
  offensiveAgentStages,
} from "@/data/agentic";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AgenticFraudSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const f = dict.pages.agenticAi.fraud;

  return (
    <section id="fraud" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{f.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{f.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {f.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="label-mono text-[10px] tracking-[0.14em] text-ink/40">
              {f.inputsLabel}
            </p>
            <ul className="mt-5 space-y-0 border-t border-white/10">
              {actionRiskInputs.map((item, i) => (
                <li
                  key={item.en}
                  className="flex items-baseline gap-4 border-b border-white/10 py-3.5"
                >
                  <span className="label-mono text-[9px] text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label-mono text-[12px] tracking-[0.12em] text-ink">
                    {item[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center md:col-span-2">
            <span className="label-mono text-[11px] text-accent" aria-hidden>
              →
            </span>
          </div>

          <div className="md:col-span-5">
            <p className="label-mono text-[10px] tracking-[0.14em] text-accent/80">
              {f.decisionsLabel}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {actionRiskDecisions.map((item) => (
                <li
                  key={item.en}
                  className="border border-white/10 px-3 py-4 text-center"
                >
                  <span className="label-mono text-[11px] tracking-[0.14em] text-ink">
                    {item[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AgenticAgentVsAgentSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.pages.agenticAi.agentConflict;

  return (
    <section id="agent-conflict" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
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

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-0 border border-white/10 md:mt-16 md:grid-cols-2">
          <div className="border-b border-white/10 bg-accent/[0.03] p-6 md:border-b-0 md:border-r md:p-8">
            <p className="label-mono text-[10px] tracking-[0.14em] text-accent">
              {c.offensiveLabel}
            </p>
            <ol className="mt-6 space-y-4">
              {offensiveAgentStages.map((s, i) => (
                <li key={s.en} className="flex items-baseline gap-3">
                  <span className="label-mono text-[9px] text-accent/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label-mono text-[12px] tracking-[0.12em] text-ink">
                    {s[locale]}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="p-6 md:p-8">
            <p className="label-mono text-[10px] tracking-[0.14em] text-ink/50">
              {c.defensiveLabel}
            </p>
            <ol className="mt-6 space-y-4">
              {defensiveAgentStages.map((s, i) => (
                <li key={s.en} className="flex items-baseline gap-3">
                  <span className="label-mono text-[9px] text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label-mono text-[12px] tracking-[0.12em] text-muted">
                    {s[locale]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="col-span-12 mt-10 border-l border-accent/50 pl-5 md:mt-12">
          <p className="label-mono text-[11px] tracking-[0.14em] text-accent">
            {c.speedLabel}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {c.speedText}
          </p>
        </div>
      </div>
    </section>
  );
}
