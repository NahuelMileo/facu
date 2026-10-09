"use client";

import { motion } from "framer-motion";
import { hero } from "@/content/dossier";

/** Short, full-screen clearance check. Total ≈ 1.6s. */
export const UNLOCK_DURATION = 1650;

export function UnlockSequence() {
  const steps = hero.unlock;
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 px-6 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm font-mono text-xs tracking-[0.3em] sm:text-sm">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.42, duration: 0.2 }}
              className="flex items-center justify-between border-b border-iron py-3"
            >
              <span className={last ? "text-bone" : "text-ash"}>{s}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.42 }}
                className={last ? "text-amber" : "text-steel"}
              >
                {last ? "■" : "OK"}
              </motion.span>
            </motion.div>
          );
        })}
        <div className="mt-6 h-px w-full bg-iron">
          <motion.div
            className="h-px origin-left bg-bone"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
