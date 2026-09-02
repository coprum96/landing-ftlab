"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { lab } from "@/data/lab";
import { getLenisInstance } from "@/lib/lenis";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AgenticCloseSection({
  dict,
  humanHref,
}: {
  locale?: Locale;
  dict: Dictionary;
  humanHref: string;
}) {
  const c = dict.pages.agenticAi.close;
  const mailto = `mailto:${lab.contactEmail}?subject=${encodeURIComponent(
    dict.collaborate.mailSubject,
  )}`;

  const openTracks = () => {
    const el = document.getElementById("tracks");
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
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.1 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="collaborate-agentic"
      className="border-t border-white/10 bg-[#050505] py-20 md:py-28"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{c.label}</SectionLabel>
            <p className="mt-6 max-w-4xl text-[clamp(1.35rem,3vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
              {c.philosophy1}
            </p>
            <p className="mt-3 max-w-4xl text-[clamp(1.35rem,3vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.03em] text-accent">
              {c.philosophy2}
            </p>
            <h2 className="mt-12 max-w-4xl text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink md:mt-16">
              {c.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {c.line}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 md:mt-14">
          <p className="label-mono text-[10px] tracking-[0.14em] text-ink/40">
            {c.audiencesLabel}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-0 border-t border-white/10 sm:grid-cols-2">
            {c.audiences.map((item) => (
              <article
                key={item.title}
                className="border-b border-white/10 py-6 sm:border-r sm:px-6 sm:odd:pl-0 sm:even:border-r-0 sm:even:pr-0"
              >
                <h3 className="text-[1.05rem] font-medium tracking-[-0.015em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-12 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={mailto}
            className="cta-pulse label-mono inline-flex min-h-12 items-center justify-center border border-accent/70 bg-accent/10 px-7 py-4 text-[12px] tracking-[0.14em] text-ink transition-colors hover:border-accent hover:bg-accent/20"
          >
            {c.cta}
          </a>
          <button
            type="button"
            onClick={openTracks}
            className="label-mono inline-flex min-h-12 items-center justify-center border border-white/15 px-6 py-4 text-[11px] tracking-[0.14em] text-ink transition-colors hover:border-white/30"
          >
            {c.mapCta}
          </button>
          <a
            href={humanHref}
            className="label-mono inline-flex min-h-12 items-center justify-center px-2 py-4 text-[11px] tracking-[0.14em] text-muted transition-colors hover:text-ink"
          >
            {c.humanCta} →
          </a>
        </div>

        <p className="label-mono col-span-12 mt-6 text-[11px] text-muted">
          {lab.contactEmail}
        </p>
      </div>
    </section>
  );
}
