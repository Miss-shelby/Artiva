"use client";

import Image from "next/image";
import Link from "next/link";
import { truncateAddress } from "@/lib/stellar";
import { useI18n } from "@/lib/i18n";
import { ArtworkPlaceholder } from "@/components/artwork-placeholder";

export type ArtworkCardStatus = "for-sale" | "sold" | "not-listed";

export type ArtworkCardProps = {
  tokenId: number;
  title: string;
  imageUrl: string | null;
  artistAddress: string;
  artistHandle?: string | null;
  royaltyPct?: number;
  priceXlm: string | null;
  priceUsd?: string | null;
  status: ArtworkCardStatus;
  featured?: boolean;
  className?: string;
};

export function ArtworkCard({
  tokenId,
  title,
  imageUrl,
  artistAddress,
  artistHandle,
  royaltyPct,
  priceXlm,
  priceUsd,
  status,
  featured = false,
  className,
}: ArtworkCardProps) {
  const { t } = useI18n();
  const artistLabel = artistHandle ?? truncateAddress(artistAddress, 4, 4);

  return (
    <Link
      href={`/token/${tokenId}`}
      className={`glass-card group flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10 ${
        className ? ` ${className}` : ""
      }`}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-violet-950/40 to-slate-900 ${
          featured ? "aspect-[16/11]" : "aspect-[4/5]"
        }`}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={
              featured
                ? "(max-width: 640px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        )}
        {!imageUrl && (
          <div className="absolute inset-0">
            <ArtworkPlaceholder label={t("artwork.imageFallback")} />
          </div>
        )}

        {/* Royalty Badge */}
        {royaltyPct !== undefined && (
          <div className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] font-semibold text-violet-300">
              {royaltyPct}% Royalty
            </span>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="flex flex-col gap-1.5 px-5 py-4 bg-zinc-950/40">
        <p className="font-mono text-[10px] tracking-wider uppercase text-zinc-400 truncate">
          {artistLabel}
        </p>
        <p
          className={`font-sans font-bold text-white leading-snug truncate group-hover:text-violet-300 transition-colors ${
            featured ? "text-2xl" : "text-base"
          }`}
        >
          {title}
        </p>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
          {status === "for-sale" && priceXlm ? (
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-sm font-bold text-cyan-400">{priceXlm}</span>
              <span className="text-[10px] text-zinc-400">XLM</span>
              {priceUsd && (
                <span className="ml-1 text-[10px] text-zinc-500">~${priceUsd}</span>
              )}
            </div>
          ) : status === "sold" ? (
            <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400 font-medium">
              {t("works.card.sold")}
            </span>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              {t("works.card.notListed")}
            </span>
          )}

          <span className="font-mono text-[10px] uppercase text-zinc-400 group-hover:text-white transition-colors">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
