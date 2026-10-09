"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  label: string;
  value: number;
  alert?: boolean;
  delay?: number;
};

const SEGMENTS = 10;

/** Ten-segment block meter, e.g.  ██████████ 100% */
export function Indicator({ label, value, alert, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}%`);
  const filled = Math.round((value / 100) * SEGMENTS);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.2, delay, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, value, delay]);

  return (
    <div ref={ref} className="py-3">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-ash sm:text-[11px]">{label}</span>
        <motion.span className={`font-mono text-xs tabular-nums ${alert ? "text-signal" : "text-bone"}`}>
          {rounded}
        </motion.span>
      </div>
      <div className="flex gap-[3px]" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          <motion.span
            key={i}
            className={`h-2.5 flex-1 ${i < filled ? (alert ? "bg-signal" : "bg-bone") : "bg-iron"}`}
            initial={{ opacity: i < filled ? 0.08 : 1 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.08, delay: delay + i * 0.09 }}
          />
        ))}
      </div>
    </div>
  );
}
