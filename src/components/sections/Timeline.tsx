"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { analystNotes, timeline, type CaseFile } from "@/content/dossier";
import { ArchivePhoto } from "../ui/ArchivePhoto";
import { AnalystNote, Label, OrRedacted } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="history" className="relative scroll-mt-12 border-t border-iron/60 bg-carbon/40 px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          title="HISTORIAL DEL CASO"
          code="CHR-001→023"
          note="Registro cronológico de eventos significativos. Entradas compiladas a partir de la memoria del analista, que en general es confiable."
        />

        <ol ref={ref} className="relative">
          {/* track + drawn line */}
          <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-iron md:left-[196px]" />
          <motion.span
            aria-hidden
            style={{ scaleY: line }}
            className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-ash md:left-[196px]"
          />
          {timeline.map((c, i) => (
            <Entry key={c.code} c={c} last={i === timeline.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Entry({ c, last }: { c: CaseFile; last: boolean }) {
  return (
    <li className={`relative grid gap-4 pl-9 md:grid-cols-[180px_1fr] md:gap-16 md:pl-0 ${last ? "" : "pb-20 sm:pb-24"}`}>
      {/* node */}
      <motion.span
        aria-hidden
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-30% 0px" }}
        transition={{ duration: 0.4, ease: "backOut" }}
        className={`absolute left-0 top-1 h-[11px] w-[11px] border md:left-[191px] ${last ? "border-amber bg-amber/30" : "border-ash bg-ink"}`}
      />

      {/* left column: code + date */}
      <Reveal className="md:text-right">
        <Label tone={last ? "amber" : "signal"}>Expediente {c.code}</Label>
        <p className="mt-2 font-mono text-sm tracking-[0.15em] text-ash">
          <OrRedacted value={c.date} width="7ch" />
        </p>
      </Reveal>

      {/* right column: content */}
      <Reveal delay={0.08} className="grid gap-6 lg:grid-cols-[1fr_minmax(0,300px)] lg:gap-10">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-bone sm:text-3xl">{c.title}</h3>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ash sm:text-base">{c.body}</p>
          <p className="mt-5 font-mono text-[9px] tracking-[0.25em] text-steel">
            CÓDIGO DE ARCHIVO · CF-{c.code}-{c.title.replace(/[^A-ZÁÉÍÓÚÑ]/g, "").slice(0, 3)}
          </p>
          {last && <AnalystNote className="mt-3">{analystNotes.history}</AnalystNote>}
        </div>
        {c.photo && (
          <div className="inspect group relative">
            <ArchivePhoto
              photo={c.photo}
              sizes="(min-width: 1024px) 300px, 90vw"
              className="aspect-[4/3] w-full"
              imgClassName="group-hover:scale-[1.04]"
            />
            <span className="absolute left-2 top-2 bg-ink/80 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-ash">
              CF-{c.code}
            </span>
          </div>
        )}
      </Reveal>
    </li>
  );
}
