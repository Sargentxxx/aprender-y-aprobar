"use client";

import React, { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronDown,
  Flame,
  Lock,
  Search,
  BookOpen,
  HelpCircle,
  Clock,
  Star,
  Play,
  RotateCcw,
  MapPin,
  Check,
} from "lucide-react";
import { MOCK_SUBJECTS, MOCK_UNIVERSITIES } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "@/components/auth/LoginModal";
import { University, Subject } from "@/lib/types";

// Hero Carousel Slides using our 3 high-quality generated images
const HERO_SLIDES = [
  {
    id: 1,
    image: "/images/hero-carousel-1.jpg",
    alt: "Estudiantes universitarios preparando exámenes en equipo en la biblioteca",
    tag: "Colaboración y Cátedra",
    title: "Estudiá en equipo con el material exacto de tu cátedra",
    description: "Resúmenes oficiales, ejercicios prácticos resueltos paso a paso y modelos reales de examen.",
  },
  {
    id: 2,
    image: "/images/hero-carousel-2.jpg",
    alt: "Estudiante universitaria sonriendo con su libreta y tablet mostrando nota 10 en SIU Guaraní",
    tag: "Éxito Académico",
    title: "Aprobá tus parciales y finales con las mejores notas",
    description: "Metodología comprobada con Active Recall y simuladores idénticos a los de tu facultad.",
  },
  {
    id: 3,
    image: "/images/hero-carousel-3.jpg",
    alt: "Espacio de estudio universitario moderno con laptop, video-clases y resúmenes",
    tag: "Flexibilidad 24/7",
    title: "Aprendé a tu propio ritmo desde cualquier dispositivo",
    description: "Clases en Full HD con pizarra digital, flashcards inteligentes y acceso ilimitado.",
  },
];

