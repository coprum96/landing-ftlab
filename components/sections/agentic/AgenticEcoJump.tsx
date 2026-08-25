"use client";

import { useEffect, useState } from "react";
import { getLenisInstance } from "@/lib/lenis";
import { cx } from "@/lib/utils";

/**
 * Sticky jump control back to the programme ecosystem map.
 */
export function AgenticEcoJump({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const eco = document.getElementById("ecosystem");
    if (!eco) return;

    const onScroll = () => {
      const bottom = eco.getBoundingClientRect().bottom;
      setVisible(bottom < -80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = () => {
    const el = document.getElementById("ecosystem");
    if (!el) return;
    const lenis = getLenisInstance();
    const offset =
      -(
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-h",
          ),
        ) || 72
      ) - 8;
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.1 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={jump}
      aria-label={label}
      className={cx(
        "fixed bottom-5 right-4 z-40 label-mono min-h-11 border border-white/15 bg-[#0a0a0a]/92 px-3 py-2.5 text-[10px] tracking-[0.14em] text-ink backdrop-blur-sm transition-all duration-300 md:bottom-8 md:right-8",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      {label}
    </button>
  );
}
