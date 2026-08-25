import Link from "next/link";
import { FadeIn } from "@/components/motion/RevealText";
import { featuredEvent } from "@/data/events";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

export function ConferenceAnnounce({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  if (!featuredEvent) return null;

  const href = getLocalizedPath(
    locale,
    `events/${featuredEvent.slug}`,
  );

  return (
    <section
      id="conference"
      className="border-t border-white/10"
      aria-labelledby="conference-announce-title"
    >
      <div className="editorial-grid py-12 md:py-16">
        <FadeIn className="col-span-12">
          <p className="label-mono text-[11px] text-accent">
            {dict.conferenceAnnounce.label}
          </p>
          <div className="mt-5 flex flex-col gap-6 md:mt-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-3xl">
              <h2
                id="conference-announce-title"
                className="text-[clamp(1.35rem,3.2vw,2.1rem)] font-medium leading-[1.15] tracking-[-0.02em]"
              >
                {featuredEvent.title[locale]}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                {dict.conferenceAnnounce.supporting}
              </p>
              <p className="label-mono mt-4 text-[11px] text-ink/80">
                {featuredEvent.dates[locale]}
                <span className="mx-2 text-muted">·</span>
                {featuredEvent.format[locale]}
              </p>
            </div>
            <Link
              href={href}
              className="label-mono inline-flex shrink-0 items-center gap-2 border border-accent/60 bg-accent/10 px-5 py-3 text-[11px] tracking-[0.12em] text-ink transition-colors hover:border-accent hover:bg-accent/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.conferenceAnnounce.cta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
