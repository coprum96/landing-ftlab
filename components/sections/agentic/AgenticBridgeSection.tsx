"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  agentDecisionChain,
  humanDecisionChain,
  safetyChain,
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
    <ol className="flex flex-col gap-0">
      {items.map((item, index) => (
        <li key={`${item.en}-${index}`} className="flex items-start gap-3">
          <span className="label-mono mt-0.5 w-5 shrink-0 text-[10px] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1 border-l border-white/10 pl-3 pb-4 last:pb-0">
            <p className="text-sm font-medium tracking-[-0.015em] text-ink md:text-[15px]">
              {item[locale]}
            </p>
            {index < items.length - 1 ? (
              <p className="label-mono mt-2 text-[9px] tracking-[0.14em] text-ink/25">
                ↓
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
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
      id="bridge"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 bg-[#060606] py-14 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{b.label}</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-[clamp(1.45rem,3.2vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
              {b.title}
            </h2>
            <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted md:text-lg">
              {b.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-0 border-t border-white/10 md:mt-16 md:grid-cols-2">
          <div className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:pr-10 md:py-10">
            <p className="label-mono text-[10px] tracking-[0.14em] text-ink/40">
              {b.humanLabel}
            </p>
            <div className="mt-6">
              <Chain items={humanDecisionChain} locale={locale} />
            </div>
          </div>
          <div className="py-8 md:pl-10 md:py-10">
            <p className="label-mono text-[10px] tracking-[0.14em] text-accent">
              {b.agentLabel}
            </p>
            <div className="mt-6">
              <Chain items={agentDecisionChain} locale={locale} />
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-10 border border-white/10 px-4 py-5 md:mt-14 md:px-6 md:py-6">
          <p className="label-mono text-[9px] tracking-[0.16em] text-ink/35">
            {b.chainLabel}
          </p>
          <p className="label-mono mt-4 text-[11px] leading-relaxed tracking-[0.1em] text-ink md:text-[12px] md:tracking-[0.12em]">
            {safetyChain.map((s) => s[locale].toUpperCase()).join(" → ")}
          </p>
        </div>
      </div>
    </section>
  );
}
