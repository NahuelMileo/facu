import type { Metadata } from "next";
import { Atmosphere } from "@/components/ui/Atmosphere";

export const metadata: Metadata = {
  title: "EXPEDIENTE 023 — CLASIFICADO",
  description: "Expediente de inteligencia personal. Acceso solo autorizado.",
};

export default function Layout2027({ children }: LayoutProps<"/2027">) {
  return (
    <>
      {children}
      <Atmosphere />
    </>
  );
}
