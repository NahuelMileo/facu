import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Feliz cumple, Licenciado ✈️",
  description: "Expediente 022 — el cumpleaños de 2026.",
};

export const viewport: Viewport = {
  themeColor: "#f0f9ff",
};

export default function Layout2026({ children }: LayoutProps<"/2026">) {
  return <div className="y2026">{children}</div>;
}
