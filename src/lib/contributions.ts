/**
 * Shared types + helpers for the GitHub contributions graph.
 * Used by both the data layer (API route) and the UI component.
 */

/** 0 = quiet day, 4 = busiest day. The UI maps levels to theme-aware colors. */
export type HeatLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  /** ISO date, e.g. "2026-10-07" */
  date: string;
  /**
   * Exact contribution count when the source provides it, otherwise null.
   * Never fake a number — the UI shows a level-based fallback instead.
   */
  count: number | null;
  level: HeatLevel;
};

export type ContributionSnapshot = {
  /** Total shown in the headline. Computed from counts, or provided by the source. */
  total: number | null;
  /** ISO date of the most recent day in the window */
  asOf: string;
  days: ContributionDay[];
};

/** Displayed window: 53 full weeks, ending on the latest known day. */
export const WINDOW_DAYS = 371;
const HEAT_LEVELS: HeatLevel[] = [0, 1, 2, 3, 4];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isIsoDate = (value: unknown): value is string =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);

const isCount = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

function countToLevel(count: number): HeatLevel {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function safeLevel(value: unknown): HeatLevel | null {
  return HEAT_LEVELS.includes(value as HeatLevel) ? (value as HeatLevel) : null;
}

/**
 * Normalizes raw days coming from any GitHub source into a fixed 53-week,
 * Sunday-aligned window that ends on the latest known day. Missing days are
 * filled with zero counts so the grid never shifts. Days keep their source
 * count when one exists; `count: null` means "unknown, level only".
 */
export function normalizeSnapshot(
  raw: Array<{ date: unknown; count: unknown; level: unknown }>,
  totalOverride: number | null = null,
): ContributionSnapshot | null {
  const byDate = new Map<string, { count: number | null; level: HeatLevel }>();
  for (const entry of raw) {
    if (!isIsoDate(entry.date)) continue;
    const count = entry.count === null || entry.count === undefined ? null : isCount(entry.count) ? entry.count : null;
    const level = safeLevel(entry.level) ?? (count !== null ? countToLevel(count) : null);
    if (count === null && level === null) continue;
    // Later entries win when a source repeats a date (GitHub embeds multiple years)
    byDate.set(entry.date, { count, level: level ?? 0 });
  }
  if (byDate.size === 0) return null;

  const sorted = [...byDate.keys()].sort();
  const asOf = sorted.at(-1);
  if (!asOf) return null;

  const end = new Date(`${asOf}T00:00:00Z`);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (WINDOW_DAYS - 1));

  const days: ContributionDay[] = [];
  let counted = 0;
  let countedDays = 0;
  for (const day = new Date(start); day.getTime() <= end.getTime(); day.setUTCDate(day.getUTCDate() + 1)) {
    const iso = day.toISOString().slice(0, 10);
    const hit = byDate.get(iso);
    const count = hit?.count ?? null;
    const level: HeatLevel = hit?.level ?? 0;
    if (count !== null) {
      counted += count;
      countedDays += 1;
    }
    days.push({ date: iso, count, level });
  }

  // Prefer a source-provided yearly total; fall back to the sum of counts
  // when every day in the window carries a real number.
  const total =
    totalOverride !== null
      ? totalOverride
      : countedDays === days.length
        ? counted
        : null;

  return { total, asOf, days };
}

/** Runtime guard for API responses, keeps bad payloads out of the UI. */
export function isContributionSnapshot(value: unknown): value is ContributionSnapshot {
  if (!isRecord(value)) return false;
  if (value.total !== null && !isCount(value.total)) return false;
  if (!isIsoDate(value.asOf) || !Array.isArray(value.days) || value.days.length === 0) return false;
  return value.days.every(
    (day) =>
      isRecord(day) &&
      isIsoDate(day.date) &&
      (day.count === null || isCount(day.count)) &&
      safeLevel(day.level) !== null,
  );
}

export type Streak = { days: number; start: string; end: string };

export type ContributionStats = {
  busiest: { count: number; date: string } | null;
  longest: Streak | null;
  current: Streak | null;
};

/**
 * Busiest day and streaks, as GitHub's own profile used to show them. A day
 * counts as active when it has contributions (or, with no count, a level).
 * The current streak may end yesterday: today can still be empty.
 */
export function getStats(days: ContributionDay[]): ContributionStats {
  const active = (day: ContributionDay) => (day.count ?? day.level) > 0;

  let busiest: ContributionStats["busiest"] = null;
  let longest: Streak | null = null;
  let runStart = -1;
  days.forEach((day, i) => {
    if (day.count !== null && day.count > 0 && (!busiest || day.count > busiest.count)) {
      busiest = { count: day.count, date: day.date };
    }
    if (!active(day)) {
      runStart = -1;
      return;
    }
    if (runStart < 0) runStart = i;
    const length = i - runStart + 1;
    if (!longest || length > longest.days) longest = { days: length, start: days[runStart].date, end: day.date };
  });

  let end = days.length - 1;
  if (end >= 0 && !active(days[end])) end -= 1;
  let start = end;
  while (start >= 0 && active(days[start])) start -= 1;
  const current = end > start ? { days: end - start, start: days[start + 1].date, end: days[end].date } : null;

  return { busiest, longest, current };
}
