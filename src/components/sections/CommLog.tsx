"use client";

import { analystNotes, comms, type Intercept } from "@/content/dossier";
import { AnalystNote, Label, Redacted } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";
import { SectionHeader } from "../ui/SectionHeader";
import { TypeLine } from "../ui/TypeLine";

export function CommLog() {
  return (
    <section id="comms" className="relative scroll-mt-12 px-5 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          title="REGISTRO DE COMUNICACIONES"
          code="SIGINT / WHATSAPP"
          note="Fragmentos seleccionados, interceptados durante el período de observación. Transcripciones revisadas por el analista asignado. El analista también estaba presente."
        />

        <div className="columns-1 gap-4 md:columns-2 md:gap-5">
          {comms.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.08} className="mb-4 break-inside-avoid md:mb-5">
              <InterceptCard c={c} first={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InterceptCard({ c, first }: { c: Intercept; first: boolean }) {
  return (
    <article className="group relative border border-iron bg-carbon/50 font-mono transition-colors duration-500 hover:border-steel/70">
      <div className="flex items-center justify-between gap-4 border-b border-iron px-5 py-3">
        <span className="flex flex-col gap-1.5">
          <Label tone="bone">Comunicación interceptada #{c.id}</Label>
          <span className="text-[10px] tracking-[0.25em] text-steel">
            ORIGEN: <Redacted width="8ch" />
          </span>
        </span>
        <Waveform seed={Number(c.id)} />
      </div>

      <div className="px-5 py-6">
        {c.kind === "quote" ? (
          <>
            <p className="text-[10px] tracking-[0.3em] text-steel">{c.speaker}:</p>
            <p className="mt-2 font-sans text-2xl font-medium leading-snug tracking-[-0.01em] text-bone sm:text-[1.7rem]">
              “<TypeLine text={c.quote} speed={24} />”
            </p>
            <div className="mt-6 border-l border-amber/70 pl-4">
              <p className="text-[10px] tracking-[0.3em] text-amber">NOTA DEL ANALISTA:</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ash">{c.note}</p>
              {first && <AnalystNote className="mt-3">{analystNotes.comms}</AnalystNote>}
            </div>
          </>
        ) : (
          <dl className="space-y-2.5 text-[13px]">
            {c.fields.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[112px_1fr] gap-3">
                <dt className="text-[10px] uppercase tracking-[0.25em] text-steel">{k}:</dt>
                <dd className={k === "Conclusión" || k === "Resultado" ? "text-bone" : "text-ash"}>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

/** Static pseudo-waveform, deterministic per id so it doesn't change between renders. */
function Waveform({ seed }: { seed: number }) {
  const bars = Array.from({ length: 18 }, (_, i) => 20 + Math.abs(Math.sin(seed * 12.9898 + i * 1.7)) * 80);
  return (
    <span aria-hidden className="flex h-3 items-center gap-[2px] opacity-50 transition-opacity group-hover:opacity-90">
      {bars.map((h, i) => (
        <span key={i} className="w-px bg-ash" style={{ height: `${h}%` }} />
      ))}
    </span>
  );
}
