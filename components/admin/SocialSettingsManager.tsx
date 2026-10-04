"use client";

import React, { useState, useEffect } from "react";
import { useSettings, SocialLinks, WhatsAppConfig } from "@/lib/settings-context";
import { SocialIcons } from "@/components/shared/SocialIcons";
import {
  MessageSquare,
  Share2,
  Save,
  RotateCcw,
  CheckCircle,
  ExternalLink,
  Phone,
  Sparkles,
  Info,
  Sliders,
} from "lucide-react";

export function SocialSettingsManager() {
  const { settings, updateSettings, resetSettings, cleanPhoneNumber } = useSettings();

  const [whatsappForm, setWhatsappForm] = useState<WhatsAppConfig>(settings.whatsapp);
  const [socialForm, setSocialForm] = useState<SocialLinks>(settings.social);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if context updates
  useEffect(() => {
    setWhatsappForm(settings.whatsapp);
    setSocialForm(settings.social);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateSettings({
        whatsapp: whatsappForm,
        social: socialForm,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error("Error saving settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas restablecer los valores de WhatsApp y redes sociales a sus valores predeterminados?"
      )
    ) {
      setIsSaving(true);
      try {
        await resetSettings();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const previewCleanNumber = cleanPhoneNumber(whatsappForm.phoneNumber);
  const previewWhatsAppUrl = previewCleanNumber
    ? `https://wa.me/${previewCleanNumber}?text=${encodeURIComponent(whatsappForm.defaultMessage || "")}`
    : "#";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MessageSquare className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Canales de Comunicación
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
            Configuración de WhatsApp & Redes Sociales
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Personalizá el número de teléfono del botón flotante de WhatsApp, el mensaje de bienvenida y las URLs oficiales de las redes sociales del instituto.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs font-bold animate-in fade-in slide-in-from-top-1">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>¡Configuración guardada exitosamente!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* SECTION 1: BOTON FLOTANTE DE WHATSAPP */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Botón Flotante de WhatsApp</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-700/50">
                    Soporte en Vivo
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Visible en toda la web en la esquina inferior derecha.
                </p>
              </div>
            </div>

            {/* Toggle Habilitado / Deshabilitado */}
            <label className="flex items-center gap-3 cursor-pointer self-start sm:self-auto bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300">
                {whatsappForm.buttonEnabled ? "Botón Activo" : "Botón Pausado"}
              </span>
              <input
                type="checkbox"
                checked={whatsappForm.buttonEnabled}
                onChange={(e) =>
                  setWhatsappForm((prev) => ({ ...prev, buttonEnabled: e.target.checked }))
                }
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Número de Teléfono */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Número de Teléfono (con código de país)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={whatsappForm.phoneNumber}
                  onChange={(e) =>
                    setWhatsappForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
                  }
                  placeholder="+54 9 385 584-9201"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl px-4 py-3 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Los guiones y espacios se limpian automáticamente. Número resultante para API:{" "}
                  <strong className="text-emerald-400 font-mono">
                    {previewCleanNumber || "Ninguno ingresado"}
                  </strong>
                </span>
              </div>
            </div>

            {/* Input Tooltip de Bienvenida */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Texto del Globito / Tooltip Emergente
              </label>
              <input
                type="text"
                value={whatsappForm.tooltipText}
                onChange={(e) =>
                  setWhatsappForm((prev) => ({ ...prev, tooltipText: e.target.value }))
                }
                placeholder="¿Dudas con tu materia? ¡Escribinos por WhatsApp!"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <span className="text-[11px] text-slate-500 block">
                Aparece sobre el botón para invitar al alumno a consultar dudas.
              </span>
            </div>

            {/* Mensaje Predeterminado */}
            <div className="lg:col-span-2 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Mensaje Predeterminado al Iniciar la Conversación
              </label>
              <textarea
                rows={3}
                value={whatsappForm.defaultMessage}
                onChange={(e) =>
                  setWhatsappForm((prev) => ({ ...prev, defaultMessage: e.target.value }))
                }
                placeholder="¡Hola! Quisiera información sobre las clases universitarias..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
              />
              <span className="text-[11px] text-slate-500 block">
                Este texto se carga automáticamente en el WhatsApp del estudiante al hacer clic.
              </span>
            </div>
          </div>

          {/* Test Action & Live Simulator */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-slate-300">
                Probá el funcionamiento del enlace antes de guardar:
              </span>
            </div>

            <a
              href={previewWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
            >
              <span>Probar Enlace en WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* SECTION 2: REDES SOCIALES OFICIALES */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Redes Sociales Oficiales</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                  Iconos Oficiales
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Se muestran en el footer y secciones de comunidad de la plataforma.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Instagram */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 inline-block"></span>
                <span>Instagram URL</span>
              </label>
              <input
                type="url"
                value={socialForm.instagram}
                onChange={(e) =>
                  setSocialForm((prev) => ({ ...prev, instagram: e.target.value }))
                }
                placeholder="https://instagram.com/aprenderyaprobar"
                className="w-full bg-slate-900 border border-slate-800 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* YouTube */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <span className="w-3 h-3 rounded-full bg-[#FF0000] inline-block"></span>
                <span>YouTube URL</span>
              </label>
              <input
                type="url"
                value={socialForm.youtube}
                onChange={(e) =>
                  setSocialForm((prev) => ({ ...prev, youtube: e.target.value }))
                }
                placeholder="https://youtube.com/@aprenderyaprobar"
                className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* TikTok */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span>
                <span>TikTok URL</span>
              </label>
              <input
                type="url"
                value={socialForm.tiktok}
                onChange={(e) =>
                  setSocialForm((prev) => ({ ...prev, tiktok: e.target.value }))
                }
                placeholder="https://tiktok.com/@aprenderyaprobar"
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <span className="w-3 h-3 rounded-full bg-[#0A66C2] inline-block"></span>
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                value={socialForm.linkedin}
                onChange={(e) =>
                  setSocialForm((prev) => ({ ...prev, linkedin: e.target.value }))
                }
                placeholder="https://linkedin.com/company/aprender-y-aprobar"
                className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* Facebook */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <span className="w-3 h-3 rounded-full bg-[#1877F2] inline-block"></span>
                <span>Facebook URL</span>
              </label>
              <input
                type="url"
                value={socialForm.facebook}
                onChange={(e) =>
                  setSocialForm((prev) => ({ ...prev, facebook: e.target.value }))
                }
                placeholder="https://facebook.com/aprenderyaprobar"
                className="w-full bg-slate-900 border border-slate-800 focus:border-blue-600 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Social Icons Live Preview */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Vista previa interactiva de los iconos configurados:
            </span>
            <SocialIcons size="md" showLabels={true} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold transition-all disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restablecer Valores Predeterminados</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? (
              <span>Guardando configuración...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar Configuración en Sistema</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
