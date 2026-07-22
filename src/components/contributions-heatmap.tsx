"use client";

import { useEffect, useState } from "react";

// Fallback deterministic colors if offline or loading
function seededColor(week: number, day: number) {
  const seed = week * 31 + day * 7 + 1;
  const r = ((seed * 9301 + 49297) % 233280) / 233280;
  const greenLevels = ["#216435", "#2F984A", "#3EBE5E", "#93E7A2"];
  const dark = ["#121111", "#2F2F2F"];
  const inRange = week >= 12 && week <= 40;
  const isWeekend = day === 5 || day === 6;

  if (inRange && !isWeekend) {
    return r < 0.3
      ? greenLevels[3]
      : r < 0.55
        ? greenLevels[2]
        : r < 0.7
          ? greenLevels[1]
          : r < 0.82
            ? greenLevels[0]
            : dark[1];
  }
  if (inRange && isWeekend) {
    return r < 0.1 ? greenLevels[3] : r < 0.2 ? dark[1] : dark[0];
  }
  return r < 0.05 ? greenLevels[3] : r < 0.12 ? dark[1] : dark[0];
}

const DEFAULT_CELLS: string[] = Array.from({ length: 52 * 7 }, (_, i) =>
  seededColor(Math.floor(i / 7), i % 7)
);

export function ContributionsSection() {
  const [total, setTotal] = useState<number | null>(null);
  const [cells, setCells] = useState<string[]>(DEFAULT_CELLS);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalContributions !== undefined) {
          setTotal(data.totalContributions);
        }
        if (Array.isArray(data.cells) && data.cells.length > 0) {
          setCells(data.cells);
        }
      })
      .catch((err) => console.error("Failed to load contributions:", err));
  }, []);

  return (
    <>
      {/* Stats */}
      <p className="absolute top-[1306px] left-[135px] text-[20px] font-light leading-[24px]">
        {total !== null ? total : "125"} contributions in the last year
      </p>

      {/* Heatmap */}
      <div
        className="absolute left-[135px] top-[1099px] rounded-[8px] bg-[#6969692B] flex items-center justify-center overflow-x-auto p-4"
        style={{
          width: "1169px",
          height: "191px",
          boxShadow: "16px 16px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(cells.length / 7)}, 19px)`,
            gridTemplateRows: "repeat(7, 19px)",
          }}
        >
          {cells.map((c, i) => (
            <div
              key={i}
              className="rounded-[5px] transition-colors duration-300"
              style={{ width: "19px", height: "19px", backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
