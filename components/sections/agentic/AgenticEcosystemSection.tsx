"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLenisInstance } from "@/lib/lenis";
import { cx } from "@/lib/utils";

type EcoNode = {
  id: string;
  target: string;
  code: string;
  title: { en: string; ru: string };
  short: { en: string; ru: string };
  blurb: { en: string; ru: string };
  ring: 0 | 1 | 2;
};

const NODES: EcoNode[] = [
  {
    id: "stakes",
    target: "why-now",
    code: "01",
    title: { en: "Why now", ru: "Почему сейчас" },
    short: { en: "Why now", ru: "Сейчас" },
    blurb: {
      en: "When AI can move money, risk becomes financial.",
      ru: "Когда AI двигает деньги, риск становится финансовым.",
    },
    ring: 0,
  },
  {
    id: "method",
    target: "cycle",
    code: "02",
    title: { en: "Method", ru: "Метод" },
    short: { en: "Method", ru: "Метод" },
    blurb: {
      en: "Research, build, simulate, attack, measure, defend.",
      ru: "Research, build, simulate, attack, measure, defend.",
    },
    ring: 0,
  },
  {
    id: "architecture",
    target: "architecture",
    code: "03",
    title: { en: "Architecture", ru: "Архитектура" },
    short: { en: "Architecture", ru: "Архитектура" },
    blurb: {
      en: "Intent, authority, agents, execution, money, audit.",
      ru: "Intent, полномочия, агенты, исполнение, деньги, audit.",
    },
    ring: 0,
  },
  {
    id: "areas",
    target: "areas",
    code: "04",
    title: { en: "Priority fronts", ru: "Приоритеты" },
    short: { en: "Fronts", ru: "Приоритеты" },
    blurb: {
      en: "Identity, authority, risk, fraud, treasury, AML.",
      ru: "Идентичность, полномочия, риск, fraud, treasury, AML.",
    },
    ring: 1,
  },
  {
    id: "threat",
    target: "threat",
    code: "05",
    title: { en: "Threat surface", ru: "Угрозы" },
    short: { en: "Threat", ru: "Угрозы" },
    blurb: {
      en: "Action risk, agent vs agent, adversarial failure modes.",
      ru: "Action risk, agent vs agent, адверсариальные отказы.",
    },
    ring: 1,
  },
  {
    id: "autonomy",
    target: "autonomy",
    code: "06",
    title: { en: "Autonomy", ru: "Автономия" },
    short: { en: "Autonomy", ru: "Автономия" },
    blurb: {
      en: "From recommendation to delegated financial action.",
      ru: "От рекомендации к делегированному финансовому действию.",
    },
    ring: 1,
  },
  {
    id: "horizon",
    target: "horizon",
    code: "07",
    title: { en: "Horizon", ru: "Горизонт" },
    short: { en: "Horizon", ru: "Горизонт" },
    blurb: {
      en: "Emerging infrastructure, products and research concepts.",
      ru: "Инфраструктура, продукты и исследовательские концепты.",
    },
    ring: 2,
  },
  {
    id: "collaborate",
    target: "collaborate-agentic",
    code: "08",
    title: { en: "Work with us", ru: "Сотрудничество" },
    short: { en: "Partner", ru: "Партнёры" },
    blurb: {
      en: "Banks, security teams, regulators, universities.",
      ru: "Банки, security, регуляторы, университеты.",
    },
    ring: 2,
  },
];

/** Desktop radii */
const RING_RADIUS_LG = [140, 210, 285] as const;

/**
 * Rotating research ecosystem map.
 * md+: labeled orbit. Mobile: compact grid navigator (no empty orbit disk).
 */
