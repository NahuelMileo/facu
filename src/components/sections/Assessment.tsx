"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { assessment } from "@/content/dossier";
import { ArchivePhoto } from "../ui/ArchivePhoto";
import { Label } from "../ui/Primitives";

const ease = [0.22, 1, 0.36, 1] as const;

function Para({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.p>
  );
}

/**
 * The emotional core. Deliberately breaks from the interface:
 * a single large photograph, a serif, lots of air.
 */
export function Assessment() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="assessment" className="relative scroll-mt-12 bg-ink">
      {/* Photograph — full bleed, minimal parallax */}
      <div ref={photoRef} className="relative h-[70vh] overflow-hidden sm:h-[88vh]">
        <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
          <ArchivePhoto photo={assessment.photo} sizes="100vw" className="h-full w-full" reveal={false} />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-x-0 bottom-10 flex justify-center"
        >
          <Label tone="ash">§ 06 — {assessment.label}</Label>
        </motion.div>
      </div>

      {/* Letter */}
      <div className="px-6 pb-40 pt-20 sm:pb-56 sm:pt-32">
        <div className="mx-auto max-w-[36rem] space-y-8 font-serif text-[1.3rem] font-light leading-[1.7] text-paper sm:space-y-10 sm:text-[1.5rem]">
          {assessment.paragraphs.map((p) => (
            <Para key={p}>{p}</Para>
          ))}

          <div className="space-y-1 py-6 italic text-bone sm:py-10">
            {assessment.versions.map((v, i) => (
              <Para key={v} delay={i * 0.18}>
                {v}
              </Para>
            ))}
          </div>

          {assessment.closing.map((p, i) => (
            <Para key={p}>
              <span className={i === assessment.closing.length - 1 ? "text-bone" : undefined}>{p}</span>
            </Para>
          ))}

          <Para delay={0.3}>
            <span className="block pt-6 text-right italic text-bone">— {assessment.signature}</span>
          </Para>
        </div>
      </div>
    </section>
  );
}
