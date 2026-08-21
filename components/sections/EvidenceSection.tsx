import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { evidenceMetrics, evidenceQualitative } from "@/data/evidence";
import type { Dictionary, Locale } from "@/lib/i18n";

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
  return (
    <section
      id="evidence"
      className="section-pad border-t border-white/10"
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
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-16 lg:grid-cols-6">
          {evidenceMetrics.map((metric) => (
            <div key={metric.id} className="border-t border-white/12 pt-4">
              {/* Source: {metric.source} */}
              <p className="font-mono text-[clamp(28px,3vw,40px)] font-medium tabular-nums tracking-[-0.03em] text-ink">
                {metric.value}
              </p>
              <p className="mt-2 text-[13px] leading-snug text-muted">
                {metric.label[locale]}
              </p>
            </div>
          ))}
        </div>

        <div className="col-span-12 mt-10 flex flex-wrap gap-2 md:mt-12">
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
