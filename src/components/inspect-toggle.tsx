"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Crosshair } from "lucide-react";

type Readout = {
  box: { top: number; left: number; width: number; height: number };
  tag: { top: number; left: number };
  lines: [string, string][];
};

const hex = (rgb: string) => {
  const [r, g, b, a] = rgb.match(/[\d.]+/g)?.map(Number) ?? [];
  if (a === 0) return "transparent";
  return "#" + [r, g, b].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("");
};

/** What a developer would want from dev mode: type, size, color, box. */
function read(el: Element): Readout {
  const rect = el.getBoundingClientRect();
  const css = getComputedStyle(el);
  const family = css.fontFamily.split(",")[0].replace(/["']/g, "");
  const lines: [string, string][] = [["", `<${el.tagName.toLowerCase()}>  ${Math.round(rect.width)} × ${Math.round(rect.height)}`]];
  if (el instanceof HTMLImageElement) {
    lines.push(["src", `${el.naturalWidth} × ${el.naturalHeight}`]);
  } else {
    lines.push(["font", `${family} ${css.fontWeight}`]);
    lines.push(["size", `${Math.round(parseFloat(css.fontSize) * 10) / 10}/${Math.round(parseFloat(css.lineHeight) || 0)}px`]);
    lines.push(["color", hex(css.color)]);
  }
  // Tag sits under the element, flipped above it near the bottom edge.
  const below = rect.bottom + 8;
  const top = below + 80 > window.innerHeight ? Math.max(8, rect.top - 88) : below;
  return {
    box: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
    tag: { top, left: Math.min(Math.max(8, rect.left), window.innerWidth - 260) },
    lines,
  };
}

/**
 * "Inspect" turns the page into its own dev-mode: hover anything in <main>
 * to see its font, size, color and box. Pointer-only enhancement, so the
 * toggle is hidden on touch layouts; Escape turns it off.
 */
export function InspectToggle() {
  const [on, setOn] = useState(false);
  const [readout, setReadout] = useState<Readout | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!on) {
      delete root.dataset.inspect;
      return;
    }
    root.dataset.inspect = "";
    let target: Element | null = null;
    const update = () => setReadout(target ? read(target) : null);
    const onMove = (event: PointerEvent) => {
      const el = event.target instanceof Element ? event.target : null;
      target = el && el.closest("main") && el.tagName !== "MAIN" ? el : null;
      update();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOn(false);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      delete root.dataset.inspect;
      setReadout(null);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", onKey);
    };
  }, [on]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOn((value) => !value)}
        aria-pressed={on}
        title="Inspect: hover anything to see its type, size and color. Esc to exit."
        className={`hidden h-7 cursor-pointer items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-colors duration-200 md:flex ${
          on
            ? "bg-accent text-[var(--accent-ink)]"
            : "text-muted-foreground hover:bg-[var(--hover)] hover:text-foreground"
        }`}
      >
        <Crosshair size={13} strokeWidth={2} aria-hidden />
        Inspect
      </button>

      {on &&
        readout &&
        createPortal(
          <>
            <div className="inspect-box" style={readout.box} aria-hidden />
            <div className="inspect-tag" style={readout.tag} aria-hidden>
              {readout.lines.map(([key, value]) => (
                <div key={key || "el"}>
                  {key && <b>{key.padEnd(6, " ")}</b>}
                  {value}
                </div>
              ))}
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
