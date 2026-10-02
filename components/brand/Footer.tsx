"use client";

import React from "react";
import Link from "next/link";
import { AprenderAprobarLogo } from "./Logo";
import { CheckCircle2, ShieldCheck, Heart, Sparkles, MessageCircle, Mail } from "lucide-react";
import { MOCK_UNIVERSITIES } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-pink-950/40 text-slate-400 text-xs py-14 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Aprender & Aprobar Brand */}
          <div className="md:col-span-2 space-y-4">
            <AprenderAprobarLogo size="md" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              La plataforma universitaria creada para que prepares tus materias con clases claras, resúmenes oficiales, modelos de examen resueltos y flashcards de repetición espaciada.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2 text-pink-300 font-medium">
                <Mail className="w-4 h-4 text-pink-400" />
                <span>contacto@aprenderyaprobar.com</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Comunidad WhatsApp de Alumnos</span>
              </div>
            </div>
          </div>

          {/* Col 2: Universidades Oficiales */}
          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Universidades</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {MOCK_UNIVERSITIES.map((u) => (
                <li key={u.id}>
                  <Link
                    href={`/#universidades`}
                    className="hover:text-pink-300 transition-colors flex items-center justify-between"
                  >
                    <span>{u.name}</span>
                    <span className="text-[10px] text-pink-400 font-mono font-bold">
                      {u.acronym}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portales y Recursos */}
          <div>
            <h4 className="text-white font-extrabold uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Portales de Acceso</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/portal/alumno" className="hover:text-pink-300 transition-colors">
                  Portal Alumno (Clases y Flashcards)
                </Link>
              </li>
              <li>
                <Link href="/portal/docente" className="hover:text-pink-300 transition-colors">
                  Portal Docente (Carga de Clases)
                </Link>
              </li>
              <li>
                <Link href="/portal/admin" className="hover:text-pink-300 transition-colors">
                  Panel de Administración
                </Link>
              </li>
              <li>
                <Link href="/materias/s21-economia-1" className="hover:text-pink-300 transition-colors">
                  Programa Economía I (Siglo 21)
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-900 space-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pago Seguro con MercadoPago
              </div>
              <div>Acceso inmediato las 24 hs</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Aprender & Aprobar. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
            <span>para estudiantes universitarios de Argentina 🇦🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
