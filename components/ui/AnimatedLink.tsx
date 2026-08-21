import Link from "next/link";
import { cx } from "@/lib/utils";

export function AnimatedLink({
  href,
  children,
  className,
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-2 transition-colors duration-300",
        className,
      )}
    >
      <span className="relative inline-block transition-transform duration-300 ease-out group-hover:translate-x-[2px]">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </span>
      {arrow ? (
        <span
          aria-hidden
          className="inline-block translate-x-0 transition-transform duration-300 ease-out group-hover:translate-x-[7px]"
        >
          →
        </span>
      ) : null}
    </Link>
  );
}
