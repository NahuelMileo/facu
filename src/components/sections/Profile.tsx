"use client";

import { motion } from "framer-motion";
import { analystNotes, profile } from "@/content/dossier";
import { ArchivePhoto } from "../ui/ArchivePhoto";
import { Indicator } from "../ui/Indicator";
import { AnalystNote, Corners, Field, Label } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Profile() {
  return (
    <section id="profile" className="relative scroll-mt-12 px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeader index="01" title="PERFIL DEL SUJETO" code="PRF-023/A" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* Archive photograph */}
          <Reveal>
            <figure className="inspect group relative p-3 sm:p-4">
              <Corners className="border-ash" size="h-4 w-4" />
              <ArchivePhoto
                photo={profile.photo}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5] w-full"
                imgClassName="group-hover:scale-[1.02]"
              />
              {/* stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 1.4, rotate: -14 }}
                whileInView={{ opacity: 0.9, scale: 1, rotate: -8 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.25, ease: "easeOut" }}
                className="absolute right-6 top-8 border-2 border-signal px-3 py-1 font-mono text-[11px] font-medium tracking-[0.3em] text-signal mix-blend-screen"
              >
                ARCHIVADO
              </motion.div>
              <figcaption className="mt-3 flex justify-between font-mono text-[9px] tracking-[0.25em] text-steel sm:text-[10px]">
                <span>{profile.photoCaption}</span>
                <span className="hidden sm:inline">EXP. 1/125</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Data */}
          <div className="flex flex-col justify-between gap-12">
            <Reveal delay={0.1}>
              <Label tone="steel">Identificación</Label>
              <div className="mt-4">
                {profile.fields.map(([k, v]) => (
                  <Field key={k} k={k} v={v} accent={k === "EVALUACIÓN DE LEALTAD"} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Label tone="steel">Indicadores de conducta</Label>
              <div className="mt-3">
                {profile.indicators.map((ind, i) => (
                  <div key={ind.label}>
                    <Indicator {...ind} delay={i * 0.15} />
                    {ind.alert && <AnalystNote className="-mt-1 pb-2">{analystNotes.profileCars}</AnalystNote>}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
