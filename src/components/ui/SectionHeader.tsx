"use client";

import { motion } from "framer-motion";
import { Label } from "./Primitives";
import { TypeLine } from "./TypeLine";

type Props = {
  index: string;
  title: string;
  code: string;
  note?: string;
};

/** "01 ──── SUBJECT PROFILE" style header with a drawn rule. */
export function SectionHeader({ index, title, code, note }: Props) {
  return (
    <header className="mb-12 sm:mb-16">
      <div className="flex items-center gap-4">
        <Label tone="signal">§ {index}</Label>
        <motion.span
          aria-hidden
          className="h-px flex-1 origin-left bg-iron"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        />
        <Label tone="steel">{code}</Label>
      </div>
      <h2 className="mt-6 text-[clamp(2rem,6vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-bone">
        <TypeLine text={title} speed={28} />
      </h2>
      {note && <p className="mt-4 max-w-xl font-mono text-[11px] leading-relaxed tracking-wider text-steel sm:text-xs">{note}</p>}
    </header>
  );
}
