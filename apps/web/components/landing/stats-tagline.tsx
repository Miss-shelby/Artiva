"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { useSignedIn } from "@/hooks/use-signed-in";
import { START_HREF } from "@/lib/routes";
import type { LandingStats } from "@/lib/db/landing";

const HEADLINES = [
  "El arte le paga a quien lo hace.",
  "Art pays the one who makes it.",
  "A arte paga quem a faz.",
  "L'art paie qui le fait.",
  "藝術回報創作者。",
];

const ROTATE_MS = 3200;

function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const DURATION = 900;
        const step = (t: number) => {
          const p = Math.min((t - t0) / DURATION, 1);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toLocaleString("en-US")}
    </span>
  );
}

export function StatsTagline({ stats }: { stats: LandingStats }) {
  const { t } = useI18n();
  const isSignedIn = useSignedIn();
  const [headline, setHeadline] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setHeadline((h) => (h + 1) % HEADLINES.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const counters = [
    { value: stats.works, label: t("landing.counters.works") },
    { value: stats.artists, label: t("landing.counters.artists") },
    { value: stats.collected, label: t("landing.counters.collected") },
  ];
  const showCounters = stats.works > 0;

  return (
    <section className="border-y border-white/[0.08] bg-[#090A10] px-6 py-16 text-center md:py-24">
      <div className="mx-auto max-w-6xl">
        {showCounters && (
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-12 md:gap-24">
            {counters.map((c) => (
              <div key={c.label} className="glass-card flex flex-col gap-1.5 px-8 py-5 rounded-2xl">
                <span className="font-sans text-3xl font-extrabold text-white md:text-4xl gradient-accent-text">
                  <CountUp value={c.value} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <h2
          key={headline}
          className="tagline-fade mx-auto mt-10 font-sans text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-white tracking-tight"
        >
          {HEADLINES[headline]}
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
          {t("landing.tagline.description")}
        </p>

        <Link
          href={isSignedIn ? "/works" : START_HREF}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-mono text-xs uppercase tracking-widest text-black transition-all hover:bg-violet-400 hover:text-black font-bold shadow-lg shadow-white/10"
        >
          {isSignedIn ? t("landing.tagline.ctaConnected") : t("landing.tagline.cta")}
        </Link>
      </div>
    </section>
  );
}
