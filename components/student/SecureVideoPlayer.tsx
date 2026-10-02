"use client";

import React, { useState, useEffect } from "react";
import { Shield, Lock, Eye, AlertCircle, Play, FastForward } from "lucide-react";

interface SecureVideoPlayerProps {
  videoUrl: string;
  lessonTitle: string;
  userEmail: string;
  userName: string;
  userId: string;
}

export function SecureVideoPlayer({
  videoUrl,
  lessonTitle,
  userEmail,
  userName,
  userId,
}: SecureVideoPlayerProps) {
  const [timestamp, setTimestamp] = useState<string>("");
  const [watermarkPos, setWatermarkPos] = useState<{ top: string; left: string }>({
    top: "20%",
    left: "15%",
  });

  // Oscillating dynamic watermark position every 8 seconds to prevent recording cropping
  useEffect(() => {
    const updatePosition = () => {
      const positions = [
        { top: "15%", left: "12%" },
        { top: "68%", left: "55%" },
        { top: "35%", left: "60%" },
        { top: "72%", left: "18%" },
        { top: "45%", left: "32%" },
      ];
      const randomIdx = Math.floor(Math.random() * positions.length);
      setWatermarkPos(positions[randomIdx]);
      setTimestamp(new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };

    updatePosition();
    const interval = setInterval(updatePosition, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative group select-none">
      {/* Top Security Status Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-slate-200">{lessonTitle}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono text-[10px]">
            <Lock className="w-3 h-3 text-cyan-400" />
            HLS DRM Cifrado • Multi-DRM L1
          </span>
          <span className="text-[10px] text-slate-500 font-mono">ID: {userId.substring(0, 10)}</span>
        </div>
      </div>

      {/* Video Container with Overlaid Dynamic Forensic Watermark */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        {/* Responsive Video/Embed */}
        <iframe
          src={videoUrl.includes("watch?v=") ? videoUrl.replace("watch?v=", "embed/") : videoUrl}
          title={lessonTitle}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* DYNAMIC FORENSIC WATERMARK OVERLAY */}
        <div
          className="absolute pointer-events-none transition-all duration-1000 ease-in-out z-30 select-none opacity-30 hover:opacity-40"
          style={{
            top: watermarkPos.top,
            left: watermarkPos.left,
          }}
        >
          <div className="p-2 rounded-lg bg-black/40 backdrop-blur-[1px] border border-white/10 text-white font-mono text-[10px] sm:text-xs leading-tight shadow-md rotate-[-8deg]">
            <div className="flex items-center gap-1 font-bold text-cyan-300">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>APRENDER & APROBAR • WATERMARK</span>
            </div>
            <div className="text-white font-semibold">{userEmail}</div>
            <div className="text-slate-300 text-[9px]">ID: {userId} • {timestamp}</div>
          </div>
        </div>

        {/* Diagonal Screen-Wide Secondary Ghost Watermark (Subtle pattern) */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center opacity-[0.035] select-none rotate-[-25deg]">
          <span className="text-4xl sm:text-6xl font-black text-white whitespace-nowrap">
            {userEmail} • {userId}
          </span>
        </div>
      </div>

      {/* Bottom Information & Anti-Piracy Notice */}
      <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Reproductor con protección anti-captura y huella forense invisible. Prohibida la redistribución.
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">
            1080p Adaptativo
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">
            Speed 1.0x
          </span>
        </div>
      </div>
    </div>
  );
}
