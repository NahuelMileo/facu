"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import type { Photo } from "@/content/dossier";

export const ease = [0.22, 1, 0.36, 1] as const;
export const TOTAL_SHEETS = "07";

export const PAPER_SECTIONS = [
  { id: "a-perfil", n: "01", label: "Perfil del sujeto" },
  { id: "a-historial", n: "02", label: "Historial del caso" },
  { id: "a-novedades", n: "03", label: "Novedades recientes" },
  { id: "a-evidencia", n: "04", label: "Archivo de evidencia" },
  { id: "a-comunicaciones", n: "05", label: "Registro de comunicaciones" },
  { id: "a-nota", n: "06", label: "Nota personal del analista" },
  { id: "a-final", n: "07", label: "Evaluación final" },
];

/* ───────────────────────── Sheet ───────────────────────── */

type SheetProps = {
  id?: string;
  n: string;
  title: string;
  kicker?: string;
  code?: string;
  tilt?: number;
  children: ReactNode;
  className?: string;
};

/** A typed sheet of paper lying on the desk. */
export function Sheet({ id, n, title, kicker, code, tilt = 0, children, className = "" }: SheetProps) {
  return (
    <section id={id} className="relative scroll-mt-10 px-3 py-10 sm:px-8 sm:py-16">
      <motion.article
        initial={{ opacity: 0, y: 50, rotate: tilt * 3 }}
        whileInView={{ opacity: 1, y: 0, rotate: tilt }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1, ease }}
        className={`sheet relative mx-auto max-w-[900px] px-5 pb-8 pt-5 text-type sm:px-12 sm:pb-12 sm:pt-7 lg:px-16 ${className}`}
      >
        <div className="flex items-center justify-between font-type text-[10px] tracking-[0.18em] text-pencil sm:text-[11px]">
          <span>EXP. 023 · FACUNDO</span>
          <span className="font-cond font-bold tracking-[0.4em] text-signal">CLASIFICADO</span>
          <span>
            HOJA {n} / {TOTAL_SHEETS}
          </span>
        </div>

        <header className="mt-10 sm:mt-12">
          {kicker && <p className="font-type text-[11px] tracking-[0.25em] text-pencil sm:text-xs">{kicker}</p>}
          <h2 className="mt-2 font-cond text-[clamp(2.1rem,6.4vw,3.8rem)] font-bold uppercase leading-[0.92] tracking-[-0.01em]">
            {title}
          </h2>
          <div className="mt-3 h-[3px] bg-type" />
          <div className="mt-[3px] h-px bg-type" />
          {code && <p className="mt-2 text-right font-type text-[10px] tracking-[0.2em] text-pencil">REF. {code}</p>}
        </header>

        {children}

        <footer className="mt-14 flex items-center justify-between border-t border-type/25 pt-3 font-type text-[9px] tracking-[0.2em] text-pencil sm:text-[10px]">
          <span>FORM. AN-023 / REV. 2027</span>
          <span className="font-cond font-bold tracking-[0.4em] text-signal">CLASIFICADO</span>
          <span>
            {n} / {TOTAL_SHEETS}
          </span>
        </footer>
      </motion.article>
    </section>
  );
}

/* ───────────────────────── Ink ───────────────────────── */

