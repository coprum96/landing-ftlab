import { cx } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("label-mono flex items-center gap-3", className)}>
      <span className="inline-block h-px w-6 bg-accent" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
