"use client";

import { useRef } from "react";
import { DecisionNetwork } from "@/components/visual/DecisionNetwork";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { useHeroReveal } from "@/components/motion/HeroReveal";
import type { Dictionary } from "@/lib/i18n";

export function Hero({ dict }: { dict: Dictionary }) {
  const rootRef = useRef<HTMLElement>(null);
  const { headlineRef, lightRef } = useHeroReveal(rootRef);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[min(100svh,900px)] items-end overflow-hidden pb-14 pt-16 md:pb-20 md:pt-20"
    >
      <DecisionNetwork
        labels={dict.decisionNetwork.labels}
        interactive
        scrollLinked
        density={95}
        className="opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,8,8,0.55)_70%,#080808_100%)]" />
      <div
        ref={lightRef}
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-700"
        aria-hidden
      />

      <div className="editorial-grid relative z-10 w-full">
        <p
          data-hero-meta
          className="col-span-12 label-mono mb-8 text-[11px] md:col-span-5"
        >
          {dict.hero.label}
        </p>

        <h1
          ref={headlineRef as React.RefObject<HTMLHeadingElement>}
          className="col-span-12 headline-hero max-w-[18ch] will-change-transform"
        >
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              {dict.hero.line1}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              {dict.hero.line2}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              {dict.hero.line3}
            </span>
          </span>
        </h1>

        <p
          data-hero-desc
          className="col-span-12 mt-10 max-w-xl text-base leading-relaxed text-muted md:col-span-5 md:col-start-8 md:mt-12 md:justify-self-end md:text-lg"
        >
          {dict.hero.supporting}
        </p>

        <div data-hero-meta className="col-span-12 mt-12 md:col-span-4">
          <MagneticLink
            href="#research-directions"
            className="label-mono group items-center gap-3 text-sm text-ink"
            strength={0.2}
          >
            <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
              {dict.hero.cta}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-accent transition-transform duration-500 group-hover:scale-x-110" />
            </span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-y-1.5"
            >
              ↓
            </span>
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
