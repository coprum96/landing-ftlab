"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SwipeHint } from "@/components/sections/agentic/SwipeHint";
import { gsap, registerGsap } from "@/lib/animations";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";

/**
 * Visual narrative: traditional AI assistance → agentic financial autonomy.
 */
export function AgenticAutonomySection({ dict }: { dict: Dictionary }) {
  const t = dict.pages.agenticAi.transition;
  const eco = dict.pages.agenticAi.ecosystem;
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
    <section
      id="autonomy"
      ref={ref}
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-12 md:py-28"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
          <FadeIn>
            <SectionLabel>{t.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-4xl">{t.title}</h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-snug tracking-[-0.01em] text-ink md:mt-6 md:text-xl">
              {t.lede}
            </p>
            <p className="mt-4 hidden max-w-2xl text-base leading-relaxed text-muted md:mt-5 md:block">
              {t.caption}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 md:mt-20">
          <div
            className="grid grid-cols-2 gap-0 border border-white/10 md:inline-flex md:w-auto md:gap-0"
            role="tablist"
            aria-label={t.label}
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "from"}
              onClick={() => setMode("from")}
              className={cx(
                "label-mono min-h-12 border-r border-white/10 px-3 py-3 text-center text-[10px] tracking-[0.1em] transition-colors md:min-h-0 md:border-0 md:border-r md:px-4 md:py-2.5 md:text-left md:tracking-[0.14em]",
                mode === "from"
                  ? "bg-accent/[0.08] text-ink"
                  : "text-ink/40 active:text-ink/70 md:hover:text-ink/70",
              )}
            >
              {t.fromLabel}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "to"}
              onClick={() => setMode("to")}
              className={cx(
                "label-mono min-h-12 px-3 py-3 text-center text-[10px] tracking-[0.1em] transition-colors md:min-h-0 md:px-4 md:py-2.5 md:text-left md:tracking-[0.14em]",
                mode === "to"
                  ? "bg-accent/[0.08] text-ink"
                  : "text-ink/40 active:text-ink/70 md:hover:text-ink/70",
              )}
            >
              {t.toLabel}
            </button>
          </div>

          <div className="mt-6 md:mt-8">
            <SwipeHint label={eco.swipe} />
            <div
              className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="list"
              aria-label={mode === "from" ? t.fromLabel : t.toLabel}
            >
              <ol className="flex min-w-max flex-row items-stretch gap-0">
                {steps.map((step, index) => (
                  <li key={`${mode}-${step}`} className="flex items-center">
                    <div
                      className={cx(
                        "min-w-[7.25rem] border border-white/10 px-3.5 py-3.5 transition-colors duration-500 md:min-w-0 md:px-5 md:py-6",
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
                          "label-mono mt-2 text-[11px] tracking-[0.12em] md:mt-3 md:text-[12px] md:tracking-[0.14em]",
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
                        className="mx-1.5 h-px w-4 shrink-0 bg-white/20 md:mx-3 md:w-8"
                        aria-hidden
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <p className="label-mono mt-6 hidden text-[10px] tracking-[0.12em] text-ink/35 md:mt-8 md:block">
            {t.altFrom.join(" → ")}
          </p>
        </div>
      </div>
    </section>
  );
}
