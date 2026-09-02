import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { AbstractMedia } from "@/components/visual/AbstractMedia";
import { getPersonBySlug, people } from "@/data/people";
import { mediaPaths } from "@/lib/media";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { labBrandName } from "@/data/lab";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return people.flatMap((person) =>
    (["en", "ru"] as const).map((locale) => ({
      locale,
      slug: person.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const person = getPersonBySlug(slug);
  if (!person) return {};
  return buildPageMetadata({
    locale,
    path: `people/${slug}`,
    title: `${person.name[locale]} — ${labBrandName(locale)}`,
    description: `${person.role[locale]}. ${person.focus[locale]}`,
  });
}

export default async function PersonDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const person = getPersonBySlug(slug);
  if (!person) notFound();

  return (
    <div className="page-top">
      <section className="section-pad">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-5">
            <Link
              href={getLocalizedPath(locale, "people")}
              className="label-mono text-[11px] text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              ← {dict.nav.people}
            </Link>
            <div className="media-mask portrait-frame relative mt-8 aspect-[3/4] overflow-hidden">
              {person.hasPhoto ? (
                <Image
                  src={mediaPaths.personPortrait(person.id)}
                  alt={person.name[locale]}
                  fill
                  unoptimized
                  className="portrait-color object-cover object-[center_20%]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              ) : (
                <AbstractMedia
                  motif={person.motif}
                  className="portrait-color absolute inset-0 h-full w-full"
                  label={person.name[locale]}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[80px] font-medium tracking-[-0.05em] text-ink/25">
                      {person.initials}
                    </span>
                  </div>
                </AbstractMedia>
              )}
            </div>
          </div>

          <div className="col-span-12 mt-10 md:col-span-6 md:col-start-7 md:mt-16">
            <p className="label-mono text-[11px] text-accent">
              {person.role[locale]}
            </p>
            <h1 className="headline-section mt-4 break-words">
              {person.name[locale]}
            </h1>
            {person.institution ? (
              <p className="mt-4 text-sm text-muted">
                {person.institution[locale]}
              </p>
            ) : null}
            <p className="mt-8 text-lg leading-relaxed text-muted">
              {person.bio[locale]}
            </p>
            {person.detail ? (
              <p className="mt-6 text-sm leading-relaxed text-muted/90">
                {person.detail[locale]}
              </p>
            ) : null}
            <p className="label-mono mt-8 text-[11px] text-muted">
              {person.focus[locale]}
            </p>
            <div className="mt-8 flex flex-wrap gap-5 label-mono text-[11px]">
              {person.links.orcid ? (
                <a
                  href={person.links.orcid}
                  className="text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  ORCID
                </a>
              ) : null}
              {person.links.scholar ? (
                <a
                  href={person.links.scholar}
                  className="text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  Scholar
                </a>
              ) : null}
              {person.links.linkedin ? (
                <a
                  href={person.links.linkedin}
                  className="text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              ) : null}
              {person.links.web ? (
                <a
                  href={person.links.web}
                  className="text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  University
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
