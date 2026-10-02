"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  showPlatformTitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AlphaSystemsLogo({ showPlatformTitle = true, size = "md" }: LogoProps) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <div className="flex items-center gap-3 select-none">
      {/* 3D Kinetic Hexagon Isotype */}
      <div
        className={`relative flex items-center justify-center ${
          isSm ? "w-8 h-8" : isLg ? "w-14 h-14" : "w-10 h-10"
        }`}
        style={{ perspective: "600px" }}
      >
        {/* Outer Rotating Hexagonal Shield (3D Y-Axis Rotation) */}
        <div
          className="absolute inset-0 border-2 border-brand-cyan/80 rounded-xl shadow-[0_0_15px_rgba(0,199,253,0.35)] animate-spin-slow"
          style={{
            transformStyle: "preserve-3d",
          }}
        />

        {/* Stable Fixed Core: Letter 'A' + Ascending Arrow */}
        <div className="relative z-10 flex flex-col items-center justify-center font-black text-white">
          <span className={`${isSm ? "text-xs" : isLg ? "text-xl" : "text-sm"} tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
            ▲
          </span>
          <span className={`${isSm ? "text-[10px] -mt-1" : isLg ? "text-base -mt-1.5" : "text-xs -mt-1"} font-extrabold text-brand-cyan`}>
            A
          </span>
        </div>
      </div>

      {/* Official 2-Line Typography as per 00-DIRECTIVA-IDENTIDAD-ALPHA-SYSTEMS.md */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-2">
          <span
            className={`font-black text-white uppercase tracking-[4px] ${
              isSm ? "text-xs" : isLg ? "text-lg" : "text-sm"
            }`}
            style={{ fontWeight: 900 }}
          >
            ALPHA SYSTEMS
          </span>
        </div>
        <span
          className={`font-extrabold text-brand-cyan uppercase tracking-[6px] ${
            isSm ? "text-[8px]" : isLg ? "text-[11px]" : "text-[9px]"
          }`}
          style={{ fontWeight: 800, color: "#00c7fd" }}
        >
          INGENIERÍA & SISTEMAS
        </span>

        {showPlatformTitle && (
          <div className="flex items-center gap-1.5 mt-1 pt-1 border-t border-slate-700/60">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Aprender & Aprobar
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-semibold border border-blue-700/50">
              SaaS EdTech
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function MainNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <AlphaSystemsLogo size="md" showPlatformTitle={true} />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/#portales" className="hover:text-cyan-400 transition-colors">
            Portales
          </Link>
          <Link href="/#materias" className="hover:text-cyan-400 transition-colors">
            Materias Siglo 21
          </Link>
          <Link href="/#pedagogia" className="hover:text-cyan-400 transition-colors">
            Método Activo
          </Link>
          <Link href="/#seguridad" className="hover:text-cyan-400 transition-colors">
            Anti-Piratería
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/alumno"
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            Portal Alumno
          </Link>
          <Link
            href="/portal/docente"
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-950 text-indigo-300 hover:bg-indigo-900 border border-indigo-800 transition-colors"
          >
            Portal Docente
          </Link>
          <Link
            href="/portal/admin"
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all"
          >
            Panel Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
