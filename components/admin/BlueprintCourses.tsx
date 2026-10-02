"use client";

import React, { useState } from "react";
import { GitBranch, RefreshCw, CheckCircle2, Building, ShieldCheck, ArrowRight } from "lucide-react";

interface BlueprintCoursesProps {
  onSyncComplete?: (campuses: string[]) => void;
}

export function BlueprintCourses({ onSyncComplete }: BlueprintCoursesProps) {
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([
    "Universidad Siglo 21",
    "Universidad Nacional de Santiago del Estero (UNSE)",
    "Universidad Católica de Santiago del Estero (UCSE)",
    "Universidad Blas Pascal (UBP)",
  ]);
  const [syncing, setSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);

  const toggleCampus = (campus: string) => {
    setSelectedCampuses((prev) =>
      prev.includes(campus) ? prev.filter((c) => c !== campus) : [...prev, campus]
    );
  };

  const handlePropagate = () => {
    setSyncing(true);
    setSyncLogs([]);

    const steps = [
      "Iniciando empaquetado del temario troncal 'Economía I (Blueprint Master)'...",
      "Validando estructura de 4 módulos y 7 clases multimedia...",
      "Sincronizando banco de 24 Flashcards y 3 Simuladores de Parcial...",
      ...selectedCampuses.map((c) => `✓ Sincronizado exitosamente con sede: ${c}`),
      "¡Propagación curricular completada al 100%! Todos los estudiantes ven ahora el temario unificado.",
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSyncLogs((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setSyncing(false);
          if (onSyncComplete) onSyncComplete(selectedCampuses);
        }
      }, (idx + 1) * 600);
    });
  };

  const availableCampuses = [
    "Universidad Siglo 21",
    "Universidad Nacional de Santiago del Estero (UNSE)",
    "Universidad Católica de Santiago del Estero (UCSE)",
    "Universidad Blas Pascal (UBP)",
    "Universidad del Norte Santo Tomás de Aquino (UNSTA)",
    "Universidad Nacional de Quilmes (UNQ)",
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Sincronización Curricular • Cursos Modelo (Blueprint)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60">
              Instructure Blueprint
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Actualiza el programa troncal y propaga instantáneamente los cambios a todas las universidades vinculadas
          </p>
        </div>

        <button
          onClick={handlePropagate}
          disabled={syncing || selectedCampuses.length === 0}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-extrabold text-xs hover:from-indigo-400 hover:to-purple-500 shadow-md shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Propagando a Sedes..." : `Propagar a ${selectedCampuses.length} Sedes Seleccionadas`}
        </button>
      </div>

      {/* Blueprint Master Selector Card */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider block">
            Materia Troncal Activa
          </span>
          <h4 className="text-sm font-bold text-white">
            Economía I (ECO-101) — Cátedra Matriz Aprender & Aprobar
          </h4>
          <p className="text-xs text-slate-400">
            Última modificación: 01 de Octubre, 2026 • 4 Módulos • 24 Flashcards • 1 Simulador
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold self-start sm:self-auto">
          ● Matriz Lista
        </span>
      </div>

      {/* Target Campuses Checklist */}
      <div className="mb-6">
        <label className="text-xs font-bold text-slate-300 block mb-2.5">
          Selecciona las universidades donde se replicará el temario:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {availableCampuses.map((campus) => {
            const isChecked = selectedCampuses.includes(campus);
            return (
              <div
                key={campus}
                onClick={() => toggleCampus(campus)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isChecked
                    ? "bg-indigo-950/30 border-indigo-700/60 text-white"
                    : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building className={`w-4 h-4 ${isChecked ? "text-indigo-400" : "text-slate-500"}`} />
                  <span className="text-xs font-semibold">{campus}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border ${
                    isChecked
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  {isChecked ? "✓" : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Sync Console Logs */}
      {syncLogs.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1.5 animate-fadeIn">
          <div className="flex items-center gap-2 text-indigo-400 font-bold pb-1 border-b border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Terminal de Sincronización Curricular:</span>
          </div>
          {syncLogs.map((log, i) => (
            <div
              key={i}
              className={
                log.startsWith("✓")
                  ? "text-emerald-400 font-semibold"
                  : log.startsWith("¡")
                  ? "text-cyan-300 font-bold"
                  : "text-slate-400"
              }
            >
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
