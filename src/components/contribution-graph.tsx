"use client";

import { useEffect, useState } from "react";

import {
  DAYS_PER_WEEK,
  WINDOW_DAYS,
  getMonthLabels,
  groupByWeeks,
  isContributionSnapshot,
  type ContributionDay,
  type ContributionSnapshot,
} from "@/lib/contributions";

type State =
  | { status: "loading" }
  | { status: "ready"; snapshot: ContributionSnapshot }
  | { status: "error" };

function buildSkeleton(): ContributionDay[][] {
  const weeks = Math.ceil(WINDOW_DAYS / DAYS_PER_WEEK);
  return Array.from({ length: weeks }, () =>
    Array.from({ length: DAYS_PER_WEEK }, () => ({
      date: "",
      count: 0,
      level: 0,
    })),
  );
}

function formatAsOf(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  }).format(date);
}

function tooltipFor(day: ContributionDay): string {
  if (day.count === null) {
    return day.level === 0
      ? `No contributions on ${day.date}`
      : `Contribution activity on ${day.date}`;
  }
  const unit = day.count === 1 ? "contribution" : "contributions";
  return `${day.count} ${unit} on ${day.date}`;
}

/**
 * Attio-style card that renders the GitHub contribution graph. Data comes
 * from our API route (server-cached, hourly) and state is explicit:
 * skeleton -> ready -> honest error. The grid never shifts because the API
 * returns a fixed, date-aligned window.
 */
export function ContributionGraph({ className }: { className?: string }) {
  const [state, setState] = useState<State>({ status: "loading" });

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
  const weeks = isReady ? groupByWeeks(state.snapshot.days) : buildSkeleton();
  const monthLabels = getMonthLabels(weeks);

  const summary = isReady
    ? state.snapshot.total !== null
      ? `${state.snapshot.total.toLocaleString("en-US")} contributions in the last year`
      : "Contribution activity for the last year"
    : state.status === "error"
      ? "Couldn’t load the graph — GitHub is unreachable right now."
      : "Loading latest activity…";

  return (
    <div
      className={`card-shadow rounded-2xl border border-border bg-card p-6 sm:p-8 ${className ?? ""}`}
      aria-busy={!isReady}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-sm font-medium">github.com/wajiha-kulsum</p>
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {summary}
        </p>
      </div>

      <div className="mt-6 overflow-x-auto pb-1">
        <div className="flex flex-col gap-1.5">
          {/* Month labels aligned above the week columns */}
          <div className="flex gap-[3px] text-[10px] leading-4 text-muted-foreground sm:gap-1">
            {monthLabels.map((label, index) => (
              <div key={index} className="relative h-4 w-[11px] sm:w-[12px]">
                {label && <span className="absolute left-0 top-0 whitespace-nowrap">{label}</span>}
              </div>
            ))}
          </div>

          {/* Heat grid: one column per week, one cell per day */}
          <div className="flex gap-[3px] sm:gap-1">
            {weeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex w-[11px] flex-col gap-[3px] sm:w-[12px] sm:gap-1"
              >
                {week.map((day, dayIndex) => (
                  <span
                    key={`${weekIndex}-${dayIndex}`}
                    title={isReady ? tooltipFor(day) : undefined}
                    className={`heat-cell block h-[11px] w-[11px] sm:h-[12px] sm:w-[12px] ${
                      isReady ? "" : "animate-pulse opacity-50"
                    }`}
                    style={{ backgroundColor: `var(--level-${day.level})` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
        <span className="mr-1">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className="heat-cell block h-[10px] w-[10px]"
            style={{ backgroundColor: `var(--level-${level})` }}
          />
        ))}
        <span className="ml-1">More</span>
      </div>

      {isReady && (
        <p className="mt-3 text-[11px] text-muted-foreground/80">
          Synced from GitHub · latest day in data: {formatAsOf(state.snapshot.asOf)}
        </p>
      )}
    </div>
  );
}
