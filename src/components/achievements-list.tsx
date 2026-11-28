"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { ACHIEVEMENTS } from "@/lib/site";

const CARD_W = 340;
const CARD_H = 250;

/**
 * Achievements as a list of big rows. On hover the title slides in, the
 * arrow fills, the row's rule darkens, and a cover card for that event
 * follows the cursor (pointer devices only). Keyboard focus gets the same
 * row state without the floating card.
 */
export function AchievementsList() {
  const listRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const card = cardRef.current;
    if (!list || !card) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    const draw = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      card.style.transform = `translate3d(${(x - CARD_W / 2).toFixed(1)}px, ${(y - CARD_H / 2).toFixed(1)}px, 0)`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3)
        frame = requestAnimationFrame(draw);
    };
    const onMove = (event: PointerEvent) => {
      const rect = list.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
      if (x === 0 && y === 0) {
        x = tx;
        y = ty;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    list.addEventListener("pointermove", onMove);
    return () => {
      list.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={listRef}
      className="ach-list"
      onPointerLeave={() => setActive(null)}
    >
      <ul>
        {ACHIEVEMENTS.map((item, i) => (
          <li key={item.event}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ach-row"
              onPointerEnter={() => setActive(i)}
            >
              <span className="ach-title">{item.title}</span>
              <span className="ach-arrow" aria-hidden>
                <ArrowUpRight size={18} strokeWidth={1.75} />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div
        ref={cardRef}
        aria-hidden
        className={`ach-preview ${active !== null ? "is-on" : ""}`}
      >
        {ACHIEVEMENTS.map((item, i) => (
          <div
            key={item.event}
            className={`ach-card ${active === i ? "is-current" : ""}`}
          >
            <span className="ach-card-kind">{item.kind}</span>
            <span className="ach-card-mark" />
            <svg
              viewBox="0 0 200 200"
              className="ach-card-art"
              style={{ transform: `rotate(${i * 72}deg)` }}
            >
              <path d="M10 20 A 90 90 0 0 1 120 60" />
              <path d="M10 190 A 90 90 0 0 0 120 140" />
              <rect
                x="70"
                y="55"
                width="54"
                height="24"
                transform="rotate(-14 97 67)"
              />
              <circle cx="78" cy="100" r="32" className="ach-card-dot" />
            </svg>
            <span className="ach-card-name">{item.project ?? item.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
