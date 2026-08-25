"use client";

import { useEffect, useRef } from "react";
import { motion } from "@/lib/motion";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

/**
 * EXECUTION LATTICE
 * Agentic AI visual language — distinct from Human Decision Network.
 *
 * Human = organic cognitive field (undirected constellation).
 * Agentic = directed financial control mesh:
 *   Intent → Agent → Authority gate → Execution → Settlement
 *
 * Packets travel downward. Gates can hold or release.
 * Cursor reveals local authority corridors.
 */

type LayerId = "intent" | "agent" | "authority" | "execution" | "settlement";

type Node = {
  x: number;
  y: number;
  layer: LayerId;
  lane: number;
  r: number;
  kind: "agent" | "gate" | "rail" | "money";
  pulse: number;
};

type Packet = {
  from: number;
  to: number;
  t: number;
  speed: number;
  held: boolean;
  hold: number;
  accent: boolean;
};

type Props = {
  className?: string;
  interactive?: boolean;
};

const LAYER_ORDER: LayerId[] = [
  "intent",
  "agent",
  "authority",
  "execution",
  "settlement",
];

export function AgenticExecutionField({
  className,
  interactive = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotionPreferred();
  const touch = useIsTouch();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cfg = motion.agenticField;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let visible = true;
    let lastNow = performance.now();
    const mouse = { x: -9999, y: -9999, active: false };
    const canInteract = interactive && !touch && !reduced;

    const layerY = (layer: LayerId) => {
      const i = LAYER_ORDER.indexOf(layer);
      const top = height * 0.12;
      const bottom = height * 0.88;
      return top + ((bottom - top) * i) / (LAYER_ORDER.length - 1);
    };

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

      const laneCount = touch
        ? cfg.laneCountTouch
        : width < 900
          ? cfg.laneCountMd
          : cfg.laneCount;
      const marginX = width * 0.08;
      const usable = width - marginX * 2;

      nodes = [];
      for (let lane = 0; lane < laneCount; lane++) {
        const x = marginX + (usable * (lane + 0.5)) / laneCount;

        // Intent seed
        nodes.push({
          x,
          y: layerY("intent"),
          layer: "intent",
          lane,
          r: 1.4,
          kind: "rail",
          pulse: Math.random(),
        });

        // Agent cluster (1-2)
        const agents = 1 + (lane % 2);
        for (let a = 0; a < agents; a++) {
          nodes.push({
            x: x + (a === 0 ? -10 : 12) * (width < 700 ? 0.5 : 1),
            y: layerY("agent") + (a === 0 ? -6 : 8),
            layer: "agent",
            lane,
            r: 1.8,
            kind: "agent",
            pulse: Math.random(),
          });
        }

        // Authority gate
        nodes.push({
          x,
          y: layerY("authority"),
          layer: "authority",
          lane,
          r: 2.4,
          kind: "gate",
          pulse: Math.random(),
        });

        // Execution
        nodes.push({
          x: x + ((lane % 3) - 1) * 8,
          y: layerY("execution"),
          layer: "execution",
          lane,
          r: 1.5,
          kind: "rail",
          pulse: Math.random(),
        });

        // Settlement / money
        nodes.push({
          x,
          y: layerY("settlement"),
          layer: "settlement",
          lane,
          r: 2,
          kind: "money",
          pulse: Math.random(),
        });
      }

      packets = [];
      for (let i = 0; i < Math.min(laneCount, cfg.packetMax); i++) {
        spawnPacket(i % laneCount, true);
      }
    };

    const nodesInLane = (lane: number) =>
      nodes
        .filter((n) => n.lane === lane)
        .sort(
          (a, b) =>
            LAYER_ORDER.indexOf(a.layer) - LAYER_ORDER.indexOf(b.layer),
        );

    const spawnPacket = (lane: number, init = false) => {
      const chain = nodesInLane(lane);
      if (chain.length < 2) return;
      // Prefer path through one agent → gate → execution → money
      const intent = chain.find((n) => n.layer === "intent");
      const agent = chain.find((n) => n.kind === "agent");
      const gate = chain.find((n) => n.kind === "gate");
      const exec = chain.find((n) => n.layer === "execution");
      const money = chain.find((n) => n.kind === "money");
      const path = [intent, agent, gate, exec, money].filter(Boolean) as Node[];
      if (path.length < 2) return;

      let fromIdx = nodes.indexOf(path[0]);
      for (let i = 0; i < path.length - 1; i++) {
        const from = nodes.indexOf(path[i]);
        const to = nodes.indexOf(path[i + 1]);
        packets.push({
          from,
          to,
          t: init ? Math.random() * 0.7 : -i * 0.15,
          speed: cfg.packetSpeed * (0.75 + Math.random() * 0.5),
          held: false,
          hold: 0,
          accent: path[i + 1].kind === "gate" || path[i + 1].kind === "money",
        });
        fromIdx = to;
      }
      void fromIdx;
    };

    const onMove = (e: PointerEvent) => {
      if (!canInteract) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 &&
        mouse.y >= 0 &&
        mouse.x <= width &&
        mouse.y <= height;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      drawLattice(0);
    };

    const drawLattice = (now: number) => {
      // Layer guides
      for (const layer of LAYER_ORDER) {
        const y = layerY(layer);
        ctx.beginPath();
        ctx.moveTo(width * 0.06, y);
        ctx.lineTo(width * 0.94, y);
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Vertical lane rails
      const lanes = new Set(nodes.map((n) => n.lane));
      lanes.forEach((lane) => {
        const chain = nodesInLane(lane);
        if (chain.length < 2) return;
        const highlight =
          mouse.active &&
          Math.abs(mouse.x - chain[0].x) < cfg.cursorCorridor;

        ctx.beginPath();
        ctx.moveTo(chain[0].x, chain[0].y);
        for (let i = 1; i < chain.length; i++) {
          ctx.lineTo(chain[i].x, chain[i].y);
        }
        ctx.strokeStyle = highlight
          ? "rgba(158,27,50,0.35)"
          : "rgba(255,255,255,0.09)";
        ctx.lineWidth = highlight ? 1.35 : 1;
        ctx.stroke();

        // soft corridor glow when hovered
        if (highlight) {
          ctx.beginPath();
          ctx.moveTo(chain[0].x, chain[0].y);
          for (let i = 1; i < chain.length; i++) {
            ctx.lineTo(chain[i].x, chain[i].y);
          }
          ctx.strokeStyle = "rgba(158,27,50,0.12)";
          ctx.lineWidth = 12;
          ctx.stroke();
        }
      });

      // Cross-links between agents (A2A) — sparse
      const agents = nodes.filter((n) => n.kind === "agent");
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const a = agents[i];
          const b = agents[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > cfg.a2aDistance) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.015 + (1 - dist / cfg.a2aDistance) * 0.04})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Packets
      if (!reduced) {
        for (const p of packets) {
          if (p.t < 0 || p.t > 1) continue;
          const a = nodes[p.from];
          const b = nodes[p.to];
          if (!a || !b) continue;

          // Hold briefly at gates
          if (b.kind === "gate" && p.t > 0.92 && p.hold < cfg.gateHoldMs) {
            p.held = true;
          }
          if (p.held) {
            p.hold += 16;
            if (p.hold >= cfg.gateHoldMs) {
              p.held = false;
              p.t = 0.93;
            }
          }

          const t = Math.max(0, Math.min(1, p.t));
          const x = a.x + (b.x - a.x) * t;
          const y = a.y + (b.y - a.y) * t;

          ctx.beginPath();
          ctx.arc(x, y, p.accent ? 1.8 : 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.accent
            ? "rgba(158,27,50,0.85)"
            : "rgba(242,240,234,0.55)";
          ctx.fill();

          // trail
          ctx.beginPath();
          ctx.moveTo(a.x + (b.x - a.x) * Math.max(0, t - 0.12), a.y + (b.y - a.y) * Math.max(0, t - 0.12));
          ctx.lineTo(x, y);
          ctx.strokeStyle = p.accent
            ? "rgba(158,27,50,0.25)"
            : "rgba(255,255,255,0.08)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        const near =
          mouse.active &&
          Math.hypot(mouse.x - n.x, mouse.y - n.y) < cfg.cursorRadius;
        const breathe = reduced
          ? 1
          : 1 + Math.sin(now * 0.0015 + n.pulse * 6) * 0.08;

        if (n.kind === "gate") {
          const size = (near ? 5.5 : 4.2) * breathe;
          ctx.save();
          ctx.translate(n.x, n.y);
          ctx.rotate(Math.PI / 4);
          ctx.strokeStyle = near
            ? "rgba(158,27,50,0.9)"
            : "rgba(158,27,50,0.55)";
          ctx.lineWidth = 1.15;
          ctx.strokeRect(-size / 2, -size / 2, size, size);
          ctx.fillStyle = "rgba(158,27,50,0.22)";
          ctx.fillRect(-size / 2, -size / 2, size, size);
          ctx.restore();

          // authority ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, size * 1.55, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(158,27,50,0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (n.kind === "money") {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.4 * breathe, 0, Math.PI * 2);
          ctx.fillStyle = near
            ? "rgba(242,240,234,0.9)"
            : "rgba(242,240,234,0.55)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,0.08)";
          ctx.stroke();
        } else if (n.kind === "agent") {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * breathe, 0, Math.PI * 2);
          ctx.fillStyle = near
            ? "rgba(242,240,234,0.85)"
            : "rgba(242,240,234,0.4)";
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.22)";
          ctx.fill();
        }
      }

      // Cursor focus node (selected authority / agent)
      if (mouse.active) {
        let best: Node | null = null;
        let bestD: number = cfg.cursorRadius;
        for (const n of nodes) {
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          if (d < bestD) {
            bestD = d;
            best = n;
          }
        }
        if (best) {
          ctx.beginPath();
          ctx.arc(best.x, best.y, 14, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(242,240,234,0.35)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(best.x, best.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = "#f2f0ea";
          ctx.fill();
        }
      }
    };

    const tick = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      const dt = Math.min(32, now - lastNow);
      lastNow = now;

      if (!reduced) {
        for (const p of packets) {
          if (p.held) continue;
          p.t += (dt / 1000) * p.speed;
        }
        // recycle finished paths — keep roughly packetMax active mid-flight
        packets = packets.filter((p) => p.t < 1.15);
        const flying = packets.filter((p) => p.t >= 0 && p.t <= 1).length;
        if (flying < cfg.packetMax * 0.6) {
          const laneCount = new Set(nodes.map((n) => n.lane)).size || 1;
          spawnPacket(Math.floor(Math.random() * laneCount));
        }
      }

      ctx.clearRect(0, 0, width, height);
      drawLattice(now);
      raf = requestAnimationFrame(tick);
    };

    rebuild();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      rebuild();
      if (reduced) drawStatic();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf && !reduced) {
          lastNow = performance.now();
          raf = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive, reduced, touch]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cx("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
