"use client";

import React, { useState } from "react";
import { Sparkles, Bot, FileText, CheckCircle2, ArrowRight, Copy, PlusCircle } from "lucide-react";

export function AIAssistant() {
  const [topicInput, setTopicInput] = useState<string>(
    "Módulo 2: Fuerzas del Mercado, Elasticidad Precio de la Demanda y Efecto Ingreso/Sustitución en Universidad Siglo 21."
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedOutput, setGeneratedOutput] = useState<{
    questions: Array<{ question: string; options: string[]; correct: string; explanation: string }>;
    flashcards: Array<{ question: string; answer: string }>;
  } | null>(null);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setGeneratedOutput({
        questions: [
          {
            question: "Cuando la elasticidad cruzada entre el bien A y el bien B es positiva (Eab > 0), ambos bienes son:",
            options: ["Complementarios", "Sustitutos", "Independientes", "Giffen"],
            correct: "B (Sustitutos)",
            explanation: "Al subir el precio de B, la cantidad demandada de A aumenta, indicando que los consumidores sustituyen B por A.",
          },
          {
            question: "En el tramo inelástico de una curva de demanda lineal, una reducción del precio ocasiona:",
            options: [
              "Un aumento del ingreso total del vendedor",
              "Una disminución del ingreso total del vendedor",
              "El ingreso total permanece invariable",
              "Un desplazamiento de la curva de oferta",
            ],
            correct: "B (Una disminución del ingreso total del vendedor)",
            explanation: "Dado que el cambio porcentual en la cantidad es menor al cambio porcentual en el precio, la ganancia por mayor volumen no compensa la caída de precio unitario.",
          },
        ],
        flashcards: [
          {
            question: "¿Qué fórmula define la elasticidad ingreso de la demanda (Ey)?",
            answer: "Ey = (% Variación Cantidad Demandada) / (% Variación Ingreso). Si Ey > 1 es un bien de lujo; si 0 < Ey < 1 es un bien necesario; si Ey < 0 es un bien inferior.",
          },
          {
            question: "¿Por qué el excedente del consumidor disminuye ante la fijación de un impuesto al consumo?",
            answer: "Porque el precio pagado por el consumidor aumenta y la cantidad consumida disminuye, generando además una pérdida irrecuperable de eficiencia económica.",
          },
        ],
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
          <Bot className="w-6 h-6 text-slate-950" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-white">Copiloto Docente con Inteligencia Artificial</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60">
              Gemini 3.1 Pro Engine
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Generador algorítmico de evaluaciones universitarias y flashcards a partir del programa analítico
          </p>
        </div>
      </div>

      {/* Input Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1.5">
            Tema, Contenido o Resumen del Programa a Procesar:
          </label>
          <textarea
            rows={3}
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 leading-relaxed font-sans"
            placeholder="Pega el extracto del apunte, objetivos de aprendizaje o bibliografía..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? "Generando Reactivos con IA..." : "Sintetizar Examen y Flashcards con IA"}
        </button>
      </div>

      {/* Generated Results */}
      {generatedOutput && (
        <div className="space-y-6 pt-6 border-t border-slate-800 animate-fadeIn">
          {/* Multiple Choice Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Preguntas de Opción Múltiple Generadas:
              </h4>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                Formato Siglo 21 Aprobado
              </span>
            </div>

            <div className="space-y-4">
              {generatedOutput.questions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <p className="font-bold text-white mb-2">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2 rounded-lg border ${
                          q.correct.startsWith(String.fromCharCode(65 + oIdx))
                            ? "bg-emerald-950/40 border-emerald-700/60 text-emerald-300 font-semibold"
                            : "bg-slate-900 border-slate-800 text-slate-300"
                        }`}
                      >
                        <strong>{String.fromCharCode(65 + oIdx)})</strong> {opt}
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-400">
                    <span className="font-bold text-cyan-300">Justificación Pedagógica:</span> {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flashcards Section */}
          <div>
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4" />
              Tarjetas Flashcards de Repetición Espaciada Generadas:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {generatedOutput.flashcards.map((f, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <span className="text-[10px] font-bold text-amber-400 uppercase block mb-1">Anverso (Pregunta)</span>
                  <p className="font-bold text-white mb-3">{f.question}</p>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">Reverso (Respuesta)</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-right pt-2">
            <button
              onClick={() => alert("¡Reactivos e ítems agregados al temario oficial de la materia exitosamente!")}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Incorporar al Banco Oficial de Evaluaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
