"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { lab } from "@/data/lab";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AgenticCloseSection({
  dict,
}: {
  locale?: Locale;
  dict: Dictionary;
  humanHref?: string;
}) {
  const c = dict.pages.agenticAi.close;
  const mailto = `mailto:${lab.contactEmail}?subject=${encodeURIComponent(
    dict.pages.agenticAi.contactForm.mailSubject,
  )}`;

  return (
    <section
      id="work-with-the-lab"
      className="agentic-anchor border-t border-white/15 bg-[#050505] py-10 md:py-16"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-8">
          <FadeIn>
            <SectionLabel>{c.label}</SectionLabel>
            <h2 className="mt-6 max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              {c.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {c.line}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={mailto}
                className="label-mono inline-flex min-h-12 items-center justify-center border border-accent/70 bg-accent/15 px-7 py-3.5 text-sm tracking-[0.1em] text-ink transition-colors hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {c.cta}
              </a>
              <a
                href={`mailto:${lab.contactEmail}`}
                className="label-mono inline-flex min-h-11 items-center text-sm tracking-[0.1em] text-ink/70 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {lab.contactEmail}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
