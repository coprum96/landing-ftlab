"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

export type MediaMotif =
  | "grid"
  | "pulse"
  | "orbit"
  | "signal"
  | "mesh"
  | "flow"
  | "notes"
  | "conference"
  | "data"
  | "collab"
  | "a"
  | "b"
  | "c"
  | "d";

type Props = {
  motif: MediaMotif | string;
  className?: string;
  label?: string;
  children?: React.ReactNode;
  code?: string;
};

/**
 * Decart-adjacent generative panels: dark field, HUD coordinates,
 * slow procedural motion — themed per research / field-note motif.
 */
export function GenerativeMedia({
  motif,
  className,
  label,
  children,
  code,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotionPreferred();
  const kind = normalizeMotif(motif);

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
    const t0 = performance.now();

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
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const was = visible;
        visible = entry.isIntersecting;
        if (visible && !was && !raf) {
          raf = requestAnimationFrame(draw);
        }
      },
      { rootMargin: "60px" },
    );
    observer.observe(canvas);

    const draw = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      // rAF `now` can briefly precede effect-local performance.now() → negative t.
      // Negative modulo in JS yields negative indices and crashes node lookups.
      const t = reduced ? 0 : Math.max(0, (now - t0) * 0.001);

      if (width < 1 || height < 1) {
        if (!reduced) raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      paintBase(ctx, width, height, kind);
      paintMotif(ctx, width, height, kind, t);
      paintHud(ctx, width, height, kind, t, code);

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [code, kind, reduced]);

  return (
    <div
      className={cx("relative overflow-hidden bg-[#0a0a0a]", className)}
      {...(label
        ? { role: "img" as const, "aria-label": label }
        : { "aria-hidden": true as const })}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(8,8,8,0.55))]" />
      {children}
    </div>
  );
}

function normalizeMotif(motif: string): MediaMotif {
  const allowed: MediaMotif[] = [
    "grid",
    "pulse",
    "orbit",
    "signal",
    "mesh",
    "flow",
    "notes",
    "conference",
    "data",
    "collab",
    "a",
    "b",
    "c",
    "d",
  ];
  return (allowed.includes(motif as MediaMotif) ? motif : "grid") as MediaMotif;
}

function paintBase(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  kind: MediaMotif,
) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#0d0d0d");
  g.addColorStop(1, "#080808");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // Soft accent bloom per family
  const bloom = ctx.createRadialGradient(
    kind === "mesh" || kind === "data" ? w * 0.7 : w * 0.35,
    kind === "orbit" || kind === "conference" ? h * 0.3 : h * 0.55,
    0,
    w * 0.5,
    h * 0.5,
    Math.max(w, h) * 0.55,
  );
  bloom.addColorStop(0, "rgba(158,27,50,0.18)");
  bloom.addColorStop(0.45, "rgba(158,27,50,0.05)");
  bloom.addColorStop(1, "transparent");
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, w, h);
}

function paintHud(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  kind: MediaMotif,
  t: number,
  code?: string,
) {
  ctx.strokeStyle = "rgba(242,240,234,0.08)";
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  ctx.font = "10px IBM Plex Mono, ui-monospace, monospace";
  ctx.fillStyle = "rgba(154,153,147,0.75)";
  const tag = code || `/${kind.toUpperCase().slice(0, 3)}.${String(Math.floor((t * 3) % 9) + 1).padStart(2, "0")}`;
  ctx.fillText(tag, 18, 28);

  const x = (Math.sin(t * 0.35) * 0.5 + 0.5) * (w - 80) + 20;
  const y = (Math.cos(t * 0.27) * 0.5 + 0.5) * (h - 80) + 20;
  ctx.fillStyle = "rgba(154,153,147,0.55)";
  ctx.fillText(
    `(X ${x.toFixed(1)}, Y ${y.toFixed(1)})`,
    w - 140,
    h - 18,
  );
}

function paintMotif(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  kind: MediaMotif,
  t: number,
) {
  switch (kind) {
    case "pulse":
    case "a":
      drawPulse(ctx, w, h, t);
      break;
    case "mesh":
    case "signal":
    case "data":
      drawMesh(ctx, w, h, t, kind === "data");
      break;
    case "orbit":
    case "collab":
      drawOrbit(ctx, w, h, t);
      break;
    case "grid":
    case "notes":
      drawGridField(ctx, w, h, t);
      break;
    case "conference":
    case "flow":
    case "b":
      drawFlowBands(ctx, w, h, t);
      break;
    case "c":
      drawPulse(ctx, w, h, t * 0.85);
      drawMesh(ctx, w, h, t, false);
      break;
    case "d":
      drawOrbit(ctx, w, h, t * 0.7);
      drawGridField(ctx, w, h, t);
      break;
    default:
      drawMesh(ctx, w, h, t, false);
  }
}

