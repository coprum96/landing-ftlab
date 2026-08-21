"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";
import type { SignalKey, SignalState } from "./types";

type Props = {
  dict: Dictionary["experiments"];
  active: SignalState;
  pulse: boolean;
  broken: boolean;
  reducedMotion: boolean;
};

type NodeDef = {
  key: SignalKey;
  x: number;
  y: number;
};

const NODES: NodeDef[] = [
  { key: "authority", x: 8, y: 28 },
  { key: "urgency", x: 8, y: 100 },
  { key: "loss", x: 8, y: 172 },
  { key: "timePressure", x: 148, y: 64 },
  { key: "cognitiveLoad", x: 148, y: 140 },
  { key: "forcedFlow", x: 288, y: 84 },
  { key: "commitment", x: 288, y: 160 },
];

const EDGES: [SignalKey, SignalKey][] = [
  ["authority", "timePressure"],
  ["urgency", "timePressure"],
  ["loss", "cognitiveLoad"],
  ["urgency", "cognitiveLoad"],
  ["timePressure", "forcedFlow"],
  ["cognitiveLoad", "forcedFlow"],
  ["forcedFlow", "commitment"],
];

/**
 * Research-style signal graph — nodes + thin links + optional burgundy pulse.
 */
export function SignalNetwork({
  dict,
  active,
  pulse,
  broken,
  reducedMotion,
}: Props) {
  const uid = useId();
  const [focus, setFocus] = useState<SignalKey | null>(null);
  const signals = dict.signals;

  const nodeMap = Object.fromEntries(NODES.map((n) => [n.key, n])) as Record<
    SignalKey,
    NodeDef
  >;

  return (
    <div className="relative">
      <svg
        viewBox="0 0 420 220"
        className="h-auto w-full max-w-full"
        role="img"
        aria-label={dict.analysisTitle}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`${uid}-pulse`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(158,27,50,0)" />
            <stop offset="50%" stopColor="rgba(158,27,50,0.95)" />
            <stop offset="100%" stopColor="rgba(158,27,50,0)" />
          </linearGradient>
        </defs>

        {EDGES.map(([from, to]) => {
          const a = nodeMap[from];
          const b = nodeMap[to];
          const lit = active[from] && active[to] && !broken;
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x + 56}
              y1={a.y + 12}
              x2={b.x}
              y2={b.y + 12}
              stroke={lit ? "rgba(158,27,50,0.55)" : "rgba(255,255,255,0.12)"}
              strokeWidth={lit ? 1.25 : 0.75}
              strokeDasharray={broken && lit ? "3 4" : undefined}
              className="transition-[stroke] duration-700"
            />
          );
        })}

        {pulse && !broken && !reducedMotion ? (
          <circle r="3.5" fill={`url(#${uid}-pulse)`}>
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              path="M120,40 C160,40 170,76 200,76 C250,76 270,96 288,96"
            />
          </circle>
        ) : null}

        {NODES.map((node) => {
          const on = active[node.key];
          const signal = signals[node.key];
          const isFocus = focus === node.key;
          return (
            <g
              key={node.key}
              transform={`translate(${node.x}, ${node.y})`}
              opacity={on ? 1 : 0.22}
              className="transition-opacity duration-500"
              onMouseEnter={() => on && setFocus(node.key)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => on && setFocus(node.key)}
              onBlur={() => setFocus(null)}
              tabIndex={on ? 0 : -1}
              role="button"
              aria-label={`${signal.label}: ${signal.detail}`}
            >
              <rect
                width="112"
                height="24"
                rx="0"
                fill={on ? "rgba(12,12,12,0.92)" : "transparent"}
                stroke={
                  on
                    ? isFocus
                      ? "rgba(158,27,50,0.9)"
                      : "rgba(158,27,50,0.45)"
                    : "rgba(255,255,255,0.12)"
                }
                strokeWidth={1}
              />
              <circle
                cx="10"
                cy="12"
                r="2.5"
                fill={on ? "#9e1b32" : "rgba(255,255,255,0.25)"}
              />
              <text
                x="20"
                y="15.5"
                fill={on ? "#f2f0ea" : "#b0afa8"}
                fontSize="8"
                fontFamily="var(--font-mono), monospace"
                letterSpacing="0.08em"
              >
                {signal.label}
              </text>
            </g>
          );
        })}
      </svg>

      {focus ? (
        <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
          <span className="label-mono text-[11px] text-accent">
            {signals[focus].label}
          </span>
          <span className="mt-1 block">{signals[focus].detail}</span>
        </p>
      ) : null}
    </div>
  );
}

type RevealListProps = {
  dict: Dictionary["experiments"];
  active: SignalState;
  keys: SignalKey[];
};

export function SignalRevealList({ dict, active, keys }: RevealListProps) {
  return (
    <ul className="mt-6 space-y-4">
      {keys.map((key) => {
        const signal = dict.signals[key];
        const on = active[key];
        return (
          <li
            key={key}
            className={cx(
              "border-l pl-4 transition-all duration-500",
              on
                ? "border-accent opacity-100 translate-y-0"
                : "pointer-events-none border-white/10 opacity-0 translate-y-2",
            )}
          >
            <p className="label-mono text-[11px] text-accent">
              SIGNAL {signal.id}
            </p>
            <p className="label-mono mt-1 text-[12px] text-ink">{signal.label}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              {signal.blurb}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
