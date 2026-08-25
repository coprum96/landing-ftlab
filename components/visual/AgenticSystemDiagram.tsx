/**
 * Decision spine + parallel control layer.
 * Shows where an autonomous financial decision can be
 * observed, constrained, verified, or stopped.
 */
export function AgenticSystemDiagram({
  flow,
  control,
  controlLabel,
  decisionPathLabel,
  controlPointLabel,
}: {
  flow: string[];
  control: string[];
  controlLabel: string;
  decisionPathLabel: string;
  controlPointLabel: string;
}) {
  const controlAttachIndex = Math.max(0, flow.length - 3);

  return (
    <div className="relative border border-white/10 px-5 py-8 sm:px-8 sm:py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <p className="label-mono mb-8 text-[9px] tracking-[0.16em] text-ink/35">
            {decisionPathLabel}
          </p>
          <ol className="space-y-0">
            {flow.map((step, index) => {
              const isOutcome = index === flow.length - 1;
              const isCritical =
                index === controlAttachIndex || index === controlAttachIndex + 1;
              return (
                <li key={step} className="relative flex gap-4">
                  <div className="flex w-4 flex-col items-center">
                    <span
                      className={
                        isOutcome
                          ? "mt-1.5 h-2 w-2 rounded-full bg-accent"
                          : isCritical
                            ? "mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/80"
                            : "mt-1.5 h-1.5 w-1.5 rounded-full bg-ink/60"
                      }
                    />
                    {index < flow.length - 1 ? (
                      <span
                        className="mt-1 w-px flex-1 bg-white/15"
                        aria-hidden
                      />
                    ) : null}
                  </div>
                  <div className={index < flow.length - 1 ? "pb-6" : "pb-0"}>
                    <p
                      className={
                        isOutcome
                          ? "label-mono text-[11px] tracking-[0.14em] text-ink"
                          : "label-mono text-[10px] tracking-[0.14em] text-ink/75"
                      }
                    >
                      {step}
                    </p>
                    {isCritical ? (
                      <p className="label-mono mt-1.5 text-[9px] tracking-[0.12em] text-accent/70">
                        {controlPointLabel}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="label-mono mb-8 text-[9px] tracking-[0.16em] text-accent/80">
            {controlLabel}
          </p>
          <ul className="space-y-5">
            {control.map((item, index) => (
              <li key={item} className="flex items-baseline gap-3">
                <span className="label-mono text-[9px] text-ink/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="label-mono text-[11px] tracking-[0.14em] text-muted">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
