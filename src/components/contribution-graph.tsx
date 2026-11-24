"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  WINDOW_DAYS,
  getStats,
  isContributionSnapshot,
  type ContributionDay,
  type ContributionSnapshot,
} from "@/lib/contributions";

type State =
  | { status: "loading" }
  | { status: "ready"; snapshot: ContributionSnapshot }
  | { status: "error" };

type Tip = { index: number; x: number; y: number };

/* Isometric projection: weeks run down and to the right, weekdays down and
 * to the left, bar height straight up. Units are SVG user units. */
const UNIT = 12;
const DX = UNIT * Math.cos(Math.PI / 6);
const DY = UNIT * 0.5;
const MAX_H = 104;
const FLOOR_H = 1.5;
const GAP = 0.1;

const point = (week: number, weekday: number, h = 0) =>
  `${((week - weekday) * DX).toFixed(1)},${((week + weekday) * DY - h).toFixed(1)}`;

const SKELETON: ContributionDay[] = Array.from({ length: WINDOW_DAYS }, () => ({
  date: "",
  count: 0,
  level: 0,
}));

const fullDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});
const shortDate = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short", day: "numeric" });
const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

function countLabel(day: ContributionDay): string {
  if (day.count === null) return day.level === 0 ? "No contributions" : "Contribution activity";
  if (day.count === 0) return "No contributions";
  return `${day.count} ${day.count === 1 ? "contribution" : "contributions"}`;
}

/** The bars, back to front so nearer bars paint over the ones behind. */
function IsoBars({ days }: { days: ContributionDay[] }) {
  const firstWeekday = days[0]?.date ? asDate(days[0].date).getUTCDay() : 0;
  const weeks = Math.ceil((days.length + firstWeekday) / 7);
  const max = Math.max(1, ...days.map((day) => day.count ?? 0));

  const cells = days.map((day, index) => {
    const slot = index + firstWeekday;
    // Log scale: one 150-commit day should not flatten every ordinary day.
    const fraction = day.count === null ? day.level / 4 : Math.log1p(day.count) / Math.log1p(max);
    const h = fraction > 0 ? 4 + fraction * (MAX_H - 4) : FLOOR_H;
    return { day, index, week: Math.floor(slot / 7), weekday: slot % 7, h };
  });
  cells.sort((a, b) => a.week + a.weekday - (b.week + b.weekday));

  const minX = -7 * DX - 2;
  const maxX = weeks * DX + 2;
  const minY = -MAX_H - 4;
  const maxY = (weeks + 7) * DY + 2;

  return (
    <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} className="block h-auto w-full" aria-hidden>
      {cells.map(({ day, index, week, weekday, h }) => {
        const a0 = week + GAP;
        const a1 = week + 1 - GAP;
        const b0 = weekday + GAP;
        const b1 = weekday + 1 - GAP;
        return (
          <g
            key={index}
            data-i={index}
            className="iso-bar"
            style={{ "--c": `var(--level-${day.level})` } as React.CSSProperties}
          >
            <polygon className="iso-r" points={`${point(a1, b0)} ${point(a1, b1)} ${point(a1, b1, h)} ${point(a1, b0, h)}`} />
            <polygon className="iso-l" points={`${point(a0, b1)} ${point(a1, b1)} ${point(a1, b1, h)} ${point(a0, b1, h)}`} />
            <polygon className="iso-t" points={`${point(a0, b0, h)} ${point(a1, b0, h)} ${point(a1, b1, h)} ${point(a0, b1, h)}`} />
          </g>
        );
      })}
    </svg>
  );
}

function Stat({ label, value, unit, note, align = "left" }: {
  label: string;
  value: string;
  unit: string;
  note: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "md:text-right" : ""}>
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <div className={`mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:gap-2.5 ${align === "right" ? "md:justify-end" : ""}`}>
        <span className="text-[clamp(2rem,3.4vw,2.6rem)] font-medium leading-[0.85] tracking-[-0.03em] tabular-nums">
          {value}
        </span>
        <span className="text-left leading-tight">
          <span className="block text-sm">{unit}</span>
          <span className="block whitespace-nowrap text-xs text-muted-foreground">{note}</span>
        </span>
      </div>
    </div>
  );
}

const range = (start: string, end: string) =>
  start === end ? shortDate.format(asDate(start)) : `${shortDate.format(asDate(start))} - ${shortDate.format(asDate(end))}`;

