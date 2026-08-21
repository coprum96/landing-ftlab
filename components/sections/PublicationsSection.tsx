"use client";

import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { publications, type PublicationType } from "@/data/publications";
import { researchAreas } from "@/data/research";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

type FilterKey = "all" | "papers" | "conferences" | "datasets" | "working";

const filterMap: Record<FilterKey, PublicationType[] | "all"> = {
  all: "all",
  papers: ["journal"],
  conferences: ["conference"],
  datasets: ["patent", "dataset"],
  working: ["book", "working"],
};

export function PublicationsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const items = useMemo(() => {
    const mapped = filterMap[filter];
    if (mapped === "all") return publications;
    return publications.filter((item) => mapped.includes(item.type));
  }, [filter]);

  const filters: FilterKey[] = ["all", "papers", "conferences", "datasets", "working"];

  return (
    <section id="publications" className="section-pad border-t border-white/10">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-8">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.publications.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6">
              {dict.publications.heading}
            </h2>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 flex flex-wrap gap-x-6 gap-y-3 md:mt-16">
          {filters.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cx(
                "label-mono relative text-[11px] transition-colors",
                filter === key ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {dict.publications.filters[key]}
              <span
                className={cx(
                  "absolute -bottom-1 left-0 h-px bg-accent transition-all duration-400",
                  filter === key ? "w-full" : "w-0",
                )}
              />
            </button>
          ))}
        </div>

        <div className="col-span-12 mt-10 md:mt-14">
          {items.map((item) => {
            const typeLabel =
              dict.publications.types[
                item.type as keyof typeof dict.publications.types
              ] ?? item.type;
            const area = researchAreas.find((a) => a.id === item.researchAreaId);
            const Tag = item.href ? "a" : "div";

            return (
              <Tag
                key={item.id}
                {...(item.href
                  ? {
                      href: item.href,
                      target: "_blank",
                      rel: "noreferrer",
                      "data-cursor": "read" as const,
                    }
                  : {})}
                className="group relative grid grid-cols-12 items-start gap-3 border-t border-white/10 py-6 transition-colors duration-500 hover:bg-white/[0.03] md:py-7"
              >
                <span className="col-span-3 label-mono text-[11px] text-muted md:col-span-1">
                  {item.year}
                </span>
                <span className="col-span-9 label-mono text-[10px] text-accent md:col-span-2">
                  {area ? area.title[locale] : typeLabel}
                </span>
                <span className="col-span-12 mt-2 md:col-span-6 md:mt-0">
                  <span className="block text-[clamp(18px,2.2vw,28px)] font-medium leading-[1.15] tracking-[-0.02em]">
                    {item.title[locale]}
                  </span>
                  <span className="mt-2 block text-xs text-muted">
                    {item.authors}
                  </span>
                  <span className="mt-1 block text-xs text-muted/80">
                    {item.venue[locale]}
                  </span>
                  {item.note ? (
                    <span className="label-mono mt-3 inline-block border border-white/15 px-2 py-1 text-[10px] text-accent">
                      {item.note[locale]}
                    </span>
                  ) : null}
                </span>
                <span className="col-span-10 label-mono text-[10px] text-muted md:col-span-2 md:justify-self-end">
                  {typeLabel}
                </span>
                <span className="col-span-2 justify-self-end text-muted transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent">
                  {item.href ? "→" : ""}
                </span>
              </Tag>
            );
          })}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
