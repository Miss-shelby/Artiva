"use client";

import Link from "next/link";
import { ArtivaLogo } from "@/components/ui/artiva-logo";
import { NFT_CONTRACT_ID, contractExplorerUrl, truncateAddress } from "@/lib/stellar";
import { useI18n } from "@/lib/i18n";

const PRODUCT_LINKS = [
  { href: "/works", labelKey: "nav.discover" },
  { href: "/create", labelKey: "footer.mintWork" },
  { href: "/artists", labelKey: "footer.artists" },
  { href: "/my-work", labelKey: "nav.myWork" },
  { href: "/earnings", labelKey: "nav.earnings" },
  { href: "/manifiesto", labelKey: "nav.manifesto" },
  { href: "/get-started", labelKey: "nav.faq" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/team", labelKey: "nav.team" },
] as const;

const SOCIAL_LINKS = [
  { href: "https://x.com/ArtivaProtocol", label: "X / Twitter", external: true },
  { href: "https://instagram.com/artivaprotocol", label: "Instagram", external: true },
  { href: "https://github.com/artiva-protocol", label: "GitHub", external: true },
] as const;

export function Footer() {
  const { t, locale, setLocale } = useI18n();

  return (
    <footer className="mt-auto border-t border-white/[0.08] bg-[#07080D]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-16">
        {/* Brand */}
        <div className="md:col-span-1">
          <ArtivaLogo height={32} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            {t("footer.description")}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            Stellar · Soroban Testnet
          </div>
        </div>

        {/* Product Navigation */}
        <nav aria-label={t("footer.productLabel")} className="md:col-span-1">
          <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
            {t("footer.productLabel")}
          </p>
          <ul className="space-y-2.5">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-[13px] text-zinc-400 transition-colors hover:text-white"
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Invariants & Properties */}
        <div className="md:col-span-1">
          <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
            {t("footer.propertiesLabel")}
          </p>
          <ul className="space-y-2.5">
            {(
              [
                "footer.props.royalties",
                "footer.props.immutable",
                "footer.props.fee",
                "footer.props.noAi",
                "footer.props.stellar",
                "footer.props.latam",
              ] as const
            ).map((prop) => (
              <li
                key={prop}
                className="font-mono text-[13px] text-zinc-400/80"
              >
                {t(prop)}
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div className="md:col-span-1">
          <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
            Community
          </p>
          <ul className="space-y-2.5">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[13px] text-zinc-400 transition-colors hover:text-white inline-flex items-center gap-1.5"
                >
                  {link.label}
                  <span className="text-zinc-600">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/[0.06] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
        <p className="font-mono text-[11px] text-zinc-500">
          {t("footer.copyright")}
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {(["es", "en"] as const).map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  locale === loc
                    ? "text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
          <a
            href={contractExplorerUrl(NFT_CONTRACT_ID)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-zinc-400 transition-colors hover:text-violet-400"
          >
            Contract · {truncateAddress(NFT_CONTRACT_ID, 6, 6)} ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
