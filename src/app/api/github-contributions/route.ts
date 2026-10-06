import { NextResponse } from "next/server";

import { normalizeSnapshot, type ContributionSnapshot } from "@/lib/contributions";

export const revalidate = 3600; // Refresh contribution data once an hour

const USERNAME = process.env.GITHUB_USERNAME || "wajiha-kulsum";
const FETCH_TIMEOUT_MS = 8000;

/* -------------------------------------------------------------------------- */
/* Fetch helpers                                                               */
/* -------------------------------------------------------------------------- */

async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: { Accept: "application/json", "User-Agent": "portfolio-site", ...init?.headers },
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchText(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0 (portfolio-site) Firefox/132.0" },
    });
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/* -------------------------------------------------------------------------- */
/* Source 1 — GitHub GraphQL (best quality, needs a token)                     */
/* -------------------------------------------------------------------------- */

const CALENDAR_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

type GraphQLWeek = { contributionDays?: Array<{ date?: unknown; contributionCount?: unknown }> };

function extractCalendarWeeks(data: unknown): GraphQLWeek[] {
  if (!isRecord(data)) return [];
  const user = data.user;
  const collection = isRecord(user) ? user.contributionsCollection : null;
  const calendar = isRecord(collection) ? collection.contributionCalendar : null;
  const weeks = isRecord(calendar) ? calendar.weeks : null;
  return Array.isArray(weeks) ? (weeks as GraphQLWeek[]) : [];
}

function parseGraphQL(data: unknown): ContributionSnapshot | null {
  const raw = extractCalendarWeeks(data).flatMap((week) =>
    (week.contributionDays ?? []).flatMap((day) =>
      isRecord(day) &&
      typeof day.date === "string" &&
      typeof day.contributionCount === "number"
        ? [{ date: day.date.slice(0, 10), count: day.contributionCount, level: null }]
        : [],
    ),
  );
  return raw.length ? normalizeSnapshot(raw) : null;
}

async function fetchFromGraphQL(): Promise<ContributionSnapshot | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const data = await fetchJson("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: CALENDAR_QUERY, variables: { username: USERNAME } }),
    });
    return parseGraphQL(data);
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Source 2 — public GitHub contributions page (no token needed)               */
/* -------------------------------------------------------------------------- */

/**
 * Scrapes github.com/users/<name>/contributions: each calendar cell carries
 * a `data-date` and a `data-level`. The HTML has no per-day counts, so those
 * stay null (= unknown, level only); the yearly total is read from the page
 * header. This is the only token-free source left since third-party mirrors
 * of the calendar keep going dead.
 */
async function fetchFromPublicPage(): Promise<ContributionSnapshot | null> {
  try {
    const html = await fetchText(`https://github.com/users/${USERNAME}/contributions`);

    const raw: Array<{ date: string; count: number | null; level: number | null }> = [];
    for (const match of html.matchAll(/<td\b[^>]*>/g)) {
      const tag = match[0];
      const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(tag)?.[1];
      const level = /data-level="(\d)"/.exec(tag)?.[1];
      if (!date || level === undefined) continue;
      raw.push({ date, count: null, level: Number(level) });
    }
    if (raw.length === 0) return null;

    const total = Number(/(\d+)\s+contributions\s+in the last year/.exec(html)?.[1]);

    return normalizeSnapshot(raw, Number.isFinite(total) ? total : null);
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Route                                                                       */
/* -------------------------------------------------------------------------- */

export async function GET() {
  const snapshot = (await fetchFromGraphQL()) ?? (await fetchFromPublicPage());

  if (!snapshot) {
    // No fake data — tell the client so it can show an honest error state.
    return NextResponse.json({ error: "Contribution data is unavailable right now." }, { status: 502 });
  }

  return NextResponse.json(snapshot);
}
