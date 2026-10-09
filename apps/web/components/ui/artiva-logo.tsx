"use client";

import React from "react";

interface ArtivaLogoProps {
  className?: string;
  variant?: "full" | "icon" | "wordmark";
  height?: number;
}

export function ArtivaLogo({ className = "", variant = "full", height = 36 }: ArtivaLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {variant !== "wordmark" && (
        <svg
          width={height}
          height={height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <linearGradient id="artiva-g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="artiva-g2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="artiva-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background subtle aura */}
          <circle cx="50" cy="50" r="42" fill="url(#artiva-g1)" opacity="0.15" filter="url(#artiva-glow)" />

          {/* Outer Prism Hex Frame */}
          <path
            d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
            stroke="url(#artiva-g1)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
            opacity="0.8"
          />

          {/* Core 'A' Geometry & Layers */}
          <path
            d="M50 20 L72 65 L60 65 L50 44 L40 65 L28 65 Z"
            fill="url(#artiva-g1)"
          />
          <path
            d="M38 52 L62 52 L50 26 Z"
            fill="url(#artiva-g2)"
            opacity="0.8"
          />
          <circle cx="50" cy="74" r="4.5" fill="#06B6D4" />
        </svg>
      )}

      {variant !== "icon" && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-[0.2em] text-lg text-white uppercase font-sans">
              ARTIVA
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-400 font-semibold -mt-0.5">
            DIGITAL ART PROTOCOL
          </span>
        </div>
      )}
    </div>
  );
}
