"use client";

import Link from "next/link";
import { WalletButton } from "@/components/wallet-button";
import { SearchBox } from "@/components/search-box";
import { CreateMenu } from "@/components/create-menu";
import { ArtivaLogo } from "@/components/ui/artiva-logo";
import { useI18n } from "@/lib/i18n";
import { useSignedIn } from "@/hooks/use-signed-in";
import { START_HREF } from "@/lib/routes";

/**
 * Top bar: Artiva vector mark, artist search, create / start / sign-in & wallet integration.
 */
export function Nav() {
  const { t } = useI18n();
  const isSignedIn = useSignedIn();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#07080D]/80 backdrop-blur-xl transition-all duration-300">
      <div className="flex h-20 items-center gap-4 px-5 md:gap-6 md:px-10 lg:px-16">
        {/* Left: Artiva vector mark */}
        <Link href="/" aria-label={t("nav.homeLabel")} className="flex shrink-0 items-center">
          <ArtivaLogo height={36} />
        </Link>

        {/* Center: artist search (md+) */}
        <div className="hidden flex-1 justify-center max-w-xl mx-auto md:flex">
          <SearchBox />
        </div>

        {/* Right: create / start / locale / wallet */}
        <div className="ml-auto flex items-center gap-3 md:ml-0 md:gap-4">
          <CreateMenu />
          {!isSignedIn && (
            <Link
              href={START_HREF}
              className="inline-flex h-9 items-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 font-mono text-[11px] uppercase tracking-widest text-white shadow-lg shadow-violet-500/20 transition-all hover:brightness-110 hover:shadow-violet-500/35"
            >
              {t("nav.start")}
            </Link>
          )}
          <WalletButton theme="dark" />
        </div>
      </div>

      {/* Mobile search row + quick nav */}
      <div className="border-t border-white/[0.06] bg-[#07080D]/95 px-5 py-2.5 md:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <SearchBox variant="block" />
          </div>
          <nav aria-label={t("nav.quickNav")} className="flex shrink-0 items-center gap-4">
            <Link
              href="/artists"
              className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
            >
              {t("nav.artists")}
            </Link>
            <Link
              href="/manifiesto"
              className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
            >
              {t("nav.manifesto")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
