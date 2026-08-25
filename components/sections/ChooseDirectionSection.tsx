"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, ease, registerGsap } from "@/lib/animations";
import {
  getLocalizedPath,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type TrackId = "human" | "agentic" | null;

/**
 * ONE LAB. TWO DECISION SYSTEMS.
 * A single research origin that diverges into Human and Agentic AI.
 */
export function ChooseDirectionSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trunkRef = useRef<SVGLineElement>(null);
  const humanPathRef = useRef<SVGPathElement>(null);
  const agenticPathRef = useRef<SVGPathElement>(null);
  const originRef = useRef<SVGCircleElement>(null);
  const humanEndRef = useRef<SVGCircleElement>(null);
  const agenticEndRef = useRef<SVGCircleElement>(null);
  const humanContentRef = useRef<HTMLAnchorElement>(null);
  const agenticContentRef = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const forkVisualRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState<TrackId>(null);
  const [revealed, setRevealed] = useState(false);
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();
  const copy = dict.chooseDirection;

  useEffect(() => {
    if (!sectionRef.current) return;
    registerGsap();

    const trunk = trunkRef.current;
    const humanPath = humanPathRef.current;
    const agenticPath = agenticPathRef.current;
    const origin = originRef.current;
    const humanEnd = humanEndRef.current;
    const agenticEnd = agenticEndRef.current;
    const humanContent = humanContentRef.current;
    const agenticContent = agenticContentRef.current;
    const header = headerRef.current;
    const forkVisual = forkVisualRef.current;

    if (!humanContent || !agenticContent || !header || !forkVisual) return;

    const hasPaths =
      trunk && humanPath && agenticPath && origin && humanEnd && agenticEnd;

    if (reduced) {
      if (hasPaths) {
        gsap.set([humanPath, agenticPath], {
          strokeDasharray: 1,
          strokeDashoffset: 0,
        });
        gsap.set([origin, humanEnd, agenticEnd], { opacity: 1, scale: 1 });
      }
      gsap.set([humanContent, agenticContent, header, forkVisual], {
        opacity: 1,
        y: 0,
      });
      setRevealed(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 0, y: 18 });
      gsap.set(forkVisual, { opacity: 0, y: 10 });
      gsap.set([humanContent, agenticContent], { opacity: 0, y: 18 });

      if (hasPaths) {
        const humanLen = humanPath.getTotalLength();
        const agenticLen = agenticPath.getTotalLength();
        gsap.set(trunk, { scaleY: 0, transformOrigin: "50% 0%" });
        gsap.set(origin, {
          scale: 0,
          opacity: 0,
          transformOrigin: "50% 50%",
        });
        gsap.set(humanPath, {
          strokeDasharray: humanLen,
          strokeDashoffset: humanLen,
        });
        gsap.set(agenticPath, {
          strokeDasharray: agenticLen,
          strokeDashoffset: agenticLen,
        });
        gsap.set([humanEnd, agenticEnd], {
          scale: 0,
          opacity: 0,
          transformOrigin: "50% 50%",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          once: true,
        },
      });

      tl.to(header, { opacity: 1, y: 0, duration: 0.5, ease: ease.out }, 0).to(
        forkVisual,
        { opacity: 1, y: 0, duration: 0.45, ease: ease.out },
        0.2,
      );

      if (hasPaths) {
        tl.to(trunk, { scaleY: 1, duration: 0.5, ease: ease.out }, 0.25)
          .to(
            origin,
            { scale: 1, opacity: 1, duration: 0.35, ease: ease.out },
            0.5,
          )
          .to(
            humanPath,
            { strokeDashoffset: 0, duration: 0.7, ease: ease.out },
            0.65,
          )
          .to(
            agenticPath,
            { strokeDashoffset: 0, duration: 0.7, ease: ease.out },
            0.65,
          )
          .to(
            [humanEnd, agenticEnd],
            { scale: 1, opacity: 1, duration: 0.3, ease: ease.out },
            1.15,
          );
      }

      tl.to(
        [humanContent, agenticContent],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: ease.out,
          stagger: 0.08,
          onComplete: () => {
            gsap.set([humanContent, agenticContent], {
              clearProps: "opacity,transform",
            });
            setRevealed(true);
          },
        },
        hasPaths ? 1.2 : 0.55,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (touch || reduced || !svgRef.current) return;
    const svg = svgRef.current;
    const humanEnd = humanEndRef.current;
    const agenticEnd = agenticEndRef.current;
    if (!humanEnd || !agenticEnd) return;

    const onMove = (event: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      gsap.to(humanEnd, {
        x: nx * 4,
        y: ny * 3,
        duration: 0.55,
        ease: ease.soft,
        overwrite: "auto",
      });
      gsap.to(agenticEnd, {
        x: nx * 4,
        y: ny * 3,
        duration: 0.55,
        ease: ease.soft,
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to([humanEnd, agenticEnd], {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: ease.soft,
      });
    };

    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerleave", onLeave);
    return () => {
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, touch]);

  const humanDim = hovered === "agentic";
  const agenticDim = hovered === "human";
  const humanHref = getLocalizedPath(locale, "research/human");
  const agenticHref = getLocalizedPath(locale, "research/agentic-ai");

  return (
    <section
      id="choose-direction"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10 py-24 md:py-32"
      aria-labelledby="choose-direction-heading"
    >
      <div className="editorial-grid relative z-10">
        <div ref={headerRef} className="col-span-12 md:col-span-10">
          <SectionLabel>{copy.label}</SectionLabel>
          <h2
            id="choose-direction-heading"
            className="headline-section mt-6 max-w-5xl"
          >
            {copy.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {copy.supporting}
          </p>
        </div>

        {/* Fork visual — desktop SVG + mobile simplified branch */}
        <div ref={forkVisualRef} className="col-span-12 mt-10 md:mt-12">
          {/* Mobile fork */}
          <div className="flex flex-col items-center md:hidden">
            <p className="label-mono text-[11px] text-ink/45">{copy.origin}</p>
            <div className="mt-3 h-9 w-px bg-white/25" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
            <svg
              className="h-14 w-36"
              viewBox="0 0 144 56"
              fill="none"
              aria-hidden
            >
              <path
                d="M72 0 C 72 16, 36 32, 16 52"
                stroke="rgba(242,240,234,0.35)"
                strokeWidth="1"
              />
              <path
                d="M72 0 C 72 16, 108 32, 128 52"
                stroke="rgba(242,240,234,0.35)"
                strokeWidth="1"
              />
              <circle cx="16" cy="52" r="2.5" fill="rgba(242,240,234,0.7)" />
              <circle cx="128" cy="52" r="2.5" fill="rgba(242,240,234,0.7)" />
            </svg>
          </div>

          {/* Desktop fork */}
          <svg
            ref={svgRef}
            className="mx-auto hidden h-[min(36vw,360px)] w-full max-w-5xl md:block"
            viewBox="0 0 1000 380"
            fill="none"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="500"
              y="28"
              textAnchor="middle"
              fill="rgba(242,240,234,0.4)"
              style={{
                fontFamily: "var(--font-mono), ui-monospace, monospace",
                fontSize: "11px",
                letterSpacing: "0.2em",
              }}
            >
              {copy.origin}
            </text>

            <line
              ref={trunkRef}
              x1="500"
              y1="42"
              x2="500"
              y2="120"
              stroke="rgba(242,240,234,0.3)"
              strokeWidth="1"
            />

            <path
              ref={humanPathRef}
              d="M500 120 C 455 170, 320 250, 180 340"
              stroke={
                humanDim
                  ? "rgba(242,240,234,0.1)"
                  : hovered === "human"
                    ? "rgba(158,27,50,0.75)"
                    : "rgba(242,240,234,0.35)"
              }
              strokeWidth={hovered === "human" ? 1.35 : 1}
              className="transition-[stroke,stroke-width] duration-500 ease-out"
            />

            <path
              ref={agenticPathRef}
              d="M500 120 C 545 170, 680 250, 820 340"
              stroke={
                agenticDim
                  ? "rgba(242,240,234,0.1)"
                  : hovered === "agentic"
                    ? "rgba(158,27,50,0.75)"
                    : "rgba(242,240,234,0.35)"
              }
              strokeWidth={hovered === "agentic" ? 1.35 : 1}
              className="transition-[stroke,stroke-width] duration-500 ease-out"
            />

            <circle ref={originRef} cx="500" cy="120" r="4.5" fill="#9e1b32" />
            <circle
              cx="500"
              cy="120"
              r="10"
              stroke="rgba(158,27,50,0.3)"
              strokeWidth="1"
              fill="none"
              className={cx(
                "transition-opacity duration-500",
                revealed ? "opacity-100" : "opacity-0",
              )}
            />

            <circle
              ref={humanEndRef}
              cx="180"
              cy="340"
              r="3.5"
              fill={hovered === "human" ? "#9e1b32" : "rgba(242,240,234,0.75)"}
              className="transition-[fill] duration-500"
            />
            <circle
              ref={agenticEndRef}
              cx="820"
              cy="340"
              r="3.5"
              fill={
                hovered === "agentic" ? "#9e1b32" : "rgba(242,240,234,0.75)"
              }
              className="transition-[fill] duration-500"
            />

            <g
              className={cx(
                "transition-opacity duration-500",
                hovered === "human" ? "opacity-80" : "opacity-0",
              )}
            >
              <circle cx="440" cy="165" r="1.4" fill="rgba(242,240,234,0.45)" />
              <circle cx="360" cy="220" r="1.6" fill="rgba(158,27,50,0.7)" />
              <circle cx="280" cy="275" r="1.4" fill="rgba(242,240,234,0.45)" />
              <circle cx="230" cy="310" r="1.3" fill="rgba(242,240,234,0.35)" />
            </g>

            <g
              className={cx(
                "transition-opacity duration-500",
                hovered === "agentic" ? "opacity-90" : "opacity-0",
              )}
            >
              {[
                [555, 160],
                [630, 210],
                [705, 265],
                [765, 310],
              ].map(([x, y], i) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="1.7"
                  fill="#9e1b32"
                  style={{
                    opacity: hovered === "agentic" ? 0.35 + i * 0.15 : 0,
                    transition: `opacity 0.35s ease ${i * 70}ms`,
                  }}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Destinations — parallel columns (human left, agentic right) */}
        <div className="col-span-12 mt-2 grid grid-cols-2 gap-x-4 border-t border-white/10 pt-6 md:mt-4 md:gap-16 md:border-t-0 md:pt-0 lg:gap-24">
          <Link
            ref={humanContentRef}
            href={humanHref}
            onMouseEnter={() => !touch && setHovered("human")}
            onMouseLeave={() => !touch && setHovered(null)}
            onFocus={() => setHovered("human")}
            onBlur={() => setHovered(null)}
            className={cx(
              "max-w-md transition-[opacity,transform] duration-500 ease-out md:pt-2",
              humanDim ? "opacity-35" : "opacity-100",
              hovered === "human" && "md:-translate-y-0.5",
            )}
            aria-label={`${copy.human.title}. ${copy.human.cta}`}
          >
            <p className="label-mono text-[10px] text-accent md:text-[11px]">
              {copy.human.code}
            </p>
            <h3 className="mt-3 text-[clamp(1.05rem,4.2vw,2rem)] font-medium leading-[1.08] tracking-[-0.03em] md:mt-4">
              {copy.human.title}
            </h3>
            <p className="mt-3 text-[12px] leading-relaxed text-muted md:mt-4 md:text-[0.95rem]">
              {copy.human.description}
            </p>
            <p
              className={cx(
                "label-mono mt-4 text-[8px] leading-relaxed tracking-[0.08em] text-ink/40 transition-opacity duration-500 md:mt-5 md:text-[10px] md:tracking-[0.12em]",
                hovered === "human" || touch ? "opacity-100" : "opacity-45",
              )}
            >
              {copy.human.meta}
            </p>
            <span className="label-mono mt-4 inline-flex min-h-10 items-center gap-1.5 text-[10px] text-ink md:mt-6 md:min-h-11 md:gap-2 md:text-[11px]">
              {copy.human.cta}
              <span aria-hidden>→</span>
            </span>
          </Link>

          <Link
            ref={agenticContentRef}
            href={agenticHref}
            onMouseEnter={() => !touch && setHovered("agentic")}
            onMouseLeave={() => !touch && setHovered(null)}
            onFocus={() => setHovered("agentic")}
            onBlur={() => setHovered(null)}
            className={cx(
              "max-w-md justify-self-end text-right transition-[opacity,transform] duration-500 ease-out md:pt-2",
              agenticDim ? "opacity-35" : "opacity-100",
              hovered === "agentic" && "md:-translate-y-0.5",
            )}
            aria-label={`${copy.agentic.title}. ${copy.agentic.cta}`}
          >
            <p className="label-mono text-[10px] text-accent md:text-[11px]">
              {copy.agentic.code}
            </p>
            <h3 className="mt-3 text-[clamp(1.05rem,4.2vw,2rem)] font-medium leading-[1.08] tracking-[-0.03em] md:mt-4">
              {copy.agentic.title}
            </h3>
            <p className="mt-3 ml-auto text-[12px] leading-relaxed text-muted md:mt-4 md:text-[0.95rem]">
              {copy.agentic.description}
            </p>
            <p
              className={cx(
                "label-mono mt-4 text-[8px] leading-relaxed tracking-[0.08em] text-ink/40 transition-opacity duration-500 md:mt-5 md:text-[10px] md:tracking-[0.12em]",
                hovered === "agentic" || touch ? "opacity-100" : "opacity-45",
              )}
            >
              {copy.agentic.meta}
            </p>
            <span className="label-mono mt-4 inline-flex min-h-10 items-center justify-end gap-1.5 text-[10px] text-ink md:mt-6 md:min-h-11 md:gap-2 md:text-[11px]">
              {copy.agentic.cta}
              <span aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
