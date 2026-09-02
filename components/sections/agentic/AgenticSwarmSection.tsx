"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  AgenticSwarmField,
  type SwarmMode,
} from "@/components/visual/AgenticSwarmField";
import type { Dictionary } from "@/lib/i18n";
import { useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

const MODES: SwarmMode[] = ["contained", "hold", "cascade"];

/**
 * Interactive multi-agent risk field — live topology + HITL membrane.
 */
export function AgenticSwarmSection({ dict }: { dict: Dictionary }) {
  const copy = dict.pages.agenticAi.swarm;
  const [mode, setMode] = useState<SwarmMode>("contained");
  const [injectKey, setInjectKey] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [liveMessage, setLiveMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotionPreferred();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  const inject = () => {
    setInjectKey((k) => k + 1);
    setLiveMessage(copy.liveInject);
  };

  const reset = () => {
    setMode("contained");
    setInjectKey(0);
    setResetKey((k) => k + 1);
    setLiveMessage(copy.liveReset);
  };

  return (
    <section
      id="live-topology"
      className="agentic-anchor border-t border-white/15 py-10 md:py-16"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{copy.label}</SectionLabel>
            <p className="label-mono mt-5 text-xs tracking-[0.12em] text-accent">
              {copy.status}
            </p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.5rem,3.4vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {copy.supporting}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/75 md:text-[15px]">
              {copy.instructions}
            </p>
          </FadeIn>
        </div>

        <ul className="col-span-12 mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            copy.legendAgents,
            copy.legendRisk,
            copy.legendMembrane,
            copy.legendSettlement,
          ].map((item) => (
            <li
              key={item}
              className="border border-white/15 px-3 py-3 text-sm leading-snug text-ink/80"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="col-span-12 mt-8 flex flex-col gap-5 md:mt-10">
          <div>
            <p className="label-mono mb-3 text-xs tracking-[0.12em] text-ink/65">
              {copy.modeGroup}
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label={copy.modeGroup}
            >
              {MODES.map((id) => {
                const active = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setMode(id);
                      setLiveMessage(copy.modesHint[id]);
                    }}
                    className={cx(
                      "label-mono min-h-11 border px-4 py-3 text-xs tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      active
                        ? "border-accent/70 bg-accent/[0.14] text-ink"
                        : "border-white/20 text-ink/70 hover:border-white/35 hover:text-ink",
                    )}
                  >
                    {copy.modes[id]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="label-mono mb-3 text-xs tracking-[0.12em] text-ink/65">
              {copy.actionGroup}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={inject}
                className="label-mono min-h-11 border border-accent/70 bg-accent/15 px-4 py-3 text-xs tracking-[0.1em] text-ink transition-colors hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {copy.inject}
              </button>
              <button
                type="button"
                onClick={reset}
                className="label-mono min-h-11 border border-white/25 px-4 py-3 text-xs tracking-[0.1em] text-ink transition-colors hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {copy.reset}
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-12 relative mt-5 overflow-hidden border border-white/20 bg-[#070707]">
          {!reduced ? (
            <video
              ref={videoRef}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
              src="/media/videos/abstract-scientific.mp4"
              poster="/media/posters/abstract-scientific.jpg"
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/75 to-[#070707]/45"
            aria-hidden
          />
          <AgenticSwarmField
            key={resetKey}
            mode={mode}
            injectKey={injectKey}
            onCanvasInject={inject}
            className="relative z-10 h-[260px] w-full md:h-[340px]"
          />
        </div>

        <div className="col-span-12 mt-4">
          <p className="text-sm font-medium text-ink">
            {copy.resultLabel}:{" "}
            <span className="font-normal text-muted">
              {copy.modes[mode]} — {copy.modesHint[mode]}
            </span>
          </p>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {liveMessage}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">{copy.footer}</p>
        </div>
      </div>
    </section>
  );
}
