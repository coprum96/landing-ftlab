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

/**
 * Four research pillars — larger type; on mobile, expand automatically as each card enters view.
 */
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
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();
  const area = researchAreas[active];

  // Desktop: preview follows cursor
  useEffect(() => {
    if (touch || reduced || !previewRef.current) return;

    const onMove = (event: MouseEvent) => {
      if (!sectionRef.current || !previewRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (event.clientY < rect.top || event.clientY > rect.bottom) return;
      const y =
        event.clientY - rect.top - previewRef.current.offsetHeight / 2;
      gsap.to(previewRef.current, {
        y: Math.max(
          0,
          Math.min(y, rect.height - previewRef.current.offsetHeight),
        ),
        duration: 0.85,
        ease: ease.out,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, touch]);

  // Mobile / touch: open the pillar nearest the viewport center while scrolling
  useEffect(() => {
    if (!touch) return;

    const nodes = itemRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const idx = Number(
          (visible[0].target as HTMLElement).dataset.index ?? "0",
        );
        setActive(idx);
      },
      {
        root: null,
        // Prefer the card sitting in the middle band of the screen
        rootMargin: "-28% 0px -42% 0px",
        threshold: [0.15, 0.35, 0.55, 0.75],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [touch]);

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

        <div className="relative col-span-12 mt-12 grid grid-cols-1 gap-0 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-7">
            {researchAreas.map((item, index) => {
              const open = active === index;
              return (
                <article
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-index={index}
                  className={cx(
                    "border-t border-white/10 py-9 transition-[opacity,padding] duration-500 sm:py-10 md:py-12",
                    open ? "opacity-100" : "opacity-50 md:hover:opacity-80",
                  )}
                  onMouseEnter={() => {
                    if (!touch) setActive(index);
                  }}
                  onFocus={() => setActive(index)}
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setActive(index)}
                    aria-expanded={open}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-5">
                      <span className="label-mono shrink-0 text-[12px] text-accent sm:text-[13px]">
                        {item.code}
                      </span>
                      <h3 className="text-[clamp(1.5rem,5.5vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                        {item.title[locale]}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-xl pl-0 text-[1.05rem] leading-relaxed text-muted sm:pl-14 sm:text-lg">
                      {item.question[locale]}
                    </p>

                    <div
                      className={cx(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-7 space-y-6 pl-0 text-[1.02rem] leading-relaxed text-muted sm:mt-8 sm:space-y-7 sm:pl-14 sm:text-lg">
                          <div>
                            <p className="label-mono text-[11px] text-accent sm:text-[12px]">
                              {dict.research.methodLabel}
                            </p>
                            <ul className="mt-2.5 space-y-2">
                              {item.method.map((m) => (
                                <li key={m.en}>{m[locale]}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="label-mono text-[11px] text-accent sm:text-[12px]">
                              {dict.research.outputLabel}
                            </p>
                            <ul className="mt-2.5 space-y-2">
                              {item.output.map((o) => (
                                <li key={o.en}>→ {o[locale]}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="label-mono text-[11px] text-accent sm:text-[12px]">
                              {dict.research.applicationLabel}
                            </p>
                            <p className="mt-2.5">{item.application[locale]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {touch ? (
                    <div
                      className={cx(
                        "mt-6 overflow-hidden transition-[max-height,opacity] duration-500 md:hidden",
                        open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      <AbstractMedia
                        motif={item.motif}
                        className="aspect-[16/10] w-full"
                        label={item.title[locale]}
                        code={item.code}
                      />
                    </div>
                  ) : null}
                </article>
              );
            })}
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
                    <p className="label-mono text-[11px] text-ink/80">
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
