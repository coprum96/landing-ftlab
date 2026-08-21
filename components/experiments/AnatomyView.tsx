"use client";

import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/i18n";
import { lab } from "@/data/lab";
import { cx } from "@/lib/utils";

type Props = {
  dict: Dictionary["experiments"];
  locale: Locale;
  outcome: "broken" | "completed";
  onAgain: () => void;
  reducedMotion: boolean;
};

/**
 * Full-width climax: attack anatomy + how FTLAB reads the scenario.
 */
export function AnatomyView({
  dict,
  locale,
  outcome,
  onAgain,
  reducedMotion,
}: Props) {
  return (
    <div className="col-span-12" aria-live="polite">
      <p className="label-mono text-[12px] text-accent">{dict.statusAnatomy}</p>
      <h3 className="mt-4 max-w-3xl text-2xl font-medium tracking-[-0.04em] text-ink sm:text-3xl md:text-5xl">
        {dict.anatomyTitle}
      </h3>

      <div className="mt-8 grid gap-10 border-t border-white/10 pt-8 sm:mt-12 sm:gap-12 sm:pt-10 lg:grid-cols-2">
        <div>
          <p className="label-mono text-[11px] text-accent">
            {dict.anatomyAttackLabel}
          </p>
          <ul className="mt-6 space-y-0">
            {dict.anatomyAttack.map((node, i) => {
              const branch = i > 0 && i < 5;
              return (
                <li key={node} className="relative pl-6">
                  {i < dict.anatomyAttack.length - 1 ? (
                    <span
                      className="absolute left-[7px] top-5 h-[calc(100%-4px)] w-px bg-accent/40"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className={cx(
                      "absolute left-0 top-2 h-3.5 w-3.5 rounded-full border",
                      i === dict.anatomyAttack.length - 1
                        ? "border-accent bg-accent/80"
                        : "border-accent/60 bg-[#0c0c0c]",
                      !reducedMotion && i === dict.anatomyAttack.length - 1
                        ? "animate-pulse"
                        : "",
                    )}
                    aria-hidden
                  />
                  <p
                    className={cx(
                      "label-mono py-2 text-[12px]",
                      branch ? "text-accent/90" : "text-ink",
                    )}
                  >
                    {branch ? `├── ${node}` : node}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className="label-mono text-[11px] text-muted">
            {dict.anatomyDefenseLabel}
          </p>
          <ul className="mt-6 space-y-0">
            {dict.anatomyDefense.map((node, i) => (
              <li key={node} className="relative pl-6">
                {i < dict.anatomyDefense.length - 1 ? (
                  <span
                    className="absolute left-[7px] top-5 h-[calc(100%-4px)] w-px bg-white/25"
                    aria-hidden
                  />
                ) : null}
                <span
                  className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border border-white/35 bg-[#0c0c0c]"
                  aria-hidden
                />
                <p className="label-mono py-2 text-[12px] text-ink/90">{node}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-sm text-[14px] leading-relaxed text-muted">
            {outcome === "broken" ? dict.brokenSub : dict.defensiveBody}
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-8 sm:mt-16 sm:pt-10">
        <p className="label-mono text-[12px] text-ink">{dict.readsTitle}</p>
        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted">
          {dict.readsNote}
        </p>
        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4">
          {dict.reads.map((layer) => (
            <div key={layer.id}>
              <p className="label-mono text-[11px] text-accent">
                {layer.id} / {layer.label}
              </p>
              <ul className="mt-3 space-y-1.5">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="text-[14px] leading-relaxed text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 sm:mt-12">
          <p className="label-mono text-[11px] text-muted">
            {dict.classificationLabel}
          </p>
          <p className="label-mono mt-2 text-[13px] text-ink">
            {dict.classification}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-3 sm:mt-14 sm:flex sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={onAgain}
          className="label-mono min-h-12 w-full border border-white/20 px-5 py-3.5 text-[12px] text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-11 sm:w-auto"
        >
          {dict.ctaAgain}
        </button>
        <Link
          href={`${getLocalizedPath(locale)}#research`}
          className="label-mono inline-flex min-h-12 w-full items-center justify-center border border-white/12 px-5 py-3.5 text-[12px] text-muted transition-colors hover:border-white/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-11 sm:w-auto sm:justify-start"
        >
          {dict.ctaResearch}
        </Link>
        <Link
          href={getLocalizedPath(locale, "research")}
          className="label-mono inline-flex min-h-12 w-full items-center justify-center border border-white/12 px-5 py-3.5 text-[12px] text-muted transition-colors hover:border-white/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-11 sm:w-auto sm:justify-start"
        >
          {dict.ctaExplore}
        </Link>
        <a
          href={lab.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-mono inline-flex min-h-12 w-full items-center justify-center border border-white/12 px-5 py-3.5 text-[12px] text-muted transition-colors hover:border-white/30 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-11 sm:w-auto sm:justify-start"
        >
          {dict.ctaLinkedIn}
        </a>
      </div>

      <p className="mt-8 max-w-2xl text-[12px] leading-relaxed text-muted">
        {dict.disclaimer}
      </p>
    </div>
  );
}
