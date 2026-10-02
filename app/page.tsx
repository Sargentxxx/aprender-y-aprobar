"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Search,
  BookOpen,
  HelpCircle,
  Clock,
  Star,
  Play,
  RotateCcw,
} from "lucide-react";
import { MOCK_SUBJECTS, MOCK_UNIVERSITIES } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "@/components/auth/LoginModal";
import { University, Subject } from "@/lib/types";

export default function HomePage() {
  const { firebaseUser, profile, signInWithGoogle } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePortalTab, setActivePortalTab] = useState<"alumno" | "docente" | "admin">("alumno");

  // Sample interactive flashcard state for student preview
  const [revealedCard, setRevealedCard] = useState(false);

  // Filter subjects based on university selection and search query
  const filteredSubjects = MOCK_SUBJECTS.filter((subject) => {
    const matchesUni = selectedUniversityId ? subject.universityId === selectedUniversityId : true;
    const matchesSearch =
      searchQuery.trim() === "" ||
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.career.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.universityName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUni && matchesSearch;
  });

  const selectedUni = MOCK_UNIVERSITIES.find((u) => u.id === selectedUniversityId);

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      {/* 1. HERO SECTION - Modern, Collegiate & Vibrant (No 'Nueva arquitectura' slogan) */}
      <section className="relative w-full pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-pink-950/30 bg-gradient-to-b from-slate-950 via-[#100720] to-slate-950 overflow-hidden">
        {/* Ambient Vibrant Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-pink-600/25 via-purple-600/20 to-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Student-centric Top Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-extrabold shadow-lg shadow-pink-500/10 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span>🔥 +2.500 Estudiantes Aprobados en Argentina 🇦🇷</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12]">
            Rendí y Aprobá en tu Universidad{" "}
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-300 to-indigo-400 bg-clip-text text-transparent">
              sin Complicarte.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            La plataforma pensada para estudiantes universitarios. Clases en video paso a paso, resúmenes oficiales de cátedra, flashcards con repetición espaciada y simuladores idénticos a los parciales de tu facultad.
          </p>

          {/* Main Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <a
              href="#universidades"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-xl shadow-pink-500/25 flex items-center gap-2.5 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <span>¿Cuál es tu Universidad?</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            {!firebaseUser && (
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm sm:text-base shadow-xl shadow-white/10 flex items-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                {/* Official Google G Logo */}
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
                <span>Acceder con Google</span>
              </button>
            )}

            <Link
              href="/materias/s21-economia-1"
              className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm sm:text-base border border-slate-700/80 flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span>Ver Clase Gratis (Economía I)</span>
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-pink-400">98%</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Tasa de Aprobación</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-purple-400">6</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Universidades Oficiales</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">+1.200h</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Clases Grabadas HD</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Pago Seguro MercadoPago</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXACT REPLICA OF "¿CUÁL ES TU UNIVERSIDAD?" (As in user image media_1790966956799.png) */}
      <section
        id="universidades"
        className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-fuchsia-600 via-pink-600 to-indigo-700 relative overflow-hidden"
      >
        {/* Decorative background shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Centered White Heading from screenshot */}
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              ¿Cuál es tu Universidad?
            </h2>
            <p className="text-pink-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Elegí tu casa de estudios para ver los programas oficiales, resúmenes de cátedra y materias preparadas a tu medida.
            </p>
          </div>

          {/* 6 White Rounded Cards Grid (2 cols x 3 rows on md+, exactly as in the photo) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {MOCK_UNIVERSITIES.map((uni) => {
              const isSelected = selectedUniversityId === uni.id;
              return (
                <div
                  key={uni.id}
                  onClick={() => {
                    setSelectedUniversityId(uni.id);
                    // Smoothly scroll to materias section
                    const el = document.getElementById("materias");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group relative bg-white rounded-3xl p-7 sm:p-9 shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 hover:shadow-2xl ${
                    isSelected ? "ring-4 ring-pink-400 ring-offset-4 ring-offset-pink-600" : ""
                  }`}
                >
                  {/* Top Label: UNIVERSIDAD in berry/pink uppercase */}
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-[2px] text-pink-600 block mb-2 font-mono">
                    UNIVERSIDAD
                  </span>

                  {/* University Name / Acronym */}
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-pink-600 transition-colors">
                    {uni.acronym}
                  </h3>

                  {/* Full University Name */}
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {uni.name}
                  </p>

                  {/* Degree Programs Pills */}
                  {uni.programs && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {uni.programs.slice(0, 3).map((prog, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold group-hover:bg-pink-50 group-hover:text-pink-700 transition-colors"
                        >
                          {prog}
                        </span>
                      ))}
                      {uni.programs.length > 3 && (
                        <span className="text-[10px] px-2 py-1 rounded-full bg-slate-100 text-slate-500 font-semibold">
                          +{uni.programs.length - 3} carreras
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bottom Link: "Ver materias →" */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-slate-600 group-hover:text-pink-600 transition-colors">
                    <span>Ver materias</span>
                    <span className="text-lg group-hover:translate-x-1.5 transition-transform duration-200">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Reset Filter Button if any selected */}
          {selectedUniversityId && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setSelectedUniversityId(null)}
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-md transition-colors"
              >
                ✕ Ver materias de todas las universidades
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. MATERIAS & PROGRAMAS INTERACTIVOS */}
      <section id="materias" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-pink-400 tracking-wider uppercase mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Planes de Estudio & Cátedras Oficiales</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {selectedUni ? `Materias de ${selectedUni.name}` : "Explorá Todas las Materias"}
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              {selectedUni
                ? `Cursos diseñados específicamente para el plan de estudio de ${selectedUni.acronym}, con modelos de examen resueltos de cátedra.`
                : "Seleccioná tu universidad o filtrá por nombre para encontrar tu materia."}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar materia o carrera..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* University Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-2 border-b border-slate-800">
          <button
            onClick={() => setSelectedUniversityId(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedUniversityId === null
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            Todas las Universidades ({MOCK_SUBJECTS.length})
          </button>
          {MOCK_UNIVERSITIES.map((u) => {
            const count = MOCK_SUBJECTS.filter((s) => s.universityId === u.id).length;
            const active = selectedUniversityId === u.id;
            return (
              <button
                key={u.id}
                onClick={() => setSelectedUniversityId(u.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {u.acronym} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Subject Cards Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 flex flex-col justify-between group shadow-xl transition-all hover:-translate-y-1"
              >
                <div>
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-[10px] font-extrabold uppercase">
                      {subject.universityName.split(" ")[1] || subject.universityName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      {subject.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-pink-300 transition-colors mb-2">
                    {subject.name}
                  </h3>

                  <p className="text-xs text-pink-200/80 font-medium mb-3">
                    {subject.career}
                  </p>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {subject.description}
                  </p>

                  {/* Highlights (Flashcards, Simuladores, Clases) */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 mb-5">
                    <div className="text-center">
                      <div className="font-extrabold text-pink-400">{subject.flashcardsCount}</div>
                      <div className="text-[10px] text-slate-400">Flashcards</div>
                    </div>
                    <div className="text-center border-x border-slate-800">
                      <div className="font-extrabold text-purple-400">{subject.examSimulationsCount}</div>
                      <div className="text-[10px] text-slate-400">Simuladores</div>
                    </div>
                    <div className="text-center">
                      <div className="font-extrabold text-indigo-400">{subject.modules.length || 4}</div>
                      <div className="text-[10px] text-slate-400">Módulos HD</div>
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-white">
                      ${subject.priceARS.toLocaleString("es-AR")}
                    </div>
                    <div className="text-[10px] text-slate-400">Pago único MercadoPago</div>
                  </div>

                  <Link
                    href={`/materias/${subject.id}`}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <span>Ver Programa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-bold">No se encontraron materias para esta búsqueda.</p>
            <button
              onClick={() => {
                setSelectedUniversityId(null);
                setSearchQuery("");
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </section>

      {/* 4. ACTIVE RECALL & LEARNING METHODOLOGY WITH LIVE DEMO */}
      <section id="metodo" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-slate-800/80">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wider uppercase">
            <Brain className="w-4 h-4" />
            <span>EL MÉTODO APRENDER & APROBAR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Por Qué Nuestros Alumnos Aprueban a la Primera
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Dejá de memorizar de memoria sin entender. Aplicamos neurociencia del aprendizaje con Recuperación Activa (Active Recall) y Repetición Espaciada para que llegues al examen seguro y relajado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Method Pillars */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    1. Video-Clases en Pizarra Digital
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Explicaciones claras y directas al grano. El docente resuelve en vivo los ejercicios más complejos de los parciales anteriores.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    2. Active Recall & Flashcards Inteligentes
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tu cerebro se entrena respondiendo preguntas antes de ver la solución. Fortalece las conexiones neuronales un 80% más que releer apuntes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    3. Simuladores de Examen con Tiempo Límite
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Exámenes idénticos a los de tu universidad con preguntas trampa, cronómetro regresivo y retroalimentación inmediata de tu nota.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Flashcard Preview on Landing Page */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-pink-950/30 border border-purple-800/40 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-900/40">
              <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Probá una Flashcard Real de Economía I</span>
              </span>
              <span className="text-[10px] font-mono text-purple-300 font-bold px-2 py-0.5 rounded-full bg-purple-900/50">
                Universidad Siglo 21
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-left min-h-[160px] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Pregunta de Examen Parcial:
                </span>
                <p className="text-sm sm:text-base font-bold text-white mt-1">
                  ¿Qué representa cualquier punto situado POR DEBAJO de la curva de la Frontera de Posibilidades de Producción (FPP)?
                </p>
              </div>

              {revealedCard ? (
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 animate-fadeIn">
                  <strong>Respuesta Correcta:</strong> Representa una asignación <u>ineficiente</u> de recursos, donde existen factores productivos ociosos o desempleados.
                </div>
              ) : (
                <div className="mt-4 text-xs text-slate-500 italic">
                  (Intentá recordar la respuesta antes de revelarla...)
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => setRevealedCard(!revealedCard)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{revealedCard ? "Ocultar Respuesta" : "Revelar Respuesta"}</span>
              </button>

              <Link
                href="/portal/alumno"
                className="text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
              >
                Ver todas las flashcards →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE THREE SPECIALIZED PORTALS (ALUMNO, DOCENTE, ADMIN) */}
      <section id="portales" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-pink-400 tracking-wider uppercase">
            <Users className="w-4 h-4" />
            <span>ARQUITECTURA DE TRES PORTALES DEDICADOS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Una Experiencia Hecha a Medida para Cada Rol
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Superando por completo las limitaciones de WordPress, cada actor cuenta con una plataforma optimizada sin distracciones.
          </p>

          {/* Portal Switcher Buttons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-1 mt-6">
            <button
              onClick={() => setActivePortalTab("alumno")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "alumno"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              1. Portal del Alumno
            </button>
            <button
              onClick={() => setActivePortalTab("docente")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "docente"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              2. Portal del Docente
            </button>
            <button
              onClick={() => setActivePortalTab("admin")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "admin"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              3. Panel de Administración
            </button>
          </div>
        </div>

        {/* Portal Showcase Card */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl backdrop-blur-sm">
          {activePortalTab === "alumno" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-pink-950/80 text-pink-300 border border-pink-800 text-xs font-bold uppercase">
                  Experiencia del Estudiante
                </span>
                <h3 className="text-2xl font-black text-white">
                  Clases, Flashcards, Simuladores y Racha Diaria
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Todo tu material de estudio ordenado en un solo lugar. Seguimiento de progreso, recordatorios de repaso y acceso instantáneo desde el celular o computadora.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                    <span><strong>Racha de Estudio:</strong> Contador de días activos para mantener la disciplina.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                    <span><strong>Active Recall:</strong> Mazo de tarjetas interactivas clasificadas por dificultad.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                    <span><strong>Simuladores Oficiales:</strong> Exámenes cronometrados con corrección inmediata.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/portal/alumno"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xs hover:from-pink-600 hover:to-purple-700 transition-colors shadow-md"
                  >
                    Entrar al Portal del Alumno <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Visual preview */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400 fill-amber-400" /> Racha de Estudio: 7 días seguidos 🔥
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Progreso: 85%</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-[10px] font-bold text-pink-400 uppercase block mb-1">
                    Cátedra Activa
                  </span>
                  <p className="font-bold text-white mb-2">Economía I • Universidad Siglo 21</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full w-4/5" />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">4 de 4 módulos aprobados</span>
                </div>
              </div>
            </div>
          )}

          {activePortalTab === "docente" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800 text-xs font-bold uppercase">
                  Herramientas para Profesores
                </span>
                <h3 className="text-2xl font-black text-white">
                  Carga de Clases, SpeedGrader y Asistente IA
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  El profesor titular puede gestionar cátedras, cargar videos, crear ejercicios interactivos y calificar entregas de los estudiantes en tiempo récord.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span><strong>SpeedGrader:</strong> Corrección visual de exámenes y trabajos prácticos sin salir de la plataforma.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span><strong>Asistente IA:</strong> Generación automática de modelos de examen a partir de apuntes.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/portal/docente"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition-colors shadow-md"
                  >
                    Entrar al Portal Docente <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white">Cátedra: Lic. Alberto Ezequiel García</span>
                  <span className="text-[10px] font-bold text-emerald-400">Estado: Activo</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between font-bold text-white">
                    <span>SpeedGrader • Economía I</span>
                    <span className="text-amber-400">3 Correcciones Pendientes</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Práctico de Frontera de Posibilidades y Elasticidad Precio.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePortalTab === "admin" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800 text-xs font-bold uppercase">
                  Gestión del Negocio
                </span>
                <h3 className="text-2xl font-black text-white">
                  Alumnos, Matrículas, Cobros MercadoPago y Blueprint
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Supervisión total de las finanzas y de los cursos. Aprobación de material antes de ser publicado y replicación de materias entre universidades con 1 clic.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>Directorio de Alumnos:</strong> Historial académico, pagos recibidos y estado de cursada.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>MercadoPago Integrado:</strong> Acreditación automática y habilitación de acceso en tiempo real.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    href="/portal/admin"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-colors shadow-md"
                  >
                    Entrar al Panel de Administración <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-white">Panel Fiduciario MercadoPago</span>
                  <span className="text-[10px] font-bold text-emerald-400">Cobros al Día</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 font-mono">
                  <div className="text-emerald-400">✓ Integración con Checkout Bricks</div>
                  <div className="text-slate-400">✓ Webhook automático de activación</div>
                  <div className="text-pink-400">✓ Base de datos Cloud Firestore</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. CALL TO ACTION - READY TO PASS */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-5">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              ¿Listo para rendir y aprobar sin sufrir?
            </h2>
            <p className="text-pink-100 text-sm sm:text-base max-w-2xl mx-auto">
              Unite a la comunidad de estudiantes universitarios que ya preparan sus exámenes con las clases oficiales de Aprender & Aprobar.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#universidades"
                className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Elegir mi Universidad
              </a>
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="px-7 py-3.5 rounded-2xl bg-slate-950/60 hover:bg-slate-950 text-white font-extrabold text-sm border border-white/20 transition-all"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
