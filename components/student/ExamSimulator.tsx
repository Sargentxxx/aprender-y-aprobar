"use client";

import React, { useState, useEffect } from "react";
import { ExamSimulation } from "@/lib/types";
import { Clock, CheckCircle, XCircle, Award, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface ExamSimulatorProps {
  simulation: ExamSimulation;
}

export function ExamSimulator({ simulation }: ExamSimulatorProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(simulation.timeLimitMinutes * 60);

  // Timer countdown
  useEffect(() => {
    if (!started || submitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, submitted]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    simulation.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / simulation.questions.length) * 100);
    return {
      correctCount,
      total: simulation.questions.length,
      percentage,
      passed: percentage >= simulation.passingScorePercent,
    };
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const result = calculateScore();
    if (result.passed) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
    setSecondsRemaining(simulation.timeLimitMinutes * 60);
    setStarted(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}:${remSecs < 10 ? "0" : ""}${remSecs}`;
  };

  const scoreResult = submitted ? calculateScore() : null;
  const currentQ = simulation.questions[currentQuestionIndex];
  const allAnswered = simulation.questions.every((q) => selectedAnswers[q.id] !== undefined);

  if (!started) {
    return (
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-cyan-400" />
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">{simulation.title}</h3>
        <p className="text-sm text-slate-300 mb-6">{simulation.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto mb-8 text-left">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 block font-semibold">PREGUNTAS</span>
            <span className="text-base font-bold text-white">{simulation.questions.length} reactivos</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-[10px] text-slate-400 block font-semibold">TIEMPO LÍMITE</span>
            <span className="text-base font-bold text-amber-400">{simulation.timeLimitMinutes} minutos</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 block font-semibold">APROBACIÓN</span>
            <span className="text-base font-bold text-emerald-400">{simulation.passingScorePercent}%</span>
          </div>
        </div>

        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-sm hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all"
        >
          Comenzar Examen Simulado
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm">
      {/* Top Banner with live timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
            Simulador de Evaluación Siglo 21
          </span>
          <h3 className="text-lg font-bold text-white">{simulation.title}</h3>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border ${
              secondsRemaining < 180
                ? "bg-rose-500/10 text-rose-400 border-rose-500/40 animate-pulse"
                : "bg-slate-800 text-slate-200 border-slate-700"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <span className="text-xs text-slate-400 font-semibold bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/60">
            Pregunta {currentQuestionIndex + 1} de {simulation.questions.length}
          </span>
        </div>
      </div>

      {!submitted ? (
        <div>
          {/* Question Text */}
          <div className="mb-6">
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQ.id, optIdx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,199,253,0.15)]"
                      : "bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-slate-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-cyan-400 text-slate-950 font-black"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{option}</span>
                </div>
              );
            })}
          </div>

          {/* Navigation and Submission Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              >
                Anterior
              </button>
              <button
                disabled={currentQuestionIndex === simulation.questions.length - 1}
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
              >
                Siguiente
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold text-xs hover:from-emerald-400 hover:to-teal-500 transition-all shadow-md shadow-emerald-500/20"
            >
              Finalizar y Calificar ({Object.keys(selectedAnswers).length}/{simulation.questions.length})
            </button>
          </div>
        </div>
      ) : (
        /* Result Summary & Question Review */
        <div>
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 mb-8 text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                scoreResult?.passed
                  ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400"
                  : "bg-rose-500/20 border border-rose-500/50 text-rose-400"
              }`}
            >
              {scoreResult?.passed ? (
                <ShieldCheck className="w-8 h-8" />
              ) : (
                <AlertTriangle className="w-8 h-8" />
              )}
            </div>
            <h4 className="text-xl font-extrabold text-white mb-1">
              {scoreResult?.passed ? "¡Examen Aprobado!" : "Examen No Superado"}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              {scoreResult?.passed
                ? "Has demostrado dominio sobre el temario oficial exigido para este módulo evaluativo."
                : "Te recomendamos reforzar los conceptos errados mediante las Flashcards de Repetición Espaciada antes de rendir el parcial oficial."}
            </p>

            <div className="inline-flex items-center gap-6 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">PUNTAJE</span>
                <span className="text-2xl font-black text-white">{scoreResult?.percentage}%</span>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">CORRECTAS</span>
                <span className="text-2xl font-black text-cyan-400">
                  {scoreResult?.correctCount} / {scoreResult?.total}
                </span>
              </div>
              <div className="w-px h-8 bg-slate-700" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">ESTADO</span>
                <span
                  className={`text-sm font-extrabold ${
                    scoreResult?.passed ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {scoreResult?.passed ? "APROBADO" : "A REPASAR"}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-6 mb-8">
            <h5 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Revisión Detallada & Justificación Teórica:
            </h5>
            {simulation.questions.map((q, idx) => {
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border ${
                    isCorrect
                      ? "bg-emerald-950/20 border-emerald-800/60"
                      : "bg-rose-950/20 border-rose-800/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-bold text-slate-300">
                      Pregunta {idx + 1}:
                    </span>
                    <span
                      className={`text-xs font-extrabold flex items-center gap-1 ${
                        isCorrect ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Correcta
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Incorrecta
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-white mb-3">{q.question}</p>

                  <div className="space-y-1.5 text-xs mb-3">
                    {q.options.map((opt, oIdx) => {
                      const isOptionSelected = userChoice === oIdx;
                      const isOptionCorrect = q.correctIndex === oIdx;

                      return (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg flex items-center gap-2 ${
                            isOptionCorrect
                              ? "bg-emerald-900/40 text-emerald-200 border border-emerald-700/60 font-semibold"
                              : isOptionSelected
                              ? "bg-rose-900/40 text-rose-200 border border-rose-700/60 font-semibold"
                              : "text-slate-400"
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Theoretical Explanation */}
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-cyan-400 block mb-1">Fundamento del Programa Siglo 21:</span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 inline-flex items-center gap-2 transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              Reintentar Simulador
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
