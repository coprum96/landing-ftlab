"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/lib/i18n";

export function AgenticGlossarySection({ dict }: { dict: Dictionary }) {
  const g = dict.pages.agenticAi.glossary;

  return (
    <section
      id="terms"
      className="agentic-anchor border-t border-white/15 py-8 md:py-12"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-8">
          <FadeIn>
            <SectionLabel>{g.label}</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
              {g.title}
            </h2>
          </FadeIn>
        </div>

        {/* Mobile: collapsible */}
        <div className="col-span-12 mt-6 md:hidden">
          <details className="border border-white/15">
            <summary className="label-mono cursor-pointer list-none px-4 py-4 text-sm tracking-[0.1em] text-ink marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
              {g.mobileSummary}
            </summary>
            <dl className="space-y-5 border-t border-white/15 px-4 py-5">
              {g.items.map((item) => (
                <div key={item.term}>
                  <dt className="text-base font-medium tracking-[-0.015em] text-ink">
                    {item.term}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-muted">
                    {item.def}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        </div>

        <dl className="col-span-12 mt-8 hidden grid-cols-1 gap-5 border-t border-white/15 pt-8 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-6">
          {g.items.map((item) => (
            <div key={item.term}>
              <dt className="text-base font-medium tracking-[-0.015em] text-ink">
                {item.term}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-muted">
                {item.def}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
