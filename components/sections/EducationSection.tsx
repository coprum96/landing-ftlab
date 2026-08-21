import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import {
  educationPrograms,
  programKindLabels,
  programStatusLabels,
} from "@/data/programs";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

export function EducationSection({
  locale,
  dict,
  all = false,
}: {
  locale: Locale;
  dict: Dictionary;
  all?: boolean;
}) {
  const items = all
    ? educationPrograms
    : educationPrograms.filter((p) => p.featured);

  return (
    <section id="education" className="section-pad border-t border-white/10">
      <div className="editorial-grid">
        <div className="col-span-12 flex flex-wrap items-end justify-between gap-6">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.education.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6 max-w-3xl">
              {dict.education.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-6 max-w-xl text-sm leading-relaxed text-muted"
            >
              {dict.education.supporting}
            </p>
          </FadeIn>
          {!all ? (
            <Link
              href={getLocalizedPath(locale, "education")}
              className="label-mono text-[11px] text-muted transition-colors hover:text-accent"
            >
              {dict.education.viewAll} →
            </Link>
          ) : null}
        </div>

        <div className="col-span-12 mt-16 md:mt-24">
          {items.map((program) => {
            const inner = (
              <>
                <div className="flex flex-wrap items-center gap-3 label-mono text-[10px] text-muted">
                  <span className="text-accent">{program.code}</span>
                  <span>/</span>
                  <span>{programKindLabels[program.kind][locale]}</span>
                  {program.status ? (
                    <span className="md:ml-auto">
                      {programStatusLabels[program.status][locale]}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-[clamp(22px,2.6vw,36px)] font-medium leading-[1.1] tracking-[-0.02em]">
                  {program.title[locale]}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                  {program.description[locale]}
                </p>
                {program.audience ? (
                  <p className="label-mono mt-4 text-[10px] text-muted/80">
                    {program.audience[locale]}
                  </p>
                ) : null}
              </>
            );

            return (
              <article
                key={program.id}
                className="border-t border-white/10 py-8 md:py-10"
              >
                {program.href ? (
                  <a
                    href={program.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block transition-colors hover:text-ink"
                    data-cursor="open"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </article>
            );
          })}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
}
