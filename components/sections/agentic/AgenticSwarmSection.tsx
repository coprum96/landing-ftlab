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

  return (
    <section
      id="swarm"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-14 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{copy.label}</SectionLabel>
            <p className="label-mono mt-5 text-[10px] tracking-[0.16em] text-accent">
              {copy.status}
            </p>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.5rem,3.4vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              {copy.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {copy.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 flex flex-wrap items-center gap-2 md:mt-10">
          <p className="label-mono mr-2 text-[10px] tracking-[0.14em] text-ink/40">
            {copy.modeLabel}
          </p>
          {MODES.map((id) => {
            const active = mode === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={cx(
                  "label-mono min-h-11 border px-4 py-3 text-[10px] tracking-[0.12em] transition-colors",
                  active
                    ? "border-accent/60 bg-accent/[0.08] text-ink"
                    : "border-white/10 text-ink/45 hover:text-ink/80",
                )}
              >
                {copy.modes[id]}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setInjectKey((k) => k + 1)}
            className="label-mono ml-auto min-h-11 border border-accent/50 bg-accent/[0.1] px-4 py-3 text-[10px] tracking-[0.12em] text-ink transition-colors hover:bg-accent/[0.16]"
          >
            {copy.inject}
          </button>
        </div>

        <div className="col-span-12 relative mt-5 overflow-hidden border border-white/10 bg-[#070707]">
          <video
            ref={videoRef}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18]"
            src="/media/videos/abstract-scientific.mp4"
            poster="/media/posters/abstract-scientific.jpg"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/70 to-[#070707]/40"
            aria-hidden
          />
          <AgenticSwarmField
            mode={mode}
            injectKey={injectKey}
            onCanvasInject={() => setInjectKey((k) => k + 1)}
            className="relative z-10 h-[280px] w-full md:h-[380px]"
          />
        </div>

        <p className="col-span-12 mt-4 max-w-2xl text-sm leading-relaxed text-ink/55">
          {copy.modesHint[mode]}
        </p>
        <p className="col-span-12 mt-3 label-mono text-[10px] tracking-[0.12em] text-ink/35">
          {copy.footer}
        </p>
      </div>
    </section>
  );
}
