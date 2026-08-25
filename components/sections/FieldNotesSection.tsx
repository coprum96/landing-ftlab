import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { AbstractMedia } from "@/components/visual/AbstractMedia";
import { fieldNotes } from "@/data/fieldNotes";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

export function FieldNotesSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="field-notes" className="section-pad border-t border-white/10">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-8">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.fieldNotes.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6">
              {dict.fieldNotes.heading}
            </h2>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {fieldNotes.slice(0, 4).map((note) => {
            const content = (
              <>
                <AbstractMedia
                  motif={note.motif}
                  className="aspect-[4/3] w-full overflow-hidden"
                  label={note.title[locale]}
                  code={`FN/${note.id.replace("note-", "")}`}
                />
                <p className="label-mono mt-5 text-[10px] text-muted">
                  {note.date} · {note.category[locale]}
                </p>
                <h3 className="mt-3 text-xl font-medium leading-snug tracking-[-0.02em] transition-colors group-hover:text-accent">
                  {note.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {note.excerpt[locale]}
                </p>
                {note.href ? (
                  <p className="label-mono mt-4 text-[10px] text-accent">
                    {dict.fieldNotes.read} →
                  </p>
                ) : null}
              </>
            );

            return note.href ? (
              <Link
                key={note.id}
                href={getLocalizedPath(locale, note.href)}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {content}
              </Link>
            ) : (
              <article key={note.id} className="group">
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
