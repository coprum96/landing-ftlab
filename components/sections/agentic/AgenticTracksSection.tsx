"use client";

import { useId, useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  governanceFlow,
  intentFidelitySteps,
  multiAgentLoop,
  safetyTracks,
  type TrackStatus,
} from "@/data/agenticSafety";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

function statusLabel(dict: Dictionary, status: TrackStatus) {
  return dict.pages.agenticAi.tracks.statuses[status];
}

function VerticalFlow({
  steps,
  locale,
}: {
  steps: { en: string; ru: string }[];
  locale: Locale;
}) {
  return (
    <ol className="space-y-0">
      {steps.map((step, index) => (
        <li key={`${step.en}-${index}`}>
          <p className="label-mono text-xs tracking-[0.08em] text-ink">
            {step[locale]}
          </p>
          {index < steps.length - 1 ? (
            <p className="label-mono py-1.5 text-xs text-ink/45" aria-hidden>
              ↓
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function GovernanceDiagram({ locale }: { locale: Locale }) {
  const g = governanceFlow;
  return (
    <div className="border border-accent/35 bg-accent/[0.04] p-4 md:p-5">
      <p className="label-mono text-[10px] tracking-[0.12em] text-ink/50">
        {g.agent[locale]}
      </p>
      <p className="label-mono py-1.5 text-[9px] text-ink/30" aria-hidden>
        ↓
      </p>
      <p className="label-mono text-[10px] tracking-[0.1em] text-ink">
        {g.proposed[locale]}
      </p>
      <p className="label-mono py-1.5 text-[9px] text-ink/30" aria-hidden>
        ↓
      </p>
      <div className="border border-accent/50 bg-[#0a0a0a] px-3 py-3">
        <p className="label-mono text-[9px] tracking-[0.14em] text-accent">
          [ {g.layer[locale].toUpperCase()} ]
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {g.signals.map((s) => (
            <li
              key={s.en}
              className="label-mono text-[9px] tracking-[0.08em] text-ink/70"
            >
              · {s[locale]}
            </li>
          ))}
        </ul>
      </div>
      <p className="label-mono py-1.5 text-[9px] text-ink/30" aria-hidden>
        ↓
      </p>
      <p className="label-mono text-[10px] tracking-[0.12em] text-ink">
        {g.policy[locale]}
      </p>
      <p className="label-mono py-1.5 text-[9px] text-ink/30" aria-hidden>
        ↓
      </p>
      <div className="flex flex-wrap gap-2">
        {g.decisions.map((d) => (
          <span
            key={d.en}
            className="label-mono border border-white/15 px-2.5 py-1.5 text-[10px] tracking-[0.12em] text-ink"
          >
            {d[locale]}
          </span>
        ))}
      </div>
      <p className="label-mono py-1.5 text-[9px] text-ink/30" aria-hidden>
        ↓
      </p>
      <p className="label-mono text-[10px] tracking-[0.12em] text-accent">
        {g.execution[locale]}
      </p>
    </div>
  );
}

function TrackVisual({
  id,
  locale,
  formula,
}: {
  id: string;
  locale: Locale;
  formula: string;
}) {
  if (id === "intent-fidelity") {
    return (
      <div className="space-y-5">
        <VerticalFlow steps={intentFidelitySteps} locale={locale} />
        <p className="label-mono border-t border-white/10 pt-4 text-[10px] leading-relaxed tracking-[0.06em] text-ink/45">
          {formula}
        </p>
      </div>
    );
  }
  if (id === "execution-governance") {
    return <GovernanceDiagram locale={locale} />;
  }
  if (id === "machine-speed") {
    return (
      <div className="space-y-4">
        <VerticalFlow steps={multiAgentLoop} locale={locale} />
        <p className="label-mono border-t border-white/10 pt-4 text-[10px] leading-relaxed tracking-[0.06em] text-ink/45">
          {formula}
        </p>
      </div>
    );
  }
  return null;
}

export function AgenticTracksSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.pages.agenticAi.tracks;
  const baseId = useId();
  const [openId, setOpenId] = useState(safetyTracks[0]?.id ?? "");

  return (
    <section
      id="research-tracks"
      className="agentic-anchor border-t border-white/15 py-10 md:py-16"
    >
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-9">
          <FadeIn>
            <SectionLabel>{t.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-3xl">{t.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {t.supporting}
            </p>
            <div className="mt-6 max-w-2xl border border-white/15 px-4 py-4">
              <p className="label-mono text-xs tracking-[0.1em] text-ink/65">
                {t.statusLegendLabel}
              </p>
              <ul className="mt-3 space-y-2">
                {(
                  [
                    "active",
                    "building",
                    "research",
                    "planned",
                  ] as const
                ).map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink/80 md:text-[15px]"
                  >
                    <span
                      className={cx(
                        "mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full",
                        key === "active" && "bg-ink",
                        key === "building" && "bg-accent",
                        key === "research" && "bg-ink/45",
                        key === "planned" && "border border-white/40 bg-transparent",
                      )}
                      aria-hidden
                    />
                    <span>{t.statusDefs[key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-8 border-t border-white/15 md:mt-10">
          {safetyTracks.map((track) => {
            const open = openId === track.id;
            const panelId = `${baseId}-${track.id}-panel`;
            const buttonId = `${baseId}-${track.id}-button`;
            return (
              <article
                key={track.id}
                id={track.id}
                className="agentic-anchor border-b border-white/15"
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? "" : track.id)}
                    className="grid min-h-14 w-full grid-cols-12 items-start gap-3 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:gap-6 md:py-6"
                  >
                    <span className="col-span-2 label-mono pt-1 text-xs text-accent md:col-span-1">
                      {track.code}
                    </span>
                    <span className="col-span-9 md:col-span-4">
                      <span className="block text-[clamp(1.05rem,2vw,1.45rem)] font-medium tracking-[-0.02em] text-ink">
                        {track.title[locale]}
                      </span>
                      <span
                        className={cx(
                          "label-mono mt-2 inline-flex items-center gap-2 text-xs tracking-[0.1em]",
                          track.status === "active" && "text-ink",
                          track.status === "building" && "text-accent",
                          track.status === "research" && "text-ink/70",
                          track.status === "planned" && "text-ink/55",
                        )}
                      >
                        <span
                          className={cx(
                            "inline-block h-1.5 w-1.5 rounded-full",
                            track.status === "active" && "bg-ink",
                            track.status === "building" && "bg-accent",
                            track.status === "research" && "bg-ink/45",
                            track.status === "planned" &&
                              "border border-white/40 bg-transparent",
                          )}
                          aria-hidden
                        />
                        {statusLabel(dict, track.status)}
                      </span>
                    </span>
                    <span
                      className="col-span-1 flex justify-end pt-1 text-ink/70 md:col-span-1"
                      aria-hidden
                    >
                      <span
                        className={cx(
                          "inline-flex h-8 w-8 items-center justify-center border border-white/25 text-sm transition-transform",
                          open ? "rotate-45 border-accent/50 text-accent" : "",
                        )}
                      >
                        +
                      </span>
                    </span>
                    <span className="col-span-12 text-base leading-relaxed text-muted md:col-span-6">
                      {track.headline[locale]}
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className={cx(open ? "pb-6 md:pb-10" : "")}
                >
                  {open ? (
                    <div className="grid grid-cols-12 gap-6 md:gap-8">
                      <div className="col-span-12 md:col-span-7 md:col-start-2">
                        <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
                          {track.description[locale]}
                        </p>
                        <p className="mt-5 max-w-2xl text-base font-medium leading-snug tracking-[-0.015em] text-ink">
                          {track.question[locale]}
                        </p>

                        {track.parallel ? (
                          <div className="mt-6 space-y-3 border-l border-white/15 pl-4">
                            <div>
                              <p className="label-mono text-[9px] tracking-[0.14em] text-ink/35">
                                {t.humanCase}
                              </p>
                              <p className="label-mono mt-1.5 text-[10px] tracking-[0.08em] text-ink/70">
                                {track.parallel.human[locale]}
                              </p>
                            </div>
                            <div>
                              <p className="label-mono text-[9px] tracking-[0.14em] text-accent/70">
                                {t.agentCase}
                              </p>
                              <p className="label-mono mt-1.5 text-[10px] tracking-[0.08em] text-ink">
                                {track.parallel.agent[locale]}
                              </p>
                            </div>
                            <p className="pt-1 text-sm text-muted">
                              {t.authShift}
                            </p>
                          </div>
                        ) : null}

                        {track.productNote ? (
                          <p className="label-mono mt-5 text-[10px] tracking-[0.1em] text-ink/40">
                            {track.productNote[locale]}
                          </p>
                        ) : null}

                        <ul className="mt-6 flex flex-wrap gap-2">
                          {track.focus.map((f) => (
                            <li
                              key={f.en}
                              className="label-mono border border-white/20 px-2.5 py-2 text-xs tracking-[0.08em] text-ink/80"
                            >
                              {f[locale]}
                            </li>
                          ))}
                        </ul>

                        <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-relaxed text-ink/75 md:text-[15px]">
                          <span className="font-medium text-ink">
                            {t.nextAction}.
                          </span>{" "}
                          {t.nextActionHint}
                        </p>
                      </div>

                      <div className="col-span-12 md:col-span-4">
                        <p className="label-mono mb-4 text-[9px] tracking-[0.14em] text-ink/35">
                          {t.diagramLabel}
                        </p>
                        {track.id === "behavioral-integrity" ? (
                          <div className="border border-white/10 p-4">
                            <p className="label-mono text-[9px] tracking-[0.12em] text-ink/40">
                              {t.traditionalQ}
                            </p>
                            <p className="mt-2 text-sm text-muted">
                              {t.traditionalA}
                            </p>
                            <p className="label-mono mt-5 text-[9px] tracking-[0.12em] text-accent">
                              {t.ftlabQ}
                            </p>
                            <p className="mt-2 text-sm text-ink">{t.ftlabA}</p>
                          </div>
                        ) : (
                          <TrackVisual
                            id={track.id}
                            locale={locale}
                            formula={
                              track.id === "intent-fidelity"
                                ? t.intentFormula
                                : track.id === "machine-speed"
                                  ? t.speedFormula
                                  : ""
                            }
                          />
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
