"use client";

import React, { useState } from "react";
import { UserProfile } from "@/lib/types";
import { Database, Search, UserCheck, Shield, Award, Mail, BookOpen, Clock, Flame } from "lucide-react";

interface SISDatabaseProps {
  students: UserProfile[];
}

export function SISDatabase({ students }: SISDatabaseProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<UserProfile | null>(null);

  const filtered = students.filter(
    (s) =>
      s.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.career && s.career.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Sistema de Información Estudiantil Consolidado (SIS)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60">
              Directorio Centralizado
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ficha unificada de legajos universitarios, historial académico, asistencias y cobros
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por alumno, email o carrera..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              <th className="pb-3 pl-2">Estudiante</th>
              <th className="pb-3">Universidad / Carrera</th>
              <th className="pb-3">Racha de Estudio</th>
              <th className="pb-3">Horas en Plataforma</th>
              <th className="pb-3">Rol / Estado</th>
              <th className="pb-3 text-right pr-2">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.map((student) => (
              <tr key={student.uid} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 pl-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center font-bold text-white text-xs shrink-0">
                      {student.displayName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-white block">{student.displayName}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{student.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5">
                  <span className="font-semibold text-slate-200 block">
                    {student.universityName || "Universidad Siglo 21"}
                  </span>
                  <span className="text-[11px] text-slate-400">{student.career || "Ciencias Económicas"}</span>
                </td>
                <td className="py-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold text-[11px]">
                    <Flame className="w-3 h-3 text-amber-400" />
                    {student.studyStreak || 1} días
                  </div>
                </td>
                <td className="py-3.5 font-mono text-cyan-400 font-bold">
                  {((student.totalStudyMinutes || 60) / 60).toFixed(1)}h
                </td>
                <td className="py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      student.role === "admin"
                        ? "bg-purple-500/10 text-purple-300 border-purple-500/40"
                        : student.role === "teacher"
                        ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/40"
                        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
                    }`}
                  >
                    {student.role === "admin"
                      ? "Super Admin"
                      : student.role === "teacher"
                      ? "Profesor Titular"
                      : "Alumno Regular"}
                  </span>
                </td>
                <td className="py-3.5 text-right pr-2">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 font-bold text-xs border border-slate-700 transition-colors"
                  >
                    Ver Ficha
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-slate-950 text-lg">
                  {selectedStudent.displayName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white">{selectedStudent.displayName}</h4>
                  <span className="text-xs text-slate-400 font-mono">{selectedStudent.email}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Institución</span>
                  <span className="font-bold text-white">{selectedStudent.universityName}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Carrera</span>
                  <span className="font-bold text-white">{selectedStudent.career}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Insignias Ganadas</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.badges?.map((b, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-semibold"
                    >
                      ★ {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Racha de Estudio</span>
                  <span className="font-extrabold text-amber-400 text-sm">{selectedStudent.studyStreak} Días Consecutivos</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Estado Arancelario</span>
                  <span className="font-extrabold text-emerald-400 text-sm">Al Día (MercadoPago)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
