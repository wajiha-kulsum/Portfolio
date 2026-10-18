"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Soft glow, matching the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[640px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />

      <p className="section-eyebrow">Error</p>
      <h1 className="mt-4 font-display text-5xl font-medium tracking-tight sm:text-7xl">
        Something broke
      </h1>
      <p className="mt-5 max-w-sm text-muted-foreground">
        An unexpected error interrupted the page. Trying again usually clears
        it.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary px-7 py-3 text-sm font-medium"
        >
          Try again
          <ArrowUpRight size={16} strokeWidth={2} />
        </button>
        <Link href="/" className="btn-outline px-6 py-3 text-sm font-medium">
          Back home
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-6 text-xs text-muted-foreground/70">
          Reference: {error.digest}
        </p>
      ) : null}
    </main>
  );
}
