"use client";

import { useEffect, useRef } from "react";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";
import type { GateDecision } from "@/data/controlLayerDemo";

type Packet = {
  t: number;
  speed: number;
  lane: number;
  held: number;
  blocked: boolean;
};

/**
 * Living pre-execution flow: Intent → Gate → Allow/Review/Block.
 * Motion intensity follows the active gate decision.
 */
export function AgenticGateFlow({
  decision,
  className,
}: {
  decision: GateDecision;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const decisionRef = useRef(decision);
  const reduced = useReducedMotionPreferred();
  const touch = useIsTouch();

  useEffect(() => {
    decisionRef.current = decision;
  }, [decision]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let packets: Packet[] = [];
    let visible = true;
    let last = performance.now();
    let spawnAcc = 0;

    const rebuild = () => {
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
      packets = [];
    };

    const xAt = (t: number) => {
      const pad = width * 0.08;
      return pad + (width - pad * 2) * t;
    };

    const spawn = () => {
      const lanes = touch ? 3 : 5;
      packets.push({
        t: -0.05,
        speed: 0.12 + Math.random() * 0.08,
        lane: Math.floor(Math.random() * lanes),
        held: 0,
        blocked: false,
      });
      if (packets.length > 14) packets.shift();
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      const decisionNow = decisionRef.current;
      const lanes = touch ? 3 : 5;
      const midY = height * 0.55;

      // rails
      for (let i = 0; i < lanes; i++) {
        const y = midY + (i - (lanes - 1) / 2) * (height * 0.12);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xAt(0), y);
        ctx.lineTo(xAt(1), y);
        ctx.stroke();
      }

      // stage markers
      const marks = [
        { t: 0.08, label: "INTENT" },
        { t: 0.32, label: "AGENT" },
        { t: 0.58, label: "GATE" },
        { t: 0.86, label: decisionNow },
      ];
      marks.forEach((m, idx) => {
        const x = xAt(m.t);
        const accent = idx === 2 || idx === 3;
        ctx.fillStyle = accent
          ? "rgba(158,27,50,0.9)"
          : "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.arc(x, midY, accent ? 3.2 : 2.2, 0, Math.PI * 2);
        ctx.fill();

        // rotating gate ring
        if (idx === 2 && !reduced) {
          const spin = performance.now() * 0.0018;
          ctx.strokeStyle = "rgba(158,27,50,0.45)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(x, midY, 10, spin, spin + Math.PI * 1.4);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, midY, 14, -spin * 0.8, -spin * 0.8 + Math.PI * 1.1);
          ctx.stroke();
        }

        ctx.fillStyle = "rgba(242,240,234,0.35)";
        ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText(m.label, x, midY - 22);
      });

      // connectors
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      ctx.moveTo(xAt(0.08), midY);
      ctx.lineTo(xAt(0.86), midY);
      ctx.stroke();

      if (reduced) return;

      spawnAcc += dt;
      const spawnEvery =
        decisionNow === "BLOCK" ? 900 : decisionNow === "REVIEW" ? 650 : 480;
      if (spawnAcc > spawnEvery) {
        spawnAcc = 0;
        spawn();
      }

      packets.forEach((p) => {
        const y =
          midY + (p.lane - (lanes - 1) / 2) * (height * 0.12) + Math.sin(p.t * 8 + p.lane) * 1.5;

        // gate hold / block logic
        if (p.t >= 0.56 && p.t < 0.62) {
          if (decisionNow === "BLOCK") {
            p.blocked = true;
            p.held += dt;
            p.t = 0.58;
          } else if (decisionNow === "REVIEW") {
            p.held += dt;
            if (p.held < 420) {
              p.t = 0.58;
            } else {
              p.t += (p.speed * dt) / 1000;
            }
          } else {
            p.t += (p.speed * dt) / 1000;
          }
        } else if (!p.blocked) {
          p.t += (p.speed * dt) / 1000;
        }

        if (p.blocked) {
          // fade out at gate
          const pulse = 0.35 + Math.sin(performance.now() * 0.01 + p.lane) * 0.15;
          ctx.fillStyle = `rgba(158,27,50,${pulse})`;
          ctx.beginPath();
          ctx.arc(xAt(0.58), y, 2.8, 0, Math.PI * 2);
          ctx.fill();
          return;
        }

        if (p.t > 1.05) return;

        const x = xAt(Math.min(p.t, 1));
        const afterGate = p.t > 0.62;
        ctx.fillStyle =
          afterGate && decisionNow === "ALLOW"
            ? "rgba(242,240,234,0.85)"
            : afterGate && decisionNow === "REVIEW"
              ? "rgba(158,27,50,0.75)"
              : "rgba(242,240,234,0.55)";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // short trail
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.beginPath();
        ctx.moveTo(x - 10, y);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      packets = packets.filter((p) => p.t <= 1.08 && !(p.blocked && p.held > 1200));
    };

    const tick = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      if (visible) draw(dt);
      raf = requestAnimationFrame(tick);
    };

    rebuild();
    const ro = new ResizeObserver(rebuild);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    if (reduced) {
      draw(16);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduced, touch]);

  return (
    <div className={cx("relative overflow-hidden", className)}>
      <p className="sr-only">
        Animated diagram of financial action packets moving from intent through
        an agent gate. Current gate decision: {decision}.
      </p>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      />
    </div>
  );
}
