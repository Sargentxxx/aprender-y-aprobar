"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Zap,
  Users,
  Brain,
  Video,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  Flame,
  Lock,
} from "lucide-react";
import { MOCK_SUBJECTS, MOCK_UNIVERSITIES } from "@/lib/mock-data";

export default function HomePage() {
  const [activePortalTab, setActivePortalTab] = useState<"alumno" | "docente" | "admin">("alumno");

  const eco1 = MOCK_SUBJECTS[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 to-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-bold tracking-wide shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>NUEVA ARQUITECTURA SAAS • INDEPENDIENTE DE WORDPRESS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            La Plataforma Educativa Líder para{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Rendir y Aprobar
            </span>{" "}
            en la Universidad.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Especialistas en <strong>Ciencias Económicas</strong> para estudiantes de la{" "}
            <strong className="text-white">Universidad Siglo 21 (S21)</strong>,{" "}
            <strong className="text-white">UNSE</strong>, <strong className="text-white">UCSE</strong> y{" "}
            <strong className="text-white">UBP</strong>. Aprende con metodologías basadas en evidencia:
            Recuperación Activa, Repetición Espaciada y Streaming Cifrado Multi-DRM.
          </p>

          {/* Quick Access CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/portal/alumno"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Acceder al Portal Alumno</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/portal/docente"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition-all"
            >
              <span>Portal Docente (SpeedGrader)</span>
            </Link>

            <Link
              href="/portal/admin"
              className="px-5 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white font-bold text-sm border border-slate-800 flex items-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Panel Admin</span>
            </Link>
          </div>

          {/* University Tags */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
              Planes Curriculares Sincronizados:
            </span>
            {MOCK_UNIVERSITIES.map((u) => (
              <span
                key={u.id}
                className="px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-semibold"
              >
                {u.name} ({u.acronym})
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE THREE PORTALS DEMO SECTION */}
      <section id="portales" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-wider uppercase">
            <Users className="w-4 h-4" />
            <span>ARQUITECTURA MULTIPLATAFORMA SEGMENTADA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Tres Portales Especializados. Cero Sobrecarga.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            A diferencia de sitios genéricos en WordPress con complementos fragmentados, Aprender & Aprobar cuenta con interfaces dedicadas y seguras para cada actor institucional.
          </p>

          {/* Portal Switcher Buttons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-1 mt-6">
            <button
              onClick={() => setActivePortalTab("alumno")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "alumno"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              1. Portal del Alumno
            </button>
            <button
              onClick={() => setActivePortalTab("docente")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "docente"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              2. Portal del Docente
            </button>
            <button
              onClick={() => setActivePortalTab("admin")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "admin"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              3. Panel de Administración
            </button>
          </div>
        </div>

        {/* Dynamic Portal Showcase Card */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-sm animate-fadeIn">
          {activePortalTab === "alumno" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold uppercase">
                  Experiencia del Estudiante
                </span>
                <h3 className="text-2xl font-black text-white">
                  Motor de Retención Cognitiva y Gamificación Activa
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Diseñado para combatir la procrastinación y garantizar la aprobación en el primer intento. El alumno nunca estudia solo:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Mapa de Calor de Compromiso:</strong> Registro diario visual estilo GitHub que mide la consistencia.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Rachas & Insignias:</strong> Desbloqueo de medallas al dominar módulos de Economía I.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Simuladores de Examen Siglo 21:</strong> Cronómetro, justificación teórica y cálculo de nota.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Streaming Seguro:</strong> Marca de agua forense con datos del alumno para evitar piratería.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/portal/alumno"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-colors shadow-md"
                  >
                    Entrar al Portal del Alumno <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Visual preview widget */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" /> Racha de Estudio: 12 días
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Nivel de Retención: 94%</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase block mb-1">
                    Simulador Siglo 21 Disponible
                  </span>
                  <p className="font-bold text-white mb-2">Economía I: Parcial Integrador Módulos 1 y 2</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-3/4" />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">75% del programa completado</span>
                </div>
              </div>
            </div>
          )}

          {activePortalTab === "docente" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold uppercase">
                  Herramientas para Profesores
                </span>
                <h3 className="text-2xl font-black text-white">
                  SpeedGrader Unificado & Copiloto con Inteligencia Artificial
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Elimina el trabajo burocrático y multiplica el impacto formativo del educador:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>SpeedGrader en Pantalla Única:</strong> Corrige entregas y califica sin descargar archivos a la PC.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>Control de Asistencia Digital:</strong> Marcación en un clic y alertas tempranas por ausentismo.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>Copiloto IA Gemini:</strong> Sintetiza preguntas de examen y flashcards a partir del PDF de la materia.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/portal/docente"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-500 transition-colors shadow-md"
                  >
                    Entrar al Portal Docente <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white">SpeedGrader • Cátedra Economía I</span>
                  <span className="text-[10px] font-bold text-emerald-400">3 Trabajos por Calificar</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between font-bold text-white">
                    <span>Gonzalo Morales (TP Nº 2)</span>
                    <span className="text-amber-400">Pendiente</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Cálculo de Elasticidad y Pérdida Irrecuperable de Eficiencia.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePortalTab === "admin" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-bold uppercase">
                  Centro de Mando del Negocio
                </span>
                <h3 className="text-2xl font-black text-white">
                  SIS Estudiantil, Blueprint Courses y MercadoPago Nativo
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Supervisión absoluta del negocio educativo con sincronización multi-sede y cobros automáticos:
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span><strong>Sistema SIS Centralizado:</strong> Directorio de legajos, matrículas y estados arancelarios.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span><strong>Cursos Modelo (Blueprint):</strong> Actualiza Economía I y replícalo a Siglo 21, UNSE y UBP con 1 clic.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span><strong>Aprobación de Contenidos:</strong> Filtro de calidad antes de que los profesores publiquen clases.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span><strong>MercadoPago Checkout Bricks:</strong> Cobro nativo con tarjeta o suscripción recurrente en ARS.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/portal/admin"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-500 transition-colors shadow-md"
                  >
                    Entrar al Panel de Administración <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white">Panel Fiduciario • MercadoPago ARS</span>
                  <span className="text-[10px] font-bold text-emerald-400">$1.458.000 ARS</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 font-mono">
                  <div className="text-cyan-400">✓ Webhook: /api/webhooks/mercadopago</div>
                  <div className="text-slate-400">HMAC-SHA256: Verificado (200 OK)</div>
                  <div className="text-emerald-400">Aprovisionamiento Firestore: Inmediato</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. FEATURED CURRICULUM: ECONOMÍA I (SIGLO 21) */}
      <section id="materias" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-wider uppercase mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Cátedra Oficial Más Solicitada</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Programa Integral de Economía I (Siglo 21)
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Estructura curricular completa basada en los programas oficiales de la Universidad Siglo 21 y universidades nacionales.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/materias/s21-economia-1"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Ver Programa & Matricularse</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eco1.modules.map((m, idx) => (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <span className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center font-bold text-xs mb-4">
                  0{idx + 1}
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {m.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>{m.lessons.length} Clases en Video</span>
                <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                  Explorar →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PEDAGOGICAL PILLARS (ACTIVE RECALL & SPACED REPETITION) */}
      <section id="pedagogia" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wider uppercase">
            <Brain className="w-4 h-4" />
            <span>METODOLOGÍA COGNITIVA COMPROBADA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Supera la Curva del Olvido y Aprueba en el Primer Intento
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            La relectura pasiva solo retiene el 20%. Nuestros algoritmos integran los dos principios con mayor evidencia científica en psicología del aprendizaje:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1. Recuperación Activa (Active Recall)</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Estudios paradigmáticos (Roediger & Karpicke, 2006) demuestran que esforzarse en recuperar información de la memoria fortalece los canales neuronales hasta un 80% más que la lectura pasiva. En Aprender & Aprobar, cada módulo te desafía a formular mentalmente la respuesta antes de revelarla.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono">
              ★ Retención a 7 días: 80% (Activa) vs 34% (Pasiva)
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2. Repetición Espaciada (Spaced Repetition)</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Distribuir los repasos en intervalos crecientes (1 día, 3 días, 7 días) anula la curva del olvido de Ebbinghaus. Nuestro algoritmo predictivo recalcula cuándo debes volver a repasar cada concepto según tu dificultad declarada (Difícil, Bueno, Fácil).
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono">
              ★ Algoritmo Adaptativo personalizado por estudiante
            </div>
          </div>
        </div>
      </section>

      {/* 5. ANTI-PIRACY & SECURITY */}
      <section id="seguridad" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-slate-800/80">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>PROTECCIÓN DE DERECHOS DIGITALES DE GRADO ESTUDIO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Infraestructura Anti-Piratería con Marcas de Agua Forenses
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              El material audiovisual de Aprender & Aprobar está blindado mediante cifrado de transporte HLS y marcas de agua dinámicas flotantes que proyectan el email, ID y timestamp del estudiante de manera periódica. En caso de grabación externa con cámara o capturadora, la huella forense identifica unívocamente la sesión infractora.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 w-full md:w-80 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Defensa en Profundidad:</span>
            </div>
            <div className="space-y-2 text-slate-300 text-[11px]">
              <div>• URLs Firmadas Criptográficamente</div>
              <div>• Restricción Estricta de Dominios</div>
              <div>• Marcas de Agua Forenses Oscilantes</div>
              <div>• Detección y Bloqueo de Captura de Pantalla</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING & MERCADOPAGO CHECKOUT CARDS */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 tracking-wider uppercase">
            <CreditCard className="w-4 h-4" />
            <span>TRANSPARENCIA ARANCELARIA EN PESOS ARGENTINOS (ARS)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Planes de Acceso Flexibles para Universitarios
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Sin conversiones en dólares ni impuestos sorpresa. Paga de forma nativa con MercadoPago (Tarjeta de crédito, débito o dinero en cuenta).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Acceso Único por Materia */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Pase Libre por Materia
              </span>
              <h3 className="text-2xl font-black text-white mb-2">Economía I (Siglo 21)</h3>
              <p className="text-xs text-slate-400 mb-6">
                Acceso irrestricto hasta que apruebes la materia en el turno de examen regular o final.
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-white">$38.500</span>
                <span className="text-xs text-slate-400 font-bold">ARS (Pago Único)</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Todos los módulos en video de Economía I</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24 Flashcards con Repetición Espaciada</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3 Simuladores de Parcial con Cronómetro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Apuntes y Modelos de Parcial en PDF</span>
                </li>
              </ul>
            </div>

            <Link
              href="/materias/s21-economia-1"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs text-center border border-slate-700 transition-all shadow-md"
            >
              Comprar Materia Completa
            </Link>
          </div>

          {/* Card 2: Suscripción Mensual Universitaria (Destacada) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/80 flex flex-col justify-between relative shadow-2xl shadow-cyan-500/10">
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md">
              Recomendado por la Cátedra
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider block mb-1">
                Suscripción Continua
              </span>
              <h3 className="text-2xl font-black text-white mb-2">Plan Universitario Full</h3>
              <p className="text-xs text-slate-400 mb-6">
                Ideal para cursar el cuatrimestre completo a tu propio ritmo con débito automático MercadoPago.
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-black text-cyan-300">$19.500</span>
                <span className="text-xs text-slate-400 font-bold">ARS / mes</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Acceso a Economía I, Matemática Financiera y Contabilidad</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>SpeedGrader: Corrección de tus TP por el docente titular</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Simuladores de parcial ilimitados con ranking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Cancela cuando quieras en 1 clic desde tu panel</span>
                </li>
              </ul>
            </div>

            <Link
              href="/materias/s21-economia-1"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs text-center hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
            >
              Suscribirse con MercadoPago
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