export function AgenticEcosystemSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const eco = dict.pages.agenticAi.ecosystem;
  const reduced = useReducedMotionPreferred();
  const touch = useIsTouch();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isMdUp, setIsMdUp] = useState(false);
  const [isLgUp, setIsLgUp] = useState(false);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const activeNode = NODES[active];

  const ringGroups = useMemo(() => {
    return [0, 1, 2].map((ring) =>
      NODES.map((node, index) => ({ node, index })).filter(
        ({ node }) => node.ring === ring,
      ),
    );
  }, []);

  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      setIsMdUp(md.matches);
      setIsLgUp(lg.matches);
    };
    apply();
    md.addEventListener("change", apply);
    lg.addEventListener("change", apply);
    return () => {
      md.removeEventListener("change", apply);
      lg.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (reduced || paused || !isMdUp) return;
    lastRef.current = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(32, now - lastRef.current);
      lastRef.current = now;
      setRotation((r) => (r + dt * 0.007) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, reduced, isMdUp]);

  const travel = useCallback((index: number) => {
    const node = NODES[index];
    setActive(index);
    setPaused(true);
    const el = document.getElementById(node.target);
    if (el) {
      const lenis = getLenisInstance();
      const offset =
        -(
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--header-h",
            ),
          ) || 72
        ) - 16;
      if (lenis) {
        lenis.scrollTo(el, { offset, duration: 1.35 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    window.setTimeout(() => setPaused(false), 2000);
  }, []);

  const useTouchCopy = touch || !isMdUp;
  const supporting = useTouchCopy ? eco.supportingTouch : eco.supporting;
  const hint = useTouchCopy ? eco.hintTouch : eco.hint;

  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden border-t border-white/10 py-12 md:py-28"
    >
      <div className="editorial-grid relative z-[1]">
        <div className="col-span-12 md:col-span-5">
          <FadeIn>
            <SectionLabel>{eco.label}</SectionLabel>
            <h2 className="headline-section mt-5 max-w-xl">{eco.title}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:mt-6">
              {supporting}
            </p>
            <p className="label-mono mt-4 text-[10px] tracking-[0.14em] text-ink/35 md:mt-8">
              {hint}
            </p>
          </FadeIn>

          {/* Mobile: grid first, one tap = jump */}
          <ul className="mt-8 grid grid-cols-2 gap-2 md:hidden">
            {NODES.map((node, index) => (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => travel(index)}
                  className="flex min-h-12 w-full flex-col justify-center border border-white/10 px-3 py-3.5 text-left transition-colors active:border-accent/40 active:bg-accent/[0.06]"
                >
                  <span className="label-mono text-[10px] text-accent/80">
                    {node.code}
                  </span>
                  <span className="mt-1.5 block label-mono text-[11px] tracking-[0.08em] text-ink">
                    {node.title[locale]}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop / tablet: inspect then enter */}
          <div className="mt-12 hidden border border-white/10 bg-[#090909]/80 p-5 backdrop-blur-sm md:mt-12 md:block md:p-6">
            <p className="label-mono text-[10px] tracking-[0.14em] text-accent">
              {activeNode.code} / {activeNode.title[locale]}
            </p>
            <p className="mt-3 text-[clamp(1.1rem,2vw,1.45rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
              {activeNode.blurb[locale]}
            </p>
            <button
              type="button"
              onClick={() => travel(active)}
              className="label-mono mt-6 inline-flex min-h-11 items-center gap-2 border border-white/15 px-4 py-3 text-[11px] tracking-[0.14em] text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {eco.enter}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        {/* Orbit - tablet + desktop */}
        <div className="col-span-12 mt-10 hidden md:col-span-7 md:mt-0 md:block">
          <div
            className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-[640px]"
            onMouseEnter={() => {
              if (!touch) setPaused(true);
            }}
            onMouseLeave={() => {
              if (!touch) setPaused(false);
            }}
          >
            <div className="pointer-events-none absolute inset-[8%] rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute inset-[18%] rounded-full border border-white/[0.08]" />
            <div className="pointer-events-none absolute inset-[28%] rounded-full border border-accent/20" />
            <div
              className="pointer-events-none absolute inset-[22%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(158,27,50,0.12) 0%, transparent 68%)",
              }}
            />

            <div className="absolute left-1/2 top-1/2 z-[2] flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 bg-[#0a0a0a]/90 text-center lg:h-32 lg:w-32">
              <p className="label-mono text-[8px] tracking-[0.16em] text-ink/40 sm:text-[9px]">
                {locale === "ru" ? "ЛАБ. СФТ" : "FTLAB"}
              </p>
              <p className="label-mono mt-1 max-w-[5.5rem] text-[9px] leading-tight tracking-[0.12em] text-ink sm:text-[10px]">
                {eco.core}
              </p>
            </div>

            <div
              className="absolute inset-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {(isLgUp
                ? ringGroups
                : [
                    NODES.map((node, index) => ({ node, index })),
                  ]
              ).map((group, ring) =>
                group.map(({ node, index }, i) => {
                  const count = group.length;
                  const angle =
                    (360 / count) * i - 90 + (isLgUp && ring === 1 ? 12 : 0);
                  const radius = isLgUp
                    ? RING_RADIUS_LG[ring as 0 | 1 | 2]
                    : 200;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  const isActive = active === index;
                  const label = isLgUp
                    ? node.title[locale]
                    : node.short[locale];
                  return (
                    <button
                      key={node.id}
                      type="button"
                      aria-label={`${node.code} ${node.title[locale]}`}
                      onClick={() => travel(index)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => {
                        setActive(index);
                        setPaused(true);
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-rotation}deg)`,
                      }}
                    >
                      <span
                        className={cx(
                          "flex min-h-10 min-w-[4.75rem] flex-col items-start border px-2 py-1.5 text-left transition-all duration-300 lg:min-w-[7rem] lg:px-2.5 lg:py-2",
                          isActive
                            ? "border-accent/60 bg-accent/[0.12] shadow-[0_0_24px_rgba(158,27,50,0.18)]"
                            : "border-white/12 bg-[#0a0a0a]/90 hover:border-white/30",
                        )}
                      >
                        <span
                          className={cx(
                            "label-mono text-[8px] tracking-[0.14em]",
                            isActive ? "text-accent" : "text-ink/40",
                          )}
                        >
                          {node.code}
                        </span>
                        <span
                          className={cx(
                            "label-mono mt-0.5 text-[9px] tracking-[0.08em] lg:text-[10px] lg:tracking-[0.1em]",
                            isActive ? "text-ink" : "text-muted",
                          )}
                        >
                          {label}
                        </span>
                      </span>
                    </button>
                  );
                }),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
