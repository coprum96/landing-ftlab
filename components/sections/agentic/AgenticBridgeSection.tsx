"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  agentDecisionChain,
  humanDecisionChain,
} from "@/data/agenticSafety";
import type { Dictionary, Locale } from "@/lib/i18n";

function Chain({
  items,
  locale,
}: {
  items: { en: string; ru: string }[];
  locale: Locale;
}) {
  return (
    <>
      {/* Mobile: compact horizontal steps */}
      <ol className="flex gap-2 overflow-x-auto pb-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <li
            key={`${item.en}-${index}`}
            className="min-w-[7.5rem] shrink-0 border border-white/20 px-3 py-3"
          >
            <p className="label-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm font-medium leading-snug tracking-[-0.015em] text-ink">
              {item[locale]}
            </p>
          </li>
        ))}
      </ol>

      {/* Desktop: vertical chain */}
      <ol className="hidden flex-col gap-0 md:flex">
        {items.map((item, index) => (
          <li key={`${item.en}-${index}`} className="flex items-start gap-3">
            <span className="label-mono mt-0.5 w-5 shrink-0 text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1 border-l border-white/20 pl-3 pb-3 last:pb-0">
              <p className="text-base font-medium tracking-[-0.015em] text-ink">
                {item[locale]}
              </p>
              {index < items.length - 1 ? (
                <p
                  className="label-mono mt-2 text-xs tracking-[0.1em] text-ink/45"
                  aria-hidden
                >
                  ↓
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

export function AgenticBridgeSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const b = dict.pages.agenticAi.bridge;

  return (
    <section
      id="from-human-to-agent"
      className="agentic-anchor border-t border-white/15 bg-[#060606] py-10 md:py-16"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{b.label}</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-[clamp(1.45rem,3.2vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
              {b.title}
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted md:mt-8 md:text-lg">
              {b.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-10 grid grid-cols-1 gap-8 border-t border-white/15 pt-8 md:mt-12 md:grid-cols-2 md:gap-0 md:pt-0">
          <div className="md:border-r md:border-white/15 md:pr-10 md:py-10">
            <p className="label-mono text-xs tracking-[0.12em] text-ink/65">
              {b.humanLabel}
            </p>
            <div className="mt-5">
              <Chain items={humanDecisionChain} locale={locale} />
            </div>
          </div>
          <div className="md:pl-10 md:py-10">
            <p className="label-mono text-xs tracking-[0.12em] text-accent">
              {b.agentLabel}
            </p>
            <div className="mt-5">
              <Chain items={agentDecisionChain} locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
