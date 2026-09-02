import Link from "next/link";
import { featuredEvent } from "@/data/events";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

/**
 * Slim announcement strip - sits directly under the fixed header.
 */
export function ConferenceAnnounce({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  if (!featuredEvent) return null;

  const href = getLocalizedPath(locale, `events/${featuredEvent.slug}`);

  return (
    <aside
      id="conference"
      className="relative z-40 border-b border-accent/50 bg-accent"
      aria-label={dict.conferenceAnnounce.label}
    >
      <div className="editorial-grid items-center py-2 md:py-3">
        <div className="col-span-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="line-clamp-2 text-[12px] leading-snug text-ink/95 sm:line-clamp-none md:text-sm">
            <span className="label-mono mr-2 text-[10px] tracking-[0.12em] text-ink/75">
              {dict.conferenceAnnounce.label}
            </span>
            {dict.conferenceAnnounce.line}
          </p>
          <Link
            href={href}
            className="label-mono inline-flex min-h-10 shrink-0 items-center gap-2 self-start border border-ink/40 bg-ink/10 px-3.5 py-2 text-[10px] tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:min-h-0 sm:self-auto"
          >
            {dict.conferenceAnnounce.cta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
