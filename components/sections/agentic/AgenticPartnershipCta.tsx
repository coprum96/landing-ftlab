"use client";

import type { Dictionary } from "@/lib/i18n";

export function AgenticPartnershipCta({
  dict,
  id,
}: {
  dict: Dictionary;
  id?: string;
}) {
  const c = dict.pages.agenticAi.midCta;

  return (
    <section
      id={id}
      className="agentic-anchor border-t border-white/15 bg-[#070707] py-8 md:py-10"
    >
      <div className="editorial-grid">
        <div className="col-span-12 flex flex-col gap-5 md:col-span-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="label-mono text-sm tracking-[0.12em] text-accent">
              {c.label}
            </p>
            <h2 className="mt-3 text-[clamp(1.25rem,2.6vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.025em] text-ink">
              {c.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{c.line}</p>
          </div>
          <a
            href="#work-with-the-lab"
            className="label-mono inline-flex min-h-12 shrink-0 items-center justify-center border border-accent/70 bg-accent/15 px-6 py-3.5 text-sm tracking-[0.1em] text-ink transition-colors hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
