"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { impactPipeline } from "@/data/research";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ImpactSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="impact" className="section-pad border-t border-white/10">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-8">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.impact.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6">
              {dict.impact.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-6 max-w-xl text-sm leading-relaxed text-muted"
            >
              {dict.impact.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-16 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3 md:mt-24">
          {impactPipeline.map((stage, index) => (
            <article
              key={stage.id}
              className="border-t border-white/10 py-8 pr-6 md:py-10"
            >
              <div className="flex items-baseline gap-3">
                <span className="label-mono text-[11px] text-accent">
                  {stage.code}
                </span>
                {index < impactPipeline.length - 1 ? (
                  <span className="label-mono text-[10px] text-muted/50" aria-hidden>
                    →
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em]">
                {stage.title[locale]}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {stage.description[locale]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
