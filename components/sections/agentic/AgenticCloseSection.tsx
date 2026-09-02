"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PartnershipContactForm } from "@/components/sections/agentic/PartnershipContactForm";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AgenticCloseSection({
  locale,
  dict,
  humanHref,
}: {
  locale: Locale;
  dict: Dictionary;
  humanHref: string;
}) {
  const c = dict.pages.agenticAi.close;

  return (
    <section
      id="work-with-the-lab"
      className="agentic-anchor border-t border-white/15 bg-[#050505] py-10 md:py-16"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{c.label}</SectionLabel>
            <h2 className="mt-6 max-w-4xl text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              {c.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {c.line}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-10 md:mt-12">
          <p className="label-mono text-sm tracking-[0.12em] text-ink/65">
            {c.audiencesLabel}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-0 border-t border-white/15 sm:grid-cols-2">
            {c.audiences.map((item) => (
              <article
                key={item.title}
                className="border-b border-white/15 py-5 sm:border-r sm:px-6 sm:odd:pl-0 sm:even:border-r-0 sm:even:pr-0"
              >
                <h3 className="text-[1.05rem] font-medium tracking-[-0.015em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-8 flex flex-wrap gap-3">
          <a
            href="#research-tracks"
            className="label-mono inline-flex min-h-12 items-center justify-center border border-white/25 px-6 py-4 text-sm tracking-[0.1em] text-ink transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {c.mapCta}
          </a>
          <a
            href={humanHref}
            className="label-mono inline-flex min-h-12 items-center justify-center px-2 py-4 text-sm tracking-[0.1em] text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {c.humanCta} →
          </a>
        </div>

        <div className="col-span-12 mt-10 md:col-span-8 md:mt-12">
          <PartnershipContactForm
            locale={locale}
            copy={dict.pages.agenticAi.contactForm}
            source="agentic-ai"
          />
        </div>
      </div>
    </section>
  );
}
