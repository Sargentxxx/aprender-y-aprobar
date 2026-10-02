"use client";

import React, { useState } from "react";
import { StudentSubmission } from "@/lib/types";
import { CheckCircle2, ChevronLeft, ChevronRight, FileText, Send, Sparkles, MessageSquare, Award } from "lucide-react";

interface SpeedGraderProps {
  submissions: StudentSubmission[];
  onGradeSubmitted?: (submissionId: string, grade: number, feedback: string) => void;
}

export function SpeedGrader({ submissions: initialSubmissions, onGradeSubmitted }: SpeedGraderProps) {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(initialSubmissions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gradeInput, setGradeInput] = useState<number>(8);
  const [feedbackInput, setFeedbackInput] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const currentSub = submissions[currentIndex] || null;

  if (!currentSub) {
    return (
      <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
        <FileText className="w-10 h-10 text-slate-500 mx-auto mb-2" />
        <p className="text-slate-400">No hay entregas pendientes de corrección.</p>
      </div>
    );
  }

  const handleQuickFeedback = (text: string) => {
    setFeedbackInput((prev) => (prev ? `${prev} ${text}` : text));
  };

  const handleSaveGrade = () => {
    const updated = [...submissions];
    updated[currentIndex] = {
      ...currentSub,
      grade: gradeInput,
      feedback: feedbackInput || "Trabajo corregido satisfactoriamente.",
      status: "graded",
      gradedAt: new Date().toISOString(),
      gradedBy: "Lic. Alberto Ezequiel García",
    };
    setSubmissions(updated);
    setIsSaved(true);

    if (onGradeSubmitted) {
      onGradeSubmitted(currentSub.id, gradeInput, feedbackInput);
    }

    setTimeout(() => setIsSaved(false), 2500);
  };

  const gradedCount = submissions.filter((s) => s.status === "graded").length;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Top SpeedGrader Header */}
      <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">SpeedGrader Unificado</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60">
                Canvas Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluación ágil sin descargas externas • {currentSub.subjectName}
            </p>
          </div>
        </div>

        {/* Student Navigation Bar */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs text-slate-400 font-semibold">
            Alumno {currentIndex + 1} de {submissions.length} ({gradedCount} corregidos)
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                setCurrentIndex((prev) => prev - 1);
                setFeedbackInput(submissions[currentIndex - 1]?.feedback || "");
                setGradeInput(submissions[currentIndex - 1]?.grade || 8);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentIndex === submissions.length - 1}
              onClick={() => {
                setCurrentIndex((prev) => prev + 1);
                setFeedbackInput(submissions[currentIndex + 1]?.feedback || "");
                setGradeInput(submissions[currentIndex + 1]?.grade || 8);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace (Split View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Side: Document Viewer & Submission Metadata (7 cols) */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Estudiante Evaluado
                </span>
                <h4 className="text-lg font-bold text-white">{currentSub.studentName}</h4>
                <span className="text-xs text-slate-400 font-mono">{currentSub.studentEmail}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-semibold block">FECHA DE ENTREGA</span>
                <span className="text-xs font-mono text-slate-300">
                  {currentSub.submittedAt ? currentSub.submittedAt.substring(0, 16).replace("T", " ") : "2026-09-30 16:20"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-300 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">{currentSub.assignmentTitle}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{currentSub.fileSize}</span>
            </div>

            {/* Embedded Interactive PDF Viewer Simulation */}
            <div className="w-full h-[400px] rounded-xl bg-slate-950 border border-slate-800/90 p-6 flex flex-col justify-between overflow-y-auto font-serif relative">
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="border-b border-slate-800 pb-3 text-center">
                  <h5 className="font-sans font-black text-sm text-white">UNIVERSIDAD SIGLO 21 • ECONOMÍA I</h5>
                  <p className="font-sans text-[11px] text-slate-400">Trabajo Práctico Obligatorio Nº 2 — Cátedra Virtual</p>
                </div>

                <p className="font-bold text-slate-200">
                  Alumno: {currentSub.studentName} (Legajo: S21-99841)
                </p>

                <p>
                  <strong>Ejercicio 1:</strong> Calcule la elasticidad precio de la demanda considerando que el precio inicial P1 = $100 y la cantidad inicial Q1 = 500 unidades, variando a P2 = $120 y Q2 = 350 unidades.
                </p>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300">
                  Ep = [(350 - 500) / ((350 + 500) / 2)] / [(120 - 100) / ((120 + 100) / 2)]<br />
                  Ep = [-150 / 425] / [20 / 110] = -0.3529 / 0.1818 = -1.94<br />
                  Conclusión: |Ep| = 1.94 &gt; 1 =&gt; Demanda Elástica.
                </div>

                <p>
                  <strong>Ejercicio 2:</strong> Analice el impacto en los ingresos totales del productor. Al ser la demanda elástica, el incremento del precio provocará una disminución en los ingresos brutos totales debido a que la caída porcentual en las cantidades vendidas (30%) supera el porcentaje del aumento del precio (20%).
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-sans flex items-center justify-between">
                <span>Página 1 de 2 • Vista preliminar segura sin descarga local</span>
                <span className="text-cyan-400 font-bold">Documento Verificado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: SpeedGrader Scoring & Feedback Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-slate-950/40 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Asignar Calificación (Escala 1 a 10)
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={gradeInput}
                  onChange={(e) => setGradeInput(Number(e.target.value))}
                  className="w-24 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-2xl font-black text-white text-center focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
                <div>
                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-lg border ${
                      gradeInput >= 7
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : gradeInput >= 4
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                    }`}
                  >
                    {gradeInput >= 7 ? "APROBADO (PROMOCIÓN)" : gradeInput >= 4 ? "REGULAR" : "REPROBADO"}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1">Exigencia mínima: 4/10</span>
                </div>
              </div>
            </div>

            {/* Quick Feedback Tags */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-2">Comentarios Rápidos:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Excelente resolución",
                  "Gráficos impecables",
                  "Faltó justificar teóricamente",
                  "Revisar signos de elasticidad",
                  "Muy buen trabajo",
                ].map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickFeedback(tag)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium border border-slate-700/80 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Rich Feedback Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  Devolución Pedagógica al Alumno:
                </span>
              </div>
              <textarea
                rows={5}
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Escribe comentarios formativos detallados para el estudiante..."
                className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 leading-relaxed"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800">
            {isSaved && (
              <div className="mb-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                ¡Calificación guardada y notificada al estudiante!
              </div>
            )}
            <button
              onClick={handleSaveGrade}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-extrabold text-xs hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              Guardar Calificación & Enviar Devolución
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
