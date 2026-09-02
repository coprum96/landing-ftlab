"use client";

import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary } from "@/lib/i18n";

/**
 * Atmospheric motion band: abstract video + research chain.
 * Keeps FTLAB dark/minimal language while adding living motion.
 */
export function AgenticMotionBand({ dict }: { dict: Dictionary }) {
  const copy = dict.pages.agenticAi.motionBand;
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
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section className="relative overflow-hidden border-t border-white/15">
      <div className="relative min-h-[28vh] md:min-h-[34vh]">
        {!reduced ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            src="/media/videos/decision-network.mp4"
            poster="/media/posters/decision-network.jpg"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
        ) : (
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(158,27,50,0.18),transparent_55%)]"
            aria-hidden
          />
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-[#080808]/40"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50"
          aria-hidden
        />

        <div className="editorial-grid relative z-10 flex min-h-[28vh] items-end py-8 md:min-h-[34vh] md:py-12">
          <div className="col-span-12 md:col-span-8">
            <FadeIn>
              <p className="label-mono text-xs tracking-[0.12em] text-accent">
                {copy.label}
              </p>
              <p className="mt-4 max-w-2xl text-[clamp(1.25rem,2.8vw,1.85rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
                {copy.line}
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
