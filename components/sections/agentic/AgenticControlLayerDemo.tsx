"use client";

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
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

  if (inverted === "good") return "border-white/25 bg-white/[0.03] text-ink";
  if (inverted === "mid") return "border-accent/45 bg-accent/[0.06] text-ink";
  return "border-accent/70 bg-accent/[0.12] text-ink";
}

function decisionGlyph(decision: GateDecision) {
  if (decision === "ALLOW") return "○";
  if (decision === "REVIEW") return "◇";
  return "×";
}

function decisionStyle(decision: GateDecision, active: boolean) {
  if (!active) return "border-white/20 text-ink/55";
  if (decision === "ALLOW")
    return "border-white/40 bg-white/[0.08] text-ink ring-1 ring-white/25";
  if (decision === "REVIEW")
    return "border-accent/70 bg-accent/[0.14] text-ink ring-1 ring-accent/40";
  return "border-accent bg-accent/25 text-ink ring-1 ring-accent/60";
}

export function AgenticControlLayerDemo({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.pages.agenticAi.controlDemo;
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [scenarioId, setScenarioId] = useState(controlScenarios[0].id);
  const scenario = useMemo(
    () =>
      controlScenarios.find((s) => s.id === scenarioId) ?? controlScenarios[0],
    [scenarioId],
  );

  const levelLabel = (level: SignalLevel) => copy.levels[level];
  const panelId = `${baseId}-panel`;
  const selectedIndex = controlScenarios.findIndex((s) => s.id === scenario.id);

  const selectScenario = useCallback((id: string, focus = false) => {
    setScenarioId(id);
    if (!focus) return;
    const index = controlScenarios.findIndex((s) => s.id === id);
    tabRefs.current[index]?.focus();
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = controlScenarios.length;
    if (count === 0) return;

    let next = selectedIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      next = (selectedIndex + 1) % count;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      next = (selectedIndex - 1 + count) % count;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = count - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectScenario(controlScenarios[selectedIndex].id, true);
      return;
    } else {
      return;
    }

    selectScenario(controlScenarios[next].id, true);
  };

  const liveSummary = copy.liveSummary
    .replace("{scenario}", scenario.label[locale])
    .replace("{decision}", scenario.decision)
    .replace(
      "{risk}",
      `${signalLabels.behavioralRisk[locale]}: ${levelLabel(scenario.signals.behavioralRisk)}`,
    );

  return (
    <section
      id="control-layer"
      className="agentic-anchor border-t border-white/15 py-10 md:py-16"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-10">
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
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70 md:text-[15px]">
              {copy.note}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-6 overflow-hidden border border-white/15 bg-[#070707] md:mt-8">
          <AgenticGateFlow
            decision={scenario.decision}
            className="h-36 w-full md:h-44"
          />
        </div>

        <div className="col-span-12 mt-6 md:mt-8">
          <p
            id={`${baseId}-tablist-label`}
            className="label-mono mb-3 text-xs tracking-[0.12em] text-ink/65"
          >
            {copy.scenarioLabel}
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-labelledby={`${baseId}-tablist-label`}
            aria-orientation="horizontal"
          >
            {controlScenarios.map((item, index) => {
              const active = item.id === scenario.id;
              const tabId = `${baseId}-tab-${item.id}`;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={panelId}
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectScenario(item.id)}
                  onKeyDown={onTabKeyDown}
                  className={cx(
                    "label-mono min-h-11 shrink-0 border px-4 py-3 text-xs tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    active
                      ? "border-accent/70 bg-accent/[0.14] text-ink underline decoration-accent decoration-2 underline-offset-8"
                      : "border-white/20 text-ink/70 hover:border-white/35 hover:text-ink",
                  )}
                >
                  {active ? `✓ ${item.label[locale]}` : item.label[locale]}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${scenario.id}`}
          tabIndex={0}
          className="col-span-12 mt-6 border border-white/15 bg-[#090909] p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mt-8 md:p-8"
        >
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {liveSummary}
          </p>

          <p className="text-sm font-medium tracking-[-0.01em] text-ink md:text-base">
            {copy.selectedDecision}:{" "}
            <span className="label-mono text-xs tracking-[0.1em] text-accent">
              {decisionGlyph(scenario.decision)} {scenario.decision}
            </span>
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="label-mono text-xs tracking-[0.12em] text-ink/65">
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
                    <p className="label-mono text-xs tracking-[0.12em] text-accent">
                      {code} / {label}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-ink">
                      {text}
                    </p>
                    {index < 2 ? (
                      <p
                        className="label-mono py-3 text-xs text-ink/45"
                        aria-hidden
                      >
                        ↓
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>

            <div className="md:col-span-7 md:border-l md:border-white/15 md:pl-8">
              <p className="label-mono text-xs tracking-[0.12em] text-ink/65">
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
                      <span className="label-mono text-xs tracking-[0.08em] text-ink">
                        {signalLabels[key][locale]}
                      </span>
                      <span className="label-mono text-xs tracking-[0.1em] text-ink">
                        {levelLabel(level)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6">
                <p className="label-mono text-xs tracking-[0.12em] text-ink/65">
                  {copy.decisionLabel}
                </p>
                <div
                  className="mt-3 flex flex-wrap gap-2"
                  role="list"
                  aria-label={copy.decisionLabel}
                >
                  {(["ALLOW", "REVIEW", "BLOCK"] as GateDecision[]).map(
                    (option) => {
                      const active = scenario.decision === option;
                      return (
                        <span
                          key={option}
                          role="listitem"
                          aria-current={active ? "true" : undefined}
                          className={cx(
                            "label-mono inline-flex min-h-11 items-center gap-2 border px-3 py-2 text-xs tracking-[0.1em] transition-colors duration-500",
                            decisionStyle(option, active),
                          )}
                        >
                          <span aria-hidden>{decisionGlyph(option)}</span>
                          {option}
                          {active ? (
                            <span className="sr-only">
                              {copy.selectedMarker}
                            </span>
                          ) : null}
                        </span>
                      );
                    },
                  )}
                </div>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                  {scenario.rationale[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="col-span-12 mt-5 text-sm leading-relaxed text-ink/65">
          {copy.footer}
        </p>
      </div>
    </section>
  );
}
