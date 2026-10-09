"use client";

import { motion } from "framer-motion";
import { finalAssessment as f } from "@/content/dossier";
import { Label } from "../ui/Primitives";
import { Radar } from "../ui/Radar";
import { TypeLine } from "../ui/TypeLine";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalAssessment() {
  return (
    <section id="final" className="relative scroll-mt-12 overflow-hidden border-t border-iron/60 px-5 pb-16 pt-28 sm:px-10 sm:pt-36 lg:px-16">
      <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
      <Radar className="absolute left-1/2 top-[58%] h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="relative mx-auto max-w-3xl">
        <div className="flex items-center gap-4">
          <Label tone="signal">§ 07</Label>
          <span className="h-px flex-1 bg-iron" />
          <Label tone="steel">FIN DEL INFORME</Label>
        </div>

        <h2 className="mt-6 text-[clamp(2rem,6vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-bone">
          <TypeLine text="EVALUACIÓN FINAL" speed={28} />
        </h2>

        <dl className="mt-12 font-mono">
          {f.rows.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: 0.2 + i * 0.25, duration: 0.4 }}
              className="flex flex-col gap-1 border-b border-iron py-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <dt className="text-[10px] tracking-[0.3em] text-steel sm:text-[11px]">{k}:</dt>
              <dd className={`text-lg tracking-[0.2em] sm:text-xl ${k === "ESTADO DE LA AMISTAD" ? "text-amber" : "text-bone"}`}>{v}</dd>
            </motion.div>
          ))}
        </dl>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: 1.3, duration: 0.8, ease }}
          className="mt-14"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-steel sm:text-[11px]">RECOMENDACIÓN:</p>
          <p className="mt-3 text-[clamp(1.4rem,3.4vw,2.2rem)] font-semibold leading-tight tracking-[-0.01em] text-bone">
            {f.recommendation}
          </p>
          <motion.span
            initial={{ opacity: 0, scale: 1.5, rotate: -12 }}
            whileInView={{ opacity: 0.9, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ delay: 2, duration: 0.22, ease: "easeOut" }}
            className="mt-6 inline-block border-2 border-signal px-3 py-1 font-mono text-[11px] font-medium tracking-[0.35em] text-signal"
          >
            APROBADO
          </motion.span>
        </motion.div>
      </div>

      {/* Birthday */}
      <div className="relative mx-auto mt-40 max-w-5xl text-center sm:mt-56">
        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.6, ease }}
          className="text-[clamp(2.6rem,9.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-bone"
        >
          {f.birthday}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="mt-10 font-mono text-sm tracking-[0.5em] text-ash"
        >
          {f.signature}
        </motion.p>
      </div>

      <div className="relative mx-auto mt-40 flex max-w-6xl items-center justify-between border-t border-iron pt-6 font-mono text-[9px] tracking-[0.3em] text-steel sm:mt-56 sm:text-[10px]">
        <span className="text-ash">
          <TypeLine text={f.footer} speed={45} cursor />
        </span>
        <span>EXP. 023 · REV. 2027</span>
      </div>
    </section>
  );
}
