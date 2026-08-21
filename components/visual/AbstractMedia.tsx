import { GenerativeMedia, type MediaMotif } from "@/components/visual/GenerativeMedia";
import { cx } from "@/lib/utils";

export function AbstractMedia({
  motif,
  className,
  label,
  children,
  code,
}: {
  motif: string;
  className?: string;
  label?: string;
  children?: React.ReactNode;
  code?: string;
}) {
  return (
    <GenerativeMedia
      motif={motif as MediaMotif}
      className={cx(className)}
      label={label}
      code={code}
    >
      {children}
    </GenerativeMedia>
  );
}
