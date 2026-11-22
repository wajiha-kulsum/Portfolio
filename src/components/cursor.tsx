"use client";

import { useEffect, useRef } from "react";

/**
 * A small dot that trails the mouse and inverts what is under it. Over a
 * link it grows; over an element with `data-cursor` it becomes a solid
 * circle with that label ("View project"). Mouse only: touch and pen keep
 * the system cursor, and nothing renders until the mouse moves.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const view = viewRef.current;
    if (!dot || !view) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const label = view.firstElementChild as HTMLElement;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    let shown = false;

    const place = () => {
      const t = `translate3d(${x}px, ${y}px, 0)`;
      dot.style.transform = t;
      view.style.transform = t;
    };

    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (Math.abs(tx - x) + Math.abs(ty - y) < 0.1) {
        x = tx;
        y = ty;
        frame = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
      place();
    };

    const setState = (state: string) => {
      dot.dataset.state = state;
      view.dataset.state = state;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!shown || reduce) {
        x = tx;
        y = ty;
        place();
        if (!shown) {
          shown = true;
          root.dataset.customCursor = "";
        }
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }

      const target = e.target instanceof Element ? e.target.closest("[data-cursor], a, button") : null;
      const text = target?.getAttribute("data-cursor");
      if (text) {
        if (label.textContent !== text) label.textContent = text;
        setState("view");
      } else {
        setState(target ? "link" : "");
      }
    };

    const leave = () => setState("hidden");

    window.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      delete root.dataset.customCursor;
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden className="cursor cursor-dot" data-state="hidden">
        <span />
      </div>
      <div ref={viewRef} aria-hidden className="cursor cursor-view" data-state="hidden">
        <span />
      </div>
    </>
  );
}
