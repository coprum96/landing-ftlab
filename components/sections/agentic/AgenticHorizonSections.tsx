"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  infrastructureBlocks,
  liabilityActors,
  radarHorizons,
  researchConcepts,
  simulationScenarios,
  systemicRiskChain,
  systemicTopics,
} from "@/data/agentic";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function AgenticSimulationSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const s = dict.pages.agenticAi.simulation;

  return (
    <section id="simulation" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{s.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{s.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {s.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 md:mt-16">
          <p className="label-mono text-[10px] tracking-[0.14em] text-ink/40">
            {s.scaleLabel}
          </p>
          <ol className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
            {s.scale.map((step, index) => (
              <li key={step} className="flex items-center gap-3 sm:gap-0">
                <span
                  className={cx(
                    "border px-4 py-4 label-mono text-[11px] tracking-[0.12em]",
                    index === s.scale.length - 1
                      ? "border-accent/45 text-accent"
                      : "border-white/10 text-ink",
                  )}
                >
                  {step}
                </span>
                {index < s.scale.length - 1 ? (
                  <span
                    className="hidden text-ink/25 sm:mx-3 sm:inline"
                    aria-hidden
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-0 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {simulationScenarios.map((item) => (
            <p
              key={item.en}
              className="border-b border-white/10 py-4 pr-6 label-mono text-[11px] tracking-[0.1em] text-muted sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:px-5 lg:first:pl-0"
            >
              {item[locale]}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgenticSystemicSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const s = dict.pages.agenticAi.systemic;
  const l = dict.pages.agenticAi.liability;

  return (
    <>
      <section id="systemic" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-9">
            <FadeIn>
              <SectionLabel>{s.label}</SectionLabel>
              <h2 className="headline-section mt-5 max-w-4xl">{s.title}</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
                {s.supporting}
              </p>
            </FadeIn>
          </div>

          <div className="col-span-12 mt-12 md:col-span-5 md:mt-16">
            <ol className="space-y-0">
              {systemicRiskChain.map((step, index) => {
                const isOutcome = index === systemicRiskChain.length - 1;
                return (
                  <li key={step.en} className="relative flex gap-4">
                    <div className="flex w-4 flex-col items-center">
                      <span
                        className={cx(
                          "mt-1.5 h-1.5 w-1.5 rounded-full",
                          isOutcome ? "bg-accent" : "bg-ink/50",
                        )}
                      />
                      {index < systemicRiskChain.length - 1 ? (
                        <span className="mt-1 w-px flex-1 bg-white/15" aria-hidden />
                      ) : null}
                    </div>
                    <p
                      className={cx(
                        "pb-5 label-mono text-[12px] tracking-[0.12em]",
                        isOutcome ? "text-accent" : "text-muted",
                      )}
                    >
                      {step[locale]}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="col-span-12 mt-8 md:col-span-6 md:col-start-7 md:mt-16">
            <ul className="grid grid-cols-1 gap-0 border-t border-white/10 sm:grid-cols-2">
              {systemicTopics.map((topic) => (
                <li
                  key={topic.en}
                  className="border-b border-white/10 py-4 pr-4 label-mono text-[11px] tracking-[0.1em] text-muted sm:border-r sm:odd:pl-0 sm:even:border-r-0 sm:even:pr-0 sm:odd:pr-4"
                >
                  {topic[locale]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-8">
            <FadeIn>
              <SectionLabel>{l.label}</SectionLabel>
              <h2 className="headline-section mt-5 max-w-4xl">{l.title}</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
                {l.supporting}
              </p>
            </FadeIn>
          </div>

          <div className="col-span-12 mt-12 flex flex-wrap gap-2 md:mt-14">
            {liabilityActors.map((actor) => (
              <span
                key={actor.en}
                className="label-mono border border-white/10 px-3 py-2 text-[11px] tracking-[0.12em] text-muted"
              >
                {actor[locale]}
              </span>
            ))}
          </div>

          <div className="col-span-12 mt-10 border border-white/10 p-6 md:mt-12 md:max-w-xl md:p-8">
            <p className="label-mono text-[11px] tracking-[0.14em] text-accent">
              {l.product}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {l.productNote}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function AgenticInfrastructureSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const i = dict.pages.agenticAi.infrastructure;

  return (
    <section
      id="infrastructure"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{i.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{i.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {i.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-0 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5 md:mt-16">
          {infrastructureBlocks.map((block) => (
            <article
              key={block.code}
              className="border-b border-white/10 py-6 sm:border-r sm:px-5 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(5n)]:border-r-0 lg:px-4 lg:py-7 lg:first:pl-0"
            >
              <p className="label-mono text-[9px] tracking-[0.14em] text-accent">
                {block.code}
              </p>
              <h3 className="mt-3 text-[15px] font-medium tracking-[-0.01em] text-ink">
                {block.title[locale]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {block.role[locale]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgenticRadarSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const r = dict.pages.agenticAi.radar;

  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{r.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{r.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {r.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-0 border-t border-white/10 lg:grid-cols-3 md:mt-16">
          {radarHorizons.map((horizon, hi) => (
            <div
              key={horizon.id}
              className={cx(
                "border-b border-white/10 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:py-10 lg:last:border-r-0 lg:first:pl-0",
                hi === 1 ? "lg:bg-transparent" : "",
              )}
            >
              <p
                className={cx(
                  "label-mono text-[11px] tracking-[0.14em]",
                  hi === 2 ? "text-ink/40" : "text-accent",
                )}
              >
                {horizon.period[locale]}
              </p>
              <ul className="mt-6 space-y-3">
                {horizon.items.map((item) => (
                  <li
                    key={item.en}
                    className="text-sm leading-snug text-muted md:text-[15px]"
                  >
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgenticConceptsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.pages.agenticAi.concepts;

  return (
    <section className="border-t border-white/10 py-20 md:py-28">
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

        <div className="col-span-12 mt-12 border-t border-white/10 md:mt-16">
          {researchConcepts.map((concept) => (
            <article
              key={concept.id}
              className="grid grid-cols-12 gap-3 border-b border-white/10 py-7 md:items-baseline md:gap-6 md:py-8"
            >
              <p className="col-span-2 label-mono text-[11px] text-accent md:col-span-1">
                {concept.code}
              </p>
              <h3 className="col-span-10 label-mono text-[12px] tracking-[0.12em] text-ink md:col-span-4 md:text-[13px]">
                {concept.title[locale]}
              </h3>
              <p className="col-span-12 text-sm leading-relaxed text-muted md:col-span-7 md:text-base">
                {concept.text[locale]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgenticPhilosophySection({ dict }: { dict: Dictionary }) {
  const p = dict.pages.agenticAi.philosophy;

  return (
    <section className="relative border-t border-white/10 bg-[#050505] py-24 md:py-32">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{p.label}</SectionLabel>
            <p className="mt-8 max-w-4xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
              {p.line1}
            </p>
            <p className="mt-3 max-w-4xl text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-accent">
              {p.line2}
            </p>
            <p className="mt-10 max-w-3xl text-[clamp(1.15rem,2.2vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
              {p.closing}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
