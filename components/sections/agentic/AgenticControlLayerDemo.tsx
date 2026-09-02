"use client";

import { useMemo, useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AgenticGateFlow } from "@/components/visual/AgenticGateFlow";
import {
  controlScenarios,
  signalLabels,
  type GateDecision,
  type SignalLevel,
} from "@/data/controlLayerDemo";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

function levelTone(
  key: keyof typeof signalLabels,
  level: SignalLevel,
): string {
  const inverted =
    key === "intentFidelity" || key === "authority"
      ? level === "high"
        ? "good"
        : level === "medium"
          ? "mid"
          : "bad"
      : level === "low"
        ? "good"
        : level === "medium"
          ? "mid"
          : "bad";

  if (inverted === "good") return "border-white/20 text-ink";
  if (inverted === "mid") return "border-accent/35 text-ink/80";
  return "border-accent/60 bg-accent/[0.07] text-ink";
}

function decisionStyle(decision: GateDecision) {
  if (decision === "ALLOW")
    return "border-white/25 bg-white/[0.04] text-ink";
  if (decision === "REVIEW")
    return "border-accent/50 bg-accent/[0.08] text-ink";
  return "border-accent bg-accent/15 text-ink";
}

export function AgenticControlLayerDemo({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.pages.agenticAi.controlDemo;
  const [scenarioId, setScenarioId] = useState(controlScenarios[0].id);
  const scenario = useMemo(
    () =>
      controlScenarios.find((s) => s.id === scenarioId) ?? controlScenarios[0],
    [scenarioId],
  );

  const levelLabel = (level: SignalLevel) => copy.levels[level];

  return (
    <section
      id="control-layer"
      className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-14 md:py-24"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
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
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/55">
              {copy.note}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 overflow-hidden border border-white/10 bg-[#070707] md:mt-10">
          <AgenticGateFlow
            decision={scenario.decision}
            className="h-36 w-full md:h-44"
          />
        </div>

        <div className="col-span-12 mt-6 md:mt-8">
          <p className="label-mono mb-3 text-[10px] tracking-[0.14em] text-ink/40">
            {copy.scenarioLabel}
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label={copy.scenarioLabel}
          >
            {controlScenarios.map((item) => {
              const active = item.id === scenario.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setScenarioId(item.id)}
                  className={cx(
                    "label-mono min-h-11 shrink-0 border px-4 py-3 text-[10px] tracking-[0.12em] transition-colors",
                    active
                      ? "border-accent/60 bg-accent/[0.08] text-ink"
                      : "border-white/10 text-ink/45 hover:text-ink/80",
                  )}
                >
                  {item.label[locale]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-12 mt-8 grid grid-cols-1 gap-6 border border-white/10 bg-[#090909] p-5 md:mt-10 md:grid-cols-12 md:gap-8 md:p-8">
          <div className="md:col-span-5">
            <p className="label-mono text-[9px] tracking-[0.16em] text-ink/35">
              {copy.flowLabel}
            </p>
            <ol className="mt-5 space-y-0">
              {(
                [
                  ["01", copy.steps.intent, scenario.intent[locale]],
                  ["02", copy.steps.agent, scenario.agent[locale]],
                  ["03", copy.steps.action, scenario.action[locale]],
                ] as const
              ).map(([code, label, text], index) => (
                <li key={code}>
                  <p className="label-mono text-[10px] tracking-[0.14em] text-accent">
                    {code} / {label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink md:text-[15px]">
                    {text}
                  </p>
                  {index < 2 ? (
                    <p
                      className="label-mono py-3 text-[9px] text-ink/30"
                      aria-hidden
                    >
                      ↓
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <div className="md:col-span-7 md:border-l md:border-white/10 md:pl-8">
            <p className="label-mono text-[9px] tracking-[0.16em] text-ink/35">
              {copy.layerLabel}
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(
                Object.keys(scenario.signals) as Array<
                  keyof typeof scenario.signals
                >
              ).map((key) => {
                const level = scenario.signals[key];
                return (
                  <li
                    key={key}
                    className={cx(
                      "flex items-center justify-between gap-3 border px-3 py-3 transition-colors duration-500",
                      levelTone(key, level),
                    )}
                  >
                    <span className="label-mono text-[10px] tracking-[0.1em]">
                      {signalLabels[key][locale]}
                    </span>
                    <span className="label-mono text-[10px] tracking-[0.12em] text-ink/70">
                      {levelLabel(level)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">
              <p className="label-mono text-[9px] tracking-[0.16em] text-ink/35">
                {copy.decisionLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["ALLOW", "REVIEW", "BLOCK"] as GateDecision[]).map(
                  (option) => {
                    const active = scenario.decision === option;
                    return (
                      <span
                        key={option}
                        className={cx(
                          "label-mono border px-3 py-2 text-[11px] tracking-[0.14em] transition-colors duration-500",
                          active
                            ? decisionStyle(option)
                            : "border-white/10 text-ink/25",
                        )}
                      >
                        {option}
                      </span>
                    );
                  },
                )}
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                {scenario.rationale[locale]}
              </p>
            </div>
          </div>
        </div>

        <p className="col-span-12 mt-6 label-mono text-[10px] tracking-[0.12em] text-ink/40">
          {copy.footer}
        </p>
      </div>
    </section>
  );
}
