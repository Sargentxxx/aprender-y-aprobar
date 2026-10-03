"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme-context";
import { LoginModal } from "@/components/auth/LoginModal";
import {
  LogIn,
  LogOut,
  Flame,
  Sparkles,
  User,
  ChevronDown,
  Shield,
  Sun,
  Moon,
} from "lucide-react";

interface LogoProps {
  showPlatformTitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AprenderAprobarLogo({ size = "md" }: LogoProps) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  // Increased by 10%:
  // sm: 36px -> 40px
  // md: 44px -> 50px (increased ~12% for impact)
  // lg: 56px -> 64px
  const iconDimensions = isSm ? 40 : isLg ? 64 : 50;

  return (
    <div className="flex items-center gap-3.5 select-none group cursor-pointer">
      {/* 3D Glossy Brand Icon with Eye-Catching Radiant Halo & Hover Spin/Bounce */}
      <div className="relative">
        {/* Ambient Pulsing Glow Aura */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-65 blur-[6px] group-hover:opacity-100 group-hover:blur-[10px] transition-all duration-500 animate-pulse" />

        {/* Outer Container with 10% Size Boost */}
        <div
          style={{ width: `${iconDimensions}px`, height: `${iconDimensions}px` }}
          className="relative flex items-center justify-center rounded-2xl overflow-hidden shadow-xl shadow-pink-500/30 border-2 border-white/60 dark:border-pink-500/40 bg-gradient-to-br from-white via-pink-50 to-pink-100 dark:from-slate-900 dark:to-slate-950 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3"
        >
          <Image
            src="/images/logo-icon.png"
            alt="Aprender & Aprobar Logo"
            width={iconDimensions}
            height={iconDimensions}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />

          {/* Shimmer light flare diagonal sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </div>
      </div>

      {/* Official Typography: Aprender & Aprobar (+10% typography scale with animated shimmer) */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight text-slate-900 dark:text-white transition-colors duration-300 logo-shimmer-text ${
              isSm ? "text-base" : isLg ? "text-3xl" : "text-xl sm:text-[22px]"
            }`}
            style={{ fontFamily: "var(--font-outfit, sans-serif)", letterSpacing: "-0.02em" }}
          >
            Aprender <span className="text-pink-500 font-extrabold">&</span> Aprobar
          </span>
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-bounce hidden sm:inline-block" />
        </div>
        <span
          className={`font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-300/90 transition-colors ${
            isSm ? "text-[9px]" : isLg ? "text-[12px]" : "text-[10.5px]"
          }`}
        >
          Plataforma Universitaria
        </span>
      </div>
    </div>
  );
}

// Backward-compatible alias for existing imports
export const AlphaSystemsLogo = AprenderAprobarLogo;

export function MainNavbar() {
  const { firebaseUser, profile, logout, signInWithGoogle, isAdmin, isTeacher } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getPortalLink = () => {
    if (isAdmin) return "/portal/admin";
    if (isTeacher) return "/portal/docente";
    return "/portal/alumno";
  };

  const getPortalLabel = () => {
    if (isAdmin) return "Panel Admin";
    if (isTeacher) return "Portal Docente";
    return "Mi Portal Alumno";
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-pink-100 dark:border-pink-900/30 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo with 10% size increase and eye-catching animated styling */}
          <Link href="/" className="hover:opacity-95 transition-opacity">
            <AprenderAprobarLogo size="md" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700 dark:text-slate-200">
            <Link
              href="/#universidades"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex items-center gap-1.5"
            >
              <span>Universidades</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 font-extrabold border border-pink-200 dark:border-pink-500/30">
                6 Oficiales
              </span>
            </Link>
            <Link
              href="/#materias"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Materias
            </Link>
            <Link
              href="/#metodo"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Método de Estudio
            </Link>
            <Link
              href="/#portales"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Portales
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher Button (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              title={theme === "dark" ? "Cambiar a modo Claro" : "Cambiar a modo Oscuro"}
              aria-label="Alternar tema de color"
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-amber-300 hover:border-pink-400 dark:hover:border-pink-500 transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {firebaseUser ? (
              // Authenticated User Menu
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-pink-500/50 text-slate-900 dark:text-white transition-all shadow-sm"
                >
                  {/* Streak Flame */}
                  <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 text-xs font-black pr-1 border-r border-slate-300 dark:border-slate-700">
                    <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
                    <span>{profile?.studyStreak || 1}d</span>
                  </div>

                  {/* User Photo or Initials */}
                  {firebaseUser.photoURL ? (
                    <img
                      src={firebaseUser.photoURL}
                      alt={profile?.displayName || "Usuario"}
                      className="w-7 h-7 rounded-full object-cover border border-pink-400"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {profile?.displayName?.charAt(0).toUpperCase() || "A"}
                    </div>
                  )}

                  <span className="hidden sm:inline-block text-xs font-bold max-w-[120px] truncate">
                    {profile?.displayName?.split(" ")[0] || "Mi Cuenta"}
                  </span>

                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                      isAdmin
                        ? "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-500/30"
                        : isTeacher
                        ? "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-500/30"
                        : "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300 border border-pink-500/30"
                    }`}
                  >
                    {isAdmin ? "Admin" : isTeacher ? "Docente" : "Alumno"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-slate-800 dark:text-slate-200 text-xs font-medium animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white truncate">
                        {profile?.displayName}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {firebaseUser.email}
                      </p>
                    </div>

                    <Link
                      href={getPortalLink()}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-pink-50 dark:hover:bg-slate-800 text-pink-600 dark:text-pink-300 font-bold transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-pink-500" />
                      <span>{getPortalLabel()}</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/portal/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-rose-500" />
                        <span>Panel de Administración</span>
                      </Link>
                    )}

                    <Link
                      href="/portal/alumno"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <User className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
                      <span>Mis Clases y Simuladores</span>
                    </Link>

                    <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                    <button
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Unauthenticated Actions
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Direct Google Sign-In Button */}
                <button
                  type="button"
                  onClick={() => signInWithGoogle()}
                  className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs shadow-md border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                  <span className="hidden sm:inline">Ingresar con Google</span>
                  <span className="sm:hidden">Google</span>
                </button>

                {/* Email / Full Login Modal Trigger */}
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-pink-500/25 flex items-center gap-1.5 transition-all transform active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Iniciar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
