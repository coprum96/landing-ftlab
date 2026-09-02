"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { AbstractMedia } from "@/components/visual/AbstractMedia";
import { featuredPeopleForLocale, peopleForLocale } from "@/data/people";
import { mediaPaths } from "@/lib/media";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

const HOMEPAGE_FEATURED_COUNT = 4;

const portraitPosition: Record<string, string> = {
  tosunyan: "center 18%",
  "medyanik-ov": "center 22%",
  gagarina: "center 18%",
  pisarenko: "center 12%",
  skvortsov: "center 18%",
  kuznetsov: "center 20%",
  "medyanik-s": "center 20%",
  rozanov: "center 18%",
  lobanova: "center 18%",
  default: "center 20%",
};

export function PeopleSection({
  locale,
  dict,
  all = false,
}: {
  locale: Locale;
  dict: Dictionary;
  all?: boolean;
}) {
  const ordered = all
    ? peopleForLocale(locale)
    : featuredPeopleForLocale(locale).slice(0, HOMEPAGE_FEATURED_COUNT);
  const items = ordered;

  return (
    <section
      id="people"
      className="section-anchor section-pad border-t border-white/10"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-8">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.people.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6">
              {dict.people.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-6 max-w-xl text-sm text-muted"
            >
              {dict.people.supporting}
            </p>
          </FadeIn>
        </div>

        {/* Mobile: compact list */}
        <ul className="col-span-12 mt-10 space-y-0 divide-y divide-white/10 md:hidden">
          {items.map((person, index) => (
            <li key={person.id}>
              <Link
                href={getLocalizedPath(locale, `people/${person.slug}`)}
                className="flex min-h-16 items-center gap-4 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label={`${dict.people.viewProfile}: ${person.name[locale]}`}
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[#121212]">
                  {person.hasPhoto ? (
                    <Image
                      src={mediaPaths.personPortrait(person.id)}
                      alt=""
                      fill
                      unoptimized
                      priority={index < 2}
                      className="object-cover"
                      style={{
                        objectPosition:
                          portraitPosition[person.id] ??
                          portraitPosition.default,
                      }}
                      sizes="56px"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center text-sm text-ink/40">
                      {person.initials}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-medium tracking-[-0.02em]">
                    {person.name[locale]}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-muted">
                    {person.role[locale]}
                  </p>
                </div>
                <span className="label-mono shrink-0 text-sm text-ink/70" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop: portrait grid */}
        <div className="col-span-12 mt-16 hidden grid-cols-2 gap-8 md:mt-20 md:grid lg:grid-cols-4">
          {items.map((person, index) => (
            <article key={person.id} className="group">
              <Link
                href={getLocalizedPath(locale, `people/${person.slug}`)}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                aria-label={`${dict.people.viewProfile}: ${person.name[locale]}`}
              >
                <div
                  className="media-mask portrait-frame relative aspect-[3/4] overflow-hidden bg-[#121212]"
                  data-cursor="view"
                >
                  {person.hasPhoto ? (
                    <Image
                      src={mediaPaths.personPortrait(person.id)}
                      alt=""
                      fill
                      unoptimized
                      priority={index < 2}
                      className="portrait-color object-cover"
                      style={{
                        objectPosition:
                          portraitPosition[person.id] ??
                          portraitPosition.default,
                      }}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <AbstractMedia
                      motif={person.motif}
                      className="portrait-color absolute inset-0 h-full w-full"
                      label={person.name[locale]}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[64px] font-medium tracking-[-0.05em] text-ink/25">
                          {person.initials}
                        </span>
                      </div>
                    </AbstractMedia>
                  )}
                </div>
                <div className="mt-5 transition-transform duration-500 ease-out group-hover:-translate-y-[3px]">
                  <h3 className="text-xl font-medium tracking-[-0.02em]" aria-hidden>
                    {person.name[locale]}
                  </h3>
                  <p className="mt-1 text-sm text-muted" aria-hidden>
                    {person.role[locale]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted" aria-hidden>
                    {person.focus[locale]}
                  </p>
                  <p className="label-mono mt-5 text-sm text-ink/80" aria-hidden>
                    {dict.people.viewProfile} →
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {!all ? (
          <div className="col-span-12 mt-10 md:mt-14">
            <Link
              href={getLocalizedPath(locale, "people")}
              className="label-mono inline-flex min-h-11 items-center text-sm tracking-[0.12em] text-ink underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.people.viewAll} →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
