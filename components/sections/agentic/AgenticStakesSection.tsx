"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/lib/i18n";

export function AgenticStakesSection({ dict }: { dict: Dictionary }) {
  const s = dict.pages.agenticAi.stakes;

  return (
    <section
      id="why-now"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 bg-[#060606] py-12 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{s.label}</SectionLabel>
            <h2 className="mt-5 max-w-4xl text-[clamp(1.5rem,3.8vw,2.85rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
              {s.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-medium leading-snug text-ink/80 md:mt-5 md:text-xl md:text-accent">
              {s.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 grid grid-cols-1 gap-0 border-t border-white/10 md:mt-14 md:grid-cols-3">
          {s.items.map((item) => (
            <article
              key={item.code}
              className="border-b border-white/10 py-5 md:border-b-0 md:border-r md:px-6 md:py-10 md:last:border-r-0 md:first:pl-0"
            >
              <div className="flex items-baseline gap-3 md:block">
                <p className="label-mono shrink-0 text-[11px] text-accent">
                  {item.code}
                </p>
                <h3 className="text-[clamp(1.05rem,1.8vw,1.35rem)] font-medium tracking-[-0.02em] text-ink md:mt-4">
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted md:mt-3 md:text-[15px]">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="col-span-12 mt-6 md:mt-12">
          <p className="max-w-2xl text-sm leading-relaxed text-ink/70 md:text-lg md:text-ink/75">
            {s.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
