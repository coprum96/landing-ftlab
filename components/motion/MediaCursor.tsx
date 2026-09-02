"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap, ease } from "@/lib/animations";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type CursorLabel = "view" | "play" | "open" | "read" | null;

type Labels = {
  view: string;
  play: string;
  open: string;
  read: string;
};

function subscribe() {
  return () => {};
}

export function MediaCursor({ labels }: { labels: Labels }) {
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const enabled = mounted && !touch && !reduced;

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      gsap.to(dotRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.12,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(ringRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.35,
        ease: ease.out,
        overwrite: "auto",
      });
    };

    const onOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        "[data-cursor]",
      ) as HTMLElement | null;
      if (!target) {
        setActive(false);
        setLabel(null);
        return;
      }
      const key = (target.dataset.cursor || "view") as CursorLabel;
      setActive(true);
      setLabel(key && key in labels ? labels[key as keyof Labels] : labels.view);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, labels]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
      />
      <div
        ref={ringRef}
        className={cx(
          "absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 transition-[width,height,background,border-color] duration-400",
          active
            ? "h-14 w-14 border-accent/60 bg-accent/10"
            : "h-6 w-6 bg-transparent",
        )}
      >
        {active && label ? (
          <span className="label-mono text-[8px] text-ink">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
