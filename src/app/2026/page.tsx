"use client";

/**
 * EXPEDIENTE 022 — cumpleaños 2026.
 * Ported from github.com/NahuelMileo/facu (Vite + shadcn) with the same
 * content and look. Photos and videos live in /public/2026.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentProps, type ReactNode } from "react";

const photos = [
  "/2026/foto-01.jpeg",
  // "/2026/foto-02.jpeg",
  "/2026/foto-03.jpeg",
  "/2026/foto-04.jpeg",
  "/2026/foto-05.jpeg",
  "/2026/foto-06.jpeg",
  "/2026/foto-07.jpeg",
  "/2026/foto-08.jpeg",
  "/2026/foto-09.jpeg",
  "/2026/foto-10.jpeg",
  "/2026/foto-11.jpeg",
  "/2026/foto-12.jpeg",
  "/2026/foto-13.jpeg",
  "/2026/foto-14.jpeg",
  "/2026/foto-15.jpeg",
  "/2026/foto-16.jpeg",
  "/2026/foto-17.jpeg",
  "/2026/foto-18.jpeg",
  "/2026/foto-19.jpeg",
  "/2026/foto-20.jpeg",
  "/2026/foto-21.jpeg",
  "/2026/foto-22.jpeg",
];
const videos = Array.from({ length: 5 }, (_, i) => `/2026/video-${i + 1}.mp4`);

/* ───────── minimal stand-ins for the shadcn primitives the original used ───────── */

const btnBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-black/20 cursor-pointer";

