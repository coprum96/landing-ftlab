"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { TrackSwitcher } from "@/components/ui/TrackSwitcher";
import { AgenticExecutionField } from "@/components/visual/AgenticExecutionField";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AgenticHeroSection({
  locale,
  dict,
  humanHref,
  agenticHref,
}: {
  locale: Locale;
  dict: Dictionary;
  humanHref: string;
  agenticHref: string;
}) {
  const page = dict.pages.agenticAi;

  return (
    <section className="relative overflow-hidden pb-8 pt-6 md:pb-14 md:pt-0">
      <AgenticExecutionField className="opacity-70 md:opacity-[0.95]" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_10%,rgba(8,8,8,0.55)_50%,#080808_90%)] md:bg-[radial-gradient(ellipse_at_70%_40%,transparent_10%,rgba(8,8,8,0.45)_55%,#080808_88%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] to-transparent"
        aria-hidden
      />

      <div className="editorial-grid relative z-10">
        <div className="col-span-12 pt-0 md:pt-6">
          <TrackSwitcher
            locale={locale}
            active="agentic"
            humanLabel={dict.chooseDirection.human.code}
            agenticLabel={dict.chooseDirection.agentic.code}
            humanHref={humanHref}
            agenticHref={agenticHref}
          />
        </div>

        <div className="col-span-12 mt-8 md:col-span-7 md:mt-12 lg:col-span-6">
          <FadeIn>
            <p className="label-mono text-sm tracking-[0.12em] text-ink/65">
              {page.researchLabel}
            </p>
            <h1 className="headline-section mt-4 max-w-5xl md:mt-5">
              {page.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-snug tracking-[-0.015em] text-ink md:mt-6 md:text-xl">
              {page.subheadline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {page.secondary}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
              {page.audienceCue}
            </p>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#work-with-the-lab"
                className="label-mono inline-flex min-h-12 items-center justify-center border border-accent/70 bg-accent/15 px-6 py-3.5 text-sm tracking-[0.1em] text-ink transition-colors hover:border-accent hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {page.heroCta.contact}
              </a>
              <a
                href="#control-layer"
                className="label-mono inline-flex min-h-12 items-center justify-center border border-white/25 px-6 py-3.5 text-sm tracking-[0.1em] text-ink transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {page.heroCta.demo}
              </a>
              <a
                href="#research-tracks"
                className="label-mono inline-flex min-h-11 items-center justify-center px-2 py-2 text-sm tracking-[0.1em] text-ink/75 underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-h-12"
              >
                {page.heroCta.map}
              </a>
            </div>

            <p className="label-mono mt-6 text-xs leading-relaxed tracking-[0.08em] text-ink/55 md:mt-8">
              {page.meta}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-10 hidden self-end pb-2 md:col-span-5 md:mt-12 md:block lg:col-span-5 lg:col-start-8">
          <div className="ml-auto max-w-[16rem] border border-white/20 bg-[#080808]/50 px-4 py-4 backdrop-blur-sm">
            <p className="label-mono text-xs tracking-[0.12em] text-accent">
              RESEARCH CHAIN
            </p>
            <p className="label-mono mt-3 text-xs leading-relaxed tracking-[0.08em] text-ink/70">
              HUMAN INTENT
              <br />
              ↓ AGENT BEHAVIOR
              <br />
              ↓ FINANCIAL ACTION
              <br />
              ↓ LOSS PREVENTION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
