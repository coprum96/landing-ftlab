"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import {
  featuredPublications,
  publications,
  type Publication,
  type PublicationType,
} from "@/data/publications";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
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
  featuredOnly = false,
}: {
  locale: Locale;
  dict: Dictionary;
  featuredOnly?: boolean;
}) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const items = useMemo(() => {
    if (featuredOnly) return featuredPublications;
    const mapped = filterMap[filter];
    if (mapped === "all") return publications;
    return publications.filter((item) => mapped.includes(item.type));
  }, [featuredOnly, filter]);

  const filters: FilterKey[] = ["all", "papers", "conferences", "datasets", "working"];

  return (
    <section id="publications" className="section-pad border-t border-white/10">
      <div className="editorial-grid">
        <div className="col-span-12 flex flex-wrap items-end justify-between gap-6 md:col-span-12">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.publications.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6">
              {dict.publications.heading}
            </h2>
          </FadeIn>
          {featuredOnly ? (
            <Link
              href={getLocalizedPath(locale, "publications")}
              className="label-mono inline-flex min-h-11 items-center text-[12px] text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.publications.viewAll} →
            </Link>
          ) : null}
        </div>

        {!featuredOnly ? (
          <div className="col-span-12 mt-12 flex flex-wrap gap-x-2 gap-y-2 md:mt-16">
            {filters.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={cx(
                  "label-mono relative min-h-11 px-3 text-[12px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                  filter === key ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {dict.publications.filters[key]}
                <span
                  className={cx(
                    "absolute bottom-2 left-3 right-3 h-px bg-accent transition-all duration-400",
                    filter === key ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}

        <div className="col-span-12 mt-10 md:mt-14">
          {items.map((item) => (
            <PublicationRow
              key={item.id}
              item={item}
              locale={locale}
              dict={dict}
            />
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}

function PublicationRow({
  item,
  locale,
  dict,
}: {
  item: Publication;
  locale: Locale;
  dict: Dictionary;
}) {
  const typeLabel =
    dict.publications.types[
      item.type as keyof typeof dict.publications.types
    ] ?? item.type;
  const Tag = item.href ? "a" : "div";
  const inPress = Boolean(item.note);

  return (
    <Tag
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
      <span className="col-span-3 label-mono text-[12px] text-muted md:col-span-1">
        {item.year}
      </span>
      <span className="col-span-9 label-mono text-[12px] text-accent md:col-span-2">
        {typeLabel}
      </span>
      <span className="col-span-12 mt-2 md:col-span-7 md:mt-0">
        <span className="block text-[clamp(18px,2.2vw,28px)] font-medium leading-[1.15] tracking-[-0.02em]">
          {item.title[locale]}
        </span>
        <span className="mt-2 block text-[13px] text-muted md:text-sm">
          {item.authors}
        </span>
        <span className="mt-1 block text-[13px] text-muted md:text-sm">
          {item.venue[locale]}
        </span>
        <span className="mt-3 flex flex-wrap items-center gap-2">
          {inPress ? (
            <span className="label-mono inline-block border border-white/15 px-2 py-1 text-[11px] text-accent">
              {dict.publications.statusInPress}
            </span>
          ) : null}
          {item.doi ? (
            <span className="label-mono text-[11px] text-muted">
              {dict.publications.doiLabel}: {item.doi}
            </span>
          ) : null}
        </span>
      </span>
      <span className="col-span-10 label-mono self-center text-[12px] text-muted md:col-span-1 md:justify-self-end">
        {item.href ? "" : ""}
      </span>
      <span className="col-span-2 justify-self-end self-center text-[16px] text-muted transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent">
        {item.href ? "→" : ""}
      </span>
    </Tag>
  );
}
