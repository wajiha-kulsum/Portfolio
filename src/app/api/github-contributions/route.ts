import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

function mapCountToColor(count: number): string {
  if (count === 0) return "#121111";
  if (count <= 2) return "#216435";
  if (count <= 5) return "#2F984A";
  if (count <= 9) return "#3EBE5E";
  return "#93E7A2";
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "wajiha-kulsum";
  const token = process.env.GITHUB_TOKEN;

  // Try GitHub GraphQL API if token is available
  if (token) {
    try {
      const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { username } }),
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const json = await res.json();
        const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          const cells: string[] = [];
          for (const week of calendar.weeks) {
            for (const day of week.contributionDays) {
              cells.push(mapCountToColor(day.contributionCount));
            }
          }
          return NextResponse.json({
            totalContributions: calendar.totalContributions,
            cells,
          });
        }
      }
    } catch (e) {
      console.error("GitHub GraphQL fetch failed:", e);
    }
  }

  // Fallback to public GitHub contributions API
  try {
    const res = await fetch(
      `https://github-contributions-api.deno.dev/${username}.json`,
      { next: { revalidate: 3600 } }
    );

    if (res.ok) {
      const data = await res.json();
      const cells: string[] = [];
      if (Array.isArray(data.contributions)) {
        for (const week of data.contributions) {
          if (Array.isArray(week)) {
            for (const day of week) {
              cells.push(mapCountToColor(day.contributionCount || 0));
            }
          }
        }
      }
      return NextResponse.json({
        totalContributions: data.totalContributions || 0,
        cells,
      });
    }
  } catch (e) {
    console.error("Public GitHub contributions fetch failed:", e);
  }

  // Final fallback if both APIs fail
  return NextResponse.json({
    totalContributions: 125,
    cells: Array.from({ length: 52 * 7 }, () => "#121111"),
  });
}
