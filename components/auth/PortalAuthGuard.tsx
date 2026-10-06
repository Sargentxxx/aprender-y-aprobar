"use client";

import React from "react";
import Link from "next/link";
import { useAuth, isSuperAdminEmail } from "@/lib/auth-context";
import { ShieldAlert, Lock, ArrowLeft, LogIn, CheckCircle2 } from "lucide-react";

interface PortalAuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "teacher" | "student";
  portalName: string;
}

export function PortalAuthGuard({
  children,
  requiredRole,
  portalName,
}: PortalAuthGuardProps) {
  const { firebaseUser, profile, loading, signInWithGoogle, logout } = useAuth();

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-pink-500/20 border-t-pink-500 animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Verificando credenciales universitarias...
        </p>
      </div>
    );
  }

  // 2. Unauthenticated State (Not Logged In)
  if (!firebaseUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-pink-500/10 dark:bg-pink-500/20 border border-pink-500/30 text-pink-600 dark:text-pink-400 flex items-center justify-center mx-auto shadow-lg shadow-pink-500/10">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Inicio de Sesión Requerido
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {portalName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Para ingresar a este portal universitario debes iniciar sesión con tu cuenta de correo institucional o Google.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white font-bold text-xs shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Ingresar con Google</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la página principal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Admin Role Check
  if (requiredRole === "admin" && !isSuperAdminEmail(firebaseUser.email)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-900/60 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              Acceso Restringido
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Permisos Insuficientes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Has iniciado sesión como <strong className="text-slate-900 dark:text-white font-mono">{firebaseUser.email}</strong>, pero esta cuenta no tiene permisos de Super Administrador.
            </p>
            <p className="text-[11px] text-slate-500">
              El panel de administración está reservado para el correo oficial designado (<strong className="font-mono text-cyan-500">santillanosvaldomanuel@gmail.com</strong>).
            </p>
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => logout()}
              className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-md shadow-rose-600/30"
            >
              Cerrar sesión e ingresar con otra cuenta
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la página principal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authorized Access
  return <>{children}</>;
}
