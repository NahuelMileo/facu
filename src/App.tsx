"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Plane, Car, Copy, Check, X, Play } from "lucide-react";
import { useState } from "react";
import imagen1 from "../src/assets/a (1).jpeg";
import imagen2 from "../src/assets/a (2).jpeg";
import imagen3 from "../src/assets/a (3).jpeg";
import imagen4 from "../src/assets/a (4).jpeg";
import imagen5 from "../src/assets/a (5).jpeg";
import imagen6 from "../src/assets/a (6).jpeg";
import imagen7 from "../src/assets/a (7).jpeg";
import imagen8 from "../src/assets/a (8).jpeg";
import imagen9 from "../src/assets/a (9).jpeg";
import imagen10 from "../src/assets/a (10).jpeg";
import imagen11 from "../src/assets/a (11).jpeg";
import imagen12 from "../src/assets/a (12).jpeg";
import imagen13 from "../src/assets/a (13).jpeg";
import imagen14 from "../src/assets/a (14).jpeg";
import imagen15 from "../src/assets/a (15).jpeg";
import imagen16 from "../src/assets/a (16).jpeg";
import imagen17 from "../src/assets/a (17).jpeg";
import imagen18 from "../src/assets/a (18).jpeg";
import imagen19 from "../src/assets/a (19).jpeg";
import imagen20 from "../src/assets/a (20).jpeg";
import imagen21 from "../src/assets/a (21).jpeg";
import imagen22 from "../src/assets/a (22).jpeg";
import video1 from "../src/assets/video1.mp4";
import video2 from "../src/assets/video2.mp4";
import video3 from "../src/assets/video3.mp4";
import video4 from "../src/assets/video4.mp4";
import video5 from "../src/assets/video5.mp4";

const photos = [
  { url: imagen1 },
  { url: imagen2 },
  { url: imagen3 },
  { url: imagen4 },
  { url: imagen5 },
  { url: imagen6 },
  { url: imagen7 },
  { url: imagen8 },
  { url: imagen9 },
  { url: imagen10 },
  { url: imagen11 },
  { url: imagen12 },
  { url: imagen13 },
  { url: imagen14 },
  { url: imagen15 },
  { url: imagen16 },
  { url: imagen17 },
  { url: imagen18 },
  { url: imagen19 },
  { url: imagen20 },
  { url: imagen21 },
  { url: imagen22 },
];

