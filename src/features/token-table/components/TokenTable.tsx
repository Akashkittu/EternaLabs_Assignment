'use client';

import { useTokenTableData } from '../hooks/useTokenTableData';
import { usePriceStream } from '../hooks/usePriceStream';
import { TokenTableHeader } from './TokenTableHeader';
import { TokenTableRow } from './TokenTableRow';
import { TokenTableSkeleton } from './TokenTableSkeleton';

export const TokenTable = () => {
  const { tokens, isLoading, isError } = useTokenTableData();
  usePriceStream();

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-400">
        Failed to load tokens. Please refresh.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[#1a1a24] bg-[#080814]">
      <TokenTableHeader />
      {isLoading ? (
        <TokenTableSkeleton />
      ) : (
        <div className="divide-y divide-[#1a1a24]">
          {tokens.map((token) => (
            <TokenTableRow key={token.id} token={token} />
          ))}
        </div>
      )}
    </div>
  );
};
