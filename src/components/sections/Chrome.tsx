"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock } from "../ui/Live";

export const SECTIONS = [
  { id: "profile", n: "01", label: "Perfil" },
  { id: "history", n: "02", label: "Historial" },
  { id: "developments", n: "03", label: "Novedades" },
  { id: "evidence", n: "04", label: "Evidencia" },
  { id: "comms", n: "05", label: "Comunicaciones" },
  { id: "assessment", n: "06", label: "Evaluación" },
  { id: "final", n: "07", label: "Final" },
];

/** Fixed top status bar + scroll progress + side index. */
export function Chrome({ unlocked }: { unlocked: boolean }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-iron/60 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex h-11 max-w-[1400px] items-center justify-between px-5 font-mono text-[9px] tracking-[0.25em] text-ash sm:px-10 sm:text-[10px]">
          <Link href="/" className="hover:text-bone">
            <span className="text-steel">←</span> ARCHIVO <span className="text-steel">{"//"}</span> EXP. <span className="text-bone">023</span>
          </Link>
          <span className="hidden text-signal md:inline">CLASIFICADO — ACCESO RESTRINGIDO</span>
          <Clock />
        </div>
        {unlocked && <motion.div className="h-px origin-left bg-signal/80" style={{ scaleX: progress }} />}
      </header>
      {unlocked && <SideIndex />}
    </>
  );
}

function SideIndex() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Secciones" className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col gap-3">
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group flex items-center justify-end gap-3 font-mono text-[9px] tracking-[0.25em]">
                <span className={`transition-opacity duration-300 ${on ? "text-bone opacity-100" : "text-steel opacity-0 group-hover:opacity-100"}`}>
                  {s.label.toUpperCase()}
                </span>
                <span className={on ? "text-signal" : "text-steel"}>{s.n}</span>
                <span className={`h-px transition-all duration-500 ${on ? "w-6 bg-signal" : "w-3 bg-steel/60"}`} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