export default function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [uploadedVideos] = useState<{ url: string }[]>([
    { url: video1 },
    { url: video2 },
    { url: video3 },
    { url: video4 },
    { url: video5 },
  ]);

  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log("Failed to copy");
    }
  };

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Floating paper plane animation */}
      <motion.div
        className="fixed top-20 right-8 text-sky-400/30 z-0"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Plane className="w-8 h-8" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Plane className="w-12 h-12 text-sky-600" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Feliz cumple, Licenciado ✈️
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed text-pretty">
            Desde la escuela, escala en Montevideo, hasta tus vuelos próximos
            vuelos como piloto, hemos compartido sueños y ambiciones. Acá están
            algunos recuerdos de nuestro viaje juntos.
          </p>

          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-900 rounded-full text-sm font-medium">
              22 años
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-900 rounded-full text-sm font-medium">
              <Plane className="w-4 h-4" />
              Piloto
            </span>
          </div>

          <Button
            onClick={scrollToGallery}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            Ver recuerdos
          </Button>
        </motion.section>

        <Separator className="my-16" />

        {/* Lo que nos une Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            Lo que nos une
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Amigos desde temprana edad
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Desde la escuela hasta hoy, una amistad que creció con
                    nosotros.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
            >
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Montevideo
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    La ciudad donde la amistad se hizo más fuerte y los sueños
                    tomaron forma.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      Ambiciones compartidas
                    </h3>
                    <Car className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Siempre hablando de autos, de metas, de lo que viene, nunca
                    quietos.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        <Separator className="my-16" />

        {/* Video Upload Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            Recuerdos de una noche inolvidable
          </h2>

          <Card className="shadow-lg">
            <CardContent className="pt-8 pb-8 px-6">
              <div className="space-y-6">
                {/* Uploaded Videos Grid */}
                {uploadedVideos.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {uploadedVideos.map((video, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="aspect-video rounded-lg overflow-hidden shadow-md bg-black">
                          {playingVideo === video.url ? (
                            <video
                              src={video.url} // o videoItem.url según tu map
                              controls
                              autoPlay
                              className="w-full h-full object-contain"
                              onEnded={() => setPlayingVideo(null)}
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-black/80 transition-colors"
                              onClick={() => setPlayingVideo(video.url)}
                            >
                              <video
                                src={video.url}
                                className="w-full h-full object-cover opacity-70"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                  <Play className="w-8 h-8 text-primary ml-1" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <Separator className="my-16" />

        {/* Photo Gallery Section */}
        <motion.section
          id="gallery"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            Momentos
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => {
                  setCurrentImage(index);
                  setLightboxOpen(true);
                }}
              >
                <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                  <img
                    src={photo.url || "/placeholder.svg"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center"></p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <Separator className="my-16" />

        {/* Letter Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Card className="shadow-lg">
            <CardContent className="pt-8 pb-8 px-6 md:px-10">
              <div className="space-y-4 text-foreground/90 leading-relaxed">
                {/* TODO: Replace with your personalized letter */}
                <p>Facu, mi hermano:</p>
                <p>
                  No es fácil poner en palabras todos estos años de amistad.
                  Desde la escuela hasta el día de hoy has sido una constante en
                  mi vida. Nos fuimos a Montevideo y ahí fue cuando realmente
                  entendí el valor de nuestra amistad.
                </p>
                <p>
                  Verte recibido como piloto me llena de orgullo el corazón,
                  escribo esto mientras se me cae una lagrima para que veas.
                  Siempre supiste lo que querías desde bien chiquito y nunca te
                  conformaste con menos. Esa hambre por crecer, esa ambición que
                  compartimos en tantas charlas (muchas sobre autos, obvio), es
                  lo que nos hace seguir adelante.
                </p>
                <p>
                  Hay amistades que no se explican, se viven. La nuestra se fue
                  construyendo con los años, en distintas etapas. La nuestra
                  empezó cuando éramos chicos y fuimos creciendo juntos,
                  acostrumbándonos a los cambios. Contigo aprendí que la amistad
                  también es ambición compartida. Soñar en graande, hablar de
                  autos, de futuro, nuestros trabajos y carrera, de todo lo que
                  nos falta por delante. Aprendí que no hace falta vernos todos
                  los días para estar presentes. Contigo aprendí que la
                  verdadera confianza no se promete, se demuestra, que hay
                  personas con las que uno puede bajar la guardia sin miedo,
                  personas que no fallan. Y por eso hoy puedo decirte con
                  orgullo y certeza que:{" "}
                  <b>
                    podría abrazarte sin cubrirme la espalda, porque se que de
                    ti nunca vendría una apuñalada
                  </b>
                </p>
                <p>
                  Que este año te traiga más vuelos, más metas cumplidas, y más
                  momentos juntos. La amistad es un viaje, y me alegra muchísimo
                  que el nuestro siga despegando.
                </p>
                <p className="font-medium">Feliz cumpleaños.</p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <Separator className="my-16" />

        {/* Timeline Closing Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
            Próximos destinos
          </h2>

          <div className="relative max-w-md mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-sky-200" />

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-16"
              >
                <div className="absolute left-3 w-6 h-6 bg-sky-500 rounded-full border-4 border-white shadow" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    Hoy: 22
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Un nuevo año, nuevas alturas, nuevas experiencias
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative pl-16"
              >
                <div className="absolute left-3 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    Próximo vuelo: más metas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    El cielo no es el límite
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative pl-16"
              >
                <div className="absolute left-3 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white shadow" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    Siempre juntos
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Desde la escuela, para la vida.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <p className="text-center mt-12 text-muted-foreground italic">
            Con cariño, Nahuel
          </p>
        </motion.section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[currentImage].url || "/placeholder.svg"}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Navigation buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {currentImage > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => setCurrentImage(currentImage - 1)}
                >
                  Anterior
                </Button>
              )}
              {currentImage < photos.length - 1 && (
                <Button
                  variant="secondary"
                  onClick={() => setCurrentImage(currentImage + 1)}
                >
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
