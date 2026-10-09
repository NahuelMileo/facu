import type { ReactNode } from "react";

/** Small monospaced metadata label. */
export function Label({
  children,
  className = "",
  tone = "ash",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ash" | "steel" | "signal" | "amber" | "bone";
}) {
  const tones = {
    ash: "text-ash",
    steel: "text-steel",
    signal: "text-signal",
    amber: "text-amber",
    bone: "text-bone",
  };
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px] ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

/** Registration marks at the four corners of the parent (parent must be relative). */
export function Corners({ className = "border-steel/70", size = "h-3 w-3" }: { className?: string; size?: string }) {
  const base = `pointer-events-none absolute ${size} ${className}`;
  return (
    <>
      <span aria-hidden className={`${base} left-0 top-0 border-l border-t`} />
      <span aria-hidden className={`${base} right-0 top-0 border-r border-t`} />
      <span aria-hidden className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/** Inline redaction bar — used whenever a value is null. */
export function Redacted({ width = "6ch" }: { width?: string }) {
  return (
    <span className="redacted inline-block h-[0.95em] translate-y-[0.12em] align-baseline" style={{ width }} aria-label="censurado">
      &nbsp;
    </span>
  );
}

/** Key / value row in a dossier table. */
export function Field({ k, v, accent }: { k: string; v: ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-iron/80 py-2.5">
      <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-steel sm:text-[11px]">{k}</span>
      <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-iron" />
      <span className={`text-right font-mono text-[12px] tracking-wider sm:text-[13px] ${accent ? "text-amber" : "text-bone"}`}>
        {v}
      </span>
    </div>
  );
}

/** A value or a redaction bar. */
export function OrRedacted({ value, width }: { value: string | null | undefined; width?: string }) {
  return value ? <>{value}</> : <Redacted width={width} />;
}

/** Pulsing status dot. */
export function StatusDot({ tone = "signal" }: { tone?: "signal" | "amber" }) {
  const c = tone === "signal" ? "bg-signal" : "bg-amber";
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      <span className={`absolute inset-0 animate-ping rounded-full opacity-60 ${c}`} />
      <span className={`relative h-1.5 w-1.5 rounded-full ${c}`} />
    </span>
  );
}

/** Analyst's margin note, terminal style. */
export function AnalystNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] tracking-[0.12em] text-amber ${className}`}>
      <span className="text-steel">↳ NOTA DEL ANALISTA:</span> {children}
    </p>
  );
}
