'use client';

import { useTokenTableData } from '../hooks/useTokenTableData';
import { usePriceStream } from '../hooks/usePriceStream';
import { TokenTableHeader } from './TokenTableHeader';
import { TokenTableRow } from './TokenTableRow';
import { TokenTableSkeleton } from './TokenTableSkeleton';

interface TokenTableProps {
  searchQuery?: string;
}

export const TokenTable = ({ searchQuery = '' }: TokenTableProps) => {
  const { tokens, isLoading, isError, isFetching, refetch } =
    useTokenTableData(searchQuery);

  // Start WebSocket streaming once when this component mounts
  usePriceStream();

  if (isError && !isLoading) {
    return (
      <div className="w-full rounded-2xl border border-[#2b1a1f] bg-[#120910] p-4 text-sm text-red-300">
        <div className="mb-2 font-medium">Failed to load tokens.</div>
        <p className="mb-3 text-xs text-red-200/80">
          There was a problem fetching the latest token data.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="inline-flex items-center rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-400"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    // ✅ Horizontal scroll only on small screens
    <div className="w-full overflow-x-auto md:overflow-visible">
      {/* ✅ On mobile, enforce min width; on md+ let it just fill */}
      <div className="relative min-w-[720px] md:min-w-0 rounded-2xl border border-[#26263A] bg-[#05050C] shadow-[0_0_40px_rgba(0,0,0,0.7)] transition-colors duration-200 hover:border-[#6b7cff]/60">
        <TokenTableHeader />

        <div className="relative">
          {isLoading ? (
            <TokenTableSkeleton />
          ) : (
            <div className="divide-y divide-[#1A1A24]">
              {tokens.map((token) => (
                <TokenTableRow key={token.id} token={token} />
              ))}
            </div>
          )}

          {/* Progressive loading overlay when category changes / refetch in background */}
          {isFetching && !isLoading && (
            <div className="pointer-events-none absolute inset-0 bg-[#05050C]/40">
              <TokenTableSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
