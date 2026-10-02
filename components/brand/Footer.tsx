"use client";

import React from "react";
import Link from "next/link";
import { AlphaSystemsLogo } from "./Logo";
import { ShieldCheck, Mail, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Alpha Systems Brand */}
          <div className="md:col-span-2 space-y-4">
            <AlphaSystemsLogo size="md" showPlatformTitle={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Plataforma de alta ingeniería educativa orientada al éxito académico universitario en Argentina. Arquitectura SaaS multi-inquilino de última generación independiente de WordPress.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-300 font-mono">
              <Mail className="w-3.5 h-3.5" />
              <span>Garantía y Soporte Técnico: <strong>soporte@alphasystems.dev</strong></span>
            </div>
          </div>

          {/* Col 2: Portales */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Portales del Sistema
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/portal/alumno" className="hover:text-cyan-400 transition-colors">
                  Portal Alumno (Active Recall & Heatmap)
                </Link>
              </li>
              <li>
                <Link href="/portal/docente" className="hover:text-cyan-400 transition-colors">
                  Portal Docente (SpeedGrader & IA)
                </Link>
              </li>
              <li>
                <Link href="/portal/admin" className="hover:text-cyan-400 transition-colors">
                  Panel Admin (SIS & Blueprint)
                </Link>
              </li>
              <li>
                <Link href="/materias/s21-economia-1" className="hover:text-cyan-400 transition-colors">
                  Programa Economía I (Siglo 21)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Cumplimiento y Normativas */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Estándares de Ingeniería
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> WCAG 2.2 AA Accesibilidad
              </li>
              <li className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Multi-DRM & Huella Forense
              </li>
              <li>Checkout Bricks MercadoPago (PCI-DSS)</li>
              <li>Cloud Firestore con RLS y RBAC</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Aprender & Aprobar. Desarrollado por <strong>Alpha Systems</strong> — • INGENIERÍA & SISTEMAS •
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by Alpha Systems</span>
            <span className="text-slate-400">|</span>
            <span>contacto@alphasystems.dev</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
