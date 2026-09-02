"use client";

import { useEffect, useRef } from "react";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

export type SwarmMode = "contained" | "cascade" | "hold";

type Agent = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  phase: number;
  r: number;
  label: string;
};

type Link = {
  from: number;
  to: number;
  t: number;
  speed: number;
  risk: boolean;
};

type Shot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  risk: boolean;
  held: boolean;
};

/**
 * Multi-agent financial swarm with a pre-settlement control membrane.
 * Inspired by live agent topology / HITL checkpoint demos — FTLAB tone.
 */
export function AgenticSwarmField({
  mode,
  className,
  injectKey = 0,
  onCanvasInject,
}: {
  mode: SwarmMode;
  className?: string;
  /** Increment to fire a risk burst from a random agent. */
  injectKey?: number;
  onCanvasInject?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  const injectRef = useRef(injectKey);
  const reduced = useReducedMotionPreferred();
  const touch = useIsTouch();
  const pointer = useRef({ x: -9999, y: -9999, active: false });
  const onInjectRef = useRef(onCanvasInject);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    injectRef.current = injectKey;
  }, [injectKey]);

  useEffect(() => {
    onInjectRef.current = onCanvasInject;
  }, [onCanvasInject]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let visible = true;
    let last = performance.now();
    let agents: Agent[] = [];
    let links: Link[] = [];
    let shots: Shot[] = [];
    let spawnAcc = 0;
    let gatePulse = 0;
    let lastInject = injectKey;
    let membranePhase = 0;

    const labels = ["A1", "A2", "A3", "A4", "A5", "A6"];

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

      const count = touch ? 5 : 6;
      const cx0 = width * 0.38;
      const cy0 = height * 0.52;
      const rx = Math.min(width, height) * (touch ? 0.28 : 0.32);
      const ry = Math.min(width, height) * (touch ? 0.22 : 0.26);
      agents = Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = cx0 + Math.cos(a) * rx;
        const y = cy0 + Math.sin(a) * ry;
        return {
          x,
          y,
          homeX: x,
          homeY: y,
          phase: Math.random() * Math.PI * 2,
          r: 4 + (i % 2),
          label: labels[i] ?? `A${i + 1}`,
        };
      });
      links = [];
      shots = [];
    };

    const membraneX = () => width * 0.72;
    const settlementX = () => width * 0.92;

    const fireShot = (from: Agent, risk: boolean) => {
      const mx = membraneX();
      const angle = Math.atan2(height * 0.5 - from.y, mx - from.x);
      const speed = risk ? 95 : 55 + Math.random() * 35;
      shots.push({
        x: from.x,
        y: from.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.35,
        life: 1,
        risk,
        held: false,
      });
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    const onClick = () => {
      onInjectRef.current?.();
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      const m = modeRef.current;
      membranePhase += dt * 0.0012;
      gatePulse *= 0.96;

      // settlement horizon
      const sx = settlementX();
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(sx, height * 0.12);
      ctx.lineTo(sx, height * 0.88);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(242,240,234,0.28)";
      ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillText("SETTLEMENT", sx, height * 0.1);

      // control membrane
      const mx = membraneX();
      const membraneAlpha =
        m === "cascade" ? 0.12 : m === "hold" ? 0.55 : 0.38;
      const grad = ctx.createLinearGradient(mx - 18, 0, mx + 18, 0);
      grad.addColorStop(0, "rgba(158,27,50,0)");
      grad.addColorStop(0.5, `rgba(158,27,50,${membraneAlpha + gatePulse * 0.25})`);
      grad.addColorStop(1, "rgba(158,27,50,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(mx - 18, height * 0.1, 36, height * 0.8);

      // rotating membrane ticks
      if (!reduced) {
        for (let i = 0; i < 7; i++) {
          const yy =
            height * 0.18 +
            ((i / 6) * height * 0.64 + Math.sin(membranePhase * 2 + i) * 4);
          ctx.strokeStyle = `rgba(158,27,50,${0.25 + (m === "hold" ? 0.25 : 0)})`;
          ctx.beginPath();
          ctx.moveTo(mx - 10, yy);
          ctx.lineTo(mx + 10, yy);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(158,27,50,0.75)";
      ctx.fillText(
        m === "hold" ? "HITL HOLD" : m === "cascade" ? "OPEN PATH" : "CONTROL",
        mx,
        height * 0.1,
      );

      // agent mesh links
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const a = agents[i];
          const b = agents[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > Math.min(width, height) * 0.42) continue;
          ctx.strokeStyle = "rgba(255,255,255,0.05)";
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // inter-agent message packets
      if (!reduced) {
        spawnAcc += dt;
        if (spawnAcc > (touch ? 520 : 380) && links.length < 10) {
          spawnAcc = 0;
          const from = Math.floor(Math.random() * agents.length);
          let to = Math.floor(Math.random() * agents.length);
          if (to === from) to = (to + 1) % agents.length;
          links.push({
            from,
            to,
            t: 0,
            speed: 0.55 + Math.random() * 0.4,
            risk: Math.random() < 0.18,
          });
        }
      }

      links.forEach((l) => {
        if (!reduced) l.t += (l.speed * dt) / 1000;
        const a = agents[l.from];
        const b = agents[l.to];
        if (!a || !b) return;
        const x = a.x + (b.x - a.x) * Math.min(l.t, 1);
        const y = a.y + (b.y - a.y) * Math.min(l.t, 1);
        ctx.fillStyle = l.risk
          ? "rgba(158,27,50,0.85)"
          : "rgba(242,240,234,0.55)";
        ctx.beginPath();
        ctx.arc(x, y, l.risk ? 2.4 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      links = links.filter((l) => l.t < 1.05);

      // inject risk burst
      if (injectRef.current !== lastInject) {
        lastInject = injectRef.current;
        const agent = agents[Math.floor(Math.random() * agents.length)];
        if (agent) {
          fireShot(agent, true);
          gatePulse = 1;
        }
      }

      // auto financial action shots toward settlement
      if (!reduced && Math.random() < (m === "cascade" ? 0.04 : 0.018) * (dt / 16)) {
        const agent = agents[Math.floor(Math.random() * agents.length)];
        if (agent) fireShot(agent, Math.random() < 0.22);
      }

      // agents drift + pointer gravity
      agents.forEach((a) => {
        a.phase += dt * 0.0015;
        let tx = a.homeX + Math.cos(a.phase) * 6;
        let ty = a.homeY + Math.sin(a.phase * 1.3) * 5;
        if (pointer.current.active && !touch) {
          const dx = pointer.current.x - a.x;
          const dy = pointer.current.y - a.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            tx += (dx / d) * (1 - d / 120) * 14;
            ty += (dy / d) * (1 - d / 120) * 14;
          }
        }
        a.x += (tx - a.x) * 0.08;
        a.y += (ty - a.y) * 0.08;

        const near =
          pointer.current.active &&
          Math.hypot(pointer.current.x - a.x, pointer.current.y - a.y) < 36;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + (near ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = near
          ? "rgba(158,27,50,0.9)"
          : "rgba(242,240,234,0.75)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(242,240,234,0.4)";
        ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText(a.label, a.x, a.y - 14);
      });

      // shots / financial actions
      shots.forEach((s) => {
        if (reduced) return;

        const atMembrane = s.x >= mx - 6 && s.x <= mx + 8;
        if (atMembrane && !s.held) {
          if (m === "hold") {
            s.held = true;
            s.vx = 0;
            s.vy = 0;
            s.x = mx;
            gatePulse = 1;
          } else if (m === "contained" && s.risk) {
            // block risky
            s.life = 0;
            gatePulse = 1;
            return;
          } else if (m === "contained" && !s.risk) {
            // slight slowdown then pass
            s.vx *= 0.7;
          }
          // cascade: pass through
        }

        if (s.held) {
          s.life -= dt / 2400;
          const pulse = 0.4 + Math.sin(performance.now() * 0.012) * 0.2;
          ctx.fillStyle = `rgba(158,27,50,${pulse})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 3.2, 0, Math.PI * 2);
          ctx.fill();
          return;
        }

        s.x += (s.vx * dt) / 1000;
        s.y += (s.vy * dt) / 1000;
        s.life -= dt / 3200;

        ctx.fillStyle = s.risk
          ? "rgba(158,27,50,0.9)"
          : "rgba(242,240,234,0.7)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.risk ? 2.8 : 2.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = s.risk
          ? "rgba(158,27,50,0.25)"
          : "rgba(255,255,255,0.12)";
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * 0.04, s.y - s.vy * 0.04);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      });
      shots = shots.filter((s) => s.life > 0 && s.x < width + 20);

      // legend corner
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(242,240,234,0.3)";
      ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText("AGENTS", width * 0.05, height * 0.1);
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

    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);

    if (reduced) {
      draw(16);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
    // injectKey is mirrored via injectRef so the loop can react without remounting.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- injectKey handled via ref
  }, [reduced, touch]);

  return (
    <div className={cx("relative overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
        aria-hidden
      />
    </div>
  );
}
