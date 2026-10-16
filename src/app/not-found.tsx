import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Soft glow, matching the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[640px] max-w-[120vw] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />

      <p className="section-eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl font-medium tracking-tight sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-sm text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist — maybe the link is old, or maybe
        it never was.
      </p>
      <Link
        href="/"
        className="btn-primary mt-10 px-7 py-3 text-sm font-medium"
      >
        Back to the portfolio
        <ArrowUpRight size={16} strokeWidth={2} />
      </Link>
    </main>
  );
}
