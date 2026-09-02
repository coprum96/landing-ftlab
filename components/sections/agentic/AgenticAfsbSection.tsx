"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  afsbEnvironments,
  afsbMetrics,
  afsbScenarios,
} from "@/data/agenticSafety";
import type { Dictionary, Locale } from "@/lib/i18n";

function ChipList({
  label,
  items,
  locale,
}: {
  label: string;
  items: { en: string; ru: string }[];
  locale: Locale;
}) {
  return (
    <div>
      <p className="label-mono text-[10px] tracking-[0.14em] text-ink/40">
        {label}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item.en}
            className="label-mono border border-white/10 px-2.5 py-1.5 text-[10px] tracking-[0.08em] text-muted"
          >
            {item[locale]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AgenticAfsbSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const a = dict.pages.agenticAi.afsb;

  return (
    <section
      id="afsb"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-accent/25 bg-[#050505] py-14 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{a.label}</SectionLabel>
            <p className="label-mono mt-6 text-[10px] tracking-[0.18em] text-ink/35">
              {a.infraLabel}
            </p>
            <p className="label-mono mt-3 text-[12px] tracking-[0.18em] text-accent">
              {a.code}
            </p>
            <h2 className="mt-3 max-w-4xl text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink">
              {a.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-snug tracking-[-0.015em] text-ink/85 md:text-xl">
              {a.subtitle}
            </p>
            <p className="label-mono mt-5 inline-flex border border-accent/40 bg-accent/[0.06] px-3 py-2 text-[10px] tracking-[0.14em] text-ink">
              {a.status}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {a.description}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/55">
              {a.note}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-10 border border-white/10 bg-[#080808] p-6 md:mt-14 md:grid-cols-3 md:gap-8 md:p-8">
          <ChipList
            label={a.environmentsLabel}
            items={afsbEnvironments}
            locale={locale}
          />
          <ChipList
            label={a.scenariosLabel}
            items={afsbScenarios}
            locale={locale}
          />
          <ChipList label={a.metricsLabel} items={afsbMetrics} locale={locale} />
        </div>
      </div>
    </section>
  );
}
