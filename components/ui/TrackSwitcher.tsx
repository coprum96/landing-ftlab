import Link from "next/link";
import { cx } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

/**
 * Persistent Human / Agentic track switcher for research universes.
 */
export function TrackSwitcher({
  locale: _locale,
  active,
  humanLabel,
  agenticLabel,
  humanHref,
  agenticHref,
}: {
  locale: Locale;
  active: "human" | "agentic";
  humanLabel: string;
  agenticLabel: string;
  humanHref: string;
  agenticHref: string;
}) {
  void _locale;

  return (
    <nav
      aria-label="Research track"
      className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/10 pb-5"
    >
      <Link
        href={humanHref}
        aria-current={active === "human" ? "page" : undefined}
        className={cx(
          "label-mono text-[11px] tracking-[0.12em] transition-colors duration-300",
          active === "human" ? "text-accent" : "text-muted hover:text-ink",
        )}
      >
        {humanLabel}
      </Link>
      <span className="text-white/20" aria-hidden>
        /
      </span>
      <Link
        href={agenticHref}
        aria-current={active === "agentic" ? "page" : undefined}
        className={cx(
          "label-mono text-[11px] tracking-[0.12em] transition-colors duration-300",
          active === "agentic" ? "text-accent" : "text-muted hover:text-ink",
        )}
      >
        {agenticLabel}
      </Link>
    </nav>
  );
}
