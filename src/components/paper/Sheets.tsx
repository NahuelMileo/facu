"use client";

import { motion } from "framer-motion";
import { analystNotes, assessment, comms, developments, finalAssessment as fin, profile, timeline, type Intercept } from "@/content/dossier";
import { DaysSince } from "../ui/Live";
import { TypeLine } from "../ui/TypeLine";
import {
  ease,
  FormCell,
  FormGrid,
  Hand,
  Highlight,
  Leader,
  OrRedact,
  PaperClip,
  PhotoImage,
  Print,
  Redact,
  Sheet,
  Stamp,
  Tape,
  TypedMeter,
} from "./Kit";

/* ───────────────────────── 01 — PROFILE ───────────────────────── */

export function ProfileSheet() {
  return (
    <Sheet id="a-perfil" n="01" title="Perfil del sujeto" kicker="FICHA DE IDENTIFICACIÓN" code="PRF-023/A" tilt={-0.5}>
      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_250px] md:gap-12">
        <div className="order-2 md:order-1">
          <FormGrid>
            {profile.fields.map(([k, v]) => (
              <FormCell key={k} label={k} accent={k === "EVALUACIÓN DE LEALTAD"}>
                {v}
              </FormCell>
            ))}
          </FormGrid>

          <h3 className="mt-10 font-cond text-sm font-bold uppercase tracking-[0.2em]">Indicadores de conducta</h3>
          <div className="mt-2 border-t border-type/50">
            {profile.indicators.map((ind) => (
              <TypedMeter
                key={ind.label}
                {...ind}
                note={ind.alert ? <Hand rotate={-4} delay={0.9} className="-mb-2">{analystNotes.profileCars}</Hand> : undefined}
              />
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative mx-auto max-w-[260px] pt-3">
            <PaperClip className="-top-3 left-6" />
            <Print
              photo={profile.photo}
              sizes="260px"
              className="aspect-[4/5]"
              rotate={2}
              priority
              caption={profile.photoCaption}
              imgClassName="hover:scale-[1.03]"
              frameClassName="inspect"
            />
            <span className="absolute -bottom-3 -left-4">
              <Stamp rotate={-12} delay={0.7}>
                Archivado
              </Stamp>
            </span>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

/* ───────────────────────── 02 — HISTORY ───────────────────────── */

export function HistorySheet() {
  return (
    <Sheet id="a-historial" n="02" title="Historial del caso" kicker="REGISTRO CRONOLÓGICO" code="CHR-001→023" tilt={0.4}>
      <p className="mt-6 max-w-lg font-type text-[13px] leading-relaxed text-pencil sm:text-sm">
        Registro cronológico de eventos significativos. Entradas compiladas a partir de la memoria del analista, que en general es confiable.
      </p>

      <div className="relative mt-10">
        {/* ledger margin */}
        <span aria-hidden className="absolute bottom-0 left-[62px] top-0 hidden w-px bg-signal/40 sm:block" />
        <span aria-hidden className="absolute bottom-0 left-[65px] top-0 hidden w-px bg-signal/40 sm:block" />

        <div className="hidden grid-cols-[62px_110px_1fr] border-b-2 border-type pb-1.5 font-cond text-[10px] font-semibold uppercase tracking-[0.2em] text-pencil sm:grid">
          <span>Exp.</span>
          <span className="pl-4">Fecha</span>
          <span>Registro</span>
        </div>

        <ol>
          {timeline.map((c, i) => {
            const last = i === timeline.length - 1;
            return (
              <motion.li
                key={c.code}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease }}
                className="grid gap-x-0 gap-y-2 border-b border-type/25 py-6 sm:grid-cols-[62px_110px_1fr] sm:py-8"
              >
                <span className={`font-type text-sm ${last ? "font-bold text-signal" : ""}`}>{c.code}</span>
                <span className="font-type text-sm text-pencil sm:pl-4">
                  <OrRedact value={c.date} width="6ch" />
                </span>
                <div className="grid gap-5 lg:grid-cols-[1fr_190px] lg:gap-8">
                  <div>
                    <h3 className="font-cond text-xl font-bold uppercase leading-tight sm:text-2xl">{c.title}</h3>
                    <p className="mt-2 font-type text-[14px] leading-relaxed sm:text-[15px]">{c.body}</p>
                    <p className="mt-3 font-type text-[10px] tracking-[0.2em] text-pencil">
                      CÓDIGO DE ARCHIVO · CF-{c.code}-{c.title.replace(/[^A-ZÁÉÍÓÚÑ]/g, "").slice(0, 3)}
                    </p>
                    {last && (
                      <p className="mt-3">
                        <Hand rotate={-3}>{analystNotes.history}</Hand>
                      </p>
                    )}
                  </div>
                  {c.photo && (
                    <div className="relative max-w-[240px] pt-2 lg:max-w-none">
                      <Tape className={`-top-1 ${i % 2 ? "right-6 rotate-[6deg]" : "left-6 -rotate-[5deg]"}`} />
                      <Print photo={c.photo} sizes="240px" rotate={i % 2 ? 1.6 : -1.8} frameClassName="inspect" imgClassName="hover:scale-[1.04]" />
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Sheet>
  );
}

/* ───────────────────────── 03 — DEVELOPMENTS (memos) ───────────────────────── */

function MemoHead({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="mt-8 grid grid-cols-[88px_1fr] gap-y-1 border-b-2 border-type pb-4 font-type text-[13px] sm:grid-cols-[110px_1fr] sm:text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-pencil">{k}:</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DevelopmentSheets() {
  const p = developments.professional;
  const v = developments.vehicle;
  const b = developments.behavior;
  const acquired = v.specs.find(([k]) => k === "ADQUIRIDO")?.[1] ?? null;

  return (
    <div id="a-novedades" className="scroll-mt-10">
      {/* Memo 01 */}
      <Sheet n="03-A" title={p.headline} kicker="MEMORÁNDUM · NOVEDAD 01 / 03" code="RPT-2027/01" tilt={-0.3}>
        <MemoHead
          rows={[
            ["PARA", developments.memo.to],
            ["DE", developments.memo.from],
            ["ASUNTO", p.tag],
            ["FECHA", p.date],
          ]}
        />
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_300px] md:gap-12">
          <div>
            <div className="space-y-4 font-type text-base leading-relaxed sm:text-lg">
              {p.body.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 border-l border-t border-type/50">
              <FormCell label="Días en servicio">
                <span className="font-cond text-4xl font-bold tabular-nums sm:text-5xl">
                  <DaysSince iso="2026-01-14T00:00:00-03:00" />
                </span>
              </FormCell>
              <FormCell label="Incidentes reportados">
                <span className="text-sm">NINGUNO CONFIRMADO</span>
              </FormCell>
            </div>
          </div>
          <div className="relative pt-2">
            <Tape className="-top-1 left-1/2 -translate-x-1/2 rotate-[3deg]" />
            <Print photo={p.photo} sizes="300px" className="aspect-[4/5]" rotate={-1.5} frameClassName="inspect" imgClassName="hover:scale-[1.03]" />
          </div>
        </div>
      </Sheet>

      {/* Memo 02 */}
      <Sheet n="03-B" title={v.headline} kicker="MEMORÁNDUM · NOVEDAD 02 / 03" code="RPT-2027/02" tilt={0.5}>
        <MemoHead
          rows={[
            ["PARA", developments.memo.to],
            ["DE", developments.memo.from],
            ["ASUNTO", v.tag],
            ["FECHA", <OrRedact key="d" value={acquired} />],
          ]}
        />

        {/* contact sheet */}
        <div className="relative mt-10">
          <div className="bg-[#171613] px-2 py-1.5 shadow-[0_14px_24px_-12px_rgba(0,0,0,0.7)] sm:px-3">
            <div className="sprockets" />
            <div className="my-1.5 grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {v.photos.map((ph, i) => (
                <div key={ph.src} className="inspect group relative aspect-[3/2] overflow-hidden bg-[#2a2824]">
                  <PhotoImage photo={ph} sizes="(min-width: 768px) 280px, 33vw" className="group-hover:scale-[1.05]" />
                  <span className="absolute bottom-0.5 left-1 font-type text-[8px] tracking-[0.15em] text-amber/80 sm:text-[9px]">
                    23{String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
            </div>
            <div className="sprockets" />
          </div>
          {/* grease-pencil circle around frame 1 */}
          <svg aria-hidden viewBox="0 0 100 70" preserveAspectRatio="none" className="pointer-events-none absolute -left-[1.5%] -top-[8%] h-[116%] w-[36.5%] overflow-visible">
            <motion.ellipse
              cx="50"
              cy="35"
              rx="48"
              ry="33"
              fill="none"
              stroke="#9b2226"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeInOut" }}
            />
          </svg>
          <p className="mt-3 pl-2">
            <Hand rotate={-2} delay={1.2}>
              ↑ {analystNotes.vehicle}
            </Hand>
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="font-cond text-sm font-bold uppercase tracking-[0.2em]">Registro del activo</h3>
            <div className="mt-3 border-t border-type/50 pt-1">
              {v.fields.map(([k, val]) => (
                <Leader key={k} k={k} v={val} accent={k === "FOTOS ENVIADAS AL ANALISTA"} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-cond text-sm font-bold uppercase tracking-[0.2em]">Ficha técnica</h3>
            <div className="mt-3 border-t border-type/50 pt-1">
              {v.specs.map(([k, val]) => (
                <Leader key={k} k={k} v={<OrRedact value={val} width="9ch" />} />
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      {/* Memo 03 */}
      <Sheet n="03-C" title={b.tag} kicker="MEMORÁNDUM · NOVEDAD 03 / 03" code="RPT-2027/03" tilt={-0.4}>
        <MemoHead
          rows={[
            ["PARA", developments.memo.to],
            ["DE", developments.memo.from],
            ["ASUNTO", b.subject],
            ["PERÍODO", b.period],
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <p className="font-type text-xl leading-snug sm:text-2xl">{b.body}</p>
            <p className="mt-8 font-type text-[13px] leading-relaxed">
              <span className="text-pencil">CONCLUSIÓN DEL ANALISTA — </span>
              <Highlight>{b.conclusion}</Highlight>
            </p>
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-cond text-sm font-bold uppercase tracking-[0.2em]">{b.topicsLabel}</h3>
            </div>
            <ul className="mt-3 border-t border-type/50">
              {b.topics.map(([topic, freq], i) => (
                <li key={topic} className="flex items-center gap-4 border-b border-type/25 py-2.5">
                  <CheckBox delay={0.2 + i * 0.18} />
                  <span className="flex-1 font-type text-base first-letter:uppercase">{topic}</span>
                  <span className={`font-type text-[11px] tracking-[0.2em] ${freq === "Crítica" ? "font-bold text-signal" : "text-pencil"}`}>
                    {freq.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-right">
              <Hand rotate={-3} delay={1.5}>
                {analystNotes.behavior}
              </Hand>
            </p>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

function CheckBox({ delay }: { delay: number }) {
  return (
    <span className="relative inline-block h-4 w-4 shrink-0 border border-type/70">
      <svg aria-hidden viewBox="0 0 20 20" className="absolute -left-0.5 -top-1.5 h-6 w-6 overflow-visible">
        <motion.path
          d="M3 11 L8 16 L19 2"
          fill="none"
          stroke="#1f2433"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.3, delay, ease: "easeOut" }}
        />
      </svg>
    </span>
  );
}

/* ───────────────────────── 05 — COMMS ───────────────────────── */

export function CommsSheet() {
  return (
    <Sheet id="a-comunicaciones" n="05" title="Registro de comunicaciones" kicker="TRANSCRIPCIONES · SIGINT / WHATSAPP" code="SIG-032→058" tilt={0.35}>
      <p className="mt-6 max-w-lg font-type text-[13px] leading-relaxed text-pencil sm:text-sm">
        Fragmentos seleccionados, interceptados durante el período de observación. Transcripciones revisadas por el analista asignado. El analista también
        estaba presente.
      </p>
      <div className="mt-8">
        {comms.map((c, i) => (
          <Transcript key={c.id} c={c} first={i === 0} />
        ))}
      </div>
    </Sheet>
  );
}

function Transcript({ c, first }: { c: Intercept; first: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8 }}
      className="border-t border-dashed border-type/50 py-7 font-type sm:py-9"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[11px] tracking-[0.18em] sm:text-xs">
        <span className="font-bold">COMUNICACIÓN INTERCEPTADA #{c.id}</span>
        <span className="text-pencil">
          ORIGEN: <Redact width="8ch" />
        </span>
      </div>

      {c.kind === "quote" ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-[110px_1fr]">
          <span className="text-[12px] tracking-[0.2em] text-pencil">{c.speaker}:</span>
          <div>
            <p className="text-xl leading-snug sm:text-2xl">
              «<TypeLine text={c.quote} speed={26} />»
            </p>
            <p className="mt-5 text-[11px] tracking-[0.2em] text-pencil">NOTA DEL ANALISTA:</p>
            <p className="mt-1 text-[14px] leading-relaxed sm:text-[15px]">
              <Highlight>{c.note}</Highlight>
            </p>
            {first && (
              <p className="mt-2 text-right">
                <Hand rotate={-4} delay={1.2}>
                  {analystNotes.comms}
                </Hand>
              </p>
            )}
          </div>
        </div>
      ) : (
        <dl className="mt-5 grid grid-cols-[110px_1fr] gap-y-2 text-[14px] sm:text-[15px]">
          {c.fields.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-[12px] uppercase tracking-[0.2em] text-pencil">{k}:</dt>
              <dd>{k === "Conclusión" || k === "Resultado" ? <Highlight>{v}</Highlight> : v}</dd>
            </div>
          ))}
        </dl>
      )}
    </motion.article>
  );
}

/* ───────────────────────── 07 — FINAL ───────────────────────── */

export function FinalSheet() {
  return (
    <Sheet id="a-final" n="07" title="Evaluación final" kicker="FIN DEL INFORME" code="EVA-2027" tilt={-0.3}>
      <dl className="mt-10 border-t-2 border-type">
        {fin.rows.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: 0.15 + i * 0.22, duration: 0.4 }}
            className="flex flex-col gap-1 border-b border-type/40 py-4 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <dt className="font-cond text-xs font-semibold uppercase tracking-[0.22em] text-pencil">{k}</dt>
            <dd className={`font-type text-lg tracking-[0.12em] sm:text-xl ${k === "ESTADO DE LA AMISTAD" ? "font-bold text-signal" : ""}`}>{v}</dd>
          </motion.div>
        ))}
      </dl>

      <div className="relative mt-12 border-2 border-type px-5 py-6 sm:px-8 sm:py-8">
        <p className="font-cond text-xs font-semibold uppercase tracking-[0.22em] text-pencil">Recomendación</p>
        <p className="mt-2 font-cond text-[clamp(1.6rem,4.4vw,2.6rem)] font-bold uppercase leading-[1.02]">{fin.recommendation}</p>
        <span className="absolute -bottom-6 right-4 sm:-bottom-8 sm:right-10">
          <Stamp size="lg" rotate={-9} delay={1}>
            Aprobado
          </Stamp>
        </span>
      </div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        <div>
          <div className="flex h-14 items-end">
            <Hand tone="type" rotate={-5} delay={1.6} className="text-[2.6rem] sm:text-[3rem]">
              {assessment.signature}
            </Hand>
          </div>
          <div className="mt-1 border-t border-type pt-1.5 font-type text-[11px] tracking-[0.2em] text-pencil">FIRMA DEL ANALISTA ASIGNADO</div>
        </div>
        <div>
          <div className="flex h-14 items-end font-type text-lg">EXP. 023 — ABIERTO</div>
          <div className="mt-1 border-t border-type pt-1.5 font-type text-[11px] tracking-[0.2em] text-pencil">ESTADO DEL EXPEDIENTE</div>
        </div>
      </div>
    </Sheet>
  );
}
