"use client";

import type { Dictionary } from "@/lib/i18n";
import { DecisionPaths } from "./DecisionPaths";
import { SignalNetwork, SignalRevealList } from "./SignalNetwork";
import type { ExperimentPhase, SignalKey, SignalState } from "./types";
import { cx } from "@/lib/utils";

type Props = {
  dict: Dictionary["experiments"];
  phase: ExperimentPhase;
  active: SignalState;
  status: string;
  showPattern: boolean;
  showPaths: boolean;
  broken: boolean;
  complianceReached: boolean;
  reducedMotion: boolean;
  revealKeys: SignalKey[];
};

/**
 * FTLAB signal analysis — compact on mobile, fuller on desktop.
 */
export function AnalysisPanel({
  dict,
  phase,
  active,
  status,
  showPattern,
  showPaths,
  broken,
  complianceReached,
  reducedMotion,
  revealKeys,
}: Props) {
  const pulse =
    phase === "stage2" || phase === "completed" || showPattern;

  const litKeys = revealKeys.filter((k) => active[k]);

  return (
    <div className="border border-white/10 bg-[#0a0a0a]/80 p-5 sm:p-6 md:p-7 xl:p-8">
      <p className="label-mono text-[12px] text-ink">{dict.analysisTitle}</p>
      <p className="label-mono mt-3 text-[11px] text-accent" aria-live="polite">
        STATUS
      </p>
      <p className="mt-1 text-[13px] leading-relaxed text-muted">{status}</p>

      {/* Mobile: simple signal chips */}
      <div className="mt-5 flex flex-wrap gap-2 md:hidden">
        {litKeys.length === 0 ? (
          <span className="label-mono border border-white/10 px-2.5 py-1.5 text-[10px] text-muted">
            …
          </span>
        ) : (
          litKeys.map((key) => (
            <span
              key={key}
              className="label-mono border border-accent/40 px-2.5 py-1.5 text-[10px] text-accent"
            >
              {dict.signals[key].label}
            </span>
          ))
        )}
      </div>

      {/* Desktop: network graph */}
      <div className="mt-6 hidden md:block">
        <SignalNetwork
          dict={dict}
          active={active}
          pulse={pulse && !broken}
          broken={broken}
          reducedMotion={reducedMotion}
        />
      </div>

      <div className="hidden md:block">
        <SignalRevealList dict={dict} active={active} keys={revealKeys} />
      </div>

      {showPattern ? (
        <div
          className="mt-6 space-y-4 border-t border-white/10 pt-5 sm:mt-8 sm:space-y-5 sm:pt-6"
          aria-live="polite"
        >
          <div>
            <p className="label-mono text-[11px] text-accent">
              {dict.patternTitle}
            </p>
            <p className="label-mono mt-2 text-[11px] text-ink sm:mt-3 sm:text-[12px]">
              {dict.patternName}
            </p>
          </div>
          <div>
            <p className="label-mono text-[11px] text-muted">
              {dict.patternMechanismsLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {dict.patternMechanisms.map((m) => (
                <span
                  key={m}
                  className="label-mono border border-accent/35 px-2.5 py-1.5 text-[10px] text-accent"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-ink/90 sm:text-[14px]">
            <span className="label-mono text-[11px] text-muted">
              {dict.patternObjectiveLabel}
            </span>
            <span className="mt-1 block">{dict.patternObjective}</span>
          </p>
        </div>
      ) : null}

      {showPaths ? (
        <div className={cx(broken || complianceReached ? "" : "hidden md:block")}>
          <DecisionPaths
            dict={dict}
            attackerLit={!broken}
            safeLit={broken}
            broken={broken}
            complianceReached={complianceReached}
          />
        </div>
      ) : null}

      {broken ? (
        <div className="mt-6 space-y-4 border-t border-white/10 pt-5 sm:mt-8 sm:space-y-5 sm:pt-6">
          <p className="label-mono text-[11px] text-accent">
            {dict.whyWorkedTitle}
          </p>
          <ol className="space-y-2.5 sm:space-y-3">
            {dict.whyWorked.map((item, i) => (
              <li
                key={item}
                className="flex gap-3 text-[13px] leading-relaxed text-muted sm:text-[14px]"
              >
                <span className="label-mono shrink-0 text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="label-mono text-[11px] text-ink">
            {dict.safeDecisionPath.join(" → ")}
          </p>
        </div>
      ) : null}

      {complianceReached && !broken ? (
        <div className="mt-6 space-y-4 border-t border-white/10 pt-5 sm:mt-8 sm:space-y-5 sm:pt-6">
          <div>
            <p className="label-mono text-[11px] text-accent">
              {dict.whereWonTitle}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted sm:text-[14px]">
              {dict.whereWonBody}
            </p>
            <p className="label-mono mt-3 text-[10px] text-accent sm:text-[11px]">
              {dict.whereWonStack.join(" + ")} → {dict.whereWonEnd}
            </p>
          </div>
          <div>
            <p className="label-mono text-[11px] text-accent">
              {dict.defensiveTitle}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted sm:text-[14px]">
              {dict.defensiveBody}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
