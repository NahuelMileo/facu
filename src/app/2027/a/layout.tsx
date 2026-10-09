import type { Metadata } from "next";
import { Courier_Prime, IBM_Plex_Sans_Condensed, Reenie_Beanie } from "next/font/google";

const typewriter = Courier_Prime({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const condensed = IBM_Plex_Sans_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const handwriting = Reenie_Beanie({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "EXPEDIENTE 023 — DESCLASIFICADO",
  description: "Expediente de inteligencia personal. Copia en papel.",
};

export default function PaperLayout({ children }: LayoutProps<"/2027/a">) {
  return (
    <div className={`desk relative min-h-dvh overflow-x-clip ${typewriter.variable} ${condensed.variable} ${handwriting.variable}`}>
      <div aria-hidden className="desk-lamp" />
      <div className="relative">{children}</div>
    </div>
  );
}
