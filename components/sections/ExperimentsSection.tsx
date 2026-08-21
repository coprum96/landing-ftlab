"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { DecisionNetwork } from "@/components/visual/DecisionNetwork";
import { useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";

type Phase = "idle" | "running" | "caught" | "missed";

const DURATION = 45;

/**
 * Live pressure probe — a safe micro-simulation of stacked social-engineering cues.
 */
export function ExperimentsSection({ dict }: { dict: Dictionary }) {
  const reduced = useReducedMotionPreferred();
  const [phase, setPhase] = useState<Phase>("idle");
  const [left, setLeft] = useState(DURATION);

  const levers = useMemo(
    () =>
      phase === "idle"
        ? []
        : [
            dict.decisionNetwork.labels[3], // URGENCY
            dict.decisionNetwork.labels[4], // AUTHORITY
            dict.decisionNetwork.labels[2], // LOSS
          ],
    [dict.decisionNetwork.labels, phase],
  );

  useEffect(() => {
    if (phase !== "running") return;

    if (reduced) {
      const id = window.setInterval(() => {
        setLeft((prev) => {
          const next = Math.max(0, prev - 1);
          if (next <= 0) setPhase("missed");
          return next;
        });
      }, 1000);
      return () => window.clearInterval(id);
    }

    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = Math.max(0, (now - started) / 1000);
      const remain = Math.max(0, DURATION - elapsed);
      setLeft(remain);
      if (remain <= 0) {
        setPhase("missed");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, reduced]);

  const start = () => {
    setLeft(DURATION);
    setPhase("running");
  };

  const confirm = () => {
    if (phase !== "running") return;
    setPhase("missed");
  };

  const refuse = () => {
    if (phase !== "running") return;
    setPhase("caught");
  };

  const done = phase === "caught" || phase === "missed";
  const cta =
    phase === "idle"
      ? dict.experiments.cta
      : phase === "running"
        ? dict.experiments.ctaRunning
        : dict.experiments.ctaDone;

  return (
    <section id="experiments" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 opacity-35" aria-hidden>
        <DecisionNetwork density={60} interactive={false} scrollLinked />
      </div>
      <div
        className={cx(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          phase === "running" ? "opacity-100" : "opacity-0",
        )}
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(158,27,50,0.16), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="editorial-grid relative z-10">
        <div className="col-span-12 md:col-span-5">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.experiments.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6">
              {dict.experiments.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-8 max-w-xl text-base leading-relaxed text-muted"
            >
              {dict.experiments.supporting}
            </p>
            <p className="label-mono mt-6 text-[12px] text-muted">
              {dict.experiments.probeHint}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 md:col-span-6 md:col-start-7 md:mt-0">
          <div
            className={cx(
              "relative border border-white/12 bg-[#0c0c0c]/80 p-6 backdrop-blur-[6px] transition-[border-color,box-shadow] duration-500 md:p-8",
              phase === "running" && "border-accent/50 shadow-[0_0_0_1px_rgba(158,27,50,0.2)]",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label-mono text-[12px] text-accent">
                  {dict.experiments.probePrompt}
                </p>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink/90 md:text-base">
                  {dict.experiments.probeBody}
                </p>
              </div>
              {phase === "running" ? (
                <div className="shrink-0 text-right" aria-live="polite">
                  <p className="label-mono text-[11px] text-muted">
                    {dict.experiments.probeTimer}
                  </p>
                  <p className="mt-1 font-mono text-2xl tabular-nums tracking-tight text-accent">
                    {Math.ceil(left).toString().padStart(2, "0")}
                  </p>
                </div>
              ) : null}
            </div>

            {phase === "running" ? (
              <div className="mt-5 h-px w-full overflow-hidden bg-white/10">
                <div
                  className="h-full bg-accent transition-[width] duration-100 ease-linear"
                  style={{ width: `${(left / DURATION) * 100}%` }}
                />
              </div>
            ) : null}

            {levers.length > 0 && phase === "running" ? (
              <div className="mt-6">
                <p className="label-mono text-[11px] text-muted">
                  {dict.experiments.probeLevers}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {levers.map((lever) => (
                    <span
                      key={lever}
                      className="label-mono border border-white/12 px-3 py-2 text-[11px] text-ink/85"
                    >
                      {lever}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {done ? (
              <div className="mt-6 space-y-6" aria-live="polite">
                <div>
                  <p className="label-mono text-[12px] text-accent">
                    {dict.experiments.resultTitle}
                  </p>
                  <p
                    className={cx(
                      "mt-2 text-[15px] leading-relaxed md:text-base",
                      phase === "caught" ? "text-ink" : "text-accent",
                    )}
                  >
                    {phase === "caught"
                      ? dict.experiments.probeResultCaught
                      : dict.experiments.probeResultMissed}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {phase === "caught"
                      ? dict.experiments.whyCaught
                      : dict.experiments.whyMissed}
                  </p>
                </div>

                <div>
                  <p className="label-mono text-[12px] text-accent">
                    {dict.experiments.influencedTitle}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {levers.map((lever) => (
                      <span
                        key={lever}
                        className="label-mono border border-white/12 px-3 py-2 text-[11px] text-ink/85"
                      >
                        {lever}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="label-mono text-[12px] text-accent">
                    {dict.experiments.saferTitle}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted md:text-[15px]">
                    {phase === "caught"
                      ? dict.experiments.saferCaught
                      : dict.experiments.saferMissed}
                  </p>
                </div>

                <div>
                  <p className="label-mono text-[12px] text-accent">
                    {dict.experiments.researchTitle}
                  </p>
                  <Link
                    href="#research"
                    className="label-mono mt-3 inline-flex min-h-11 items-center text-[12px] text-ink underline decoration-white/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {dict.experiments.researchLink}
                  </Link>
                  <p className="mt-4 text-[12px] leading-relaxed text-muted">
                    {dict.experiments.disclaimer}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              {phase === "idle" || done ? (
                <button
                  type="button"
                  onClick={start}
                  className="label-mono min-h-11 border border-white/20 px-5 py-3 text-[12px] text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {cta}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={confirm}
                    className="label-mono min-h-11 border border-accent/60 bg-accent/15 px-5 py-3 text-[12px] text-ink transition-colors duration-300 hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {dict.experiments.probeAction}
                  </button>
                  <button
                    type="button"
                    onClick={refuse}
                    className="label-mono min-h-11 border border-white/15 px-5 py-3 text-[12px] text-muted transition-colors duration-300 hover:border-white/35 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {dict.experiments.probeRefuse}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
