"use client";

import Link from "next/link";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";

export function AgenticOffersSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const o = dict.pages.agenticAi.offers;
  const owners = dict.pages.agenticAi.programme;
  const process = dict.pages.agenticAi.process;

  return (
    <section
      id="partnership-offers"
      className="agentic-anchor border-t border-white/15 py-10 md:py-14"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{o.label}</SectionLabel>
            <h2 className="mt-5 max-w-3xl text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              {o.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {o.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
          {o.items.map((item) => (
            <article
              key={item.title}
              className="border border-white/15 bg-[#080808] p-5 md:p-6"
            >
              <h3 className="text-[1.1rem] font-medium tracking-[-0.02em] text-ink">
                {item.title}
              </h3>
              <dl className="mt-4 space-y-3 text-sm leading-relaxed md:text-[15px]">
                <div>
                  <dt className="label-mono text-xs tracking-[0.1em] text-ink/55">
                    {o.forLabel}
                  </dt>
                  <dd className="mt-1 text-muted">{item.for}</dd>
                </div>
                <div>
                  <dt className="label-mono text-xs tracking-[0.1em] text-ink/55">
                    {o.evaluatesLabel}
                  </dt>
                  <dd className="mt-1 text-muted">{item.evaluates}</dd>
                </div>
                <div>
                  <dt className="label-mono text-xs tracking-[0.1em] text-ink/55">
                    {o.providesLabel}
                  </dt>
                  <dd className="mt-1 text-muted">{item.provides}</dd>
                </div>
                <div>
                  <dt className="label-mono text-xs tracking-[0.1em] text-ink/55">
                    {o.receivesLabel}
                  </dt>
                  <dd className="mt-1 text-ink/85">{item.receives}</dd>
                </div>
                <div>
                  <dt className="label-mono text-xs tracking-[0.1em] text-ink/55">
                    {o.durationLabel}
                  </dt>
                  <dd className="mt-1 text-muted">{item.duration}</dd>
                </div>
              </dl>
              <a
                href="#work-with-the-lab"
                className="label-mono mt-5 inline-flex min-h-11 items-center text-sm tracking-[0.1em] text-ink underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.next} →
              </a>
            </article>
          ))}
        </div>

        <div className="col-span-12 mt-10 border-t border-white/15 pt-8 md:mt-12 md:pt-10">
          <h3 className="text-[1.2rem] font-medium tracking-[-0.02em] text-ink">
            {process.title}
          </h3>
          <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {process.steps.map((step, index) => (
              <li
                key={step}
                className="border border-white/12 px-4 py-4 text-sm leading-relaxed text-muted"
              >
                <span className="label-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-ink/85">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="col-span-12 mt-10 border-t border-white/15 pt-8 md:col-span-10">
          <h3 className="text-[1.2rem] font-medium tracking-[-0.02em] text-ink">
            {owners.title}
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            {owners.supporting}
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {owners.people.map((person) => (
              <li
                key={person.slug}
                className="border border-white/12 px-4 py-4"
              >
                <p className="text-base font-medium text-ink">{person.name}</p>
                <p className="mt-1 text-sm text-muted">{person.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {person.blurb}
                </p>
                <Link
                  href={getLocalizedPath(locale, `people/${person.slug}`)}
                  className="label-mono mt-3 inline-flex min-h-11 items-center text-sm tracking-[0.1em] text-ink underline decoration-white/25 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {owners.profileCta} →
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">
            {owners.contactLabel}:{" "}
            <a
              href="#work-with-the-lab"
              className="text-ink underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {owners.contactCta}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
