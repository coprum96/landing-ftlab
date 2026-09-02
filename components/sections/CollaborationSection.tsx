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
      className="section-anchor section-pad border-t border-white/10"
      aria-labelledby="collaborate-title"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10 lg:col-span-9">
          <FadeIn>
            <p className="label-mono text-sm text-accent">
              {dict.collaborate.label}
            </p>
            <h2
              id="collaborate-title"
              className="mt-6 max-w-4xl text-[clamp(2rem,6.5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink"
            >
              {dict.collaborate.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {dict.collaborate.supporting}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center">
              <a
                href={mailto}
                className="label-mono inline-flex min-h-12 items-center justify-center border border-accent/70 bg-accent/15 px-7 py-3.5 text-sm tracking-[0.1em] text-ink transition-colors hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {dict.collaborate.cta}
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
