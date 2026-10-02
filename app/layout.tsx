import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { MainNavbar } from "@/components/brand/Logo";
import { Footer } from "@/components/brand/Footer";

export const metadata: Metadata = {
  title: "Aprender & Aprobar | Plataforma EdTech Universitaria • Alpha Systems",
  description:
    "Ecosistema educativo de alto rendimiento para estudiantes de Ciencias Económicas y carreras universitarias (Siglo 21, UNSE, UCSE, UBP). Recuperación activa, repetición espaciada y streaming seguro.",
  keywords: [
    "Economía 1",
    "Universidad Siglo 21",
    "UNSE",
    "Aprender y Aprobar",
    "Alpha Systems",
    "Exámenes Universitarios",
    "SpeedGrader",
    "Active Recall",
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
