"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { SISDatabase } from "@/components/admin/SISDatabase";
import { BlueprintCourses } from "@/components/admin/BlueprintCourses";
import { ContentApproval } from "@/components/admin/ContentApproval";
import { MercadoPagoManager } from "@/components/admin/MercadoPagoManager";
import { DatabaseSeederButton } from "@/components/admin/DatabaseSeederButton";
import { SocialSettingsManager } from "@/components/admin/SocialSettingsManager";
import { PortalAuthGuard } from "@/components/auth/PortalAuthGuard";
import {
  Database,
  GitBranch,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  Award,
  Crown,
  Building,
  MessageSquareShare,
} from "lucide-react";

export default function AdminPortalPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"sis" | "blueprint" | "aprobacion" | "finanzas" | "seeder" | "redes">("sis");

  const adminEmail = profile?.email || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "santillanosvaldomanuel@gmail.com";
  const adminName = profile?.displayName || "Osvaldo Manuel Santillán";

  // Mock student list for SIS
  const mockStudents = [
    {
      uid: "stu-gonzalo",
      email: "gonzalo.morales@estudiantes.21.edu.ar",
      displayName: "Gonzalo Morales",
      role: "student" as const,
      universityName: "Universidad Siglo 21",
      career: "Contador Público",
      studyStreak: 12,
      lastActiveDate: "2026-10-01",
      badges: ["Racha 10 Días", "Economía I Aprobada", "Constancia de Oro"],
      totalStudyMinutes: 980,
      createdAt: "2026-03-01T10:00:00Z",
    },
    {
      uid: "stu-valeria",
      email: "valeria.gomez@gmail.com",
      displayName: "Valeria Gómez",
      role: "student" as const,
      universityName: "Universidad Siglo 21",
      career: "Licenciatura en Administración",
      studyStreak: 18,
      lastActiveDate: "2026-10-01",
      badges: ["Racha 15 Días", "Top SpeedGrader", "Insignia de Honor"],
      totalStudyMinutes: 1420,
      createdAt: "2026-02-15T10:00:00Z",
    },
    {
      uid: "stu-facundo",
      email: "facundo.rossi@outlook.com",
      displayName: "Facundo Rossi",
      role: "student" as const,
      universityName: "UNSE",
      career: "Contador Público",
      studyStreak: 5,
      lastActiveDate: "2026-09-30",
      badges: ["Bienvenida", "Primer Parcial Superado"],
      totalStudyMinutes: 520,
      createdAt: "2026-04-10T10:00:00Z",
    },
    {
      uid: "stu-lucas",
      email: "lucas.fernandez@alumnos.edu.ar",
      displayName: "Lucas Fernández",
      role: "student" as const,
      universityName: "Universidad Blas Pascal (UBP)",
      career: "Administración de Empresas",
      studyStreak: 8,
      lastActiveDate: "2026-09-29",
      badges: ["Bienvenida"],
      totalStudyMinutes: 410,
      createdAt: "2026-05-01T10:00:00Z",
    },
    {
      uid: "stu-camila",
      email: "camila.sanchez@gmail.com",
      displayName: "Camila Sánchez",
      role: "student" as const,
      universityName: "Universidad Siglo 21",
      career: "Comercio Internacional",
      studyStreak: 21,
      lastActiveDate: "2026-10-01",
      badges: ["Racha 20 Días", "Excelencia Académica"],
      totalStudyMinutes: 1890,
      createdAt: "2026-01-20T10:00:00Z",
    },
  ];

  return (
    <PortalAuthGuard requiredRole="admin" portalName="Panel de Administración">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Super Admin Command Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20 shrink-0">
            <Crown className="w-8 h-8 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/80 uppercase">
                Panel de Administración General
              </span>
              <span className="text-xs text-amber-400 font-extrabold flex items-center gap-1">
                ● Super Admin Irrevocable
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-white mt-1">
              {adminName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Cuenta Matriz: <strong className="text-white font-mono">{adminEmail}</strong>
            </p>
          </div>
        </div>

        {/* Global System Indicators */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Universidades</span>
            <span className="text-sm font-extrabold text-cyan-300">5 Sedes Sincronizadas</span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Alumnos Totales</span>
            <span className="text-sm font-extrabold text-emerald-400">128 Alumnos SIS</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: "sis", label: "1. SIS Estudiantil (Base de Datos)", icon: Database },
          { id: "blueprint", label: "2. Cursos Modelo (Blueprint)", icon: GitBranch },
          { id: "aprobacion", label: "3. Aprobación de Materiales", icon: ShieldCheck },
          { id: "finanzas", label: "4. Facturación & MercadoPago", icon: CreditCard },
          { id: "seeder", label: "5. Sembrado Maestro Firestore", icon: RefreshCw },
          { id: "redes", label: "6. WhatsApp & Redes Sociales", icon: MessageSquareShare },
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

      {/* TAB 1: SIS DATABASE */}
      {activeTab === "sis" && (
        <SISDatabase students={mockStudents} />
      )}

      {/* TAB 2: BLUEPRINT COURSES */}
      {activeTab === "blueprint" && (
        <BlueprintCourses />
      )}

      {/* TAB 3: CONTENT APPROVAL */}
      {activeTab === "aprobacion" && (
        <ContentApproval />
      )}

      {/* TAB 4: MERCADOPAGO FINANCIAL DASHBOARD */}
      {activeTab === "finanzas" && (
        <MercadoPagoManager />
      )}

      {/* TAB 5: FIRESTORE SEEDER */}
      {activeTab === "seeder" && (
        <DatabaseSeederButton />
      )}

      {/* TAB 6: WHATSAPP & REDES SOCIALES */}
      {activeTab === "redes" && (
        <SocialSettingsManager />
      )}
    </div>
    </PortalAuthGuard>
  );
}
