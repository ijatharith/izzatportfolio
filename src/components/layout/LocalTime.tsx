"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/** Live local time for a time zone, rendered only after mount. */
export function LocalTime({ timeZone, suffix = "MYT" }: { timeZone: string; suffix?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className="tabular-nums">
      {time ?? "--:--"} {suffix}
    </span>
  );
}

/** Current year, rendered after mount so the page can be prerendered. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year ?? ""}</>;
}

const noopSubscribe = () => () => {};
