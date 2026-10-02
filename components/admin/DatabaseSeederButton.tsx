"use client";

import React, { useState } from "react";
import { Database, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { seedFirestoreDatabase } from "@/lib/seeder";

export function DatabaseSeederButton() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setLogs([]);
    setDone(false);

    try {
      await seedFirestoreDatabase((msg) => {
        setLogs((prev) => [...prev, msg]);
      });
      setDone(true);
    } catch (err: any) {
      console.error(err);
      setLogs((prev) => [...prev, `❌ Error: ${err?.message || "Fallo en la conexión"}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Sembrado Maestro de Datos (Firestore Seeder)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Puebla universidades, materias de Siglo 21 (Economía I), flashcards, exámenes simulados, SpeedGrader y alumnos
          </p>
        </div>

        <button
          onClick={handleSeed}
          disabled={loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Sembrando Base de Datos..." : "Sembrar Base de Datos Ahora"}
        </button>
      </div>

      {logs.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 max-h-48 overflow-y-auto">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={
                log.startsWith("✓") || log.startsWith("✅")
                  ? "text-emerald-400 font-semibold"
                  : log.startsWith("❌")
                  ? "text-rose-400 font-bold"
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
