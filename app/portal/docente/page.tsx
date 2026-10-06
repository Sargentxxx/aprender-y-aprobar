"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { SpeedGrader } from "@/components/teacher/SpeedGrader";
import { AttendanceTracker } from "@/components/teacher/AttendanceTracker";
import { AIAssistant } from "@/components/teacher/AIAssistant";
import { PortalAuthGuard } from "@/components/auth/PortalAuthGuard";
import {
  MOCK_STUDENT_SUBMISSIONS,
  MOCK_ATTENDANCE,
  MOCK_SUBJECTS,
} from "@/lib/mock-data";
import {
  Sparkles,
  Users,
  CheckSquare,
  BookOpen,
  PlusCircle,
  Video,
  FileText,
  Clock,
  Send,
} from "lucide-react";

export default function TeacherPortalPage() {
  const { profile, firebaseUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"speedgrader" | "asistencia" | "ia" | "materias">("speedgrader");

  // New Lesson form state
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState(40);
  const [newLessonVideo, setNewLessonVideo] = useState("");
  const [lessonAddedSuccess, setLessonAddedSuccess] = useState(false);

  const teacherName = profile?.displayName || firebaseUser?.displayName || "Profesor Titular";
  const teacherEmail = profile?.email || firebaseUser?.email || "docente@aprenderyaprobar.com";

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle || !newLessonVideo) return;

    setLessonAddedSuccess(true);
    setNewLessonTitle("");
    setNewLessonVideo("");
    setTimeout(() => setLessonAddedSuccess(false), 3000);
  };

  return (
    <PortalAuthGuard portalName="Portal del Docente">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Teacher Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-500/20 shrink-0">
            {teacherName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/80 uppercase">
                Portal del Docente
              </span>
              <span className="text-xs text-slate-400 font-semibold">• Cátedra de Ciencias Económicas</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white mt-1">
              Profesor: {teacherName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Email Institucional: <strong className="text-white font-mono">{teacherEmail}</strong>
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Materia a Cargo</span>
            <span className="text-sm font-extrabold text-indigo-300">Economía I (Siglo 21)</span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Alumnos Activos</span>
            <span className="text-sm font-extrabold text-emerald-400">128 Inscriptos</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: "speedgrader", label: "1. SpeedGrader (Calificación Ágil)", icon: CheckSquare },
          { id: "asistencia", label: "2. Control de Asistencia", icon: Users },
          { id: "ia", label: "3. Copiloto IA Generativo", icon: Sparkles },
          { id: "materias", label: "4. Cargar Clases & Material", icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SPEEDGRADER */}
      {activeTab === "speedgrader" && (
        <SpeedGrader submissions={MOCK_STUDENT_SUBMISSIONS} />
      )}

      {/* TAB 2: ATTENDANCE */}
      {activeTab === "asistencia" && (
        <AttendanceTracker initialAttendance={MOCK_ATTENDANCE} />
      )}

      {/* TAB 3: AI ASSISTANT */}
      {activeTab === "ia" && (
        <AIAssistant />
      )}

      {/* TAB 4: COURSE & LESSON AUTHORING */}
      {activeTab === "materias" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white">Cargar Nueva Clase o Material Didáctico</h3>
            <p className="text-xs text-slate-400">
              El contenido cargado pasará automáticamente al flujo de revisión y aprobación del Panel de Administración antes de publicarse.
            </p>
          </div>

          <form onSubmit={handleAddLesson} className="space-y-4 max-w-2xl">
            {lessonAddedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                ✓ ¡Clase cargada exitosamente! Enviada al Panel de Aprobación de Administración.
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Materia Destino</label>
              <select className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white">
                <option>Economía I (Universidad Siglo 21)</option>
                <option>Matemática Financiera (Universidad Siglo 21)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Título de la Clase</label>
              <input
                type="text"
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                placeholder="Ej: Clase 3.3: Monopolio Natural y Regulación Tarifaria"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Duración (minutos)</label>
                <input
                  type="number"
                  value={newLessonDuration}
                  onChange={(e) => setNewLessonDuration(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">URL del Video (HLS / YouTube / Stream)</label>
                <input
                  type="text"
                  value={newLessonVideo}
                  onChange={(e) => setNewLessonVideo(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Subir Clase para Revisión Editorial
            </button>
          </form>
        </div>
      )}
    </div>
    </PortalAuthGuard>
  );
}
