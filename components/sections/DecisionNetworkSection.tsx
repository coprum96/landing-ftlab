"use client";

import { useEffect, useRef, useState } from "react";
import { DecisionNetwork } from "@/components/visual/DecisionNetwork";
import { FadeIn } from "@/components/motion/RevealText";
import { gsap, registerGsap } from "@/lib/animations";
import { motion } from "@/lib/motion";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";

/**
 * THE DECISION NETWORK
 * Desktop: horizontal path + scroll scrub.
 * Mobile: vertical timeline — stages light up as you scroll.
 */
export function DecisionNetworkSection({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const signalRef = useRef<SVGCircleElement>(null);
  const stageCardRefs = useRef<(HTMLElement | null)[]>([]);
  const reduced = useReducedMotionPreferred();
  const touch = useIsTouch();
  const stages = dict.decisionNetwork.stages;
  const stageCopy = dict.decisionNetwork.stageCopy;
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  // Desktop scroll-scrubbed path
  useEffect(() => {
    if (!ref.current || touch) return;
    registerGsap();

    const stageEls = Array.from(
      ref.current.querySelectorAll<HTMLElement>("[data-stage-desktop]"),
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
              if (pt && Number.isFinite(pt.x) && Number.isFinite(pt.y)) {
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
  }, [reduced, stages, touch]);

  // Vertical timeline (mobile / < lg): activate as cards enter the middle band
  useEffect(() => {
    const nodes = stageCardRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip while desktop horizontal path owns the interaction
        if (window.matchMedia("(min-width: 1024px)").matches) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const idx = Number(
          (visible[0].target as HTMLElement).dataset.index ?? "0",
        );
        activeRef.current = idx;
        setActive(idx);
      },
      {
        root: null,
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [stages.length]);

  const progress = (active + 1) / stages.length;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28 md:py-40"
      aria-label={dict.decisionNetwork.title}
    >
      <DecisionNetwork
        labels={dict.decisionNetwork.labels}
        density={touch ? 50 : 90}
        interactive={!touch}
        scrollLinked
        className={cx(
          "transition-opacity duration-700",
          active >= 3 ? "opacity-70" : "opacity-45",
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
        <div className="col-span-12 lg:col-span-5">
          <FadeIn>
            <div data-reveal-number>
              <p className="label-mono text-[12px] text-accent sm:text-[13px]">
                {dict.decisionNetwork.title}
              </p>
            </div>
            <h2
              data-reveal-title
              className="mt-4 text-[clamp(1.75rem,6vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] sm:mt-5"
            >
              {dict.decisionNetwork.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-muted sm:mt-6 sm:text-lg"
            >
              {dict.decisionNetwork.supporting}
            </p>
          </FadeIn>

          {/* Desktop active readout */}
          <div
            className="mt-10 hidden min-h-[8rem] lg:block"
            aria-live="polite"
          >
            <p className="label-mono text-[12px] text-accent">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(stages.length).padStart(2, "0")}
              <span className="mx-2 text-muted">·</span>
              <span className="text-ink">{stages[active]}</span>
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/90 transition-opacity duration-500">
              {stageCopy[active]}
            </p>
            <div className="mt-6 h-px w-full max-w-xs overflow-hidden bg-white/10">
              <div
                className="h-full bg-accent transition-[width] duration-500 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Desktop horizontal stages */}
        <div className="col-span-12 mt-10 hidden lg:col-span-7 lg:mt-0 lg:flex lg:flex-col lg:items-end lg:justify-center">
          <div className="relative w-full max-w-xl">
            <svg
              className="pointer-events-none absolute inset-x-0 -top-3 h-8 w-full"
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

            <div className="flex flex-wrap justify-end gap-x-5 gap-y-4">
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
                      data-stage-desktop
                      className="label-mono text-[13px] text-ink will-change-transform"
                    >
                      {stage}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline — scrolls open automatically */}
        <div className="col-span-12 mt-12 lg:hidden">
          <div className="relative pl-5">
            <div
              className="absolute bottom-2 left-[7px] top-2 w-px bg-white/15"
              aria-hidden
            />
            <div
              className="absolute left-[7px] top-2 w-px origin-top bg-accent transition-[height] duration-500 ease-out"
              style={{
                height: `calc(${(active / Math.max(stages.length - 1, 1)) * 100}% - 0.25rem)`,
              }}
              aria-hidden
            />

            <ol className="space-y-0">
              {stages.map((stage, index) => {
                const open = active === index;
                const past = index < active;
                return (
                  <li
                    key={stage}
                    ref={(el) => {
                      stageCardRefs.current[index] = el;
                    }}
                    data-index={index}
                    className="relative pb-10 last:pb-2"
                  >
                    <span
                      className={cx(
                        "absolute -left-5 top-1.5 h-3.5 w-3.5 rounded-full border transition-colors duration-300",
                        open
                          ? "border-accent bg-accent"
                          : past
                            ? "border-accent/60 bg-accent/40"
                            : "border-white/25 bg-[#080808]",
                      )}
                      aria-hidden
                    />
                    <button
                      type="button"
                      className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      onClick={() => {
                        activeRef.current = index;
                        setActive(index);
                      }}
                      aria-current={open ? "step" : undefined}
                    >
                      <p
                        className={cx(
                          "label-mono text-[12px] transition-colors duration-300",
                          open ? "text-accent" : "text-muted",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(stages.length).padStart(2, "0")}
                      </p>
                      <p
                        className={cx(
                          "mt-2 text-[1.35rem] font-medium tracking-[-0.02em] transition-colors duration-300 sm:text-2xl",
                          open || past ? "text-ink" : "text-muted",
                        )}
                      >
                        {stage}
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
                          <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-muted sm:text-lg">
                            {stageCopy[index]}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
