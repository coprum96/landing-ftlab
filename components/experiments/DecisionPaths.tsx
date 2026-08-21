"use client";

import type { Dictionary } from "@/lib/i18n";
import { cx } from "@/lib/utils";

type Props = {
  dict: Dictionary["experiments"];
  attackerLit: boolean;
  safeLit: boolean;
  broken: boolean;
  complianceReached: boolean;
};

function PathRow({
  label,
  nodes,
  tone,
  severed,
}: {
  label: string;
  nodes: string[];
  tone: "attack" | "safe";
  severed?: boolean;
}) {
  const accent = tone === "attack";
  return (
    <div>
      <p
        className={cx(
          "label-mono text-[11px]",
          accent ? "text-accent" : "text-muted",
        )}
      >
        {label}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:gap-x-2">
        {nodes.map((node, i) => {
          const cut =
            severed && accent && i >= Math.max(1, nodes.length - 2);
          return (
            <span key={`${label}-${node}`} className="flex items-center gap-1.5 sm:gap-2">
              {i > 0 ? (
                <span
                  className={cx(
                    "h-px w-3 sm:w-4 md:w-6",
                    cut
                      ? "bg-accent/30"
                      : accent
                        ? "bg-accent/70"
                        : "bg-white/35",
                    severed && accent && i === nodes.length - 1
                      ? "opacity-20"
                      : "",
                  )}
                  aria-hidden
                />
              ) : null}
              <span
                className={cx(
                  "label-mono border px-2 py-1 text-[9px] tracking-[0.06em] transition-colors duration-700 sm:px-2.5 sm:py-1.5 sm:text-[10px] sm:tracking-[0.08em]",
                  accent
                    ? cut
                      ? "border-accent/25 text-accent/40 line-through decoration-accent/50"
                      : "border-accent/55 text-accent"
                    : "border-white/20 text-ink/90",
                )}
              >
                {node}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Dual decision paths — attacker (burgundy) vs safe (off-white).
 */
export function DecisionPaths({
  dict,
  attackerLit,
  safeLit,
  broken,
  complianceReached,
}: Props) {
  return (
    <div className="mt-8 space-y-7 border-t border-white/10 pt-6">
      <p className="label-mono text-[11px] text-muted">{dict.pathsTitle}</p>
      <div
        className={cx(
          "space-y-6 transition-opacity duration-500",
          attackerLit || complianceReached ? "opacity-100" : "opacity-40",
        )}
      >
        <PathRow
          label={dict.attackerPathLabel}
          nodes={dict.attackerPath}
          tone="attack"
          severed={broken}
        />
      </div>
      <div
        className={cx(
          "space-y-2 transition-opacity duration-500",
          safeLit || broken ? "opacity-100" : "opacity-35",
        )}
      >
        <PathRow
          label={dict.safePathLabel}
          nodes={dict.safePath}
          tone="safe"
        />
      </div>
    </div>
  );
}
