import type { Metadata, Viewport } from "next";
import { Inter_Tight, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const code = IBM_Plex_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const letter = Newsreader({
  variable: "--font-letter",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "ARCHIVO — FACUNDO",
  description: "Expedientes de cumpleaños de Facundo.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#09090a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${code.variable} ${letter.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
