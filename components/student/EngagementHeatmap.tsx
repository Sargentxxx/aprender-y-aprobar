"use client";

import React, { useState } from "react";
import { DailyStudyLog } from "@/lib/types";
import { Flame, Trophy, Clock, Calendar, Sparkles } from "lucide-react";

interface EngagementHeatmapProps {
  logs: DailyStudyLog[];
  studyStreak: number;
  totalMinutes: number;
}

export function EngagementHeatmap({ logs, studyStreak, totalMinutes }: EngagementHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<DailyStudyLog | null>(null);

  // Group logs into 7 rows (days of week) and multiple columns (weeks)
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-cyan-950 border border-cyan-800/60 hover:border-cyan-400";
      case 2:
        return "bg-cyan-800/80 border border-cyan-600/70 hover:border-cyan-300";
      case 3:
        return "bg-cyan-600 border border-cyan-400/80 hover:border-cyan-200";
      case 4:
        return "bg-cyan-400 border border-cyan-200 shadow-[0_0_8px_rgba(0,199,253,0.6)]";
      default:
        return "bg-slate-900/90 border border-slate-800/80 hover:border-slate-600";
    }
  };

  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Mapa de Calor de Compromiso Académico
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
              Active Recall Tracking
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Frecuencia y consistencia de estudio diario (Últimos 90 días). Basado en ciencia cognitiva de retención.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-300">
              Racha Actual: <span className="text-white font-extrabold">{studyStreak} días</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300">
              Tiempo Total: <span className="text-white font-extrabold">{totalHours}h</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300">
              Tasa de Retención: <span className="text-white font-extrabold">91.4%</span>
            </span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px]">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5">
            {logs.map((day, idx) => (
              <div
                key={day.date || idx}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 cursor-pointer ${getColorClass(
                  day.level
                )}`}
                title={`${day.date}: ${day.minutes} min (${day.activitiesCount} repasos)`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legend & Hover Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          {hoveredDay ? (
            <span className="text-cyan-300 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <strong>{hoveredDay.date}:</strong> {hoveredDay.minutes} minutos dedicados en {hoveredDay.activitiesCount} módulos.
            </span>
          ) : (
            <span>Pasa el cursor sobre un bloque para ver el detalle de estudio diario.</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px]">Menos</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-slate-900 border border-slate-800" />
            <div className="w-3 h-3 rounded-sm bg-cyan-950 border border-cyan-800" />
            <div className="w-3 h-3 rounded-sm bg-cyan-800 border border-cyan-600" />
            <div className="w-3 h-3 rounded-sm bg-cyan-600 border border-cyan-400" />
            <div className="w-3 h-3 rounded-sm bg-cyan-400 border border-cyan-200" />
          </div>
          <span className="text-[11px]">Más de 2 horas</span>
        </div>
      </div>
    </div>
  );
}
