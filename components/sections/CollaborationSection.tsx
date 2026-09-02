"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { PartnershipContactForm } from "@/components/sections/agentic/PartnershipContactForm";
import type { Dictionary } from "@/lib/i18n";

export function CollaborationSection({ dict }: { dict: Dictionary }) {
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
            <div className="mt-10 max-w-xl sm:mt-12">
              <PartnershipContactForm copy={dict.collaborate.contactForm} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
