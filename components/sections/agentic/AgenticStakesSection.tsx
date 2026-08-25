"use client";

import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dictionary } from "@/lib/i18n";

export function AgenticStakesSection({ dict }: { dict: Dictionary }) {
  const s = dict.pages.agenticAi.stakes;

  return (
    <section
      id="why-now"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 bg-[#060606] py-16 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{s.label}</SectionLabel>
            <h2 className="mt-5 max-w-4xl text-[clamp(1.65rem,3.8vw,2.85rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
              {s.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-snug text-accent md:text-xl">
              {s.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-1 gap-0 border-t border-white/10 md:mt-14 md:grid-cols-3">
          {s.items.map((item) => (
            <article
              key={item.code}
              className="border-b border-white/10 py-8 md:border-b-0 md:border-r md:px-6 md:py-10 md:last:border-r-0 md:first:pl-0"
            >
              <p className="label-mono text-[11px] text-accent">{item.code}</p>
              <h3 className="mt-4 text-[clamp(1.15rem,1.8vw,1.35rem)] font-medium tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="col-span-12 mt-10 md:mt-12">
          <p className="max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
            {s.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
