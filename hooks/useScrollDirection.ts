"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down" | null;

export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY;
        const delta = next - last;
        if (Math.abs(delta) > threshold) {
          setDirection(delta > 0 ? "down" : "up");
          last = next;
        }
        setY(next);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, y };
}
