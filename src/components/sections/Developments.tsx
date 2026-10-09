"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { analystNotes, developments } from "@/content/dossier";
import { ArchivePhoto } from "../ui/ArchivePhoto";
import { DaysSince } from "../ui/Live";
import { AnalystNote, Corners, Field, Label, OrRedacted } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";

export function Developments() {
  return (
    <section id="developments" className="relative scroll-mt-12 px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          title="NOVEDADES RECIENTES"
          code="RPT-2027"
          note="Resumen de los cambios relevantes en el estado del sujeto desde el informe anual anterior."
        />
        <div className="flex flex-col gap-10 sm:gap-14">
          <Professional />
          <Vehicle />
          <Behavior />
        </div>
      </div>
    </section>
  );
}

function Card({ n, tag, meta = [], children }: { n: string; tag: string; meta?: [string, string][]; children: ReactNode }) {
  const rows: [string, string][] = [["PARA", developments.memo.to], ["DE", developments.memo.from], ...meta];
  return (
    <Reveal>
      <article className="group relative border border-iron bg-carbon/60 transition-colors duration-500 hover:border-steel/70">
        <Corners className="border-ash/0 transition-colors duration-500 group-hover:border-ash" />
        <div className="flex items-center justify-between border-b border-iron px-5 py-3 sm:px-8">
          <Label tone="signal">Novedad {n}</Label>
          <Label tone="steel">{tag}</Label>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-1 border-b border-iron/60 px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] sm:px-8">
          {rows.map(([k, v]) => (
            <span key={k} className="text-steel">
              {k}: <span className="text-ash">{v}</span>
            </span>
          ))}
        </div>
        {children}
      </article>
    </Reveal>
  );
}

function Professional() {
  const d = developments.professional;
  return (
    <Card n="01" tag={d.tag}>
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-10 p-5 sm:p-8 lg:p-12">
          <div>
            <p className="font-mono text-sm tracking-[0.3em] text-amber">{d.date}</p>
            <h3 className="mt-4 text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-bone">
              {d.headline}
            </h3>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-ash sm:text-lg">
              {d.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-8 border-t border-iron pt-6">
            <div>
              <Label tone="steel">Días en servicio</Label>
              <p className="mt-1 font-mono text-4xl font-light text-bone sm:text-5xl">
                <DaysSince iso="2026-01-14T00:00:00-03:00" />
              </p>
            </div>
            <div className="pb-1.5">
              <Label tone="steel">Incidentes reportados</Label>
              <p className="mt-1 font-mono text-sm text-bone">NINGUNO CONFIRMADO</p>
            </div>
          </div>
        </div>
        <div className="inspect">
          <ArchivePhoto
            photo={d.photo}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full min-h-[320px] w-full lg:min-h-[520px]"
            imgClassName="group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </Card>
  );
}

function Vehicle() {
  const d = developments.vehicle;
  const [main, ...rest] = d.photos;
  return (
    <Card n="02" tag={d.tag}>
      <div className="p-5 sm:p-8 lg:p-12">
        <h3 className="text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-bone">{d.headline}</h3>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="inspect group/p relative sm:col-span-2 sm:row-span-2">
            <ArchivePhoto photo={main} sizes="(min-width: 640px) 60vw, 100vw" className="aspect-[16/10] w-full sm:aspect-auto sm:h-full" imgClassName="group-hover/p:scale-[1.03]" />
            <PhotoTag>FOTO DEL ACTIVO 01</PhotoTag>
          </div>
          {rest.map((p, i) => (
            <div key={p.src} className="inspect group/p relative">
              <ArchivePhoto photo={p} sizes="(min-width: 640px) 30vw, 100vw" className="aspect-[16/10] w-full" imgClassName="group-hover/p:scale-[1.04]" />
              <PhotoTag>FOTO DEL ACTIVO 0{i + 2}</PhotoTag>
            </div>
          ))}
        </div>
        <AnalystNote className="mt-4">FOTO 01 — {analystNotes.vehicle}</AnalystNote>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Label tone="steel">Registro del activo</Label>
            <div className="mt-3">
              {d.fields.map(([k, v]) => (
                <Field key={k} k={k} v={v} accent={k === "FOTOS ENVIADAS AL ANALISTA"} />
              ))}
            </div>
          </div>
          <div>
            <Label tone="steel">Ficha técnica</Label>
            <div className="mt-3">
              {d.specs.map(([k, v]) => (
                <Field key={k} k={k} v={<OrRedacted value={v} width="9ch" />} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PhotoTag({ children }: { children: ReactNode }) {
  return (
    <span className="absolute bottom-2 left-2 bg-ink/80 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-ash">{children}</span>
  );
}

function Behavior() {
  const d = developments.behavior;
  return (
    <Card n="03" tag={d.tag} meta={[["ASUNTO", d.subject], ["PERÍODO", d.period]]}>
      <div className="grid gap-10 p-5 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-12">
        <div>
          <p className="text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.025em] text-bone">{d.body}</p>
          <p className="mt-8 font-mono text-[11px] leading-relaxed tracking-wider text-steel">
            CONCLUSIÓN DEL ANALISTA — <span className="text-ash">{d.conclusion}</span>
          </p>
        </div>
        <div>
          <Label tone="steel">{d.topicsLabel}</Label>
          <ul className="mt-4">
            {d.topics.map(([topic, freq], i) => (
              <motion.li
                key={topic}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-baseline gap-4 border-b border-iron/80 py-3"
              >
                <span className="font-mono text-[10px] text-steel">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-lg text-bone first-letter:uppercase">{topic}</span>
                <span className={`font-mono text-[10px] tracking-[0.25em] ${freq === "Crítica" ? "text-signal" : "text-ash"}`}>
                  {freq.toUpperCase()}
                </span>
              </motion.li>
            ))}
          </ul>
          <AnalystNote className="mt-4">{analystNotes.behavior}</AnalystNote>
        </div>
      </div>
    </Card>
  );
}
