"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { lab } from "@/data/lab";
import type { Dictionary } from "@/lib/i18n";

export function CollaborationSection({ dict }: { dict: Dictionary }) {
  const mailto = `mailto:${lab.contactEmail}?subject=${encodeURIComponent(
    dict.collaborate.mailSubject,
  )}`;

  return (
    <section
      id="collaborate"
      className="section-pad border-t border-white/10"
      aria-labelledby="collaborate-title"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10 lg:col-span-9">
          <FadeIn>
            <p className="label-mono text-[12px] text-accent">
              {dict.collaborate.label}
            </p>
            <h2
              id="collaborate-title"
              className="mt-6 max-w-4xl text-[clamp(2rem,6.5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink"
            >
              {dict.collaborate.heading}
            </h2>
            <div className="mt-12 sm:mt-14">
              <a
                href={mailto}
                className="cta-pulse label-mono inline-flex min-h-12 items-center border border-accent/70 bg-accent/10 px-7 py-4 text-[12px] tracking-[0.14em] text-ink transition-colors duration-300 hover:border-accent hover:bg-accent/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {dict.collaborate.cta}
              </a>
            </div>
            <p className="label-mono mt-6 text-[12px] text-muted">
              {lab.contactEmail}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
