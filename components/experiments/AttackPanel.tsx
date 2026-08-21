"use client";

import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";
import type { ExperimentPhase } from "./types";

type Props = {
  dict: Dictionary["experiments"];
  phase: ExperimentPhase;
  secondsLeft: number;
  duration: number;
  stepLabel: string;
  onPrimary: () => void;
  onSecondary: () => void;
};

function formatTime(seconds: number) {
  return Math.max(0, Math.ceil(seconds)).toString().padStart(2, "0");
}

/**
 * Attack surface — short copy, large touch targets, mobile-first.
 */
export function AttackPanel({
  dict,
  phase,
  secondsLeft,
  duration,
  stepLabel,
  onPrimary,
  onSecondary,
}: Props) {
  const isStage = phase === "stage1" || phase === "stage2";

  if (phase === "broken") {
    return (
      <div
        className="border border-white/12 bg-[#0c0c0c]/90 p-5 sm:p-6 md:p-8"
        aria-live="polite"
      >
        <p className="label-mono text-[12px] text-accent">{dict.statusBroken}</p>
        <p className="mt-3 text-xl font-medium tracking-[-0.03em] text-ink sm:text-2xl md:text-3xl">
          {dict.brokenHeadline}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-muted sm:text-[15px]">
          {dict.brokenSub}
        </p>
      </div>
    );
  }

  if (phase === "completed") {
    return (
      <div
        className="border border-accent/40 bg-[#0c0c0c]/90 p-5 sm:p-6 md:p-8"
        aria-live="polite"
      >
        <p className="label-mono text-[12px] text-accent">
          {dict.completedHeadline}
        </p>
        <p className="mt-3 text-xl font-medium tracking-[-0.03em] text-ink sm:text-2xl md:text-3xl">
          {dict.completedHeadline}
        </p>
        <p className="label-mono mt-5 text-[12px] text-ink">
          {dict.completedSafeNote}
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-muted sm:text-[15px]">
          {dict.completedSafeBody}
        </p>
      </div>
    );
  }

  const title = phase === "stage2" ? dict.stage2Title : dict.stage1Title;
  const body = phase === "stage2" ? dict.stage2Body : dict.stage1Body;
  const timerLabel =
    phase === "stage2" ? dict.stage2TimerLabel : dict.stage1TimerLabel;
  const primary = phase === "stage2" ? dict.stage2Primary : dict.stage1Primary;
  const secondary =
    phase === "stage2" ? dict.stage2Secondary : dict.stage1Secondary;

  return (
    <div
      className={cx(
        "relative border bg-[#0c0c0c]/90 p-5 backdrop-blur-[6px] transition-[border-color] duration-500 sm:p-6 md:p-8",
        isStage ? "border-white/18" : "border-white/12",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="label-mono text-[10px] text-muted sm:text-[11px]">
            {stepLabel}
          </p>
          <p className="label-mono mt-2 text-[11px] text-muted">{title}</p>
          {phase === "stage1" ? (
            <>
              <p className="mt-3 text-lg font-medium tracking-[-0.03em] text-ink sm:text-xl md:text-2xl">
                {dict.stage1Headline}
              </p>
              <p className="mt-2 font-mono text-2xl tabular-nums tracking-tight text-ink sm:text-3xl">
                {dict.stage1Amount}
              </p>
            </>
          ) : null}
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/90 sm:text-[15px]">
            {body}
          </p>
        </div>
        {isStage ? (
          <div className="shrink-0 text-right" aria-live="polite">
            <p className="label-mono text-[10px] text-muted">{timerLabel}</p>
            <p className="mt-1 font-mono text-2xl tabular-nums tracking-tight text-accent sm:text-3xl">
              {formatTime(secondsLeft)}
            </p>
          </div>
        ) : null}
      </div>

      {isStage ? (
        <div className="mt-4 h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-accent/80 transition-[width] duration-100 ease-linear"
            style={{
              width: `${Math.max(0, (secondsLeft / duration) * 100)}%`,
            }}
          />
        </div>
      ) : null}

      <div className="mt-6 grid gap-3">
        <button
          type="button"
          onClick={onPrimary}
          className="label-mono min-h-12 w-full border border-white/25 px-4 py-3.5 text-[12px] text-ink transition-colors duration-300 hover:border-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-11"
        >
          {primary}
        </button>
        <button
          type="button"
          onClick={onSecondary}
          className="label-mono min-h-12 w-full border border-white/12 px-4 py-3.5 text-[12px] text-muted transition-colors duration-300 hover:border-white/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-11"
        >
          {secondary}
        </button>
      </div>
    </div>
  );
}
