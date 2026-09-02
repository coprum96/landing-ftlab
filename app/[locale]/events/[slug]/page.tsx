import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { events, getEventBySlug } from "@/data/events";
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
  return events.flatMap((event) =>
    (["en", "ru"] as const).map((locale) => ({
      locale,
      slug: event.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return buildPageMetadata({
    locale,
    path: `events/${slug}`,
    title: `${event.title[locale]} — ${labBrandName(locale)}`,
    description: event.summary[locale],
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="page-top">
      <section className="section-pad">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <FadeIn>
              <Link
                href={getLocalizedPath(locale)}
                className="label-mono text-[11px] text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                ← {dict.eventDetail.back}
              </Link>
              <div className="mt-8">
                <SectionLabel>{dict.eventDetail.label}</SectionLabel>
              </div>
              <p className="label-mono mt-8 text-[11px] text-accent">
                {event.edition[locale]}
              </p>
              <h1 className="headline-section mt-4 max-w-4xl">
                {event.title[locale]}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                {event.summary[locale]}
              </p>
              <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-2">
                <div>
                  <dt className="label-mono text-[10px] text-accent">
                    {dict.eventDetail.dates}
                  </dt>
                  <dd className="mt-2 text-sm text-ink">{event.dates[locale]}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[10px] text-accent">
                    {dict.eventDetail.format}
                  </dt>
                  <dd className="mt-2 text-sm text-ink">{event.format[locale]}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="label-mono text-[10px] text-accent">
                    {dict.eventDetail.organizers}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    {event.organizers[locale]}
                  </dd>
                </div>
                {event.sponsors ? (
                  <div>
                    <dt className="label-mono text-[10px] text-accent">
                      {dict.eventDetail.sponsors}
                    </dt>
                    <dd className="mt-2 text-sm text-muted">
                      {event.sponsors[locale]}
                    </dd>
                  </div>
                ) : null}
                {event.infoPartner ? (
                  <div>
                    <dt className="label-mono text-[10px] text-accent">
                      {dict.eventDetail.infoPartner}
                    </dt>
                    <dd className="mt-2 text-sm text-muted">
                      {event.infoPartner[locale]}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </FadeIn>
          </div>
        </div>
      </section>

      {event.days.map((day) => (
        <section
          key={day.id}
          id={day.id}
          className="section-pad border-t border-white/10"
        >
          <div className="editorial-grid">
            <div className="col-span-12 md:col-span-4">
              <FadeIn>
                <p className="label-mono text-[11px] text-accent">
                  {day.date}
                </p>
                <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.02em]">
                  {day.label[locale]}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {day.venue[locale]}
                </p>
                <p className="label-mono mt-3 text-[10px] text-muted">
                  {day.format[locale]}
                </p>
              </FadeIn>
            </div>

            <div className="col-span-12 mt-10 md:col-span-8 md:mt-0">
              <ol className="space-y-0">
                {day.sessions.map((session, index) => (
                  <li
                    key={`${day.id}-${index}`}
                    className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-white/10 py-5 first:border-t-0 first:pt-0 md:grid-cols-[7rem_1fr] md:gap-8 md:py-6"
                  >
                    <p className="label-mono text-[11px] text-accent">
                      {session.time}
                    </p>
                    <div>
                      <h3
                        className={
                          session.kind === "break"
                            ? "text-sm font-medium text-muted"
                            : "text-base font-medium leading-snug tracking-[-0.01em] md:text-lg"
                        }
                      >
                        {session.title[locale]}
                      </h3>
                      {session.speakers ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {session.speakers[locale]}
                        </p>
                      ) : null}
                      {session.venue ? (
                        <p className="label-mono mt-2 text-[10px] text-muted/80">
                          {session.venue[locale]}
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
