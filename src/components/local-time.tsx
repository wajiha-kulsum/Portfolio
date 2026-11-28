"use client";

import { useSyncExternalStore } from "react";

const clock = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
});

const subscribe = (tick: () => void) => {
  const timer = setInterval(tick, 15_000);
  return () => clearInterval(timer);
};

/** The time in Mumbai, kept current. Empty on the server, filled on load. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => clock.format(new Date()), () => "");
  return <span className="tabular-nums">{time ? `${time}, my time` : " "}</span>;
}
