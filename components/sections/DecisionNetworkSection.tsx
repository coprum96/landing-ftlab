"use client";

import { useEffect, useRef, useState } from "react";
import { DecisionNetwork } from "@/components/visual/DecisionNetwork";
import { FadeIn } from "@/components/motion/RevealText";
import { gsap, registerGsap } from "@/lib/animations";
import { motion } from "@/lib/motion";
import { useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";

/**
 * Signature visual: THE DECISION NETWORK
 * stimulus → perception → bias → pressure → decision → financial action
 * Stages activate sequentially with scroll; a red impulse travels the path.
 */
export function DecisionNetworkSection({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const signalRef = useRef<SVGCircleElement>(null);
  const reduced = useReducedMotionPreferred();
  const stages = dict.decisionNetwork.stages;
  const stageCopy = dict.decisionNetwork.stageCopy;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    registerGsap();

    const stageEls = Array.from(
      ref.current.querySelectorAll<HTMLElement>("[data-stage]"),
    );
    const markers = Array.from(
      ref.current.querySelectorAll<HTMLElement>("[data-stage-marker]"),
    );

    if (reduced) {
      stageEls.forEach((el) => {
        el.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      let pathLength = 0;
      if (path) {
        pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
      }

      const thresholds = [0.08, 0.22, 0.38, 0.52, 0.68, 0.84];
      const m = motion.stages;

      stageEls.forEach((el) => {
        gsap.set(el, { opacity: m.mutedOpacity, y: 0, scale: 1 });
      });
      markers.forEach((el) => gsap.set(el, { opacity: 0, scale: 0.6 }));

      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.65,
          onUpdate: (self) => {
            const p = self.progress;
            let next = 0;
            for (let i = 0; i < thresholds.length; i++) {
              if (p >= thresholds[i]) next = i;
            }
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActive(next);
            }

            stageEls.forEach((el, i) => {
              const isActive = i === next;
              const isPast = i < next;
              gsap.to(el, {
                opacity: isActive
                  ? m.activeOpacity
                  : isPast
                    ? 0.55
                    : m.mutedOpacity,
                y: isActive ? m.microY : 0,
                scale: isActive ? m.microScale : 1,
                color: isActive ? "#f2f0ea" : undefined,
                duration: 0.35,
                overwrite: "auto",
              });
            });

            markers.forEach((el, i) => {
              gsap.to(el, {
                opacity: i === next ? 1 : 0,
                scale: i === next ? 1 : 0.6,
                duration: 0.3,
                overwrite: "auto",
              });
            });

            if (path && pathLength) {
              gsap.set(path, {
                strokeDashoffset: pathLength * (1 - p),
              });
            }

            if (signalRef.current && path && pathLength > 0) {
              const pt = path.getPointAtLength(pathLength * p);
              if (
                pt &&
                Number.isFinite(pt.x) &&
                Number.isFinite(pt.y)
              ) {
                signalRef.current.setAttribute("cx", pt.x.toFixed(2));
                signalRef.current.setAttribute("cy", pt.y.toFixed(2));
                signalRef.current.setAttribute(
                  "opacity",
                  p > 0.02 && p < 0.98 ? "1" : "0",
                );
              }
            }
          },
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced, stages]);

  const progress = (active + 1) / stages.length;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-white/10 py-28 md:py-40"
      aria-label={dict.decisionNetwork.title}
    >
      <DecisionNetwork
        labels={dict.decisionNetwork.labels}
        density={90}
        interactive
        scrollLinked
        className={cx(
          "transition-opacity duration-700",
          active >= 3 ? "opacity-80" : "opacity-55",
        )}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: active >= 3 ? 1 : 0,
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(158,27,50,0.14), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="editorial-grid relative z-10">
        <div className="col-span-12 md:col-span-5">
          <FadeIn>
            <div data-reveal-number>
              <p className="label-mono text-[12px] text-accent">
                {dict.decisionNetwork.title}
              </p>
            </div>
            <h2
              data-reveal-title
              className="mt-5 text-[clamp(32px,4vw,56px)] font-medium leading-[1.05] tracking-[-0.03em]"
            >
              {dict.decisionNetwork.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-6 max-w-md text-sm leading-relaxed text-muted"
            >
              {dict.decisionNetwork.supporting}
            </p>
          </FadeIn>

          <div className="mt-10 min-h-[7.5rem]" aria-live="polite">
            <p className="label-mono text-[10px] text-accent">
              {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
              <span className="mx-2 text-muted">·</span>
              <span className="text-ink">{stages[active]}</span>
            </p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink/90 transition-opacity duration-500">
              {stageCopy[active]}
            </p>
            <div className="mt-5 h-px w-full max-w-xs overflow-hidden bg-white/10">
              <div
                className="h-full bg-accent transition-[width] duration-500 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-12 md:col-span-7 md:mt-0 md:flex md:flex-col md:items-end md:justify-center">
          <div className="relative w-full max-w-xl">
            <svg
              className="pointer-events-none absolute inset-x-0 -top-3 hidden h-8 w-full md:block"
              viewBox="0 0 600 32"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                ref={pathRef}
                d="M 8 16 C 100 16, 100 16, 108 16 S 200 16, 208 16 S 300 16, 308 16 S 400 16, 408 16 S 500 16, 508 16 S 590 16, 592 16"
                fill="none"
                stroke="rgba(158,27,50,0.35)"
                strokeWidth="1"
              />
              <circle
                ref={signalRef}
                cx="8"
                cy="16"
                r="3.5"
                fill="#9e1b32"
                opacity="0"
              />
            </svg>

            <div className="flex flex-wrap gap-x-5 gap-y-4 md:justify-end">
              {stages.map((stage, index) => (
                <button
                  key={stage}
                  type="button"
                  className="flex min-h-11 items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  onClick={() => {
                    activeRef.current = index;
                    setActive(index);
                  }}
                  onMouseEnter={() => {
                    activeRef.current = index;
                    setActive(index);
                  }}
                  aria-current={active === index ? "step" : undefined}
                >
                  <span className="relative inline-flex items-center gap-2">
                    <span
                      data-stage-marker
                      className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span
                      data-stage
                      className="label-mono text-[12px] text-ink will-change-transform"
                    >
                      {stage}
                    </span>
                  </span>
                  {index < stages.length - 1 ? (
                    <span className="text-accent/50 md:hidden" aria-hidden>
                      →
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