/** Rubber stamp that slams onto the page. */
export function Stamp({
  children,
  rotate = -8,
  delay = 0,
  tone = "signal",
  className = "",
  size = "md",
  play,
}: {
  children: ReactNode;
  rotate?: number;
  delay?: number;
  tone?: "signal" | "type";
  className?: string;
  size?: "sm" | "md" | "lg";
  /** controlled mode; otherwise it plays when scrolled into view */
  play?: boolean;
}) {
  const sizes = {
    sm: "px-2 py-0.5 text-[11px] border-[3px]",
    md: "px-3 py-1 text-sm sm:text-base border-4",
    lg: "px-4 py-1.5 text-2xl sm:text-4xl border-[6px]",
  };
  const shown = { opacity: 0.82, scale: 1, rotate };
  const hidden = { opacity: 0, scale: 1.9, rotate: rotate - 8 };
  const trigger = play === undefined ? { whileInView: shown, viewport: { once: true, margin: "-10% 0px" } } : { animate: play ? shown : hidden };
  return (
    <motion.span
      aria-hidden
      initial={hidden}
      {...trigger}
      transition={{ delay, duration: 0.16, ease: "easeIn" }}
      className={`pointer-events-none inline-block select-none border-double font-cond font-bold uppercase leading-none tracking-[0.18em] mix-blend-multiply ${
        tone === "signal" ? "border-signal text-signal" : "border-type text-type"
      } ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  );
}

/** Ballpoint note in the margin, "written" left to right. */
export function Hand({
  children,
  className = "",
  tone = "signal",
  rotate = -3,
  delay = 0.3,
}: {
  children: ReactNode;
  className?: string;
  tone?: "signal" | "type" | "pencil";
  rotate?: number;
  delay?: number;
}) {
  const tones = { signal: "text-signal", type: "text-[#1f2433]", pencil: "text-pencil" };
  return (
    <motion.span
      initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
      whileInView={{ clipPath: "inset(-20% 0% -20% 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: "easeInOut" }}
      style={{ rotate }}
      className={`inline-block font-hand text-[1.6rem] leading-none sm:text-[1.9rem] ${tones[tone]} ${className}`}
    >
      {children}
    </motion.span>
  );
}

/** Black redaction bar. */
export function Redact({ width = "7ch" }: { width?: string }) {
  return (
    <span aria-label="censurado" className="inline-block h-[0.95em] translate-y-[0.14em] bg-type" style={{ width }}>
      &nbsp;
    </span>
  );
}

export function OrRedact({ value, width }: { value: string | null | undefined; width?: string }) {
  return value ? <>{value}</> : <Redact width={width} />;
}

/** Highlighter pass over inline text once it scrolls into view. */
export function Highlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <span ref={ref} className={`highlight ${inView ? "on" : ""}`}>
      {children}
    </span>
  );
}

/* ───────────────────────── Forms ───────────────────────── */

/** Boxed government-form grid. */
export function FormGrid({ children, cols = "sm:grid-cols-2" }: { children: ReactNode; cols?: string }) {
  return <div className={`grid grid-cols-1 border-l border-t border-type/50 ${cols}`}>{children}</div>;
}

export function FormCell({ label, children, accent }: { label: string; children: ReactNode; accent?: boolean }) {
  return (
    <div className="border-b border-r border-type/50 px-3 py-2 sm:px-4 sm:py-2.5">
      <p className="font-cond text-[10px] font-semibold uppercase tracking-[0.2em] text-pencil">{label}</p>
      <p className={`mt-0.5 font-type text-[15px] sm:text-base ${accent ? "font-bold text-signal" : ""}`}>{children}</p>
    </div>
  );
}

/** Label ........ value */
export function Leader({ k, v, accent }: { k: string; v: ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-baseline gap-2 py-1 font-type text-[13px] sm:text-sm">
      <span className="shrink-0 uppercase text-pencil">{k}</span>
      <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-type/40" />
      <span className={`text-right ${accent ? "font-bold text-signal" : ""}`}>{v}</span>
    </div>
  );
}

/** Ten typed cells: ■■■■■■■□□□ 70% */
export function TypedMeter({ label, value, alert, note }: { label: string; value: number; alert?: boolean; note?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const filled = Math.round(value / 10);
  return (
    <div ref={ref} className="py-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-cond text-[11px] font-semibold uppercase tracking-[0.18em] text-pencil sm:text-xs">{label}</span>
        {note}
      </div>
      <div className="mt-1.5 flex items-center gap-3 font-type" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <span className="flex gap-[3px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ delay: i * 0.07, duration: 0.05 }}
              className={`h-3.5 w-3 sm:h-4 sm:w-3.5 ${i < filled ? (alert ? "bg-signal/90" : "bg-type/90") : "border border-type/35"}`}
            />
          ))}
        </span>
        <span className={`text-sm tabular-nums ${alert ? "font-bold text-signal" : ""}`}>{value}%</span>
      </div>
    </div>
  );
}

/* ───────────────────────── Photographs ───────────────────────── */

export function PaperClip({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 70" className={`pointer-events-none absolute z-10 h-16 w-6 drop-shadow-[1px_2px_1px_rgba(0,0,0,0.35)] ${className}`}>
      <path
        d="M8 44V12a5 5 0 0 1 10 0v40a8 8 0 0 1-16 0V18"
        fill="none"
        stroke="#9a9ca1"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 h-6 w-20 bg-[#e9e0c8]/75 shadow-[0_1px_2px_rgba(0,0,0,0.2)] backdrop-blur-[1px] sm:w-24 ${className}`}
    />
  );
}

type PrintProps = {
  photo: Photo;
  sizes: string;
  /** classes for the image window (aspect ratio etc.) */
  className?: string;
  /** classes for the white-bordered print */
  frameClassName?: string;
  imgClassName?: string;
  caption?: ReactNode;
  rotate?: number;
  priority?: boolean;
};

/** A photographic print: white border, slight tone, soft shadow. */
export function Print({ photo, sizes, className = "aspect-[4/3]", frameClassName = "", imgClassName = "", caption, rotate = 0, priority }: PrintProps) {
  return (
    <figure
      style={{ rotate: `${rotate}deg` }}
      className={`relative bg-[#f6f3ea] p-2 shadow-[0_18px_30px_-14px_rgba(0,0,0,0.65),0_2px_4px_rgba(0,0,0,0.25)] sm:p-2.5 ${frameClassName}`}
    >
      <div className={`relative w-full overflow-hidden bg-[#d6cfbf] ${className}`}>
        <PhotoImage photo={photo} sizes={sizes} priority={priority} className={imgClassName} />
      </div>
      {caption && <figcaption className="px-1 pb-1 pt-2.5 font-type text-[11px] leading-snug text-type sm:text-xs">{caption}</figcaption>}
    </figure>
  );
}

export function PhotoImage({ photo, sizes, priority, className = "", contain }: { photo: Photo; sizes: string; priority?: boolean; className?: string; contain?: boolean }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3 text-center">
        <svg aria-hidden viewBox="0 0 40 40" className="h-6 w-6 text-pencil">
          <path d="M20 4v10M20 26v10M4 20h10M26 20h10" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <p className="font-type text-[10px] tracking-[0.15em] text-pencil">SIN IMAGEN EN ARCHIVO</p>
        <p className="max-w-full truncate font-type text-[9px] text-pencil/70">public{photo.src}</p>
      </div>
    );
  }
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setMissing(true)}
      style={{ objectPosition: photo.focus ?? "50% 50%" }}
      className={`${contain ? "object-contain" : "object-cover sepia-[0.12] contrast-[1.05] saturate-[0.85]"} transition-transform duration-700 ease-out ${className}`}
    />
  );
}
