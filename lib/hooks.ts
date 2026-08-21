"use client";

import { useEffect, useState } from "react";

export { useReducedMotion as useReducedMotionPreferred } from "@/hooks/useReducedMotion";
export { useMousePosition } from "@/hooks/useMousePosition";
export { useScrollDirection } from "@/hooks/useScrollDirection";

export function useIsTouch() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouch(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return touch;
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
