"use client";

import { AnimatePresence, motion } from "framer-motion";
import { analystNotes, hero } from "@/content/dossier";
import { TypeLine } from "../ui/TypeLine";
import { ease, Hand, PAPER_SECTIONS, Stamp } from "./Kit";

export type AccessState = "locked" | "checking" | "granted";

/** Total time of the stamp sequence before the cover opens. */
export const PAPER_UNLOCK_MS = 1700;

// where each clearance stamp lands on the cover
const STAMP_SPOTS = [
  { className: "right-[5%] top-[16%]", rotate: -9 },
  { className: "right-[9%] top-[40%]", rotate: 5 },
  { className: "right-[4%] top-[63%]", rotate: -4 },
];

export function Folder({ state, onOpen }: { state: AccessState; onOpen: () => void }) {
  const opened = state === "granted";

  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-3 pb-16 pt-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -0.8 }}
        transition={{ duration: 1.2, ease }}
        className="relative w-full max-w-[880px]"
        style={{ perspective: 2400 }}
      >
        {/* folder tab */}
        <div className="manila-inside absolute -top-7 left-6 flex h-9 w-40 items-start justify-center rounded-t-md pt-1.5 font-type text-[11px] tracking-[0.2em] text-type/80 sm:left-10 sm:w-52">
          023 — FACUNDO
        </div>

        <div className="grid">
          {/* inside of the folder: the index sheet */}
          <div className="manila-inside col-start-1 row-start-1 rounded-sm p-3 sm:p-5">
            <IndexSheet visible={opened} />
          </div>

          {/* cover */}
          <motion.div
            className="manila col-start-1 row-start-1 origin-left rounded-sm"
            style={{ backfaceVisibility: "hidden", pointerEvents: opened ? "none" : "auto" }}
            animate={opened ? { rotateY: -170, opacity: 0 } : { rotateY: 0, opacity: 1 }}
            transition={{ rotateY: { duration: 1.2, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.3, delay: 0.9 } }}
          >
            <Cover state={state} onOpen={onOpen} />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {opened && (
          <motion.a
            href="#a-perfil"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-12 font-type text-xs tracking-[0.3em] text-ash hover:text-bone"
          >
            CONTINUAR LECTURA ↓
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  );
}

function Cover({ state, onOpen }: { state: AccessState; onOpen: () => void }) {
  const checking = state !== "locked";
  return (
    <div className="relative flex h-full flex-col p-5 text-type sm:p-10">
      <div className="flex justify-between font-type text-[11px] tracking-[0.2em] text-type/70">
        <span>EXP. N.º {hero.fileId}</span>
        <span>SERIE 2027</span>
      </div>

      <div className="mt-5 sm:mt-6">
        <Stamp size="lg" rotate={-5} delay={0.8}>
          {hero.classification}
        </Stamp>
      </div>

      {/* typed label glued to the cover */}
      <div className="sheet relative mt-7 max-w-[520px] rotate-[0.4deg] px-5 py-5 shadow-[0_2px_6px_rgba(0,0,0,0.25)] sm:px-7 sm:py-6">
        <p className="font-type text-[11px] tracking-[0.18em] text-pencil sm:text-xs">
          <TypeLine text={hero.title} eager delay={400} speed={22} />
        </p>
        <p className="mt-4 font-type text-[11px] tracking-[0.2em] text-pencil">SUJETO:</p>
        <h1 className="font-cond text-[clamp(3.2rem,12vw,6.5rem)] font-bold leading-[0.85] tracking-[-0.02em]">{hero.subject}</h1>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-1 font-type text-sm">
          <span>
            <span className="text-pencil">EXPEDIENTE:</span> {hero.fileId}
          </span>
          <span>
            <span className="text-pencil">ESTADO:</span> {hero.status}
          </span>
        </div>
        <div className="mt-4 h-px bg-type/40" />
        <p className="mt-4 font-cond text-lg font-semibold tracking-[0.08em] sm:text-xl">{hero.report}</p>
        <dl className="mt-3 space-y-0.5 font-type text-[13px]">
          {hero.meta.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-2">
              <dt className="shrink-0 text-pencil">{k}</dt>
              <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-type/40" />
              <dd className={v === "Elevado" ? "font-bold text-signal" : ""}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
        <button
          type="button"
          onClick={onOpen}
          disabled={checking}
          className="inspect border-2 border-type px-6 py-3.5 font-type text-sm tracking-[0.3em] transition-colors duration-300 hover:bg-type hover:text-sheet disabled:opacity-50"
        >
          [ ABRIR EXPEDIENTE ]
        </button>
        <p className="font-type text-[10px] tracking-[0.2em] text-type/60">{hero.distribution}</p>
      </div>

      {/* clearance stamps */}
      {hero.unlock.map((s, i) => (
        <span key={s} className={`absolute ${STAMP_SPOTS[i].className}`}>
          <Stamp size="sm" tone={i === hero.unlock.length - 1 ? "signal" : "type"} rotate={STAMP_SPOTS[i].rotate} delay={0.1 + i * 0.45} play={checking}>
            {s}
          </Stamp>
        </span>
      ))}
    </div>
  );
}

function IndexSheet({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, delay: visible ? 0.5 : 0 }}
      className="sheet relative h-full px-5 py-6 text-type sm:px-10 sm:py-9"
    >
      <p className="font-type text-[11px] tracking-[0.2em] text-pencil">EXP. 023 · CONTENIDO</p>
      <h2 className="mt-2 font-cond text-[clamp(2rem,6vw,3.2rem)] font-bold uppercase leading-none">Índice del expediente</h2>
      <div className="mt-3 h-[3px] bg-type" />
      <div className="mt-[3px] h-px bg-type" />

      <ol className="mt-6 space-y-1">
        {PAPER_SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="inspect group flex items-baseline gap-3 py-1.5 font-type text-[15px] sm:text-lg">
              <span className="text-pencil">{s.n}</span>
              <span className="decoration-signal decoration-2 underline-offset-4 group-hover:underline">{s.label}</span>
              <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-type/40" />
              <span className="text-[12px] text-pencil sm:text-sm">HOJA {s.n}</span>
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex items-end justify-between gap-4">
        <p className="max-w-xs font-type text-[11px] leading-relaxed text-pencil">{hero.contents}</p>
        {visible && <Hand rotate={-6} delay={1.4}>{analystNotes.index}</Hand>}
      </div>
    </motion.div>
  );
}
