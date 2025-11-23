'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { TokenTable } from '@/features/token-table/components/TokenTable';
import { TokenDetailsModal } from '@/features/token-table/components/TokenDetailsModal';
import { cn } from '@/lib/utils';

type Network = 'SOL' | 'BTC' | 'ETH';
type ViewFilter = 'Trending' | 'Perpetuals' | 'New';

export default function HomePage() {
  const [network, setNetwork] = useState<Network>('SOL');
  const [search, setSearch] = useState('');
  const [viewFilter, setViewFilter] = useState<ViewFilter>('Trending');

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#02010A] via-[#050516] to-[#02010A] text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 pt-10">
        {/* Top bar: title + network pills */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Pulse
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Discover on-chain tokens with real-time price updates and
              trading-grade metrics.
            </p>
          </div>

          {/* Cooler network selector */}
          <div className="flex flex-col items-end gap-1 text-xs sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Networks
            </span>
            <div className="flex rounded-full bg-black/40 p-1 shadow-[0_0_0_1px_rgba(148,163,184,0.45)] backdrop-blur">
              {(['SOL', 'BTC', 'ETH'] as Network[]).map((net) => (
                <button
                  key={net}
                  type="button"
                  onClick={() => setNetwork(net)}
                  className={cn(
                    'relative overflow-hidden rounded-full px-4 py-1 text-[11px] font-semibold tracking-wide transition-all',
                    'hover:-translate-y-[1px]',
                    network === net
                      ? 'bg-slate-100 text-black shadow-[0_0_20px_rgba(248,250,252,0.55)]'
                      : 'bg-transparent text-slate-300 hover:bg-white/5',
                  )}
                >
                  {network === net && (
                    <span className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-r from-emerald-400/30 via-sky-400/30 to-indigo-400/30" />
                  )}
                  <span className="relative z-10">{net}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Second row: search + filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex min-w-[220px] flex-1 items-center gap-2">
            {/* Fancy search */}
            <div className="relative w-full max-w-md">
              <div className="flex items-center rounded-xl border border-slate-800 bg-[#05050C] px-3 py-[6px] text-xs text-slate-100 transition-colors focus-within:border-[#6b7cff]/80 focus-within:ring-1 focus-within:ring-[#6b7cff]/60">
                <Search className="mr-2 h-3.5 w-3.5 flex-shrink-0 text-slate-500" />

                <input
                  className="flex-1 bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  placeholder="Search by token or contract address"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="mr-2 rounded-full px-1 text-[11px] text-slate-400 hover:bg-slate-800/80"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}

                <span className="flex items-center rounded-md border border-slate-700 bg-[#11111D] px-1.5 py-0.5 text-[10px] text-slate-400">
                  ⌘K
                </span>
              </div>
            </div>

            <button className="rounded-xl bg-slate-100 px-3 py-1 text-[11px] font-semibold text-black hover:bg-white">
              Paste CA
            </button>
          </div>

          {/* Cooler view filters (UI only) */}
          <div className="flex flex-wrap items-center gap-2">
            {(['Trending', 'Perpetuals', 'New'] as ViewFilter[]).map(
              (filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setViewFilter(filter)}
                  className={cn(
                    'rounded-full border px-3 py-1 text-[11px] font-medium transition-all',
                    'hover:border-slate-400 hover:text-slate-100',
                    viewFilter === filter
                      ? 'border-slate-100 bg-slate-100 text-black shadow-[0_0_16px_rgba(248,250,252,0.45)]'
                      : 'border-slate-800 bg-[#05050C] text-slate-300',
                  )}
                >
                  {filter}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Token table – still reacts only to search for now */}
        <TokenTable searchQuery={search} />
        <TokenDetailsModal />
      </div>
    </main>
  );
}
