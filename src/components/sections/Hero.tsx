"use client";

import { AnimatePresence, motion } from "framer-motion";
import { analystNotes, hero } from "@/content/dossier";
import { AnalystNote, Corners, Label, StatusDot } from "../ui/Primitives";
import { Radar } from "../ui/Radar";
import { Ticker } from "../ui/Live";
import { TypeLine } from "../ui/TypeLine";

type Props = {
  state: "locked" | "checking" | "granted";
  onAccess: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ state, onAccess }: Props) {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden px-5 pb-10 pt-20 sm:px-10 lg:px-16">
      {/* background */}
      <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
      <Radar className="absolute -right-[30vmin] top-1/2 h-[110vmin] w-[110vmin] -translate-y-1/2 opacity-70 sm:-right-[18vmin]" />
      <Coordinates />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <span className="border border-signal/80 px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.4em] text-signal">
            {hero.classification}
          </span>
          <Label tone="steel" className="hidden sm:inline">
            <Ticker prefix="REF " length={8} every={3000} />
          </Label>
        </motion.div>

        <p className="mt-8 font-mono text-xs tracking-[0.35em] text-ash sm:text-sm">
          <TypeLine text={hero.title} eager delay={500} speed={22} />
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.9, ease }}
          className="mt-4 text-[clamp(3.6rem,15vw,11rem)] font-semibold leading-[0.85] tracking-[-0.055em] text-bone"
        >
          <span className="mr-4 align-top font-mono text-[clamp(0.7rem,1.4vw,0.95rem)] font-normal tracking-[0.3em] text-steel">
            SUJETO:
          </span>
          <br className="sm:hidden" />
          {hero.subject}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs tracking-[0.25em] sm:text-sm"
        >
          <span className="text-ash">
            EXPEDIENTE: <span className="text-bone">{hero.fileId}</span>
          </span>
          <span className="flex items-center gap-2.5 text-ash">
            ESTADO: <span className="text-bone">{hero.status}</span> <StatusDot />
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.7, ease }}
          className="mt-10 h-px w-full origin-left bg-iron"
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-lg font-medium tracking-[0.12em] text-paper sm:text-2xl">
              <TypeLine text={hero.report} eager delay={1900} speed={26} />
            </p>
            <motion.dl
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 2.4 } } }}
              className="mt-8 grid grid-cols-1 gap-x-10 gap-y-2.5 font-mono text-[11px] tracking-[0.18em] sm:grid-cols-2 sm:text-xs lg:grid-cols-3"
            >
              {hero.meta.map(([k, v]) => (
                <motion.div
                  key={k}
                  variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
                  className="flex gap-3"
                >
                  <dt className="text-steel">{k.toUpperCase()}:</dt>
                  <dd className={v === "Elevado" ? "text-amber" : "text-bone"}>{v}</dd>
                </motion.div>
              ))}
            </motion.dl>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.8 }}
              className="mt-6 max-w-xl font-mono text-[11px] leading-relaxed tracking-wider text-steel"
            >
              {hero.contents}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 3, ease }}
          >
            <AccessButton state={state} onAccess={onAccess} />
            <AnalystNote className="mt-3 text-center sm:text-right">{analystNotes.index}</AnalystNote>
          </motion.div>
        </div>
      </div>

      {/* bottom metadata strip */}
      <div className="relative z-10 mx-auto mt-12 flex w-full max-w-6xl justify-between font-mono text-[9px] tracking-[0.3em] text-steel sm:text-[10px]">
        <span>{hero.distribution}</span>
        <span className="hidden sm:inline">PÁGINA 01 DE 07</span>
      </div>
    </section>
  );
}

function AccessButton({ state, onAccess }: Props) {
  const granted = state === "granted";
  return (
    <button
      type="button"
      onClick={granted ? () => document.getElementById("profile")?.scrollIntoView() : onAccess}
      disabled={state === "checking"}
      className="inspect group relative w-full px-8 py-4 font-mono text-sm tracking-[0.4em] text-bone transition-colors duration-300 hover:bg-bone hover:text-ink disabled:opacity-60 sm:w-auto"
    >
      <Corners className="border-bone transition-all duration-300 group-hover:border-bone" />
      <span className="absolute inset-0 border border-iron transition-colors group-hover:border-bone" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={granted ? "g" : "l"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="relative block"
        >
          {granted ? "[ CONTINUAR ↓ ]" : "[ ABRIR EXPEDIENTE ]"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function Coordinates() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden font-mono text-[9px] tracking-[0.25em] text-steel/70 sm:block">
      <span className="absolute left-10 top-24 lg:left-16">33°41′S 53°27′W</span>
      <span className="absolute bottom-24 right-10 lg:right-16">34°54′S 56°10′W</span>
      <span className="absolute right-10 top-24 lg:right-16">
        SECTOR <Ticker length={4} every={4000} />
      </span>
      {/* registration marks */}
      <span className="absolute left-1/2 top-16 h-3 w-px bg-steel/50" />
      <span className="absolute bottom-16 left-1/2 h-3 w-px bg-steel/50" />
    </div>
  );
}
