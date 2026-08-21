"use client";

import { useEffect, useRef } from "react";
import { motion } from "@/lib/motion";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

type Node = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  phase: number;
  speed: number;
  ampX: number;
  ampY: number;
  r: number;
  label?: string;
};

type Signal = {
  from: number;
  to: number;
  t: number;
  duration: number;
};

type Props = {
  labels?: string[];
  className?: string;
  density?: number;
  interactive?: boolean;
  scrollLinked?: boolean;
};

/**
 * Abstract visualization: human decisions → information → pressure → financial action.
 * Slow organic drift, distance-based links, rare red impulse, soft cursor gravity.
 */
export function DecisionNetwork({
  labels = [],
  className,
  density = 90,
  interactive = true,
  scrollLinked = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotionPreferred();
  const touch = useIsTouch();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cfg = motion.network;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let time = 0;
    let visible = true;
    let scrollPhase = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    let signal: Signal | null = null;
    let nextSignalAt = performance.now() + rand(cfg.signalIntervalMs[0], cfg.signalIntervalMs[1]);
    let labelFlash: { index: number; life: number; alpha: number } | null = null;
    let lastNow = 0;

    const canInteract = interactive && !touch && !reduced;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const raw = Math.floor((area / 18000) * (density / 90));
      const count = Math.max(
        cfg.nodeMin,
        Math.min(cfg.nodeMax, touch ? Math.floor(raw * 0.65) : raw),
      );

      nodes = Array.from({ length: count }, (_, i) => {
        const homeX = Math.random() * width;
        const homeY = Math.random() * height;
        return {
          homeX,
          homeY,
          x: homeX,
          y: homeY,
          phase: Math.random() * Math.PI * 2,
          speed: 0.00015 + Math.random() * 0.00035,
          ampX: 6 + Math.random() * cfg.driftAmplitude,
          ampY: 5 + Math.random() * (cfg.driftAmplitude * 0.85),
          r: 0.55 + Math.random() * 1.2,
          label: labels.length ? labels[i % labels.length] : undefined,
        };
      });
    };

    const onMove = (event: PointerEvent) => {
      if (!canInteract) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 &&
        mouse.y >= 0 &&
        mouse.x <= width &&
        mouse.y <= height;
    };

    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onScroll = () => {
      if (!scrollLinked) return;
      scrollPhase = window.scrollY * 0.0008;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const was = visible;
        visible = entry.isIntersecting;
        if (visible && !was && !raf) {
          lastNow = 0;
          raf = requestAnimationFrame(draw);
        }
      },
      { rootMargin: "80px" },
    );
    observer.observe(canvas);

    const spawnSignal = () => {
      if (nodes.length < 2) return;
      let best: { i: number; j: number; d: number } | null = null;
      for (let n = 0; n < 24; n++) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i === j) continue;
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < cfg.connectDistance && d > 40) {
          if (!best || d < best.d) best = { i, j, d };
        }
      }
      if (!best) return;
      signal = {
        from: best.i,
        to: best.j,
        t: 0,
        duration: rand(cfg.signalDurationMs[0], cfg.signalDurationMs[1]),
      };
    };

    const draw = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }

      const dt = lastNow ? Math.min(32, now - lastNow) : 16;
      lastNow = now;
      time += reduced ? 0 : dt;

      ctx.clearRect(0, 0, width, height);

      const connectDist = touch
        ? cfg.connectDistance * 0.85
        : cfg.connectDistance;

      for (const node of nodes) {
        if (reduced) {
          node.x = node.homeX;
          node.y = node.homeY;
        } else {
          const t = time * node.speed + node.phase + scrollPhase;
          // Organic, non-looping feel via layered sines with irrational ratios
          const ox =
            Math.sin(t) * node.ampX +
            Math.sin(t * 0.37 + node.phase) * (node.ampX * 0.35);
          const oy =
            Math.cos(t * 0.91) * node.ampY +
            Math.sin(t * 0.53 + 1.7) * (node.ampY * 0.3);

          let tx = node.homeX + ox;
          let ty = node.homeY + oy;

          if (canInteract && mouse.active) {
            const dx = mouse.x - tx;
            const dy = mouse.y - ty;
            const dist = Math.hypot(dx, dy);
            if (dist < cfg.cursorRadius && dist > 0.001) {
              const falloff = 1 - dist / cfg.cursorRadius;
              const pull = falloff * falloff * cfg.cursorMaxDisplace;
              tx += (dx / dist) * pull;
              ty += (dy / dist) * pull;
            }
          }

          // Damped settle toward target
          node.x += (tx - node.x) * 0.06;
          node.y += (ty - node.y) * 0.06;
        }
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist >= connectDist) continue;
          const t = 1 - dist / connectDist;
          const alpha =
            cfg.lineOpacityMin + t * (cfg.lineOpacityMax - cfg.lineOpacityMin);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(242, 240, 234, ${alpha})`;
          ctx.lineWidth = 0.55;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Rare red signal
      if (!reduced) {
        if (!signal && now >= nextSignalAt) {
          spawnSignal();
          nextSignalAt =
            now + rand(cfg.signalIntervalMs[0], cfg.signalIntervalMs[1]);
        }
        if (signal) {
          signal.t += dt;
          const p = Math.min(1, signal.t / signal.duration);
          const a = nodes[signal.from];
          const b = nodes[signal.to];
          if (a && b) {
            const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            const x = a.x + (b.x - a.x) * ease;
            const y = a.y + (b.y - a.y) * ease;
            const pulse = Math.sin(p * Math.PI);

            ctx.beginPath();
            ctx.strokeStyle = `rgba(158, 27, 50, ${0.15 + pulse * 0.45})`;
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(x, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = `rgba(158, 27, 50, ${0.35 + pulse * 0.55})`;
            ctx.arc(x, y, 1.6 + pulse * 1.4, 0, Math.PI * 2);
            ctx.fill();

            if (p >= 1) {
              labelFlash = { index: signal.to, life: 90, alpha: 0 };
              signal = null;
            }
          } else {
            signal = null;
          }
        }
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const isSignalEnd =
          signal && (i === signal.from || i === signal.to);
        ctx.beginPath();
        ctx.fillStyle = isSignalEnd
          ? "rgba(158, 27, 50, 0.75)"
          : "rgba(242, 240, 234, 0.55)";
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (labelFlash && labels.length) {
        labelFlash.life -= 1;
        labelFlash.alpha =
          labelFlash.life > 70
            ? Math.min(0.65, labelFlash.alpha + 0.05)
            : labelFlash.life < 25
              ? Math.max(0, labelFlash.alpha - 0.04)
              : labelFlash.alpha;
        const node = nodes[labelFlash.index];
        if (node) {
          ctx.font = "10px IBM Plex Mono, monospace";
          ctx.fillStyle = `rgba(154, 153, 147, ${labelFlash.alpha})`;
          ctx.fillText(
            node.label || labels[0],
            node.x + 8,
            node.y - 8,
          );
        }
        if (labelFlash.life <= 0 || labelFlash.alpha <= 0) labelFlash = null;
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    if (canInteract) {
      window.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);
    }
    if (scrollLinked) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [density, interactive, labels, reduced, scrollLinked, touch]);

  return (
    <div className={cx("absolute inset-0", className)} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}
