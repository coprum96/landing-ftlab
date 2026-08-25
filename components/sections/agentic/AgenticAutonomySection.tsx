"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, registerGsap } from "@/lib/animations";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";

/**
 * Visual narrative: traditional AI assistance → agentic financial autonomy.
 */
export function AgenticAutonomySection({ dict }: { dict: Dictionary }) {
  const t = dict.pages.agenticAi.transition;
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPreferred();
  const touch = useIsTouch();
  const [mode, setMode] = useState<"from" | "to">("from");

  useEffect(() => {
    if (!ref.current || reduced || touch) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
          end: "center 40%",
          scrub: 0.6,
          onUpdate: (self) => {
            setMode(self.progress > 0.45 ? "to" : "from");
          },
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced, touch]);

  const steps = mode === "from" ? t.from : t.to;

  return (
    <section id="autonomy" ref={ref} className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{t.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{t.title}</h2>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-snug tracking-[-0.01em] text-ink md:text-xl">
              {t.lede}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              {t.caption}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-14 md:mt-20">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => setMode("from")}
              className={cx(
                "label-mono border px-3 py-2 text-[10px] tracking-[0.14em] transition-colors",
                mode === "from"
                  ? "border-accent/60 text-ink"
                  : "border-white/10 text-ink/40 hover:text-ink/70",
              )}
            >
              {t.fromLabel}
            </button>
            <button
              type="button"
              onClick={() => setMode("to")}
              className={cx(
                "label-mono border px-3 py-2 text-[10px] tracking-[0.14em] transition-colors",
                mode === "to"
                  ? "border-accent/60 text-ink"
                  : "border-white/10 text-ink/40 hover:text-ink/70",
              )}
            >
              {t.toLabel}
            </button>
          </div>

          <div className="mt-8">
            <div
              className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="list"
              aria-label={mode === "from" ? t.fromLabel : t.toLabel}
            >
              <ol className="flex min-w-max flex-col gap-2 sm:min-w-0 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-0 md:flex-wrap">
                {steps.map((step, index) => (
                  <li
                    key={`${mode}-${step}`}
                    className="flex items-center sm:contents"
                  >
                    <div
                      className={cx(
                        "w-full border border-white/10 px-4 py-4 transition-colors duration-500 sm:w-auto sm:px-5 sm:py-6",
                        mode === "to" && index === steps.length - 1
                          ? "border-accent/40 bg-accent/[0.06]"
                          : "bg-transparent",
                      )}
                    >
                      <p className="label-mono text-[9px] tracking-[0.16em] text-ink/35">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p
                        className={cx(
                          "label-mono mt-2 text-[11px] tracking-[0.14em] sm:mt-3 sm:text-[12px]",
                          mode === "to" && index >= 3
                            ? "text-accent"
                            : "text-ink",
                        )}
                      >
                        {step}
                      </p>
                    </div>
                    {index < steps.length - 1 ? (
                      <span
                        className="mx-1 hidden h-px w-6 bg-white/20 sm:mx-2 sm:block sm:w-8 md:mx-3"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <p className="label-mono mt-8 text-[10px] tracking-[0.12em] text-ink/35">
            {t.altFrom.join(" → ")}
          </p>
        </div>
      </div>
    </section>
  );
}
