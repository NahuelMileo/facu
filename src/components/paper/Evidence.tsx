"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { evidence, type Evidence } from "@/content/dossier";
import { OrRedact, PhotoImage, Print, TOTAL_SHEETS } from "./Kit";

const aspect: Record<NonNullable<Evidence["shape"]>, string> = {
  square: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
};

/** deterministic scatter so prints look dropped on the desk, not gridded */
const tilt = (id: string) => ((Number(id) * 37) % 9) - 4;

/** Loose prints scattered on the desk — this section leaves the paper sheet. */
export function EvidenceDesk() {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + evidence.length) % evidence.length)), []);

  return (
    <section id="a-evidencia" className="relative scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="font-type text-[11px] tracking-[0.25em] text-steel">
          HOJA 04 / {TOTAL_SHEETS} · {evidence.length} ELEMENTOS · SOBRE ADJUNTO
        </p>
        <h2 className="mt-3 font-cond text-[clamp(2.4rem,7vw,4.6rem)] font-bold uppercase leading-[0.9] text-bone">Archivo de evidencia</h2>
        <p className="mt-4 max-w-lg font-type text-[13px] leading-relaxed text-ash">
          Evidencia física y digital de una asociación a largo plazo. Seleccioná cualquier elemento para inspeccionarlo.
        </p>

        <ul className="mt-16 columns-2 gap-4 sm:gap-8 md:columns-3 lg:columns-4">
          {evidence.map((e, i) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, y: 30, rotate: tilt(e.id) * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt(e.id) }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`mb-10 break-inside-avoid sm:mb-14 ${i === 1 ? "pt-6" : ""}`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                style={{ "--untilt": `${-tilt(e.id)}deg` } as React.CSSProperties}
                aria-label={`Evidencia ${e.id}${e.description ? ` — ${e.description}` : ""}`}
                className="inspect group relative block w-full text-left outline-none transition-transform duration-500 ease-out hover:z-10 hover:-translate-y-1.5 hover:scale-[1.03] hover:rotate-(--untilt) focus-visible:ring-2 focus-visible:ring-amber"
              >
                <Print
                  photo={e.photo}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className={aspect[e.shape ?? "square"]}
                  frameClassName="pb-1 transition-shadow duration-500 group-hover:shadow-[0_30px_40px_-16px_rgba(0,0,0,0.8)]"
                  caption={<Caption e={e} />}
                />
                {/* evidence tag */}
                <span className="absolute -right-2 -top-3 rotate-[8deg] bg-manila px-2 py-1 font-type text-[10px] font-bold tracking-[0.15em] text-type shadow-[0_3px_6px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:rotate-[2deg]">
                  <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-desk align-middle" />
                  EV-{e.id}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>{open !== null && <Lightbox e={evidence[open]} onClose={() => setOpen(null)} onStep={step} />}</AnimatePresence>
    </section>
  );
}

function Caption({ e }: { e: Evidence }) {
  const bits = [e.location, e.status].filter(Boolean).join(" · ");
  return (
    <span className="block">
      <span className="flex justify-between gap-2">
        <span className="font-bold">EVIDENCIA {e.id}</span>
        {e.date !== undefined && (
          <span className="text-pencil">
            <OrRedact value={e.date} width="4ch" />
          </span>
        )}
      </span>
      {/* extra metadata on hover (desktop) */}
      <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
        <span className="overflow-hidden">
          {bits && <span className="mt-1 block uppercase tracking-[0.1em] text-pencil">{bits}</span>}
          {e.description && <span className="mt-1 block leading-snug">{e.description}</span>}
        </span>
      </span>
    </span>
  );
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
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-desk/95 backdrop-blur-sm"
    >
      <div className="mx-auto grid min-h-full max-w-6xl items-center gap-8 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_320px] lg:gap-12">
        <motion.div
          key={e.id}
          initial={{ opacity: 0, y: 16, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -0.6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={(ev) => ev.stopPropagation()}
          className="bg-[#f6f3ea] p-2.5 shadow-[0_40px_60px_-20px_rgba(0,0,0,0.9)] sm:p-3.5"
        >
          <div className="relative h-[55vh] w-full bg-[#d6cfbf] sm:h-[68vh]">
            <PhotoImage key={e.id} photo={e.photo} sizes="80vw" contain />
          </div>
        </motion.div>

        <motion.aside
          key={`t-${e.id}`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={(ev) => ev.stopPropagation()}
          className="sheet rotate-[1deg] px-6 py-6 font-type text-type"
        >
          <p className="text-[11px] tracking-[0.2em] text-pencil">ETIQUETA DE EVIDENCIA</p>
          <p className="mt-1 font-cond text-5xl font-bold">EV-{e.id}</p>
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            {e.date !== undefined && (
              <>
                <dt className="text-pencil">FECHA:</dt>
                <dd>
                  <OrRedact value={e.date} width="5ch" />
                </dd>
              </>
            )}
            {e.location && (
              <>
                <dt className="text-pencil">UBICACIÓN:</dt>
                <dd>{e.location}</dd>
              </>
            )}
            {e.status && (
              <>
                <dt className="text-pencil">ESTADO:</dt>
                <dd>{e.status}</dd>
              </>
            )}
          </dl>
          {e.description && <p className="mt-5 border-t border-type/30 pt-4 text-[15px] leading-relaxed">{e.description}</p>}
          <div className="mt-6 flex gap-2 text-[11px] tracking-[0.2em]">
            <button type="button" onClick={() => onStep(-1)} className="inspect flex-1 border border-type/60 py-2.5 hover:bg-type hover:text-sheet">
              ← ANT.
            </button>
            <button type="button" onClick={() => onStep(1)} className="inspect flex-1 border border-type/60 py-2.5 hover:bg-type hover:text-sheet">
              SIG. →
            </button>
          </div>
          <button type="button" onClick={onClose} className="mt-2 w-full border border-type py-2.5 text-[11px] tracking-[0.3em] hover:bg-type hover:text-sheet">
            [ CERRAR ]
          </button>
        </motion.aside>
      </div>
    </motion.div>
  );
}
