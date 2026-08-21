"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-[#080808] text-[#f2f0ea] antialiased">
        <div className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#9e1b32]">
            500
          </p>
          <h1 className="mt-6 text-[clamp(40px,8vw,72px)] font-medium leading-[0.95] tracking-[-0.03em]">
            Something went wrong
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#9a9993]">
            An unexpected error occurred. You can try again or return to the
            laboratory homepage.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={reset}
              className="border border-white/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] hover:border-[#9e1b32]"
            >
              Try again
            </button>
            <Link
              href="/en"
              className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9a9993] hover:text-[#f2f0ea]"
            >
              Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
