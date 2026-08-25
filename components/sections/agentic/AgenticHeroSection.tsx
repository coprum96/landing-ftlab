"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { TrackSwitcher } from "@/components/ui/TrackSwitcher";
import { AgenticExecutionField } from "@/components/visual/AgenticExecutionField";
import { lab } from "@/data/lab";
import { getLenisInstance } from "@/lib/lenis";
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
  const mailto = `mailto:${lab.contactEmail}?subject=${encodeURIComponent(
    dict.collaborate.mailSubject,
  )}`;

  const openMap = () => {
    const el = document.getElementById("ecosystem");
    if (!el) return;
    const lenis = getLenisInstance();
    const offset =
      -(
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-h",
          ),
        ) || 72
      ) - 8;
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.15 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden pb-14 pt-8 md:min-h-[88svh] md:pb-20 md:pt-0">
      {/* Execution Lattice — Agentic visual signature */}
      <AgenticExecutionField className="opacity-[0.95]" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_10%,rgba(8,8,8,0.45)_55%,#080808_88%)]"
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

        <div className="col-span-12 mt-10 md:col-span-7 md:mt-16 lg:col-span-6">
          <FadeIn>
            <p className="label-mono text-[10px] tracking-[0.16em] text-ink/40">
              {page.researchLabel}
            </p>
            <h1 className="headline-section mt-5 max-w-5xl md:mt-6">
              {page.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-snug tracking-[-0.015em] text-ink md:mt-8 md:text-xl">
              {page.subheadline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {page.secondary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={openMap}
                className="label-mono inline-flex min-h-12 items-center justify-center border border-accent/70 bg-accent/10 px-6 py-3.5 text-[11px] tracking-[0.14em] text-ink transition-colors hover:border-accent hover:bg-accent/20"
              >
                {page.heroCta.map}
              </button>
              <a
                href={mailto}
                className="label-mono inline-flex min-h-12 items-center justify-center border border-white/15 bg-[#080808]/50 px-6 py-3.5 text-[11px] tracking-[0.14em] text-ink backdrop-blur-sm transition-colors hover:border-white/30"
              >
                {page.heroCta.contact}
              </a>
            </div>

            <p className="label-mono mt-8 text-[10px] tracking-[0.14em] text-ink/40 md:mt-10">
              {page.meta}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 hidden self-end pb-2 md:col-span-5 md:mt-16 md:block lg:col-span-5 lg:col-start-8">
          <div className="ml-auto max-w-[15rem] border border-white/10 bg-[#080808]/40 px-4 py-4 backdrop-blur-sm">
            <p className="label-mono text-[9px] tracking-[0.16em] text-accent/80">
              EXECUTION LATTICE
            </p>
            <p className="label-mono mt-3 text-[9px] leading-relaxed tracking-[0.1em] text-ink/40">
              INTENT
              <br />
              ↓ AGENT
              <br />
              ↓ AUTHORITY GATE
              <br />
              ↓ EXECUTION
              <br />
              ↓ SETTLEMENT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
