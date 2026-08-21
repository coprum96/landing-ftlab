"use client";

import { useEffect, useRef } from "react";

/**
 * Applies a damped transform to an element based on normalized cursor coords.
 * Max displacement kept intentionally tiny for readability.
 */
export function CursorInfluence({
  children,
  className,
  maxX = 3,
  maxY = 2,
  damping = 0.08,
  enabled = true,
}: {
  children: React.ReactNode;
  className?: string;
  maxX?: number;
  maxY?: number;
  damping?: number;
  enabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ nx: 0, ny: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) {
        state.current.tx = 0;
        state.current.ty = 0;
        return;
      }
      state.current.tx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      state.current.ty = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const tick = () => {
      const s = state.current;
      s.nx += (s.tx - s.nx) * damping;
      s.ny += (s.ty - s.ny) * damping;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${(s.nx * maxX).toFixed(2)}px, ${(s.ny * maxY).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [damping, enabled, maxX, maxY]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