export default function HomePage() {
  const { firebaseUser, profile, signInWithGoogle } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePortalTab, setActivePortalTab] = useState<"alumno" | "docente" | "admin">("alumno");

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // University 3D Flip Card state: tracks which cards are currently rotated
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [hoveredUniId, setHoveredUniId] = useState<string | null>(null);

  const toggleFlip = (uniId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [uniId]: !prev[uniId],
    }));
  };

  // Sample interactive flashcard state for student preview
  const [revealedCard, setRevealedCard] = useState(false);

  // Auto-advance Carousel every 5.5 seconds unless hovered
  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

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
    <div className="w-full flex flex-col items-center overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 1. HERO SECTION - Full-Screen Hero Image Carousel with Overlaid Headline Cartel & Glassmorphic Details */}
      <section className="relative w-full h-screen min-h-[680px] overflow-hidden flex flex-col justify-between items-center text-center select-none bg-slate-950">
        {/* Full-Screen Carousel Slides */}
        <div
          className="absolute inset-0 w-full h-full"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  className={`object-cover object-center transform transition-transform duration-10000 ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  sizes="100vw"
                />
                {/* Lighter contrast overlay to ensure carousel images are vividly noticeable */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/30 to-slate-950/60" />
              </div>
            );
          })}
        </div>

        {/* Carousel Prev / Next Navigation Buttons (Fixed on screen edges) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Diapositiva anterior"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-pink-600/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-2xl"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Siguiente diapositiva"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-pink-600/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-2xl"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Central Foreground Content: Overlaid Cartel with High Impact */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-auto pt-28 pb-8 space-y-6 sm:space-y-7 w-full flex flex-col items-center justify-center">
          {/* Top Pill Badge: Manychat style with live glowing indicator */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-pink-400/40 text-pink-300 text-xs sm:text-sm font-extrabold shadow-2xl shadow-pink-500/20 backdrop-blur-md transition-all hover:scale-105">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
            </span>
            <span>🔥 +2.500 Estudiantes Aprobados en Argentina 🇦🇷</span>
            <span className="text-slate-400">•</span>
            <span className="inline-flex items-center gap-1 text-amber-400 font-black">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9/5
            </span>
          </div>

          {/* Primary Headline Cartel */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] max-w-5xl mx-auto drop-shadow-2xl">
            Aprende & Aproba en tu Universidad{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400">
              sin Complicarte.
            </span>
          </h1>

          {/* Subtitle with High Legibility */}
          <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto leading-relaxed font-normal drop-shadow-md">
            La plataforma diseñada exclusivamente para estudiantes universitarios. Clases en video paso a paso, resúmenes oficiales de cátedra, flashcards con repetición espaciada y simuladores idénticos a los parciales de tu facultad.
          </p>

          {/* Main Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#universidades"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black text-sm sm:text-base shadow-2xl shadow-pink-500/35 flex items-center gap-2.5 transition-all transform hover:-translate-y-1 active:translate-y-0"
            >
              <span>¿Cuál es tu Universidad?</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            {!firebaseUser && (
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                className="px-6 py-4 rounded-2xl bg-white/95 hover:bg-white text-slate-900 font-extrabold text-sm sm:text-base border border-white/60 shadow-2xl shadow-black/40 flex items-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0"
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
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 shadow-lg backdrop-blur-md flex items-center gap-2 transition-all transform hover:-translate-y-1"
            >
              <Play className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span>Ver Clase Gratis (Economía I)</span>
            </Link>
          </div>

          {/* Social Proof Avatars & Rating */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-slate-200 font-semibold drop-shadow">
            <div className="flex -space-x-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white text-[10px] font-bold border-2 border-slate-900 shadow">
                SM
              </span>
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center text-white text-[10px] font-bold border-2 border-slate-900 shadow">
                LR
              </span>
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white text-[10px] font-bold border-2 border-slate-900 shadow">
                TG
              </span>
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-white text-[10px] font-bold border-2 border-slate-900 shadow">
                MP
              </span>
              <span className="w-7 h-7 rounded-full bg-slate-800 text-pink-300 flex items-center justify-center text-[10px] font-extrabold border-2 border-slate-900 shadow">
                +2.5k
              </span>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className="text-sm">★</span>
              ))}
            </div>
            <span>Promedio 4.9/5 en satisfacción estudiantil</span>
          </div>
        </div>

        {/* Bottom Slide Indicators & Scroll Down Prompt */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 pb-6 flex items-center justify-between">
          <div className="w-24 hidden sm:block" />

          {/* Scroll Down Prompt */}
          <a
            href="#destacados"
            className="inline-flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-pink-300 group-hover:text-pink-200">
              Explorá la Plataforma
            </span>
            <span className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 backdrop-blur-md border border-white/20 animate-bounce">
              <ChevronDown className="w-4 h-4 text-white" />
            </span>
          </a>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Ir a diapositiva ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-7 bg-pink-500 shadow-md shadow-pink-500/50"
                    : "w-2 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 1.5 HIGHLIGHTED PILLARS & SUCCESS STORIES (Las 3 Tarjetas Reubicadas con Diseño Glass) */}
      <section id="destacados" className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Exámenes Aprobados con 10 */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all flex items-start gap-4 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                10
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    ¡Aprobé con 10 en SIU Guaraní!
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
                <p className="text-xs font-bold text-pink-600 dark:text-pink-400">
                  Economía I • Siglo 21, UNSE, UCSE
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  Modelos de parcial resueltos paso a paso e idénticos a los de tu cátedra para rendir con total tranquilidad.
                </p>
              </div>
            </div>

            {/* Card 2: Active Recall & Repetición Espaciada */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all flex items-start gap-4 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Active Recall & Repetición Espaciada
                </h3>
                <p className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  98% de retención en el examen parcial
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  Metodología comprobada de neurociencia: entrenás tu memoria respondiendo preguntas antes de ver la solución.
                </p>
              </div>
            </div>

            {/* Card 3: Colaboración & Cátedra Oficial */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 shadow-xl shadow-slate-200/40 dark:shadow-none transition-all flex items-start gap-4 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Colaboración & Cátedra Oficial
                </h3>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Material exacto de tu facultad
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  Clases grabadas en pizarra digital, resúmenes oficiales de cátedra y simuladores con preguntas de final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS SECTION (Sleek Glass Grid) */}
      <section className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all text-center">
            <div className="text-2xl sm:text-3xl font-black text-pink-600 dark:text-pink-400">98%</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">Tasa de Aprobación</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all text-center">
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">6</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">Universidades Oficiales</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all text-center">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">+1.200h</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">Clases Grabadas HD</div>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg transition-all text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-1">Pago Seguro MercadoPago</div>
          </div>
        </div>
      </section>

      {/* 2. UNIVERSIDADES WITH 3D FLIP CARD EFFECT (Rotación con Carreras y Materias) */}
      <section
        id="universidades"
        className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-fuchsia-600 via-pink-600 to-indigo-700 relative overflow-hidden"
      >
        {/* Decorative background shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Centered Heading */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Programas y Cátedras Oficiales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              ¿Cuál es tu Universidad?
            </h2>
            <p className="text-pink-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Pasá el mouse por encima de cada tarjeta para <strong>girarla automáticamente</strong> y descubrir las carreras y materias disponibles.
            </p>
          </div>

          {/* 6 3D FLIP CARDS GRID (2 cols x 3 rows on md+) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MOCK_UNIVERSITIES.map((uni) => {
              const isFlipped = hoveredUniId === uni.id || !!flippedCards[uni.id];
              const isSelected = selectedUniversityId === uni.id;
              const uniSubjects = MOCK_SUBJECTS.filter((s) => s.universityId === uni.id);

              return (
                <div
                  key={uni.id}
                  className="flip-card perspective-1000 h-[380px] w-full cursor-pointer select-none group"
                  onMouseEnter={() => setHoveredUniId(uni.id)}
                  onMouseLeave={() => setHoveredUniId(null)}
                  onClick={() => toggleFlip(uni.id)}
                >
                  {/* Rotating Card Inner Container */}
                  <div
                    className={`flip-card-inner relative w-full h-full duration-700 transform-style-3d transition-transform ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT SIDE OF THE CARD */}
                    <div
                      className={`absolute inset-0 backface-hidden rounded-3xl p-7 flex flex-col justify-between shadow-2xl transition-all duration-300 border-2 ${
                        isSelected
                          ? "ring-4 ring-pink-300 ring-offset-4 ring-offset-pink-600 bg-white dark:bg-slate-900 border-pink-400"
                          : "bg-white dark:bg-slate-900 border-white/40 dark:border-slate-800 hover:border-pink-300"
                      }`}
                    >
                      {/* Top Bar with Acronym Pill and Flip Indicator Button */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] font-black uppercase tracking-[2px] text-pink-600 dark:text-pink-400 font-mono">
                            UNIVERSIDAD OFICIAL
                          </span>
                          <button
                            type="button"
                            onClick={(e) => toggleFlip(uni.id, e)}
                            title="Girar tarjeta para ver carreras"
                            className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-pink-100 dark:hover:bg-pink-900/40 text-slate-500 hover:text-pink-600 dark:text-slate-400 dark:hover:text-pink-300 transition-colors flex items-center gap-1 text-[11px] font-bold"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Girar</span>
                          </button>
                        </div>

                        {/* Official University Logo */}
                        <div className="h-16 w-full flex items-center justify-start py-1 mb-3">
                          <img
                            src={uni.logo}
                            alt={`Logo oficial ${uni.name}`}
                            className="max-h-14 w-auto object-contain transition-transform group-hover:scale-105"
                          />
                        </div>

                        {/* University Name / Acronym */}
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                          {uni.acronym}
                        </h3>

                        {/* Full University Name */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium line-clamp-2">
                          {uni.name}
                        </p>

                        {/* Location */}
                        <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          <MapPin className="w-3 h-3 text-pink-500 shrink-0" />
                          <span className="truncate">{uni.location}</span>
                        </div>
                      </div>

                      {/* Bottom Front CTA prompt */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-extrabold text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                          <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                          <span>Pasá el mouse para ver carreras y materias</span>
                        </span>
                        <span className="text-slate-400 text-sm font-black group-hover:rotate-180 transition-transform duration-500">↻</span>
                      </div>
                    </div>

                    {/* BACK SIDE OF THE CARD (Rotated 180deg) */}
                    <div
                      className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-7 flex flex-col justify-between shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white border-2 border-pink-500/50"
                    >
                      <div>
                        {/* Top Back Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                          <div>
                            <span className="text-[10px] font-black text-pink-400 uppercase tracking-wider block">
                              CARRERAS & MATERIAS
                            </span>
                            <h4 className="text-lg font-black text-white">{uni.acronym}</h4>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => toggleFlip(uni.id, e)}
                            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Volver</span>
                          </button>
                        </div>

                        {/* Programs / Carreras Pills */}
                        <div className="mt-4">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                            🎓 Carreras Oficiales:
                          </span>
                          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                            {uni.programs?.map((prog, pIdx) => (
                              <span
                                key={pIdx}
                                className="text-[10px] px-2 py-0.5 rounded-lg bg-white/10 text-pink-200 font-semibold border border-white/10"
                              >
                                {prog}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Featured Subjects */}
                        <div className="mt-4">
                          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1.5">
                            📚 Materias Destacadas:
                          </span>
                          <div className="flex flex-wrap gap-1 text-[11px] text-slate-300">
                            {uni.featuredSubjects?.slice(0, 3).map((sub, sIdx) => (
                              <span key={sIdx} className="inline-flex items-center gap-1 mr-2 font-medium">
                                <Check className="w-3 h-3 text-emerald-400" />
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Direct Action on Back Face */}
                      <div className="pt-3 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUniversityId(uni.id);
                            const el = document.getElementById("materias");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-xs shadow-md shadow-pink-500/25 flex items-center justify-center gap-2 transition-all"
                        >
                          <span>Ver Materias de {uni.acronym}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
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
                className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-extrabold backdrop-blur-md transition-colors shadow-lg"
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
            <div className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 dark:text-pink-400 tracking-wider uppercase mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Planes de Estudio & Cátedras Oficiales</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {selectedUni ? `Materias de ${selectedUni.name}` : "Explorá Todas las Materias"}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />
          </div>
        </div>

        {/* University Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setSelectedUniversityId(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedUniversityId === null
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
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
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
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
                className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-pink-500/50 flex flex-col justify-between group shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:-translate-y-1"
              >
                <div>
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-500/15 border border-pink-200 dark:border-pink-500/30 text-pink-700 dark:text-pink-300 text-[10px] font-extrabold uppercase">
                      {subject.universityName.split(" ")[1] || subject.universityName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                      {subject.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors mb-2">
                    {subject.name}
                  </h3>

                  <p className="text-xs text-pink-600 dark:text-pink-200/80 font-semibold mb-3">
                    {subject.career}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {subject.description}
                  </p>

                  {/* Highlights (Flashcards, Simuladores, Clases) */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300 mb-5">
                    <div className="text-center">
                      <div className="font-extrabold text-pink-600 dark:text-pink-400">{subject.flashcardsCount}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Flashcards</div>
                    </div>
                    <div className="text-center border-x border-slate-200 dark:border-slate-800">
                      <div className="font-extrabold text-purple-600 dark:text-purple-400">{subject.examSimulationsCount}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Simuladores</div>
                    </div>
                    <div className="text-center">
                      <div className="font-extrabold text-indigo-600 dark:text-indigo-400">{subject.modules.length || 4}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Módulos HD</div>
                    </div>
                  </div>
                </div>

                {/* Price & Action Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-slate-900 dark:text-white">
                      ${subject.priceARS.toLocaleString("es-AR")}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Pago único MercadoPago</div>
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
          <div className="text-center py-16 bg-white dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-700 dark:text-slate-300 font-bold">No se encontraron materias para esta búsqueda.</p>
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
      <section id="metodo" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 dark:text-amber-400 tracking-wider uppercase">
            <Brain className="w-4 h-4" />
            <span>EL MÉTODO APRENDER & APROBAR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Por Qué Nuestros Alumnos Aprueban a la Primera
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Dejá de memorizar de memoria sin entender. Aplicamos neurociencia del aprendizaje con Recuperación Activa (Active Recall) y Repetición Espaciada para que llegues al examen seguro y relajado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Method Pillars */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-pink-500/40 shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    1. Video-Clases en Pizarra Digital
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Explicaciones claras y directas al grano. El docente resuelve en vivo los ejercicios más complejos de los parciales anteriores.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    2. Active Recall & Flashcards Inteligentes
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Tu cerebro se entrena respondiendo preguntas antes de ver la solución. Fortalece las conexiones neuronales un 80% más que releer apuntes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    3. Simuladores de Examen con Tiempo Límite
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Exámenes idénticos a los de tu universidad con preguntas trampa, cronómetro regresivo y retroalimentación inmediata de tu nota.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Flashcard Preview on Landing Page */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-purple-950/40 dark:via-slate-900 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800/40 shadow-xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-200 dark:border-purple-900/40">
              <span className="text-xs font-bold text-pink-600 dark:text-pink-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Probá una Flashcard Real de Economía I</span>
              </span>
              <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50">
                Universidad Siglo 21
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left min-h-[160px] flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-500 dark:text-amber-400 tracking-wider">
                  Pregunta de Examen Parcial:
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
                  ¿Qué representa cualquier punto situado POR DEBAJO de la curva de la Frontera de Posibilidades de Producción (FPP)?
                </p>
              </div>

              {revealedCard ? (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-200 animate-fadeIn">
                  <strong>Respuesta Correcta:</strong> Representa una asignación <u>ineficiente</u> de recursos, donde existen factores productivos ociosos o desempleados.
                </div>
              ) : (
                <div className="mt-4 text-xs text-slate-400 italic">
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
                className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline transition-colors"
              >
                Ver todas las flashcards →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE THREE SPECIALIZED PORTALS (ALUMNO, DOCENTE, ADMIN) */}
      <section id="portales" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-slate-200 dark:border-slate-800/80">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 dark:text-pink-400 tracking-wider uppercase">
            <Users className="w-4 h-4" />
            <span>ARQUITECTURA DE TRES PORTALES DEDICADOS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Una Experiencia Hecha a Medida para Cada Rol
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Superando por completo las limitaciones de plataformas genéricas, cada actor cuenta con un espacio optimizado sin distracciones.
          </p>

          {/* Portal Switcher Buttons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 gap-1 mt-6 shadow-sm">
            <button
              onClick={() => setActivePortalTab("alumno")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "alumno"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              1. Portal del Alumno
            </button>
            <button
              onClick={() => setActivePortalTab("docente")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "docente"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              2. Portal del Docente
            </button>
            <button
              onClick={() => setActivePortalTab("admin")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activePortalTab === "admin"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              3. Panel de Administración
            </button>
          </div>
        </div>

        {/* Portal Showcase Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl backdrop-blur-sm">
          {activePortalTab === "alumno" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-bold uppercase">
                  Experiencia del Estudiante
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Clases, Flashcards, Simuladores y Racha Diaria
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Todo tu material de estudio ordenado en un solo lugar. Seguimiento de progreso, recordatorios de repaso y acceso instantáneo desde el celular o computadora.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
                    <span><strong>Racha de Estudio:</strong> Contador de días activos para mantener la disciplina.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
                    <span><strong>Active Recall:</strong> Mazo de tarjetas interactivas clasificadas por dificultad.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0" />
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
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> Racha de Estudio: 7 días seguidos 🔥
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Progreso: 85%</span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
                  <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 uppercase block mb-1">
                    Cátedra Activa
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white mb-2">Economía I • Universidad Siglo 21</p>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full w-4/5" />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">4 de 4 módulos aprobados</span>
                </div>
              </div>
            </div>
          )}

          {activePortalTab === "docente" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase">
                  Herramientas para Profesores
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Carga de Clases, SpeedGrader y Asistente IA
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  El profesor titular puede gestionar cátedras, cargar videos, crear ejercicios interactivos y calificar entregas de los estudiantes en tiempo récord.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span><strong>SpeedGrader:</strong> Corrección visual de exámenes y trabajos prácticos sin salir de la plataforma.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
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

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Cátedra: Lic. Alberto Ezequiel García</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Estado: Activo</span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2 shadow-sm">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                    <span>SpeedGrader • Economía I</span>
                    <span className="text-amber-600 dark:text-amber-400">3 Correcciones Pendientes</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Práctico de Frontera de Posibilidades y Elasticidad Precio.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePortalTab === "admin" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold uppercase">
                  Gestión del Negocio
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Alumnos, Matrículas, Cobros MercadoPago y Blueprint
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Supervisión total de las finanzas y de los cursos. Aprobación de material antes de ser publicado y replicación de materias entre universidades con 1 clic.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span><strong>Directorio de Alumnos:</strong> Historial académico, pagos recibidos y estado de cursada.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
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

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Panel Fiduciario MercadoPago</span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Cobros al Día</span>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1 font-mono shadow-sm">
                  <div className="text-emerald-600 dark:text-emerald-400">✓ Integración con Checkout Bricks</div>
                  <div className="text-slate-500 dark:text-slate-400">✓ Webhook automático de activación</div>
                  <div className="text-pink-600 dark:text-pink-400">✓ Base de datos Cloud Firestore</div>
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