function drawPulse(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const cx = w * 0.5;
  const cy = h * 0.52;
  for (let i = 0; i < 5; i++) {
    const p = (t * 0.35 + i * 0.18) % 1;
    const r = 18 + p * Math.min(w, h) * 0.42;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(158,27,50,${(1 - p) * 0.35})`;
    ctx.lineWidth = 1.2;
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.fillStyle = "rgba(242,240,234,0.7)";
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawMesh(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  dense: boolean,
) {
  const cols = dense ? 8 : 6;
  const rows = dense ? 7 : 5;
  const nodes: { x: number; y: number }[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const nx =
        ((x + 0.5) / cols) * w +
        Math.sin(t * 0.7 + x * 0.9 + y) * 8;
      const ny =
        ((y + 0.5) / rows) * h +
        Math.cos(t * 0.55 + y * 1.1 + x) * 7;
      nodes.push({ x: nx, y: ny });
    }
  }
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d > (dense ? 110 : 130)) continue;
      const alpha = (1 - d / 130) * 0.22;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(242,240,234,${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
  for (const n of nodes) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(242,240,234,0.55)";
    ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Travelling accent packet — require valid node pair before reading .x/.y
  if (nodes.length < 2) return;
  const i = Math.floor(positiveMod(t * 1.4, nodes.length));
  const j = positiveMod(i + 1 + (Math.floor(t) % 3), nodes.length);
  const a = nodes[i];
  const b = nodes[j];
  if (!a || !b) return;
  const p = positiveMod(t * 1.4, 1);
  const x = a.x + (b.x - a.x) * p;
  const y = a.y + (b.y - a.y) * p;
  ctx.beginPath();
  ctx.fillStyle = "rgba(158,27,50,0.85)";
  ctx.arc(x, y, 2.4, 0, Math.PI * 2);
  ctx.fill();
}

/** JS `%` preserves sign; normalize to [0, m). */
function positiveMod(n: number, m: number) {
  if (!Number.isFinite(n) || !Number.isFinite(m) || m === 0) return 0;
  return ((n % m) + m) % m;
}

function drawOrbit(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const rings = [0.18, 0.3, 0.42];
  for (let i = 0; i < rings.length; i++) {
    const r = Math.min(w, h) * rings[i];
    ctx.beginPath();
    ctx.strokeStyle = "rgba(242,240,234,0.12)";
    ctx.lineWidth = 1;
    ctx.ellipse(cx, cy, r, r * 0.62, t * 0.08 + i * 0.4, 0, Math.PI * 2);
    ctx.stroke();

    const a = t * (0.4 + i * 0.15) + i;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.62;
    ctx.beginPath();
    ctx.fillStyle = i === 1 ? "rgba(158,27,50,0.9)" : "rgba(242,240,234,0.65)";
    ctx.arc(x, y, i === 1 ? 2.6 : 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGridField(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const step = 28;
  ctx.strokeStyle = "rgba(242,240,234,0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const gx = Math.floor(((Math.sin(t * 0.5) * 0.5 + 0.5) * w) / step) * step;
  const gy = Math.floor(((Math.cos(t * 0.4) * 0.5 + 0.5) * h) / step) * step;
  ctx.fillStyle = "rgba(158,27,50,0.22)";
  ctx.fillRect(gx, gy, step, step);
  ctx.strokeStyle = "rgba(158,27,50,0.55)";
  ctx.strokeRect(gx + 0.5, gy + 0.5, step - 1, step - 1);
}

function drawFlowBands(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  for (let i = 0; i < 6; i++) {
    const y = ((i / 6) * h + t * 18 * (i % 2 === 0 ? 1 : -1) + h) % h;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(242,240,234,${0.04 + (i % 3) * 0.03})`;
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 8) {
      const yy =
        y +
        Math.sin(x * 0.02 + t * 1.2 + i) * 14 +
        Math.sin(x * 0.008 + i) * 8;
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }
  const pulseX = ((t * 80) % (w + 40)) - 20;
  const g = ctx.createRadialGradient(pulseX, h * 0.5, 0, pulseX, h * 0.5, 80);
  g.addColorStop(0, "rgba(158,27,50,0.28)");
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.fillRect(pulseX - 80, h * 0.2, 160, h * 0.6);
}
