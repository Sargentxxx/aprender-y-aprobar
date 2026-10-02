"use client";

import React, { useState } from "react";
import { Flashcard } from "@/lib/types";
import { RotateCw, CheckCircle2, AlertCircle, HelpCircle, Sparkles, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";

interface ActiveRecallCardsProps {
  cards: Flashcard[];
  subjectName: string;
}

export function ActiveRecallCards({ cards, subjectName }: ActiveRecallCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<{ [id: string]: "facil" | "bueno" | "dificil" }>({});
  const [completed, setCompleted] = useState(false);

  if (!cards || cards.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
        <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400 font-medium">No hay tarjetas de memoria disponibles para esta materia aún.</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const handleDifficultySelect = (difficulty: "facil" | "bueno" | "dificil") => {
    setReviewedCards((prev) => ({ ...prev, [currentCard.id]: difficulty }));
    setIsFlipped(false);

    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewedCards({});
    setCompleted(false);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Tarjetas de Memoria Activa (Active Recall)
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Spaced Repetition
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Materia: <span className="text-cyan-400 font-semibold">{subjectName}</span> — Esfuérzate por recordar antes de voltear.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-auto">
          Tarjeta {currentIndex + 1} de {cards.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + (completed ? 1 : 0)) / cards.length) * 100}%` }}
        />
      </div>

      {!completed ? (
        <div className="flex flex-col items-center">
          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-xl min-h-[260px] p-8 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between relative bg-gradient-to-br from-slate-900 to-slate-800/90 border border-slate-700/80 hover:border-cyan-500/60 shadow-2xl group select-none"
            style={{ perspective: "1000px" }}
          >
            {/* Header tag */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 font-semibold border border-slate-700">
                {currentCard.moduleTitle}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                {isFlipped ? "Ver pregunta" : "Clic para ver respuesta"}
              </span>
            </div>

            {/* Content area */}
            <div className="my-6 text-center">
              {!isFlipped ? (
                <div>
                  <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider mb-2 block">
                    Pregunta de Examen
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                    {currentCard.question}
                  </p>
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider mb-2 block">
                    Respuesta & Fundamento
                  </span>
                  <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed">
                    {currentCard.answer}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom hint */}
            <div className="text-center text-[11px] text-slate-500">
              {!isFlipped
                ? "Intenta responder mentalmente antes de comprobar tu recuerdo."
                : "Evalúa tu facilidad de recuperación para programar el próximo repaso."}
            </div>
          </div>

          {/* Spaced Repetition Buttons (Active when flipped) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full max-w-xl">
            {isFlipped ? (
              <>
                <button
                  onClick={() => handleDifficultySelect("dificil")}
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs transition-all"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  Difícil (1 día)
                </button>
                <button
                  onClick={() => handleDifficultySelect("bueno")}
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs transition-all"
                >
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  Bueno (3 días)
                </button>
                <button
                  onClick={() => handleDifficultySelect("facil")}
                  className="flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Fácil (7 días)
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <RotateCw className="w-4 h-4 text-cyan-400" />
                Voltear Tarjeta
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Completed state */
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h4 className="text-xl font-extrabold text-white mb-2">¡Sesión de Recuperación Activa Completada!</h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
            Has repasado {cards.length} conceptos clave. El algoritmo de repetición espaciada ha programado las próximas revisiones para maximizar la consolidación en tu memoria a largo plazo.
          </p>

          <button
            onClick={resetDeck}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
          >
            Repasar Nuevamente el Mazo
          </button>
        </div>
      )}
    </div>
  );
}
