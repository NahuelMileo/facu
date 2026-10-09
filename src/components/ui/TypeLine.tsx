"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  /** ms per character — keep it fast */
  speed?: number;
  delay?: number;
  cursor?: boolean;
  className?: string;
  /** start immediately instead of waiting to be in view */
  eager?: boolean;
};

/**
 * Terminal-style typing. The full text is always in the DOM (invisible
 * characters are just transparent), so layout never jumps and screen
 * readers get the whole string.
 */
export function TypeLine({ text, speed = 18, delay = 0, cursor = false, className = "", eager = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const active = eager || inView;

  useEffect(() => {
    if (!active || reduce) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [active, reduce, text, speed, delay]);

  const shown = reduce && active ? text.length : count;
  const done = shown >= text.length;

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {text.slice(0, shown)}
        <span className="opacity-0">{text.slice(shown)}</span>
      </span>
      {cursor && (
        <span aria-hidden className={`ml-[0.1em] inline-block w-[0.55em] bg-current ${done ? "animate-blink" : ""}`}>
          &nbsp;
        </span>
      )}
    </span>
  );
}
