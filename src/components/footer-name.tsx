"use client";

import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

/* The glow copy is a sibling of the base copy with identical box + text, so
 * both render the exact same glyph geometry. */
const SHARED =
  "text-center font-display font-semibold leading-none tracking-[-0.02em] text-transparent";

/**
 * The giant outlined footer name with a glow that follows the cursor: a
 * second, brighter, backlit copy of the glyphs revealed through a radial
 * mask centered on the pointer (radius --name-spot-radius). No pointer =
 * no glow (the mask sits offscreen until the first move).
 */
export function FooterName({ text, className }: { text: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  function track(event: ReactPointerEvent<HTMLDivElement>) {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    wrap.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    wrap.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  function hide() {
    wrapRef.current?.style.setProperty("--mx", "-999px");
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={track}
      onPointerLeave={hide}
      className="footer-name relative h-[0.8em] select-none overflow-hidden whitespace-nowrap"
      style={{ "--mx": "-999px", "--my": "-999px" } as CSSProperties}
    >
      {/* Base copy — the hollow strokes */}
      <p
        className={`${SHARED} block ${className ?? ""}`}
        style={{ WebkitTextStroke: "1px var(--watermark)" }}
        aria-hidden
      >
        {text}
      </p>
      {/* Glow copy — brighter strokes plus an aura, clipped to the cursor */}
      <p
        className={`name-glow absolute inset-0 ${SHARED} ${className ?? ""}`}
        style={{ WebkitTextStroke: "1px var(--name-glow)" }}
      >
        {text}
      </p>
    </div>
  );
}
