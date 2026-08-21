"use client";

import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AbstractMedia } from "@/components/visual/AbstractMedia";
import { FadeIn } from "@/components/motion/RevealText";
import { researchAreas } from "@/data/research";
import { gsap, ease } from "@/lib/animations";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

export function ResearchAreas({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [active, setActive] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();
  const area = researchAreas[active];

  useEffect(() => {
    if (touch || reduced || !previewRef.current) return;

    const onMove = (event: MouseEvent) => {
      if (!sectionRef.current || !previewRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (event.clientY < rect.top || event.clientY > rect.bottom) return;
      const y = event.clientY - rect.top - previewRef.current.offsetHeight / 2;
      gsap.to(previewRef.current, {
        y: Math.max(0, Math.min(y, rect.height - previewRef.current.offsetHeight)),
        duration: 0.85,
        ease: ease.out,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, touch]);

  return (
    <section id="research" ref={sectionRef} className="section-pad relative">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.research.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6 max-w-4xl">
              {dict.research.heading}
            </h2>
          </FadeIn>
        </div>

        <div className="relative col-span-12 mt-16 grid grid-cols-1 gap-0 md:grid-cols-12 md:mt-24">
          <div className="md:col-span-7">
            {researchAreas.map((item, index) => (
              <article
                key={item.id}
                className={cx(
                  "border-t border-white/10 py-8 transition-opacity duration-500 md:py-10",
                  active === index ? "opacity-100" : "opacity-45 hover:opacity-80",
                )}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onMouseEnter={() => setActive(index)}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="label-mono text-[11px] text-accent">
                      {item.code}
                    </span>
                    <h3 className="text-[clamp(26px,3.6vw,48px)] font-medium leading-[1.05] tracking-[-0.03em]">
                      {item.title[locale]}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-xl pl-12 text-sm leading-relaxed text-muted md:text-base">
                    {item.question[locale]}
                  </p>

                  {active === index ? (
                    <div className="mt-6 space-y-4 pl-12 text-sm text-muted">
                      <div>
                        <p className="label-mono text-[10px] text-accent">
                          {dict.research.methodLabel}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {item.method.map((m) => (
                            <li key={m.en}>{m[locale]}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="label-mono text-[10px] text-accent">
                          {dict.research.outputLabel}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {item.output.map((o) => (
                            <li key={o.en}>→ {o[locale]}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="label-mono text-[10px] text-accent">
                          {dict.research.applicationLabel}
                        </p>
                        <p className="mt-2">{item.application[locale]}</p>
                      </div>
                    </div>
                  ) : null}
                </button>

                {touch ? (
                  <div className="mt-6 md:hidden">
                    <AbstractMedia
                      motif={item.motif}
                      className="aspect-[16/10] w-full"
                      label={item.title[locale]}
                      code={item.code}
                    />
                  </div>
                ) : null}
              </article>
            ))}
            <div className="border-t border-white/10" />
          </div>

          {!touch && area ? (
            <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38%] md:block">
              <div
                ref={previewRef}
                className="w-full will-change-transform"
                data-cursor="view"
              >
                <AbstractMedia
                  motif={area.motif}
                  className="aspect-[4/5] w-full"
                  label={area.title[locale]}
                  code={area.code}
                >
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="label-mono text-[10px] text-ink/80">
                      {area.code} — {area.title[locale]}
                    </p>
                  </div>
                </AbstractMedia>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
