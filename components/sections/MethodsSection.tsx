"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { methodInstruments } from "@/data/research";
import type { Dictionary, Locale } from "@/lib/i18n";

export function MethodsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="methods" className="section-pad border-t border-white/10">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-8">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.methods.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6">
              {dict.methods.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
            >
              {dict.methods.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-16 md:mt-24">
          {methodInstruments.map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-12 items-baseline gap-3 border-t border-white/10 py-6 md:py-8"
            >
              <span className="col-span-3 label-mono text-[11px] text-accent md:col-span-2">
                {item.code}
              </span>
              <h3 className="col-span-9 text-[clamp(20px,2.4vw,32px)] font-medium tracking-[-0.02em] md:col-span-4">
                {item.title[locale]}
              </h3>
              <p className="col-span-12 mt-2 text-sm leading-relaxed text-muted md:col-span-6 md:mt-0">
                {item.description[locale]}
              </p>
            </article>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
