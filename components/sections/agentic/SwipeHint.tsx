/** Subtle swipe hint for horizontal scroll regions on mobile. */
export function SwipeHint({ label }: { label: string }) {
  return (
    <p className="label-mono mb-3 flex items-center gap-2 text-[9px] tracking-[0.14em] text-ink/35 md:hidden">
      <span aria-hidden>←</span>
      {label}
      <span aria-hidden>→</span>
    </p>
  );
}
