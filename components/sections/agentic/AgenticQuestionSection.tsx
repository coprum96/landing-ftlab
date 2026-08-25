"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/lib/i18n";

export function AgenticQuestionSection({ dict }: { dict: Dictionary }) {
  const q = dict.pages.agenticAi.question;

  return (
    <section id="question" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{q.label}</SectionLabel>
            <h2 className="mt-5 max-w-4xl text-[clamp(1.75rem,4.2vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.03em]">
              {q.title}
            </h2>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-0 border-t border-white/10 md:mt-16 md:grid-cols-2">
          <div className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:pr-10 md:py-10">
            <p className="label-mono text-[10px] tracking-[0.14em] text-ink/40">
              {q.traditionalLabel}
            </p>
            <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
              {q.traditional.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="label-mono text-[12px] tracking-[0.12em] text-muted">
                    {step}
                  </span>
                  {i < q.traditional.length - 1 ? (
                    <span className="text-ink/25" aria-hidden>
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
          <div className="py-8 md:pl-10 md:py-10">
            <p className="label-mono text-[10px] tracking-[0.14em] text-accent/80">
              {q.agenticLabel}
            </p>
            <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
              {q.agentic.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="label-mono text-[12px] tracking-[0.12em] text-ink">
                    {step}
                  </span>
                  {i < q.agentic.length - 1 ? (
                    <span className="text-accent/50" aria-hidden>
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
