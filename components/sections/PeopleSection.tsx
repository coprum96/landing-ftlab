"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { AbstractMedia } from "@/components/visual/AbstractMedia";
import { featuredPeople, people } from "@/data/people";
import { mediaPaths } from "@/lib/media";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

export function PeopleSection({
  locale,
  dict,
  all = false,
}: {
  locale: Locale;
  dict: Dictionary;
  all?: boolean;
}) {
  const items = all ? people : featuredPeople;

  return (
    <section id="people" className="section-pad border-t border-white/10">
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

        <div className="col-span-12 mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-24 md:gap-8">
          {items.map((person) => (
            <article key={person.id} className="group">
              <Link
                href={getLocalizedPath(locale, `people/${person.slug}`)}
                className="block"
              >
                <div
                  className="media-mask portrait-frame relative aspect-[3/4] overflow-hidden"
                  data-cursor="view"
                >
                  {person.hasPhoto ? (
                    <Image
                      src={mediaPaths.personPortrait(person.id)}
                      alt={person.name[locale]}
                      fill
                      className="portrait-color object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                  <h3 className="text-xl font-medium tracking-[-0.02em]">
                    {person.name[locale]}
                  </h3>
                  <p className="mt-1 label-mono text-[12px] text-muted">
                    {person.role[locale]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {person.focus[locale]}
                  </p>
                  <p className="label-mono mt-5 text-[12px] text-ink/80">
                    {dict.people.viewProfile} →
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
