"use client";

import React, { useState } from "react";
import { CreditCard, DollarSign, Activity, CheckCircle, ShieldCheck, Lock, ArrowUpRight, Zap } from "lucide-react";

export function MercadoPagoManager() {
  const [testCardNumber, setTestCardNumber] = useState("4509 •••• •••• 8912");
  const [testExpiry, setTestExpiry] = useState("11/28");
  const [testCvc, setTestCvc] = useState("•••");
  const [testAmount, setTestAmount] = useState(38500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Motor Financiero & Pasarela de Pagos (MercadoPago)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60">
              Checkout Bricks & Webhooks
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cobros nativos en Pesos Argentinos (ARS) sin redirección externa • Tokenización segura PCI-DSS
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Webhook Endpoint</span>
            <span className="font-mono text-cyan-400 font-semibold">/api/webhooks/mercadopago</span>
          </div>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block">Facturación Acumulada (ARS)</span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">$1.458.000 ARS</span>
          <span className="text-[11px] text-emerald-300 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% vs mes anterior
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block">Suscripciones Mensuales Activas</span>
          <span className="text-2xl font-black text-cyan-400 mt-1 block">42 Alumnos</span>
          <span className="text-[11px] text-cyan-300 flex items-center gap-1 mt-1">
            <Activity className="w-3.5 h-3.5" /> Débito automático recurrente
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold block">Tasa de Aprobación en Primer Intento</span>
          <span className="text-2xl font-black text-white mt-1 block">98.2%</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
            Checkout Bricks nativo integrado
          </span>
        </div>
      </div>

      {/* Interactive Checkout Bricks Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">
              Demostración de Checkout Brick Nativo
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">React Component</span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            El alumno permanece en el portal sin salir a páginas externas. La tarjeta se tokeniza con MercadoPago SDK en el navegador.
          </p>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                Número de Tarjeta (Tokenizado)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={testCardNumber}
                  onChange={(e) => setTestCardNumber(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
                <CreditCard className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Vencimiento</label>
                <input
                  type="text"
                  value={testExpiry}
                  onChange={(e) => setTestExpiry(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Código de Seguridad</label>
                <input
                  type="text"
                  value={testCvc}
                  onChange={(e) => setTestCvc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Total a Pagar</span>
                <span className="text-lg font-black text-emerald-400">
                  ${testAmount.toLocaleString("es-AR")} ARS
                </span>
              </div>

              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs hover:from-emerald-400 hover:to-teal-500 shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                {isProcessing ? "Procesando Token..." : "Pagar y Matricularse"}
              </button>
            </div>

            {paymentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="w-4 h-4" />
                ¡Pago aprobado! Webhook emitido a Next.js (HTTP 200 OK) y alumno habilitado en el acto.
              </div>
            )}
          </div>
        </div>

        {/* Webhook & Security Architecture Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Políticas de Seguridad Transaccional</span>
            </div>
            <ul className="space-y-2 text-slate-300 text-[11px] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Firma HMAC (x-signature):</strong> Cada webhook es autenticado criptográficamente antes de procesar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Idempotencia Doble:</strong> Previene cobros duplicados y verifica el estado real vía API REST de MercadoPago.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Aprovisionamiento Bi-Direccional:</strong> La matrícula se activa en Firestore sin demora humana.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
