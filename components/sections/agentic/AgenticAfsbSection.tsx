"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  afsbEnvironments,
  afsbMetrics,
  afsbScenarios,
} from "@/data/agenticSafety";
import { lab } from "@/data/lab";
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
      <p className="label-mono text-xs tracking-[0.1em] text-ink/65">{label}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item.en}
            className="label-mono border border-white/20 px-2.5 py-2 text-xs tracking-[0.08em] text-ink/80"
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
  const mailto = `mailto:${lab.contactEmail}?subject=${encodeURIComponent("AFSB updates")}`;

  return (
    <section
      id="afsb"
      className="agentic-anchor border-t border-accent/35 bg-[#050505] py-10 md:py-16"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{a.label}</SectionLabel>
            <p className="label-mono mt-6 text-xs tracking-[0.12em] text-ink/65">
              {a.infraLabel}
            </p>
            <p className="label-mono mt-3 text-xs tracking-[0.14em] text-accent">
              {a.code}
            </p>
            <h2 className="mt-3 max-w-4xl text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink">
              {a.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-snug tracking-[-0.015em] text-ink md:text-xl">
              {a.subtitle}
            </p>
            <p className="label-mono mt-5 inline-flex items-center gap-2 border border-accent/50 bg-accent/[0.08] px-3 py-2 text-xs tracking-[0.1em] text-ink">
              <span
                className="inline-block h-2 w-2 rounded-full bg-accent"
                aria-hidden
              />
              {a.status}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {a.description}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/75">
              {a.availabilityNote}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 grid grid-cols-1 gap-6 border border-white/15 bg-[#080808] p-5 md:grid-cols-3 md:gap-8 md:p-7">
          <div>
            <p className="label-mono text-xs tracking-[0.1em] text-ink/65">
              {a.stageLabel}
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink">{a.stage}</p>
          </div>
          <div>
            <p className="label-mono text-xs tracking-[0.1em] text-ink/65">
              {a.doneLabel}
            </p>
            <ul className="mt-3 space-y-2">
              {a.done.map((item) => (
                <li key={item} className="text-base leading-relaxed text-muted">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-mono text-xs tracking-[0.1em] text-ink/65">
              {a.nextLabel}
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink">{a.next}</p>
            <a
              href={mailto}
              className="label-mono mt-5 inline-flex min-h-11 items-center border border-white/25 px-4 py-3 text-xs tracking-[0.1em] text-ink transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {a.cta}
            </a>
          </div>
        </div>

        <div className="col-span-12 mt-8 grid grid-cols-1 gap-8 border border-white/15 bg-[#080808] p-5 md:grid-cols-3 md:gap-8 md:p-7">
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
