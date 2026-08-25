"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  attackSurfaces,
  governanceTrace,
  replayFields,
} from "@/data/agentic";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AgenticHumanSection({
  dict,
}: {
  locale?: Locale;
  dict: Dictionary;
}) {
  const h = dict.pages.agenticAi.human;

  return (
    <section
      id="human-agent"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-14 md:py-20"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{h.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{h.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {h.supporting}
            </p>
            <p className="label-mono mt-6 text-[10px] tracking-[0.12em] text-ink/40">
              {h.disciplines}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function AgenticAdversarialSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const a = dict.pages.agenticAi.adversarial;

  return (
    <section id="adversarial" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 bg-[#060606] py-20 md:py-28">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{a.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{a.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {a.supporting}
            </p>
            <p className="mt-8 max-w-3xl text-[clamp(1.25rem,2.8vw,1.85rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
              {a.goal}
            </p>
            <p className="label-mono mt-6 text-[10px] tracking-[0.12em] text-ink/40">
              {a.ethic}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 md:mt-16">
          <p className="label-mono text-[10px] tracking-[0.14em] text-ink/40">
            {a.surfacesLabel}
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-0 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {attackSurfaces.map((surface) => (
              <li
                key={surface.en}
                className="border-b border-white/10 py-4 pr-4 sm:border-r sm:odd:pl-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 lg:px-4 lg:first:pl-0"
              >
                <span className="label-mono text-[11px] tracking-[0.1em] text-muted">
                  {surface[locale]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function AgenticGovernanceSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const g = dict.pages.agenticAi.governance;
  const r = dict.pages.agenticAi.replay;

  return (
    <>
      <section id="governance" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-9">
            <FadeIn>
              <SectionLabel>{g.label}</SectionLabel>
              <h2 className="headline-section mt-5 max-w-4xl">{g.title}</h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
                {g.supporting}
              </p>
            </FadeIn>
          </div>

          <div className="col-span-12 mt-12 md:mt-16">
            <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible">
              <ol className="flex min-w-max flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 md:min-w-0 md:flex-wrap md:gap-y-3">
                {governanceTrace.map((step, index) => (
                  <li
                    key={step.en}
                    className="flex items-center sm:contents"
                  >
                    <div className="w-full border border-white/10 px-3 py-3.5 sm:w-auto sm:px-4 sm:py-3">
                      <p className="label-mono text-[9px] text-ink/30">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="label-mono mt-1.5 text-[11px] tracking-[0.12em] text-ink">
                        {step[locale]}
                      </p>
                    </div>
                    {index < governanceTrace.length - 1 ? (
                      <span
                        className="mx-1 hidden h-px w-4 bg-white/20 sm:mx-2 sm:inline-block sm:w-5"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="col-span-12 mt-12 border-l border-accent/40 pl-5 md:col-span-8">
            <p className="label-mono text-[11px] tracking-[0.14em] text-accent">
              {g.observabilityTitle}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {g.observabilityText}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 md:py-28">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-5">
            <FadeIn>
              <SectionLabel>{r.label}</SectionLabel>
              <h2 className="headline-section mt-5 max-w-xl">{r.title}</h2>
              <p className="mt-8 max-w-md border border-white/10 bg-[#0a0a0a] p-5 text-[clamp(1.05rem,1.8vw,1.25rem)] font-medium leading-snug tracking-[-0.015em] text-ink">
                {r.scenario}
              </p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                {r.supporting}
              </p>
              <p className="label-mono mt-8 text-[11px] tracking-[0.14em] text-accent">
                {r.concept}
              </p>
            </FadeIn>
          </div>

          <div className="col-span-12 mt-12 md:col-span-6 md:col-start-7 md:mt-0">
            <p className="label-mono text-[10px] tracking-[0.14em] text-ink/40">
              {r.fieldsLabel}
            </p>
            <ol className="mt-5 border-t border-white/10">
              {replayFields.map((field, index) => (
                <li
                  key={field.en}
                  className="flex items-baseline gap-4 border-b border-white/10 py-4"
                >
                  <span className="label-mono text-[9px] text-accent/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="label-mono text-[12px] tracking-[0.1em] text-muted">
                    {field[locale]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
