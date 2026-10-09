# 🎨 Artiva Protocol

> **On-chain digital art marketplace built on Stellar/Soroban.** Artists mint, list, sell, and collect royalties on secondary market sales — enforced directly in the smart contract bytecode.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stellar: Testnet](https://img.shields.io/badge/Stellar-Testnet-purple.svg)](https://stellar.org)
[![Soroban: v25](https://img.shields.io/badge/Soroban-v25.3-cyan.svg)](https://soroban.stellar.org)
[![Framework: Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-black.svg)](https://nextjs.org)

---

## 💡 What is Artiva?

Most traditional Web3 marketplaces made artist royalties optional to compete on transaction fees. **Artiva flips this model completely**: creator royalties are written into the Soroban smart contract at minting time and are **immutable** for life.

- **Contract-Enforced Royalties (1% – 15%)**: Written at mint and locked forever. No platform setter can remove or lower an artist's royalty cut.
- **Micro-Fee Transactions**: Built on Stellar — sub-cent gas fees and instant settlement.
- **Multi-Wallet Royalty Splits**: Co-creators can split royalties directly on-chain down to basis points (BPS).
- **Non-Custodial Architecture**: Escrow transfers tokens atomically during settlement; the protocol never custodies user funds.

---

## 🏗️ Monorepo Architecture

Artiva is built as a high-performance monorepo using **pnpm workspaces** and **Turborepo**:

```
Artiva/
├── apps/
│   ├── web/                     # Next.js 16 App Router UI + Indexer API endpoints
│   └── mobile/                  # Future mobile workspace placeholder
├── contracts/                   # Soroban smart contracts written in Rust
│   ├── nft/                     # ArtivaNFT (SEP-50 compliant with immutable royalties)
│   ├── marketplace/             # Artiva Marketplace (Atomic settlement & fee distribution)
│   └── artist-registry/         # Artist Registry (Gated creator verification)
├── packages/
│   └── stellar-client/          # Generated TypeScript SDK bindings for contracts
└── supabase/                    # Read-only indexed database projection & RLS policies
```

---

## 🔒 Smart Contract Invariants

1. **Immutable Royalties**: The creator defines their royalty percentage (1% to 15%) upon minting. The `token_id` stores this permanently. ERC-2981 setters intentionally panic with `RoyaltiesImmutableAfterMint`.
2. **Primary Split Protection**: Only the original minter can claim primary splits. Resellers land on the secondary sales path where contract royalties are automatically collected and routed to the artist.
3. **Atomic Fund Distribution**: Every marketplace sale executes inside a single Soroban invocation (`buy`), dividing funds among the seller, the artist royalty recipients, and the platform fee.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: `>= 20.0.0`
- **pnpm**: `>= 10.0.0`
- **Rust & Target**: `wasm32-unknown-unknown` (for contract development)

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/artiva-protocol/artiva.git
   cd artiva
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` in `apps/web/`:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

4. **Run Development Server**:
   ```bash
   pnpm dev
   ```
   Open `http://localhost:3000` to interact with the Artiva web application.

---

## 🧪 Testing & Verification

Run the full test suite across web, contracts, and integration suites:

```bash
# Web application unit & integration tests
pnpm --filter=@artiva/web test

# Soroban Rust contracts unit & property tests
cd contracts && cargo test --workspace
```

---

## 📜 Technology Stack

- **Blockchain / Smart Contracts**: Stellar, Soroban SDK (Rust)
- **Frontend App**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS v4
- **Wallet Connection**: `@creit.tech/stellar-wallets-kit` (Freighter, xBull, Albedo, LOBSTR)
- **Decentralized Storage**: IPFS via Pinata Gateway
- **Indexer & Projection**: Postgres / Supabase

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
