"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock } from "../ui/Live";
import { PAPER_SECTIONS, TOTAL_SHEETS } from "./Kit";

/** Minimal floating labels over the desk: current sheet + local time. */
export function PaperChrome({ unlocked }: { unlocked: boolean }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (!unlocked) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    PAPER_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [unlocked]);

  const sec = PAPER_SECTIONS.find((s) => s.id === current);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 font-type text-[10px] tracking-[0.22em] text-ash sm:px-8 sm:text-[11px]">
        <Link href="/" className="pointer-events-auto bg-desk/80 px-2 py-1 hover:text-bone">
          ← ARCHIVO · EXP. 023{sec ? ` · HOJA ${sec.n} / ${TOTAL_SHEETS}` : ""}
        </Link>
        <span className="bg-desk/80 px-2 py-1">
          <Clock />
        </span>
      </div>
      {unlocked && <motion.div className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-signal/80" style={{ scaleX: progress }} />}
    </>
  );
}
