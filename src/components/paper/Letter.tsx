"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { assessment, finalAssessment as fin } from "@/content/dossier";
import { TypeLine } from "../ui/TypeLine";
import { ease, Hand, Print, TOTAL_SHEETS } from "./Kit";

function Para({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.p>
  );
}

/**
 * The emotional core. No form, no header chrome: one large print
 * and a letter on better paper.
 */
export function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="a-nota" className="relative scroll-mt-10 px-3 pb-24 pt-28 sm:px-8 sm:pb-36 sm:pt-40">
      <p className="text-center font-type text-[11px] tracking-[0.3em] text-steel">
        HOJA 06 / {TOTAL_SHEETS} · {assessment.label}
      </p>

      <motion.div ref={ref} style={{ y }} className="mx-auto mt-12 max-w-[1000px]">
        <Print photo={assessment.photo} sizes="(min-width: 1024px) 1000px, 100vw" className="aspect-[3/2]" rotate={-1} frameClassName="p-3 sm:p-4" />
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease }}
        className="sheet-letter relative mx-auto -mt-6 max-w-[720px] rotate-[0.6deg] px-6 py-14 text-type sm:-mt-12 sm:px-16 sm:py-20"
      >
        <div className="space-y-7 font-serif text-[1.2rem] font-light leading-[1.75] sm:space-y-8 sm:text-[1.4rem]">
          {assessment.paragraphs.map((p) => (
            <Para key={p}>{p}</Para>
          ))}

          <div className="space-y-1 py-4 italic sm:py-8">
            {assessment.versions.map((v, i) => (
              <Para key={v} delay={i * 0.18}>
                {v}
              </Para>
            ))}
          </div>

          {assessment.closing.map((p, i) => (
            <Para key={p}>
              <span className={i === assessment.closing.length - 1 ? "font-normal" : undefined}>{p}</span>
            </Para>
          ))}
        </div>

        <div className="mt-14 text-right">
          <Hand tone="type" rotate={-4} delay={0.4} className="text-[2.8rem] sm:text-[3.4rem]">
            {assessment.signature}
          </Hand>
        </div>
      </motion.article>
    </section>
  );
}

/** Back on the desk: the birthday line and the open file. */
export function Closing() {
  return (
    <section className="relative px-4 pb-14 pt-32 sm:px-8 sm:pt-48">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.6, ease }}
          className="font-cond text-[clamp(2.8rem,10vw,8.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.01em] text-bone"
        >
          {fin.birthday}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="mt-10 font-type text-sm tracking-[0.5em] text-ash"
        >
          {fin.signature}
        </motion.p>
      </div>

      <div className="mx-auto mt-40 flex max-w-6xl items-center justify-between border-t border-iron pt-6 font-type text-[10px] tracking-[0.25em] text-steel sm:mt-56">
        <span className="text-ash">
          <TypeLine text={fin.footer} speed={45} cursor />
        </span>
        <span>EXP. 023 · REV. 2027</span>
      </div>
    </section>
  );
}
