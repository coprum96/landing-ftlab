"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { agenticResearchAreas } from "@/data/agentic";
import { useIsTouch } from "@/lib/hooks";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

const FEATURED_IDS = [
  "agent-identity",
  "delegated-authority",
  "agent-risk",
  "agentic-fraud",
  "autonomous-treasury",
  "agentic-aml",
] as const;

export function AgenticResearchAreasSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const a = dict.pages.agenticAi.areas;
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const touch = useIsTouch();

  const visible = useMemo(() => {
    if (showAll) return agenticResearchAreas;
    return agenticResearchAreas.filter((area) =>
      FEATURED_IDS.includes(area.id as (typeof FEATURED_IDS)[number]),
    );
  }, [showAll]);

  useEffect(() => {
    setActive(0);
  }, [showAll]);

  useEffect(() => {
    if (!touch) return;
    const nodes = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((x, y) => y.intersectionRatio - x.intersectionRatio);
        if (!visibleEntries.length) return;
        const idx = Number(
          (visibleEntries[0].target as HTMLElement).dataset.index ?? "0",
        );
        setActive(idx);
      },
      {
        root: null,
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [touch, visible]);

  return (
    <section
      id="areas"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-16 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{a.featuredLabel}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{a.featuredTitle}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {a.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-10 border-t border-white/10 md:mt-14">
          {visible.map((area, index) => {
            const open = active === index;
            return (
              <article
                key={area.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className={cx(
                  "border-b border-white/10 transition-opacity duration-500",
                  open ? "opacity-100" : "opacity-50 md:hover:opacity-80",
                )}
                onMouseEnter={() => {
                  if (!touch) setActive(index);
                }}
              >
                <button
                  type="button"
                  className="grid min-h-14 w-full grid-cols-12 gap-3 py-6 text-left md:gap-6 md:py-8"
                  onClick={() => setActive(index)}
                  aria-expanded={open}
                >
                  <span className="col-span-2 label-mono text-[12px] text-accent md:col-span-1">
                    {area.code}
                  </span>
                  <span className="col-span-10 md:col-span-4">
                    <span className="block text-[clamp(1.1rem,2vw,1.45rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                      {area.title[locale]}
                    </span>
                  </span>
                  <span className="col-span-12 text-sm leading-relaxed text-muted md:col-span-7 md:text-base">
                    {area.summary[locale]}
                  </span>
                </button>

                <div
                  className={cx(
                    "grid grid-cols-12 gap-4 overflow-hidden transition-[max-height,opacity,padding] duration-500 md:gap-6",
                    open
                      ? "max-h-[28rem] pb-7 opacity-100 md:pb-9"
                      : "max-h-0 pb-0 opacity-0",
                  )}
                >
                  <div className="col-span-12 md:col-span-7 md:col-start-6">
                    <ul className="flex flex-wrap gap-1.5">
                      {area.topics.map((topic) => (
                        <li
                          key={topic.en}
                          className="label-mono border border-white/10 px-2 py-1 text-[9px] tracking-[0.08em] text-muted sm:px-2.5 sm:py-1.5 sm:text-[10px]"
                        >
                          {topic[locale]}
                        </li>
                      ))}
                    </ul>
                    {area.highlight ? (
                      <div className="mt-5 border-l border-accent/50 pl-4">
                        <p className="label-mono text-[10px] tracking-[0.14em] text-accent">
                          {area.highlight.label[locale]}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink md:text-base">
                          {area.highlight.text[locale]}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="col-span-12 mt-8">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="label-mono inline-flex min-h-11 items-center border border-white/15 px-4 py-3 text-[11px] tracking-[0.14em] text-ink transition-colors hover:border-white/30"
          >
            {showAll ? a.showLess : a.showAll}
          </button>
        </div>
      </div>
    </section>
  );
}
