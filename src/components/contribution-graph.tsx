"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  WINDOW_DAYS,
  isContributionSnapshot,
  type ContributionDay,
  type ContributionSnapshot,
} from "@/lib/contributions";

type State =
  | { status: "loading" }
  | { status: "ready"; snapshot: ContributionSnapshot }
  | { status: "error" };

type Tip = { index: number; x: number; y: number };

/** Weeks shown on phones, newest last; wider screens show the whole year. */
const PHONE_WEEKS = 22;

const SKELETON: ContributionDay[] = Array.from({ length: WINDOW_DAYS }, () => ({
  date: "",
  count: 0,
  level: 0,
}));

const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const fullDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});
const monthName = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short" });

function countLabel(day: ContributionDay): string {
  if (day.count === null) return day.level === 0 ? "No contributions" : "Contribution activity";
  if (day.count === 0) return "No contributions";
  return `${day.count} ${day.count === 1 ? "contribution" : "contributions"}`;
}

/**
 * Week columns, Sunday on top, so every row is a real weekday. Slots before
 * the first day are null (empty). Each week also gets a month label when it
 * holds the first week of a new month.
 */
function toWeeks(days: ContributionDay[]) {
  const offset = days[0]?.date ? asDate(days[0].date).getUTCDay() : 0;
  const weeks: { label: string | null; slots: (number | null)[] }[] = [];
  let lastMonth = "";
  for (let slot = 0; slot < offset + days.length; slot += 7) {
    const slots = Array.from({ length: 7 }, (_, row) => {
      const index = slot + row - offset;
      return index >= 0 && index < days.length ? index : null;
    });
    const first = slots.find((index) => index !== null);
    const iso = first != null ? days[first].date : "";
    const month = iso ? monthName.format(asDate(iso)) : "";
    weeks.push({ label: month && month !== lastMonth ? month : null, slots });
    lastMonth = month || lastMonth;
  }
  // Drop a label that would sit on the very first, partial column.
  if (weeks.length > 1 && weeks[0].label && weeks[1].label) weeks[0].label = null;
  return weeks;
}

/** The grid itself, kept apart so a moving tooltip never re-renders 371 cells. */
function Grid({ days, ready }: { days: ContributionDay[]; ready: boolean }) {
  const weeks = toWeeks(days);
  return (
    <div className={`flex gap-[3px] sm:gap-1 ${ready ? "" : "animate-pulse"}`}>
      {weeks.map((week, w) => (
        <div
          key={w}
          className={`min-w-0 flex-1 flex-col gap-[3px] sm:gap-1 ${w < weeks.length - PHONE_WEEKS ? "hidden sm:flex" : "flex"}`}
        >
          <span className="relative h-4 text-[11px] leading-4 text-muted-foreground">
            {week.label && <span className="absolute left-0 top-0 whitespace-nowrap">{week.label}</span>}
          </span>
          {week.slots.map((index, row) =>
            index === null ? (
              <span key={row} className="aspect-square" />
            ) : (
              <span
                key={row}
                data-i={index}
                className="gh-cell aspect-square"
                style={{ backgroundColor: `var(--level-${days[index].level})` }}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * The GitHub contribution year as a flat heat grid that sits straight on
 * the page. Hover or tap a day for its count and date. Data comes from our
 * API route (cached hourly); states are explicit: loading, ready, or an
 * honest error.
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
  const grid = useMemo(() => <Grid days={days} ready={isReady} />, [days, isReady]);
  const tipDay = tip ? days[tip.index] : null;

  const summary = isReady
    ? state.snapshot.total !== null
      ? `${state.snapshot.total.toLocaleString("en-US")} contributions in the last year`
      : "Contribution activity in the last year"
    : state.status === "error"
      ? "Couldn't load the graph. GitHub is unreachable right now."
      : "Loading contributions";

  const onPointerOver = (event: React.PointerEvent<HTMLDivElement>) => {
    const cell = (event.target as Element).closest("[data-i]");
    const wrap = wrapRef.current;
    if (!isReady || !cell || !wrap) return setTip(null);
    const r = cell.getBoundingClientRect();
    const box = wrap.getBoundingClientRect();
    const x = Math.min(Math.max(r.left + r.width / 2 - box.left, 80), box.width - 80);
    setTip({ index: Number(cell.getAttribute("data-i")), x, y: r.top - box.top });
  };

  return (
    <div className={className} aria-busy={!isReady}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
        <p aria-live="polite" className="text-muted-foreground">
          {summary}
        </p>
        <div aria-hidden className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <span className="mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: `var(--level-${level})` }} />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>

      <div
        ref={wrapRef}
        role="img"
        aria-label={isReady ? `GitHub contributions heat map. ${summary}.` : "GitHub contributions, loading"}
        className="relative mt-5"
        onPointerOver={onPointerOver}
        onPointerLeave={() => setTip(null)}
      >
        {grid}

        {tip && tipDay && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-background shadow-lg"
            style={{ left: tip.x, top: tip.y - 8 }}
          >
            <p className="text-sm font-medium">{countLabel(tipDay)}</p>
            <p className="text-xs opacity-70">{fullDate.format(asDate(tipDay.date))}</p>
          </div>
        )}
      </div>
    </div>
  );
}
