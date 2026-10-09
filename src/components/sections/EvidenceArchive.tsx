"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { evidence, type Evidence } from "@/content/dossier";
import { ArchivePhoto } from "../ui/ArchivePhoto";
import { Corners, Label, OrRedacted } from "../ui/Primitives";
import { SectionHeader } from "../ui/SectionHeader";

const shapes: Record<NonNullable<Evidence["shape"]>, string> = {
  square: "",
  tall: "row-span-2",
  wide: "col-span-2",
};

export function EvidenceArchive() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + evidence.length) % evidence.length)),
    [],
  );

  return (
    <section id="evidence" className="relative scroll-mt-12 border-t border-iron/60 bg-carbon/40 px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          title="ARCHIVO DE EVIDENCIA"
          code={`${evidence.length} ELEMENTOS`}
          note="Evidencia física y digital de una asociación a largo plazo. Seleccioná cualquier elemento para inspeccionarlo."
        />

        <ul className="grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-2.5 sm:auto-rows-[190px] sm:gap-3 md:grid-cols-4 lg:auto-rows-[220px]">
          {evidence.map((e, i) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
              className={shapes[e.shape ?? "square"]}
            >
              <Tile e={e} onOpen={() => setOpen(i)} />
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox e={evidence[open]} onClose={() => setOpen(null)} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}

function Tile({ e, onOpen }: { e: Evidence; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="inspect group relative block h-full w-full overflow-hidden text-left outline-none focus-visible:ring-1 focus-visible:ring-bone"
      aria-label={`Evidencia ${e.id}${e.description ? ` — ${e.description}` : ""}`}
    >
      <ArchivePhoto
        photo={e.photo}
        sizes="(min-width: 768px) 25vw, 50vw"
        reveal={false}
        className="h-full w-full"
        imgClassName="group-hover:scale-[1.06] group-hover:grayscale-0"
      />

      {/* always-visible id */}
      <span className="absolute left-2 top-2 bg-ink/80 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-ash transition-colors group-hover:text-bone">
        EV-{e.id}
      </span>

      {/* hover metadata */}
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-ink/95 via-ink/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4">
        <Corners className="border-bone/70" />
        <p className="font-mono text-[10px] tracking-[0.25em] text-signal">EVIDENCIA {e.id}</p>
        <Meta e={e} compact />
      </div>
    </button>
  );
}

function Meta({ e, compact }: { e: Evidence; compact?: boolean }) {
  const rows: [string, React.ReactNode][] = [];
  if (e.date !== undefined) rows.push(["FECHA", <OrRedacted key="d" value={e.date} width="5ch" />]);
  if (e.location) rows.push(["UBICACIÓN", e.location]);
  if (e.status) rows.push(["ESTADO", e.status]);

  return (
    <div className={compact ? "mt-1.5" : "mt-4"}>
      <dl className={`grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-mono tracking-[0.15em] ${compact ? "text-[9px] sm:text-[10px]" : "text-[11px]"}`}>
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-steel">{k}:</dt>
            <dd className="text-bone">{v}</dd>
          </div>
        ))}
      </dl>
      {e.description && (
        <p className={`text-ash ${compact ? "mt-1.5 hidden text-[11px] leading-snug sm:line-clamp-3 sm:block" : "mt-4 text-[15px] leading-relaxed"}`}>
          {e.description}
        </p>
      )}
    </div>
  );
}

function FullImage({ e }: { e: Evidence }) {
  const [missing, setMissing] = useState(false);
  if (missing) {
    return (
      <div className="tech-grid flex h-full items-center justify-center p-4 text-center font-mono text-[11px] tracking-[0.25em] text-steel">
        SIN IMAGEN EN ARCHIVO — public{e.photo.src}
      </div>
    );
  }
  return <Image src={e.photo.src} alt={e.photo.alt} fill sizes="80vw" className="object-contain" onError={() => setMissing(true)} />;
}

function Lightbox({ e, onClose, onStep }: { e: Evidence; onClose: () => void; onStep: (d: 1 | -1) => void }) {
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
      if (ev.key === "ArrowRight") onStep(1);
      if (ev.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Evidencia ${e.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col bg-ink/96 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between border-b border-iron px-5 py-3 sm:px-8">
        <Label tone="signal">Evidencia {e.id}</Label>
        <button type="button" onClick={onClose} className="font-mono text-[11px] tracking-[0.3em] text-ash hover:text-bone">
          [ CERRAR ]
        </button>
      </div>

      <div className="grid min-h-0 flex-1 gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_320px] lg:gap-10">
        <motion.div
          key={e.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[45vh] lg:min-h-0"
          onClick={(ev) => ev.stopPropagation()}
        >
          <Corners className="border-ash" size="h-5 w-5" />
          <div className="absolute inset-3">
            <FullImage key={e.id} e={e} />
          </div>
        </motion.div>

        <aside className="flex flex-col justify-between gap-6 lg:border-l lg:border-iron lg:pl-10" onClick={(ev) => ev.stopPropagation()}>
          <div>
            <p className="text-5xl font-semibold tracking-[-0.04em] text-bone">#{e.id}</p>
            <Meta e={e} />
          </div>
          <div className="flex gap-3 font-mono text-[11px] tracking-[0.25em]">
            <button type="button" onClick={() => onStep(-1)} className="inspect flex-1 border border-iron py-3 text-ash transition-colors hover:border-bone hover:text-bone">
              ← ANTERIOR
            </button>
            <button type="button" onClick={() => onStep(1)} className="inspect flex-1 border border-iron py-3 text-ash transition-colors hover:border-bone hover:text-bone">
              SIGUIENTE →
            </button>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
