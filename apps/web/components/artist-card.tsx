"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export type ArtistCard = {
  address: string;
  short: string;
  handle: string | null;
  tokenCount: number;
  latestTokenId: number | null;
  latestImage: string | null;
  latestTitle: string | null;
};

export function ArtistCard({ artist }: { artist: ArtistCard }) {
  const { t } = useI18n();
  const card = (
    <article className="glass-card group flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10">
      {/* Artwork thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-violet-950/40 to-slate-900">
        {artist.latestImage ? (
          <Image
            src={artist.latestImage}
            alt={artist.latestTitle ?? artist.short}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              {artist.tokenCount > 0 ? t("artists.previewUnavailable") : t("myWork.noWorks")}
            </span>
          </div>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 font-mono text-[10px] font-semibold text-violet-300">
          {artist.tokenCount}{" "}
          {artist.tokenCount === 1
            ? t("landing.trending.piecesSingular")
            : t("landing.trending.piecesPlural")}
        </span>
      </div>

      {/* Caption */}
      <div className="px-5 py-4 bg-zinc-950/40">
        <p className="font-mono text-[10px] uppercase tracking-widest text-violet-400 mb-1">
          Verified Artist
        </p>
        <p className="font-sans text-base font-bold text-white group-hover:text-violet-300 transition-colors truncate">
          {artist.handle ?? artist.short}
        </p>
        {artist.latestTitle && (
          <p className="mt-1 font-mono text-xs text-zinc-400 truncate">
            Latest: {artist.latestTitle}
          </p>
        )}
      </div>
    </article>
  );

  return <Link href={`/artist/${artist.handle ?? artist.address}`}>{card}</Link>;
}
