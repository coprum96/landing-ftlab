import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { lab } from "@/data/lab";
import type { Dictionary } from "@/lib/i18n";

export function CollaborationSection({ dict }: { dict: Dictionary }) {
  const mailto = `mailto:${lab.contactEmail}?subject=${encodeURIComponent(
    dict.collaborate.mailSubject,
  )}`;

  return (
    <section
      id="collaborate"
      className="section-pad border-t border-white/10"
      aria-labelledby="collaborate-title"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-8">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.collaborate.label}</SectionLabel>
            </div>
            <h2
              id="collaborate-title"
              data-reveal-title
              className="headline-section mt-6 max-w-3xl"
            >
              {dict.collaborate.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-6 max-w-xl text-base leading-relaxed text-muted"
            >
              {dict.collaborate.body}
            </p>
            <ul className="mt-6 space-y-2 text-sm leading-relaxed text-muted md:text-[15px]">
              {dict.collaborate.audiences.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-accent" aria-hidden>
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="label-mono inline-flex min-h-11 items-center border border-white/25 px-5 py-3 text-[12px] text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {dict.collaborate.primaryCta}
              </a>
              <a
                href={mailto}
                className="label-mono inline-flex min-h-11 items-center border border-white/12 px-5 py-3 text-[12px] text-muted transition-colors duration-300 hover:border-white/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {dict.collaborate.secondaryCta}
              </a>
            </div>
            <p className="label-mono mt-6 text-[12px] text-muted">
              {lab.contactEmail}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