function Button({ size, variant = "default", className = "", ...props }: ComponentProps<"button"> & { size?: "lg"; variant?: "default" | "secondary" }) {
  const v = variant === "secondary" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-primary text-primary-foreground hover:bg-primary/90";
  const s = size === "lg" ? "h-10 px-6" : "h-9 px-4 py-2";
  return <button type="button" className={`${btnBase} ${v} ${s} ${className}`} {...props} />;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-6 ${className}`}>{children}</div>;
}

function Separator({ className = "" }: { className?: string }) {
  return <div role="none" className={`h-px w-full shrink-0 bg-border ${className}`} />;
}

/* lucide icons, inlined */
const icon = "fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]";
const PlaneIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" className={`${icon} ${className}`} aria-hidden>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);
const CarIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" className={`${icon} ${className}`} aria-hidden>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);
const XIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" className={`${icon} ${className}`} aria-hidden>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const PlayIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" strokeWidth="2" className={`${icon} ${className}`} aria-hidden>
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

/* ───────────────────────── page ───────────────────────── */

const bonds = [
  { title: "Amigos desde temprana edad", body: "Desde la escuela hasta hoy, una amistad que creció con nosotros." },
  { title: "Montevideo", body: "La ciudad donde la amistad se hizo más fuerte y los sueños tomaron forma." },
  { title: "Ambiciones compartidas", body: "Siempre hablando de autos, de metas, de lo que viene, nunca quietos.", car: true },
];

const destinations = [
  { title: "Hoy: 22", body: "Un nuevo año, nuevas alturas, nuevas experiencias", dot: "bg-sky-500" },
  { title: "Próximo vuelo: más metas", body: "El cielo no es el límite", dot: "bg-blue-500" },
  { title: "Siempre juntos", body: "Desde la escuela, para la vida.", dot: "bg-indigo-500" },
];

export default function Birthday2026() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const scrollToGallery = () => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-sky-50 to-white">
      {/* back to the archive */}
      <Link
        href="/"
        className="fixed left-4 top-4 z-20 rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur hover:text-foreground"
      >
        ← Archivo
      </Link>

      {/* Floating paper plane */}
      <motion.div
        className="fixed right-8 top-20 z-0 text-sky-400/30"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <PlaneIcon className="h-8 w-8" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 md:py-20">
        {/* Hero */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-20 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}>
              <PlaneIcon className="h-12 w-12 text-sky-600" />
            </motion.div>
          </div>

          <h1 className="mb-4 text-balance text-5xl font-bold text-foreground md:text-6xl">Feliz cumple, Licenciado ✈️</h1>

          <p className="mx-auto mb-8 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Desde la escuela, escala en Montevideo, hasta tus vuelos próximos vuelos como piloto, hemos compartido sueños y ambiciones. Acá están algunos
            recuerdos de nuestro viaje juntos.
          </p>

          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900">22 años</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900">
              <PlaneIcon className="h-4 w-4" />
              Piloto
            </span>
          </div>

          <Button onClick={scrollToGallery} size="lg" className="shadow-lg hover:shadow-xl">
            Ver recuerdos
          </Button>
        </motion.section>

        <Separator className="my-16" />

        {/* Lo que nos une */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Lo que nos une</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {bonds.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (i + 1) }}
                whileHover={{ y: -4 }}
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-foreground">{b.title}</h3>
                      {b.car && <CarIcon className="h-5 w-5 shrink-0 text-muted-foreground" />}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Separator className="my-16" />

        {/* Videos */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Recuerdos de una noche inolvidable</h2>
          <Card className="shadow-lg">
            <CardContent className="px-6 pb-8 pt-8">
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {videos.map((src, index) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="aspect-video overflow-hidden rounded-lg bg-black shadow-md">
                      {playingVideo === src ? (
                        <video src={src} controls autoPlay playsInline className="h-full w-full object-contain" onEnded={() => setPlayingVideo(null)} />
                      ) : (
                        <button
                          type="button"
                          aria-label={`Reproducir video ${index + 1}`}
                          className="flex h-full w-full cursor-pointer items-center justify-center transition-colors hover:bg-black/80"
                          onClick={() => setPlayingVideo(src)}
                        >
                          <video src={`${src}#t=0.1`} preload="metadata" muted playsInline className="h-full w-full object-cover opacity-70" />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                              <PlayIcon className="ml-1 h-8 w-8 text-primary" />
                            </span>
                          </span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <Separator className="my-16" />

        {/* Momentos */}
        <motion.section id="gallery" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Momentos</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((src, index) => (
              <motion.button
                type="button"
                key={src}
                aria-label={`Ver foto ${index + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => {
                  setCurrentImage(index);
                  setLightboxOpen(true);
                }}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                  <Image src={src} alt="" fill sizes="(min-width: 768px) 220px, 50vw" className="object-cover" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        <Separator className="my-16" />

        {/* Carta */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20">
          <Card className="shadow-lg">
            <CardContent className="px-6 pb-8 pt-8 md:px-10">
              <div className="space-y-4 leading-relaxed text-foreground/90">
                <p>Facu, mi hermano de otra madre:</p>
                <p>
                  No es fácil poner en palabras todos estos años de amistad. Desde la escuela hasta el día de hoy has sido una constante en mi vida. Nos
                  fuimos a Montevideo y ahí fue cuando realmente entendí el valor de nuestra amistad.
                </p>
                <p>
                  Verte recibido como piloto me llena de orgullo el corazón, escribo esto mientras se me cae una lagrima para que veas. Siempre supiste lo
                  que querías desde bien chiquito y nunca te conformaste con menos. Esa hambre por crecer, esa ambición que compartimos en tantas charlas
                  (muchas sobre autos, obvio), es lo que nos hace seguir adelante.
                </p>
                <p>
                  Hay amistades que no se explican, se viven. La nuestra se fue construyendo con los años, en distintas etapas. La nuestra empezó cuando
                  éramos chicos y fuimos creciendo juntos, acostrumbándonos a los cambios. Contigo aprendí que la amistad también es ambición compartida.
                  Soñar en grande, hablar de autos, de futuro, nuestros trabajos y carrera, de todo lo que nos falta por delante. Aprendí que no hace falta
                  vernos todos los días para estar presentes. Contigo aprendí que la verdadera confianza no se promete, se demuestra, que hay personas con
                  las que uno puede bajar la guardia sin miedo, personas que no fallan. Y por eso hoy puedo decirte con orgullo y certeza que:{" "}
                  <b>podría abrazarte sin cubrirme la espalda, porque se que de ti nunca vendría una apuñalada</b>
                </p>
                <p>
                  Que este año te traiga más vuelos, más metas cumplidas, y más momentos juntos. La amistad es un viaje, y me alegra muchísimo que el
                  nuestro siga despegando.
                </p>
                <p className="font-medium">Feliz cumple, piloto</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <Separator className="my-16" />

        {/* Próximos destinos */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Próximos destinos</h2>
          <div className="relative mx-auto max-w-md">
            <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-sky-200" />
            <div className="space-y-8">
              {destinations.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  <div className={`absolute left-3 h-6 w-6 rounded-full border-4 border-white shadow ${d.dot}`} />
                  <h3 className="text-lg font-semibold text-foreground">{d.title}</h3>
                  <p className="text-sm text-muted-foreground">{d.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="mt-12 text-center italic text-muted-foreground">Con cariño, Nahuel</p>
        </motion.section>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button type="button" aria-label="Cerrar" className="absolute right-4 top-4 text-white/80 hover:text-white" onClick={() => setLightboxOpen(false)}>
            <XIcon className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[80vh] w-full">
              <Image src={photos[currentImage]} alt="" fill sizes="(min-width: 896px) 896px, 100vw" className="rounded-lg object-contain" />
            </div>
            <div className="mt-4 flex justify-center gap-4">
              {currentImage > 0 && (
                <Button variant="secondary" onClick={() => setCurrentImage(currentImage - 1)}>
                  Anterior
                </Button>
              )}
              {currentImage < photos.length - 1 && (
                <Button variant="secondary" onClick={() => setCurrentImage(currentImage + 1)}>
                  Siguiente
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
