import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { MainNavbar } from "@/components/brand/Logo";
import { Footer } from "@/components/brand/Footer";

export const metadata: Metadata = {
  title: "Aprender & Aprobar | Tu Plataforma Universitaria para Rendir y Aprobar",
  description:
    "Ecosistema educativo de alto rendimiento para estudiantes universitarios (Siglo 21, UNSE, UCSE, UBP, UNQ, UNSTA). Clases en video paso a paso, resúmenes oficiales, flashcards interactivas y simuladores de examen.",
  keywords: [
    "Economía 1",
    "Universidad Siglo 21",
    "UNSE",
    "UCSE",
    "UBP",
    "UNQ",
    "UNSTA",
    "Aprender y Aprobar",
    "Exámenes Universitarios",
    "Active Recall",
    "Modelos de Parcial",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <AuthProvider>
          <MainNavbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
