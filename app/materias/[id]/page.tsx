"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_SUBJECTS } from "@/lib/mock-data";
import {
  GraduationCap,
  Clock,
  BookOpen,
  Award,
  Video,
  CheckCircle2,
  CreditCard,
  Zap,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectId = (params?.id as string) || "s21-economia-1";

  const subject = MOCK_SUBJECTS.find((s) => s.id === subjectId) || MOCK_SUBJECTS[0];

  const [paymentDone, setPaymentDone] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEnroll = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
    }, 1400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Subject Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-bold uppercase">
            {subject.universityName}
          </span>
          <span className="text-xs text-slate-400 font-mono">Código: {subject.code}</span>
          <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold border border-slate-700">
            {subject.career}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {subject.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {subject.description}
        </p>

        {/* Cátedra & Stats */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div>
            <span className="text-slate-500 block font-semibold text-[10px] uppercase">Titular de Cátedra</span>
            <span className="font-bold text-white text-sm">{subject.teacherName}</span>
          </div>
          <div className="w-px h-8 bg-slate-800 hidden sm:block" />
          <div>
            <span className="text-slate-500 block font-semibold text-[10px] uppercase">Flashcards Activas</span>
            <span className="font-bold text-amber-400 text-sm">{subject.flashcardsCount} Tarjetas</span>
          </div>
          <div className="w-px h-8 bg-slate-800 hidden sm:block" />
          <div>
            <span className="text-slate-500 block font-semibold text-[10px] uppercase">Simuladores de Examen</span>
            <span className="font-bold text-emerald-400 text-sm">{subject.examSimulationsCount} Evaluaciones</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Syllabus (8 cols) & Checkout Brick (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Modules & Free Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white">Programa Analítico Oficial</h3>
            <span className="text-xs text-slate-400 font-semibold">
              {subject.modules.length} Módulos Curriculares
            </span>
          </div>

          <div className="space-y-4">
            {subject.modules.map((m, idx) => (
              <div
                key={m.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                      Módulo 0{idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-white">{m.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{m.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  {m.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300"
                    >
                      <div className="flex items-center gap-2.5">
                        <Video className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="font-semibold text-white">{lesson.title}</span>
                        {lesson.isFreePreview && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Clase Gratis
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-slate-500 text-[11px] shrink-0 ml-2">
                        {lesson.durationMinutes} min
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Checkout Brick Native (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md sticky top-24 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              MercadoPago Checkout Brick
            </span>
            <h4 className="text-lg font-black text-white">Matriculación Inmediata</h4>
            <p className="text-xs text-slate-400">
              Accede de forma automática a todo el contenido y simuladores.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Arancel de Cátedra</span>
                <span className="text-2xl font-black text-white">
                  ${subject.priceARS.toLocaleString("es-AR")}
                </span>
                <span className="text-[10px] text-slate-400 block">Pesos Argentinos (ARS)</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                Pago Único
              </span>
            </div>

            <div className="text-xs text-slate-400 space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Garantía de aprobación hasta rendir final</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simuladores de parcial Siglo 21 incluidos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Soporte por WhatsApp de cátedra</span>
              </div>
            </div>
          </div>

          {!paymentDone ? (
            <button
              onClick={handleEnroll}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-xs hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              {isProcessing ? "Procesando con MercadoPago..." : "Comprar Ahora con MercadoPago"}
            </button>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center">
                ¡Matrícula aprobada! Ya tienes acceso irrestricto a todas las clases y simuladores.
              </div>
              <Link
                href="/portal/alumno"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs text-center flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Ir al Portal del Alumno</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Transacción cifrada y protegida por MercadoPago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
