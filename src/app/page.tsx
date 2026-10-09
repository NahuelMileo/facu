"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { Clock } from "@/components/ui/Live";
import { Redacted, StatusDot } from "@/components/ui/Primitives";
import { Radar } from "@/components/ui/Radar";
import { TypeLine } from "@/components/ui/TypeLine";

/**
 * ARCHIVO — one file per birthday. Add a row here each year.
 */
const files = [
  {
    id: "022",
    year: "2026",
    href: "/2026",
    title: "Feliz cumple, Licenciado",
    meta: ["22 años", "Piloto"],
    status: "ARCHIVADO",
  },
  // Oculto hasta el 14.01.2027 — descomentar para mostrarlo en el archivo.
  // {
  //   id: "023",
  //   year: "2027",
  //   href: "/2027",
  //   title: "Informe anual de estado",
  //   meta: ["23 años", "Alférez", "Primer auto"],
  //   status: "ACTIVO",
  // },
];

// the not-yet-written file is always the one after the last listed
const nextId = String(Number(files[files.length - 1].id) + 1).padStart(3, "0");

const ease = [0.22, 1, 0.36, 1] as const;

export default function Archive() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-iron/60 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex h-11 max-w-[1400px] items-center justify-between px-5 font-mono text-[9px] tracking-[0.25em] text-ash sm:px-10 sm:text-[10px]">
          <span>
            ARCHIVO <span className="text-steel">{"//"}</span> FACUNDO
          </span>
          <Clock />
        </div>
      </header>

      <main className="relative flex min-h-dvh flex-col overflow-hidden px-5 pb-10 pt-28 sm:px-10 lg:px-16">
        <div aria-hidden className="tech-grid tech-grid-fade absolute inset-0" />
        <Radar className="absolute -right-[35vmin] top-1/2 h-[110vmin] w-[110vmin] -translate-y-1/2 opacity-50 sm:-right-[20vmin]" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
          <p className="font-mono text-xs tracking-[0.35em] text-ash">
            <TypeLine text="ARCHIVO PERSONAL — ACCESO RESTRINGIDO" eager delay={200} speed={20} />
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
            className="mt-4 text-[clamp(3.4rem,13vw,9rem)] font-semibold leading-[0.85] tracking-[-0.055em] text-bone"
          >
            FACUNDO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-5 max-w-md font-mono text-xs leading-relaxed tracking-wider text-steel sm:text-sm"
          >
            Un expediente por cumpleaños. Seleccioná uno para abrirlo.
          </motion.p>

          <ol className="mt-14 border-t border-iron">
            {files.map((f, i) => (
              <motion.li
                key={f.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.15, duration: 0.6, ease }}
              >
                <Link
                  href={f.href}
                  className="inspect group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 border-b border-iron py-6 transition-colors duration-300 hover:bg-carbon/70 sm:grid-cols-[110px_1fr_auto_auto] sm:gap-x-8 sm:px-4 sm:py-8"
                >
                  <span className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-signal transition-transform duration-500 group-hover:scale-y-100" />
                  <span className="font-mono text-[10px] tracking-[0.25em] text-signal sm:text-[11px]">EXP. {f.id}</span>
                  <span className="min-w-0">
                    <span className="block text-4xl font-semibold leading-none tracking-[-0.04em] text-bone sm:text-6xl">{f.year}</span>
                    <span className="mt-2 block truncate text-sm text-ash sm:text-base">{f.title}</span>
                  </span>
                  <span className="hidden font-mono text-[10px] leading-relaxed tracking-[0.2em] text-steel sm:block">
                    {f.meta.map((m) => (
                      <span key={m} className="block text-right uppercase">
                        {m}
                      </span>
                    ))}
                  </span>
                  <span className="flex flex-col items-end gap-2 font-mono text-[10px] tracking-[0.25em]">
                    <span className={`flex items-center gap-2 ${f.status === "ACTIVO" ? "text-bone" : "text-steel"}`}>
                      {f.status === "ACTIVO" && <StatusDot />}
                      {f.status}
                    </span>
                    <span className="text-ash transition-colors group-hover:text-bone">ABRIR →</span>
                  </span>
                </Link>
              </motion.li>
            ))}

            {/* next year's file, not written yet */}
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 + files.length * 0.15, duration: 0.6 }}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-x-5 border-b border-dashed border-iron py-6 opacity-50 sm:grid-cols-[110px_1fr_auto] sm:gap-x-8 sm:px-4 sm:py-8"
              aria-label="Próximo expediente, en preparación"
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-steel sm:text-[11px]">EXP. {nextId}</span>
              <span className="text-4xl font-semibold leading-none tracking-[-0.04em] text-steel sm:text-6xl">
                <Redacted width="3.2ch" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-steel">EN PREPARACIÓN</span>
            </motion.li>
          </ol>
        </div>

        <div className="relative z-10 mx-auto mt-14 flex w-full max-w-5xl justify-between font-mono text-[9px] tracking-[0.3em] text-steel sm:text-[10px]">
          <span>ANALISTA ASIGNADO: NAHUEL</span>
          <span>EL EXPEDIENTE SIGUE ABIERTO</span>
        </div>
      </main>
      <Atmosphere />
    </>
  );
}
