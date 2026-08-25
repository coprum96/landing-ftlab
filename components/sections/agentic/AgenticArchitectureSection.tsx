"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { architectureLayers } from "@/data/agentic";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";

/**
 * Interactive vertical system map for autonomous financial architecture.
 */
export function AgenticArchitectureSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const a = dict.pages.agenticAi.architecture;
  const [active, setActive] = useState(1);

  return (
    <section id="architecture" className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-t border-white/10 py-20 md:py-28">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-5">
          <FadeIn>
            <SectionLabel>{a.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-xl">{a.title}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              {a.supporting}
            </p>
            <p className="label-mono mt-10 hidden text-[10px] tracking-[0.12em] text-ink/35 md:block">
              {architectureLayers[active].title[locale]}
            </p>
            <ul className="mt-4 hidden flex-wrap gap-2 md:flex">
              {architectureLayers[active].items.map((item) => (
                <li
                  key={item.en}
                  className="label-mono border border-white/10 px-3 py-2 text-[10px] tracking-[0.12em] text-muted"
                >
                  {item[locale]}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-12 md:col-span-7 md:mt-0">
          <div className="relative border border-white/10 px-4 py-6 sm:px-6 sm:py-8">
            <div
              className="pointer-events-none absolute left-[1.35rem] top-8 bottom-8 w-px bg-white/15 sm:left-[1.85rem]"
              aria-hidden
            />
            <ol className="relative space-y-0">
              {architectureLayers.map((layer, index) => {
                const isActive = active === index;
                const isMoney = layer.id === "money";
                const isAuthority = layer.id === "authority";
                return (
                  <li key={layer.id}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className={cx(
                        "group relative flex min-h-12 w-full items-start gap-4 py-3.5 text-left transition-opacity sm:gap-5 sm:py-4",
                        isActive ? "opacity-100" : "opacity-45 hover:opacity-80",
                      )}
                    >
                      <span
                        className={cx(
                          "relative z-[1] mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border",
                          isActive
                            ? isMoney || isAuthority
                              ? "border-accent bg-accent"
                              : "border-ink bg-ink"
                            : "border-white/30 bg-bg",
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="label-mono text-[9px] tracking-[0.14em] text-ink/30">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cx(
                              "label-mono text-[11px] tracking-[0.12em] sm:text-[12px]",
                              isActive && (isMoney || isAuthority)
                                ? "text-accent"
                                : "text-ink",
                            )}
                          >
                            {layer.title[locale]}
                          </span>
                        </span>
                        <span
                          className={cx(
                            "mt-2 block text-[12px] leading-relaxed text-muted md:hidden",
                            isActive ? "opacity-100" : "opacity-0",
                          )}
                        >
                          {layer.items.map((i) => i[locale]).join(" · ")}
                        </span>
                      </span>
                    </button>
                    {index < architectureLayers.length - 1 ? (
                      <div className="ml-1 h-2 w-px bg-transparent" aria-hidden />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
