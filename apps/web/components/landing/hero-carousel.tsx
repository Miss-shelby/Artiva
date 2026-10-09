"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { truncateAddress } from "@/lib/stellar";

export type HeroSlide = {
  tokenId: number;
  image: string;
  title: string;
  artist: string;
  artistHandle: string | null;
  priceXlm: string | null;
  priceUsd: string | null;
};

const ADVANCE_MS = 6000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(slides.length, 1));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    timer.current = setInterval(advance, ADVANCE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [advance, paused, slides.length]);

  const active = slides.length > 0 ? slides[Math.min(index, slides.length - 1)] : null;

  return (
    <section className="relative w-full overflow-hidden bg-[#07080D] px-6 py-16 md:px-12 md:py-24">
      {/* Background glowing ambient light blobs */}
      <div className="flame-blob -top-20 -left-20 h-96 w-96 bg-violet-600/20" />
      <div className="flame-blob bottom-0 right-0 h-96 w-96 bg-cyan-600/15" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:items-center md:gap-16">
        {/* Value Proposition Hero Header */}
        <div className="flex flex-col gap-6 md:w-[46%] md:shrink-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 w-fit">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-violet-300">
              IMMUTABLE ON-CHAIN ROYALTIES
            </span>
          </div>

          <h1 className="font-sans text-[clamp(2.5rem,5.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            {t("landing.hero.headlineBefore")}{" "}
            <span className="gradient-accent-text">
              {t("landing.hero.headlineEm")}
            </span>{" "}
            {t("landing.hero.headlineAfter")}
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-zinc-400">
            {t("landing.tagline.description")}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2">
            <Link
              href="/create"
              className="inline-flex h-13 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 font-sans font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:brightness-110 hover:shadow-violet-500/40"
            >
              {t("common.mintFirst")}
            </Link>
            <Link
              href="/works"
              className="inline-flex h-13 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 font-mono text-xs uppercase tracking-wider text-zinc-300 backdrop-blur-md transition-all hover:bg-white/[0.1] hover:text-white"
            >
              {t("common.collectorsSeeWorks")}
            </Link>
          </div>
        </div>

        {/* Featured Artwork Display Panel */}
        {active && (
          <div
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-2xl backdrop-blur-md md:aspect-[4/5] md:w-[54%] md:max-h-[580px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {slides.map((slide, i) => (
              <div
                key={slide.tokenId}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
                aria-hidden={i !== index}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 54vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-black/20 to-transparent" />
              </div>
            ))}

            {/* Artwork Details Glass Badge Overlay */}
            <Link
              href={`/token/${active.tokenId}`}
              className="absolute bottom-6 left-6 right-6 z-20 rounded-xl border border-white/15 bg-black/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/50 hover:bg-black/75"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-sans text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                    {active.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    Created by <span className="text-zinc-200 font-semibold">{active.artistHandle ?? truncateAddress(active.artist, 4, 4)}</span>
                  </p>
                </div>
                {active.priceXlm && (
                  <div className="text-right">
                    <div className="font-mono text-base font-bold text-cyan-400">
                      {active.priceXlm} XLM
                    </div>
                    {active.priceUsd && (
                      <div className="font-mono text-[11px] text-zinc-400">
                        ~${active.priceUsd} USD
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-violet-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  10% Permanent Royalty
                </span>
                <span className="font-mono text-[11px] text-zinc-300 hover:text-white font-semibold flex items-center gap-1">
                  {t("landing.hero.viewWork")} →
                </span>
              </div>
            </Link>

            {/* Slider Controls */}
            {slides.length > 1 && (
              <>
                <button
                  aria-label="Previous slide"
                  onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
                  className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xl text-white/80 backdrop-blur-md transition-all hover:bg-black/70 hover:text-white"
                >
                  ‹
                </button>
                <button
                  aria-label="Next slide"
                  onClick={() => setIndex((i) => (i + 1) % slides.length)}
                  className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xl text-white/80 backdrop-blur-md transition-all hover:bg-black/70 hover:text-white"
                >
                  ›
                </button>
              </>
            )}

            {/* Indicators */}
            {slides.length > 1 && (
              <div className="absolute top-4 right-4 z-20 flex gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
                {slides.map((slide, i) => (
                  <button
                    key={slide.tokenId}
                    aria-label={`Go to slide #${slide.tokenId}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-cyan-400" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
