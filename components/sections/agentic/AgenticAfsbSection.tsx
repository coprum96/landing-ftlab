"use client";

import { useState } from "react";
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
  limit,
}: {
  label: string;
  items: { en: string; ru: string }[];
  locale: Locale;
  limit?: number;
}) {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  return (
    <div>
      <p className="label-mono text-sm tracking-[0.1em] text-ink/65">{label}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {visible.map((item) => (
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
  const [openTaxonomy, setOpenTaxonomy] = useState(false);

  return (
    <section
      id="afsb"
      className="agentic-anchor border-t border-accent/35 bg-[#050505] py-8 md:py-12"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{a.label}</SectionLabel>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
              {a.bridgeFromDemo}
            </p>
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
            <p className="label-mono mt-5 inline-flex items-center gap-2 border border-accent/50 bg-accent/[0.08] px-3 py-2 text-sm tracking-[0.1em] text-ink">
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
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
              {a.milestone}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 grid grid-cols-1 gap-6 border border-white/15 bg-[#080808] p-5 md:grid-cols-3 md:gap-8 md:p-7">
          <div>
            <p className="label-mono text-sm tracking-[0.1em] text-ink/65">
              {a.stageLabel}
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink">{a.stage}</p>
          </div>
          <div>
            <p className="label-mono text-sm tracking-[0.1em] text-ink/65">
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
            <p className="label-mono text-sm tracking-[0.1em] text-ink/65">
              {a.nextLabel}
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink">{a.next}</p>
            <a
              href="#work-with-the-lab"
              className="label-mono mt-5 inline-flex min-h-11 items-center border border-white/25 px-4 py-3 text-sm tracking-[0.1em] text-ink transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {a.cta}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {a.subscribeHint}
            </p>
          </div>
        </div>

        <div className="col-span-12 mt-8">
          <h3 className="text-base font-medium tracking-[-0.015em] text-ink">
            {a.joinTitle}
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {a.joinItems.map((item) => (
              <li
                key={item}
                className="border border-white/12 px-3 py-3 text-sm leading-relaxed text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile: collapsed taxonomy; desktop: full */}
        <div className="col-span-12 mt-8 md:hidden">
          <button
            type="button"
            className="label-mono inline-flex min-h-11 w-full items-center justify-between border border-white/20 px-4 py-3 text-sm tracking-[0.1em] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-expanded={openTaxonomy}
            onClick={() => setOpenTaxonomy((v) => !v)}
          >
            {openTaxonomy ? a.taxonomyHide : a.taxonomyToggle}
            <span aria-hidden>{openTaxonomy ? "−" : "+"}</span>
          </button>
          {openTaxonomy ? (
            <div className="mt-4 grid grid-cols-1 gap-8 border border-white/15 bg-[#080808] p-5">
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
              <ChipList
                label={a.metricsLabel}
                items={afsbMetrics}
                locale={locale}
              />
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-6 border border-white/15 bg-[#080808] p-5">
              <ChipList
                label={a.environmentsLabel}
                items={afsbEnvironments}
                locale={locale}
                limit={3}
              />
              <ChipList
                label={a.scenariosLabel}
                items={afsbScenarios}
                locale={locale}
                limit={3}
              />
              <ChipList
                label={a.metricsLabel}
                items={afsbMetrics}
                locale={locale}
                limit={3}
              />
            </div>
          )}
        </div>

        <div className="col-span-12 mt-8 hidden grid-cols-1 gap-8 border border-white/15 bg-[#080808] p-5 md:grid md:grid-cols-3 md:gap-8 md:p-7">
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
