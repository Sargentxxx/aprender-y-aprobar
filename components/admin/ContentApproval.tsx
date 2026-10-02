"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, FileText, Video, Eye, Clock, ShieldAlert } from "lucide-react";

interface PendingMaterial {
  id: string;
  subjectName: string;
  teacherName: string;
  title: string;
  type: "video" | "pdf";
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

export function ContentApproval() {
  const [materials, setMaterials] = useState<PendingMaterial[]>([
    {
      id: "mat-1",
      subjectName: "Economía I - Siglo 21",
      teacherName: "Lic. Alberto Ezequiel García",
      title: "Clase 2.3: Casos Reales de Examen de Elasticidad Precio Cruzada",
      type: "video",
      submittedAt: "2026-10-01 19:40",
      status: "pending",
    },
    {
      id: "mat-2",
      subjectName: "Matemática Financiera - Siglo 21",
      teacherName: "Lic. Alberto Ezequiel García",
      title: "Resumen Módulo 2: Sistema Francés vs Alemán de Amortización.pdf",
      type: "pdf",
      submittedAt: "2026-10-01 16:15",
      status: "pending",
    },
  ]);

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: action } : m))
    );
  };

  const pendingCount = materials.filter((m) => m.status === "pending").length;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Flujo de Aprobación de Materiales & Clases Docentes
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Control Editorial
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Revisión y publicación previa obligatoria antes de que el contenido sea accesible para los alumnos
          </p>
        </div>

        <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 self-start sm:self-auto">
          {pendingCount} Pendientes de Auditoría
        </span>
      </div>

      <div className="space-y-3">
        {materials.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  item.type === "video"
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                }`}
              >
                {item.type === "video" ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              </div>

              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                  {item.subjectName} • {item.teacherName}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {item.submittedAt}
                  </span>
                  <span>Formato: {item.type.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {item.status === "pending" ? (
                <>
                  <button
                    onClick={() => handleAction(item.id, "approved")}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-600/20"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Aprobar y Publicar
                  </button>
                  <button
                    onClick={() => handleAction(item.id, "rejected")}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 font-bold text-xs border border-slate-700 hover:border-rose-800 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Rechazar
                  </button>
                </>
              ) : (
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                    item.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {item.status === "approved" ? "Publicado Oficialmente" : "Rechazado"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
