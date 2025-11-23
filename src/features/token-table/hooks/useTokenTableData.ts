'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTokens } from '@/lib/api/tokenApi';
import { useAppSelector } from '@/store/hooks';
import type { Token } from '@/lib/types/token';

export const useTokenTableData = () => {
  const { activeCategory, sort } = useAppSelector((s) => s.ui);
  const { liveOverrides } = useAppSelector((s) => s.tokens);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tokens', activeCategory],
    queryFn: () => fetchTokens(activeCategory),
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  const merged: Token[] = (data ?? []).map((t) => {
    const override = liveOverrides[t.id];
    if (!override) return t;

    return {
      ...t,
      price: override.price,
      priceChange24h: override.priceChange24h,
      volume24h: override.volume24h,
      lastUpdated: override.timestamp,
    };
  });

  const sorted = [...merged].sort((a, b) => {
    const dir = sort.direction === 'asc' ? 1 : -1;
    const f = sort.field;
    return (a[f] - b[f]) * dir;
  });

  return {
    tokens: sorted,
    isLoading,
    isError,
    error,
    activeCategory,
    sort,
  };
};
