"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Photo } from "@/content/dossier";

type Props = {
  photo: Photo;
  sizes: string;
  className?: string;
  /** Wipe the image in (clip-path) when it enters the viewport */
  reveal?: boolean;
  priority?: boolean;
  /** Extra classes on the <img> (e.g. hover zoom from a parent group) */
  imgClassName?: string;
};

/**
 * A photograph treated as archive material: slightly desaturated,
 * contrasted, and with a graceful "IMAGE NOT ON FILE" fallback when
 * the file hasn't been added to /public/photos yet.
 */
export function ArchivePhoto({
  photo,
  sizes,
  className = "",
  reveal = true,
  priority,
  imgClassName = "",
}: Props) {
  const [missing, setMissing] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden bg-graphite ${className}`}
      initial={reveal ? { clipPath: "inset(0 0 100% 0)" } : false}
      whileInView={reveal ? { clipPath: "inset(0 0 0% 0)" } : undefined}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
    >
      {missing ? (
        <MissingPhoto src={photo.src} />
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setMissing(true)}
          style={{ objectPosition: photo.focus ?? "50% 50%" }}
          className={`object-cover grayscale-[35%] contrast-[1.06] brightness-[0.92] transition-[transform,filter] duration-700 ease-out ${imgClassName}`}
        />
      )}
      {/* subtle vignette so every photo sits in the same dark world */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45))]"
      />
    </motion.div>
  );
}

function MissingPhoto({ src }: { src: string }) {
  return (
    <div className="tech-grid absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
      <svg aria-hidden viewBox="0 0 40 40" className="h-7 w-7 text-steel">
        <path d="M20 4v10M20 26v10M4 20h10M26 20h10" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <p className="font-mono text-[10px] tracking-[0.25em] text-ash">SIN IMAGEN EN ARCHIVO</p>
      <p className="max-w-full truncate font-mono text-[9px] tracking-wider text-steel">
        public{src}
      </p>
    </div>
  );
}
