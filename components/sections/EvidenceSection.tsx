import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import {
  evidenceLastUpdated,
  evidenceMetrics,
  evidenceQualitative,
} from "@/data/evidence";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

/**
 * Compact proof strip beside research claims.
 * Metrics are derived from local data files — see data/evidence.ts source notes.
 */
export function EvidenceSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const updatedLabel =
    locale === "ru"
      ? `Обновлено: ${evidenceLastUpdated}`
      : `Last updated: ${evidenceLastUpdated}`;

  return (
    <section
      id="evidence"
      className="section-anchor section-pad border-t border-white/10"
      aria-labelledby="evidence-title"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-7">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.evidence.label}</SectionLabel>
            </div>
            <h2
              id="evidence-title"
              data-reveal-title
              className="headline-section mt-6 max-w-3xl"
            >
              {dict.evidence.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-6 max-w-xl text-base leading-relaxed text-muted"
            >
              {dict.evidence.supporting}
            </p>
            <p
              data-reveal-block
              className="label-mono mt-4 text-[11px] tracking-[0.08em] text-ink/50"
            >
              {updatedLabel}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:mt-12 lg:grid-cols-6">
          {evidenceMetrics.map((metric) => {
            const href = metric.hrefPath.startsWith("#")
              ? metric.hrefPath
              : getLocalizedPath(locale, metric.hrefPath);
            return (
            <Link
              key={metric.id}
              href={href}
              className="group border-t border-white/12 pt-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              title={metric.definition[locale]}
            >
              <p className="font-mono text-[clamp(28px,3vw,40px)] font-medium tabular-nums tracking-[-0.03em] text-ink transition-colors group-hover:text-accent">
                {metric.value}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-muted group-hover:text-ink/80">
                {metric.label[locale]}
              </p>
              <span className="sr-only">{metric.definition[locale]}</span>
            </Link>
            );
          })}
        </div>

        <div className="col-span-12 mt-8 flex flex-wrap gap-2 md:mt-10">
          {evidenceQualitative.map((item) => (
            <span
              key={item.id}
              className="label-mono border border-white/12 px-3 py-2 text-[11px] text-ink/85"
            >
              {item.label[locale]}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
