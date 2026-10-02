"use client";

import React, { useState } from "react";
import { AttendanceRecord, AttendanceEntry } from "@/lib/types";
import { Check, X, Users, AlertTriangle, MessageCircle, Mail, Calendar, CheckCheck } from "lucide-react";

interface AttendanceTrackerProps {
  initialAttendance: AttendanceRecord;
}

export function AttendanceTracker({ initialAttendance }: AttendanceTrackerProps) {
  const [entries, setEntries] = useState<AttendanceEntry[]>(initialAttendance.entries);
  const [date, setDate] = useState<string>(initialAttendance.date);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const toggleStudent = (studentId: string) => {
    setEntries((prev) =>
      prev.map((item) =>
        item.studentId === studentId ? { ...item, present: !item.present } : item
      )
    );
  };

  const markAll = (status: boolean) => {
    setEntries((prev) => prev.map((item) => ({ ...item, present: status })));
  };

  const totalPresent = entries.filter((e) => e.present).length;
  const attendancePercentage = Math.round((totalPresent / entries.length) * 100);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Control de Asistencia Digital en 1 Clic
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60">
              Tecveq Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {initialAttendance.subjectName} • Registro de presentismo con detección de riesgo de deserción
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fecha: <strong>{date}</strong></span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${
              attendancePercentage >= 80
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-300 border-amber-500/30"
            }`}
          >
            {totalPresent}/{entries.length} Presentes ({attendancePercentage}%)
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => markAll(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Marcar Todos Presentes
          </button>
          <button
            onClick={() => markAll(false)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Desmarcar Todos
          </button>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors"
        >
          Guardar Asistencia
        </button>
      </div>

      {savedSuccess && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCheck className="w-4 h-4" />
          ¡Asistencia sincronizada correctamente con el historial del estudiante!
        </div>
      )}

      {/* Attendance List */}
      <div className="divide-y divide-slate-800/80">
        {entries.map((student) => {
          const isAbsent = !student.present;
          return (
            <div
              key={student.studentId}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleStudent(student.studentId)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                    student.present
                      ? "bg-emerald-500 text-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                      : "bg-rose-500/20 text-rose-400 border border-rose-500/50"
                  }`}
                >
                  {student.present ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-4 h-4 stroke-[3]" />}
                </button>

                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white">{student.studentName}</h5>
                  <span className="text-[11px] text-slate-400 font-mono">{student.studentEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {isAbsent && (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                      <AlertTriangle className="w-3 h-3" /> Ausente
                    </span>
                    <button
                      onClick={() => alert(`Enviando alerta preventiva por WhatsApp a ${student.studentName}`)}
                      className="p-1 rounded-md bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60"
                      title="Notificar por WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => alert(`Enviando recordatorio por Email a ${student.studentEmail}`)}
                      className="p-1 rounded-md bg-blue-950 hover:bg-blue-900 text-blue-400 border border-blue-800/60"
                      title="Notificar por Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <span
                  className={`text-xs font-bold ${
                    student.present ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {student.present ? "Presente" : "Falta"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