/**
 * The GitHub contribution year as an isometric bar chart: one bar per day,
 * height by commits, colour by GitHub's level. Hover or tap a bar for its
 * count and date. Data comes from our API route (cached hourly); states are
 * explicit: loading floor, ready, or an honest error.
 */
export function ContributionGraph({ className }: { className?: string }) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [tip, setTip] = useState<Tip | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    fetch("/api/github-contributions", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Contributions request failed (${res.status})`);
        return res.json();
      })
      .then((json) => {
        if (!isContributionSnapshot(json)) throw new Error("Malformed contributions payload");
        setState({ status: "ready", snapshot: json });
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Failed to load contributions:", error);
        }
        setState({ status: "error" });
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const isReady = state.status === "ready";
  const days = isReady ? state.snapshot.days : SKELETON;
  // Same element between renders, so a moving tooltip never re-renders 371 bars.
  const bars = useMemo(() => <IsoBars days={days} />, [days]);
  const stats = useMemo(() => getStats(days), [days]);

  const total = isReady ? (state.snapshot.total ?? days.reduce((sum, day) => sum + (day.count ?? 0), 0)) : 0;
  const tipDay = tip ? days[tip.index] : null;

  const onPointerOver = (event: React.PointerEvent<HTMLDivElement>) => {
    const bar = (event.target as Element).closest("[data-i]");
    const wrap = wrapRef.current;
    if (!isReady || !bar || !wrap) return setTip(null);
    const r = bar.getBoundingClientRect();
    const box = wrap.getBoundingClientRect();
    const x = Math.min(Math.max(r.left + r.width / 2 - box.left, 80), box.width - 80);
    setTip({ index: Number(bar.getAttribute("data-i")), x, y: r.top - box.top });
  };

  const hidden = isReady ? "" : "invisible";

  return (
    <div className={`rounded-2xl bg-plate p-6 sm:p-8 ${className ?? ""}`} aria-busy={!isReady}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <a
          href="https://github.com/wajiha-kulsum"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link text-sm font-medium"
        >
          github.com/wajiha-kulsum
        </a>
        {state.status === "error" ? (
          <p aria-live="polite" className="text-sm text-muted-foreground">
            Couldn&rsquo;t load the graph. GitHub is unreachable right now.
          </p>
        ) : (
          <div aria-hidden className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="mr-1">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span key={level} className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: `var(--level-${level})` }} />
            ))}
            <span className="ml-1">More</span>
          </div>
        )}
      </div>

      <div ref={wrapRef} className="relative mt-6">
        <div
          role="img"
          aria-label={
            isReady
              ? `GitHub contributions for the last year, ${total} in total, shown as a 3D bar chart`
              : "GitHub contributions, loading"
          }
          className={`iso mx-auto max-w-[760px] ${isReady ? "" : "animate-pulse"}`}
          onPointerOver={onPointerOver}
          onPointerLeave={() => setTip(null)}
        >
          {bars}
        </div>

        <div className={`mt-8 grid grid-cols-2 gap-6 md:absolute md:right-0 md:top-0 md:mt-0 md:grid-cols-1 md:gap-6 ${hidden}`}>
          <Stat
            align="right"
            label="1 year total"
            value={total.toLocaleString("en-US")}
            unit="contributions"
            note="on GitHub"
          />
          <Stat
            align="right"
            label="Busiest day"
            value={String(stats.busiest?.count ?? 0)}
            unit="contributions"
            note={stats.busiest ? shortDate.format(asDate(stats.busiest.date)) : "No data yet"}
          />
        </div>
        <div className={`mt-6 grid grid-cols-2 gap-6 md:absolute md:bottom-0 md:left-0 md:mt-0 md:grid-cols-1 ${hidden}`}>
          <Stat
            label="Longest streak"
            value={String(stats.longest?.days ?? 0)}
            unit={stats.longest?.days === 1 ? "day" : "days"}
            note={stats.longest ? range(stats.longest.start, stats.longest.end) : "No streak yet"}
          />
          <Stat
            label="Current streak"
            value={String(stats.current?.days ?? 0)}
            unit={stats.current?.days === 1 ? "day" : "days"}
            note={stats.current ? range(stats.current.start, stats.current.end) : "Starts with the next commit"}
          />
        </div>

        {tip && tipDay && (
          <div
            role="status"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-background shadow-lg"
            style={{ left: tip.x, top: tip.y - 10 }}
          >
            <p className="text-sm font-medium">{countLabel(tipDay)}</p>
            <p className="text-xs opacity-70">{fullDate.format(asDate(tipDay.date))}</p>
          </div>
        )}
      </div>
    </div>
  );
}
