"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AgenticOffersSection({
  dict,
}: {
  locale?: Locale;
  dict: Dictionary;
}) {
  const o = dict.pages.agenticAi.offers;

  return (
    <section
      id="partnership-offers"
      className="agentic-anchor border-t border-white/15 py-10 md:py-14"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{o.label}</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              {o.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {o.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {o.items.map((item) => (
            <article
              key={item.title}
              className="border border-white/15 bg-[#080808] p-5"
            >
              <h3 className="text-[1.05rem] font-medium tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.for}
              </p>
              <a
                href="#work-with-the-lab"
                className="label-mono mt-5 inline-flex min-h-11 items-center text-sm tracking-[0.1em] text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.next} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
