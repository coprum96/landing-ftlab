"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-top flex min-h-[70svh] items-center">
      <div className="editorial-grid w-full">
        <div className="col-span-12 md:col-span-8">
          <p className="label-mono text-[11px] text-accent">ERROR</p>
          <h1 className="headline-section mt-6">Something went wrong</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            An unexpected error occurred while loading this page.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            <button
              type="button"
              onClick={reset}
              className="label-mono border border-white/20 px-5 py-3 text-[11px] transition-colors hover:border-accent"
            >
              Try again
            </button>
            <Link
              href="/en"
              className="label-mono self-center text-[11px] text-muted hover:text-accent"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
