'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { fetchTokens } from '@/lib/api/tokenApi';
import { Token } from '@/lib/types/token';

export function useTokenTableData(searchQuery: string = '') {
  const activeCategory = useAppSelector(
    (state: RootState) => state.ui.activeCategory,
  );
  const sort = useAppSelector((state: RootState) => state.ui.sort);
  const liveOverrides = useAppSelector(
    (state: RootState) => state.tokens.liveOverrides,
  );

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery<Token[]>({
    queryKey: ['tokens', activeCategory],
    queryFn: () => fetchTokens(activeCategory),
    staleTime: 10_000,
    refetchOnWindowFocus: false,
  });

  const tokens = useMemo(() => {
    if (!data) return [];

    // 1. Merge base tokens with live WebSocket overrides
    const merged = data.map((token) => {
      const override = liveOverrides[token.id];
      if (!override) return token;

      return {
        ...token,
        price: override.price,
        priceChange24h: override.priceChange24h,
        volume24h: override.volume24h,
        lastUpdated: override.timestamp,
      };
    });

    // 2. Filter by search (symbol or name)
    const q = searchQuery.trim().toLowerCase();
    const searched = q
      ? merged.filter(
          (t) =>
            t.symbol.toLowerCase().includes(q) ||
            t.name.toLowerCase().includes(q),
        )
      : merged;

    // 3. Sort according to UI slice state
    if (!sort) return searched;

    const { field, direction } = sort;
    const dir = direction === 'asc' ? 1 : -1;

    return [...searched].sort((a, b) => {
      const av = a[field];
      const bv = b[field];

      // Should all be numbers, but guard just in case
      if (typeof av !== 'number' || typeof bv !== 'number') return 0;

      return (av - bv) * dir;
    });
  }, [data, liveOverrides, sort, searchQuery]);

  return {
    tokens,
    isLoading,
    isError,
    isFetching,
    refetch,
    activeCategory,
    sort,
  };
}
