"use client";

import React from "react";
import { PaymentRecord, Enrollment } from "@/lib/types";
import { CreditCard, CheckCircle, FileText, Download, Award, Shield } from "lucide-react";

interface AcademicHistoryProps {
  payments: PaymentRecord[];
  badges: string[];
}

export function AcademicHistory({ payments, badges }: AcademicHistoryProps) {
  return (
    <div className="space-y-6">
      {/* Badges / Medallas de Logro */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white tracking-wide">
            Medallas y Logros Académicos Obtenidos
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">{b}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Desbloqueado</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historial Financiero y Comprobantes MercadoPago */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Historial de Pagos & Facturación (MercadoPago ARS)
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {payments.length} transacciones registradas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="pb-3 pl-2">ID Transacción</th>
                <th className="pb-3">Materia / Concepto</th>
                <th className="pb-3">Monto (ARS)</th>
                <th className="pb-3">Método</th>
                <th className="pb-3">Fecha</th>
                <th className="pb-3">Estado</th>
                <th className="pb-3 text-right pr-2">Comprobante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 pl-2 font-mono text-cyan-400 font-medium">{p.paymentId}</td>
                  <td className="py-3.5 font-bold text-white">{p.subjectName}</td>
                  <td className="py-3.5 font-extrabold text-emerald-400">
                    ${p.amountARS.toLocaleString("es-AR")} ARS
                  </td>
                  <td className="py-3.5 text-slate-300">
                    {p.paymentMethod === "mercadopago_card"
                      ? "Tarjeta de Crédito / Débito"
                      : p.paymentMethod === "mercadopago_subscription"
                      ? "Suscripción Automática"
                      : "Transferencia CVU"}
                  </td>
                  <td className="py-3.5 text-slate-400 font-mono">
                    {p.createdAt ? p.createdAt.substring(0, 10) : "2026-09-25"}
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle className="w-3 h-3" /> Aprobado
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <button
                      onClick={() => alert(`Descargando comprobante oficial de pago #${p.paymentId}`)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors border border-slate-700"
                      title="Descargar Comprobante PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
