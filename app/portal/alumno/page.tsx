"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { EngagementHeatmap } from "@/components/student/EngagementHeatmap";
import { ActiveRecallCards } from "@/components/student/ActiveRecallCards";
import { ExamSimulator } from "@/components/student/ExamSimulator";
import { SecureVideoPlayer } from "@/components/student/SecureVideoPlayer";
import { AcademicHistory } from "@/components/student/AcademicHistory";
import {
  MOCK_SUBJECTS,
  MOCK_FLASHCARDS,
  MOCK_EXAM_SIMULATION,
  MOCK_PAYMENTS,
  generateStudyLogs,
} from "@/lib/mock-data";
import {
  Video,
  Sparkles,
  Award,
  FileText,
  Clock,
  Download,
  BookOpen,
  CreditCard,
  User,
  Flame,
  CheckCircle,
} from "lucide-react";

export default function StudentPortalPage() {
  const { profile, firebaseUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"clases" | "flashcards" | "simulador" | "apuntes" | "historial">("clases");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("les-1-1");

  const eco1 = MOCK_SUBJECTS[0];
  const allLessons = eco1.modules.flatMap((m) => m.lessons);
  const activeLesson = allLessons.find((l) => l.id === selectedLessonId) || allLessons[0];

  const studyLogs = generateStudyLogs();

  const userEmail = profile?.email || firebaseUser?.email || "alberto.ezequiel.garcia@gmail.com";
  const userName = profile?.displayName || "Alberto Ezequiel García";
  const userId = profile?.uid || firebaseUser?.uid || "stu-alpha-9981";
  const studyStreak = profile?.studyStreak || 14;
  const badges = profile?.badges || ["Bienvenida", "Economía I Aprobada", "Racha 10 Días", "Top SpeedGrader"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Student Welcome Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20 shrink-0">
            {userName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 uppercase">
                Portal del Estudiante
              </span>
              <span className="text-xs text-slate-400 font-semibold">• {profile?.universityName || "Universidad Siglo 21"}</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white mt-1">
              Hola, {userName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Carrera: <strong className="text-white">{profile?.career || "Lic. en Administración / Contador Público"}</strong>
            </p>
          </div>
        </div>

        {/* Quick Student Badges & Progress */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Racha Activa</span>
              <span className="text-sm font-extrabold text-amber-300">{studyStreak} Días</span>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Insignias</span>
              <span className="text-sm font-extrabold text-white">{badges.length} Desbloqueadas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Heatmap (GitHub-Style Calendar) */}
      <EngagementHeatmap
        logs={studyLogs}
        studyStreak={studyStreak}
        totalMinutes={profile?.totalStudyMinutes || 1340}
      />

      {/* Portal Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: "clases", label: "1. Clases & Video Seguro", icon: Video },
          { id: "flashcards", label: "2. Active Recall Flashcards", icon: Sparkles },
          { id: "simulador", label: "3. Simulador de Examen", icon: Award },
          { id: "apuntes", label: "4. Materiales & Apuntes", icon: FileText },
          { id: "historial", label: "5. Historial & Facturación", icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                isActive
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CLASES & SECURE VIDEO */}
      {activeTab === "clases" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Video Player Column (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <SecureVideoPlayer
              videoUrl={activeLesson.videoUrl}
              lessonTitle={activeLesson.title}
              userEmail={userEmail}
              userName={userName}
              userId={userId}
            />

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <h3 className="text-lg font-bold text-white">{activeLesson.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{activeLesson.description}</p>
              <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {activeLesson.durationMinutes} minutos de cátedra
                </span>
                <span>• Materia: {eco1.name} (Siglo 21)</span>
              </div>
            </div>
          </div>

          {/* Syllabus / Module List Column (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">Programa de Clases</h4>
              <p className="text-[11px] text-slate-400">Economía I • {eco1.modules.length} Módulos</p>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {eco1.modules.map((m) => (
                <div key={m.id} className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 block px-1">
                    {m.title}
                  </span>
                  {m.lessons.map((lesson) => {
                    const isSelected = lesson.id === activeLesson.id;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isSelected
                            ? "bg-cyan-500/15 border-cyan-400 text-white font-bold"
                            : "bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Video className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-cyan-400" : "text-slate-500"}`} />
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                          {lesson.durationMinutes}m
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE RECALL FLASHCARDS */}
      {activeTab === "flashcards" && (
        <ActiveRecallCards cards={MOCK_FLASHCARDS} subjectName="Economía I (Universidad Siglo 21)" />
      )}

      {/* TAB 3: EXAM SIMULATOR */}
      {activeTab === "simulador" && (
        <ExamSimulator simulation={MOCK_EXAM_SIMULATION} />
      )}

      {/* TAB 4: APUNTES & MATERIALES */}
      {activeTab === "apuntes" && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Biblioteca de Materiales de Estudio</h3>
              <p className="text-xs text-slate-400">Apuntes oficiales, resúmenes de cátedra y exámenes parciales de años anteriores</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {[
              { title: "Resumen Módulo 1 y 2 - Economía I Siglo 21.pdf", size: "3.4 MB", pages: "48 páginas" },
              { title: "Guía de Ejercicios Prácticos Resueltos de Elasticidad.pdf", size: "2.1 MB", pages: "24 páginas" },
              { title: "Modelos de Primer Parcial Resueltos 2024-2026.pdf", size: "4.8 MB", pages: "62 páginas" },
              { title: "Fórmulas y Gráficos Clave para el Final de Economía.pdf", size: "1.2 MB", pages: "16 páginas" },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all"
              >
                <div>
                  <FileText className="w-8 h-8 text-cyan-400 mb-2" />
                  <h4 className="text-xs font-bold text-white mb-1 leading-snug">{doc.title}</h4>
                  <span className="text-[11px] text-slate-400 block font-mono">{doc.pages} • {doc.size}</span>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-semibold">Descarga Autorizada</span>
                  <button
                    onClick={() => alert(`Descargando ${doc.title}`)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: HISTORIAL & FACTURACIÓN */}
      {activeTab === "historial" && (
        <AcademicHistory payments={MOCK_PAYMENTS} badges={badges} />
      )}
    </div>
  );
}
