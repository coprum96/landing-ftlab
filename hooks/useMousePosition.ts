"use client";

import { useEffect, useRef } from "react";

export type MousePoint = { x: number; y: number; nx: number; ny: number };

/**
 * Tracks pointer with optional damping via requestAnimationFrame.
 * nx/ny are normalized to -1…1 relative to the viewport (or element).
 */
export function useMousePosition(options?: {
  damping?: number;
  enabled?: boolean;
  element?: React.RefObject<HTMLElement | null>;
}) {
  const damping = options?.damping ?? 0.12;
  const enabled = options?.enabled ?? true;
  const target = useRef<MousePoint>({ x: 0, y: 0, nx: 0, ny: 0 });
  const current = useRef<MousePoint>({ x: 0, y: 0, nx: 0, ny: 0 });
  const listeners = useRef(new Set<(p: MousePoint) => void>());

  useEffect(() => {
    if (!enabled) return;

    const resolveBounds = () => {
      const el = options?.element?.current;
      if (el) {
        const r = el.getBoundingClientRect();
        return { left: r.left, top: r.top, w: r.width, h: r.height };
      }
      return { left: 0, top: 0, w: window.innerWidth, h: window.innerHeight };
    };

    const onMove = (event: PointerEvent) => {
      const b = resolveBounds();
      const x = event.clientX - b.left;
      const y = event.clientY - b.top;
      target.current = {
        x,
        y,
        nx: b.w ? (x / b.w) * 2 - 1 : 0,
        ny: b.h ? (y / b.h) * 2 - 1 : 0,
      };
    };

    let raf = 0;
    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * damping;
      c.y += (t.y - c.y) * damping;
      c.nx += (t.nx - c.nx) * damping;
      c.ny += (t.ny - c.ny) * damping;
      listeners.current.forEach((fn) => fn({ ...c }));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [damping, enabled, options?.element]);

  return {
    subscribe(fn: (p: MousePoint) => void) {
      listeners.current.add(fn);
      return () => {
        listeners.current.delete(fn);
      };
    },
    get current() {
      return current.current;
    },
  };
}
