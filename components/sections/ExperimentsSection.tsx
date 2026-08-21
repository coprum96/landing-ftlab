"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { DecisionNetwork } from "@/components/visual/DecisionNetwork";
import { AnalysisPanel } from "@/components/experiments/AnalysisPanel";
import { AnatomyView } from "@/components/experiments/AnatomyView";
import { AttackPanel } from "@/components/experiments/AttackPanel";
import {
  EMPTY_SIGNALS,
  STAGE_DURATION,
  type ExperimentPhase,
  type SignalKey,
  type SignalState,
} from "@/components/experiments/types";
import { useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

/**
 * Ephemeral anti-fraud simulation — two short stages, mobile-first.
 * Component state only; nothing is stored or sent.
 */
export function ExperimentsSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const reduced = useReducedMotionPreferred();
  const copy = dict.experiments;

  const [phase, setPhase] = useState<ExperimentPhase>("intro");
  const [left, setLeft] = useState<number>(STAGE_DURATION.stage1);
  const [signals, setSignals] = useState<SignalState>(EMPTY_SIGNALS);
  const [lastOutcome, setLastOutcome] = useState<"broken" | "completed">(
    "broken",
  );

  const duration =
    phase === "stage2" ? STAGE_DURATION.stage2 : STAGE_DURATION.stage1;

  const reset = () => {
    setPhase("intro");
    setLeft(STAGE_DURATION.stage1);
    setSignals(EMPTY_SIGNALS);
  };

  const enter = () => {
    setSignals(EMPTY_SIGNALS);
    setLeft(STAGE_DURATION.stage1);
    setPhase("stage1");
  };

  const breakFlow = () => {
    setLastOutcome("broken");
    setSignals((prev) => ({
      ...prev,
      urgency: true,
      loss: true,
      authority: true,
      forcedFlow: true,
      cognitiveLoad: true,
    }));
    setPhase("broken");
  };

  const advanceAttack = () => {
    if (phase === "stage1") {
      setLeft(STAGE_DURATION.stage2);
      setPhase("stage2");
      return;
    }
    if (phase === "stage2") {
      setLastOutcome("completed");
      setPhase("completed");
    }
  };

  const expireStage = () => {
    // Timeout = attacker path wins — end cleanly (no extra stage)
    setLastOutcome("completed");
    setSignals((prev) => ({
      ...prev,
      urgency: true,
      loss: true,
      authority: true,
      forcedFlow: true,
      cognitiveLoad: true,
      commitment: true,
      timePressure: true,
    }));
    setPhase("completed");
  };

  useEffect(() => {
    if (phase !== "stage1" && phase !== "stage2") return;

    const total =
      phase === "stage1" ? STAGE_DURATION.stage1 : STAGE_DURATION.stage2;

    if (reduced) {
      const id = window.setInterval(() => {
        setLeft((prev) => {
          const next = Math.max(0, prev - 1);
          if (next <= 0) expireStage();
          return next;
        });
      }, 1000);
      return () => window.clearInterval(id);
    }

    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = Math.max(0, (now - started) / 1000);
      const remain = Math.max(0, total - elapsed);
      setLeft(remain);
      if (remain <= 0) {
        expireStage();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, reduced]);

  useEffect(() => {
    if (phase === "intro" || phase === "anatomy" || phase === "broken") return;

    const timers: number[] = [];
    const activate = (key: SignalKey, delay: number) => {
      timers.push(
        window.setTimeout(() => {
          setSignals((prev) => ({ ...prev, [key]: true }));
        }, reduced ? 0 : delay),
      );
    };

    if (phase === "stage1") {
      activate("urgency", 300);
      activate("loss", 700);
      activate("authority", 1100);
    }

    if (phase === "stage2" || phase === "completed") {
      activate("forcedFlow", 200);
      activate("cognitiveLoad", 500);
      activate("commitment", 800);
      activate("timePressure", 100);
    }

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== "broken" && phase !== "completed") return;
    const id = window.setTimeout(
      () => setPhase("anatomy"),
      reduced ? 800 : 2200,
    );
    return () => window.clearTimeout(id);
  }, [phase, reduced]);

  const inAttackStage = phase === "stage1" || phase === "stage2";

  const activeSignals: SignalState = {
    ...signals,
    timePressure:
      signals.timePressure ||
      (inAttackStage && duration > 0 && left / duration <= 0.4),
  };

  const status = useMemo(() => {
    if (phase === "broken") return copy.statusBroken;
    if (phase === "completed") return copy.statusCompleted;
    if (phase === "anatomy") return copy.statusAnatomy;
    if (phase === "stage2" && activeSignals.commitment) {
      return copy.statusPattern;
    }
    if (phase === "stage2") return copy.statusEscalation;
    return copy.statusAnalyzing;
  }, [phase, activeSignals.commitment, copy]);

  const showPattern =
    (phase === "stage2" && activeSignals.forcedFlow) ||
    phase === "broken" ||
    phase === "completed";

  const revealKeys: SignalKey[] =
    phase === "stage1"
      ? ["urgency", "loss", "authority"]
      : [
          "urgency",
          "loss",
          "authority",
          "forcedFlow",
          "cognitiveLoad",
          "commitment",
        ];

  const inSimulation = phase !== "intro" && phase !== "anatomy";
  const stepLabel =
    phase === "stage1"
      ? copy.step1
      : phase === "stage2"
        ? copy.step2
        : "";

  return (
    <section id="experiments" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 opacity-25 md:opacity-30" aria-hidden>
        <DecisionNetwork density={40} interactive={false} scrollLinked />
      </div>
      <div
        className={cx(
          "pointer-events-none absolute inset-0 transition-opacity duration-700",
          inSimulation || phase === "anatomy" ? "opacity-100" : "opacity-0",
        )}
        style={{
          background:
            phase === "broken" || lastOutcome === "broken"
              ? "radial-gradient(ellipse at 70% 40%, rgba(242,240,234,0.06), transparent 55%)"
              : "radial-gradient(ellipse at 70% 40%, rgba(158,27,50,0.12), transparent 55%)",
        }}
        aria-hidden
      />

      <div
        className={cx(
          "relative z-10 mx-auto grid grid-cols-12",
          inSimulation || phase === "anatomy"
            ? "w-[min(100%-1.25rem,1720px)] gap-x-4 gap-y-0 sm:w-[min(100%-2rem,1720px)]"
            : "editorial-grid",
        )}
      >
        {phase === "intro" ? (
          <>
            <div className="col-span-12 lg:col-span-7">
              <FadeIn>
                <div data-reveal-number>
                  <SectionLabel>{copy.label}</SectionLabel>
                </div>
                <h2
                  data-reveal-title
                  className="headline-section mt-5 whitespace-pre-line text-[clamp(1.75rem,6vw,3.5rem)]"
                >
                  {copy.heading}
                </h2>
                <p
                  data-reveal-block
                  className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-8 sm:text-base"
                >
                  {copy.supporting}
                </p>
                <button
                  type="button"
                  onClick={enter}
                  className="label-mono mt-8 min-h-12 w-full border border-white/20 px-5 py-3.5 text-[12px] text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:mt-10 sm:w-auto"
                >
                  {copy.ctaEnter}
                </button>
                <p className="label-mono mt-5 text-[11px] text-muted">
                  {copy.safeLabel}
                </p>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted">
                  {copy.safeHint}
                </p>
              </FadeIn>
            </div>
            <div className="col-span-12 mt-8 hidden sm:block lg:col-span-5 lg:col-start-8 lg:mt-0">
              <div className="border border-white/12 bg-[#0c0c0c]/75 p-5 md:p-7">
                <p className="label-mono text-[11px] text-muted">
                  {copy.stage1Title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/90">
                  {copy.stage1Headline}. {copy.stage1Amount}.
                </p>
                <p className="label-mono mt-6 text-[11px] text-accent">
                  {copy.ctaEnter}
                </p>
              </div>
            </div>
          </>
        ) : null}

        {inSimulation ? (
          <>
            <div className="col-span-12 xl:col-span-5">
              <AttackPanel
                dict={copy}
                phase={phase}
                secondsLeft={left}
                duration={duration}
                stepLabel={stepLabel}
                onPrimary={advanceAttack}
                onSecondary={breakFlow}
              />
              {(phase === "broken" || phase === "completed") && (
                <button
                  type="button"
                  onClick={() => setPhase("anatomy")}
                  className="label-mono mt-4 min-h-12 w-full border border-accent/50 bg-accent/10 px-5 py-3.5 text-[12px] text-ink transition-colors hover:bg-accent/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto"
                >
                  {copy.continueAnatomy}
                </button>
              )}
            </div>
            <div className="col-span-12 mt-6 xl:col-span-7 xl:mt-0">
              <AnalysisPanel
                dict={copy}
                phase={phase}
                active={activeSignals}
                status={status}
                showPattern={showPattern}
                showPaths={showPattern}
                broken={phase === "broken"}
                complianceReached={phase === "completed"}
                reducedMotion={reduced}
                revealKeys={revealKeys}
              />
            </div>
          </>
        ) : null}

        {phase === "anatomy" ? (
          <AnatomyView
            dict={copy}
            locale={locale}
            outcome={lastOutcome}
            onAgain={reset}
            reducedMotion={reduced}
          />
        ) : null}
      </div>
    </section>
  );
}
