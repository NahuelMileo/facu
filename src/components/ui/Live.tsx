"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const noop = () => () => {};
/** false during SSR/hydration, true afterwards — avoids hydration mismatches for time/random values. */
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

/** Local time in Uruguay, updated every second. Renders a stable placeholder on the server. */
export function Clock({ className = "" }: { className?: string }) {
  const client = useIsClient();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const text = client
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "America/Montevideo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
        .format(now)
        .replace(",", "")
    : "--/--/---- --:--:--";

  return <span className={`tabular-nums ${className}`}>{text} UYT</span>;
}

const HEX = "0123456789ABCDEF";
const rand = (n: number) => Array.from({ length: n }, () => HEX[Math.floor(Math.random() * 16)]).join("");

/** A short code that slowly changes — the "system is alive" detail. */
export function Ticker({ length = 6, every = 2400, prefix = "", className = "" }: { length?: number; every?: number; prefix?: string; className?: string }) {
  const client = useIsClient();
  const [code, setCode] = useState(() => rand(length));

  useEffect(() => {
    const t = setInterval(() => setCode(rand(length)), every);
    return () => clearInterval(t);
  }, [length, every]);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {client ? code : "0".repeat(length)}
    </span>
  );
}

/** Whole days elapsed since an ISO date, computed on the client. */
export function DaysSince({ iso, className = "" }: { iso: string; className?: string }) {
  const days = useSyncExternalStore<number | null>(
    noop,
    () => Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)),
    () => null,
  );

  return <span className={`tabular-nums ${className}`}>{days === null ? "---" : String(days).padStart(3, "0")}</span>;
}
