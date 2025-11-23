'use client';

import type { Token } from '@/lib/types/token';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { tokenSelected } from '@/store/slices/uiSlice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
  token: Token;
}

export const TokenTableRow = ({ token }: Props) => {
  const dispatch = useAppDispatch();
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPrice = useRef<number>(token.price);

  useEffect(() => {
    const prev = prevPrice.current;
    if (token.price !== prev) {
      setFlash(token.price > prev ? 'up' : 'down');
      prevPrice.current = token.price;

      const timeout = setTimeout(() => setFlash(null), 400);
      return () => clearTimeout(timeout);
    }
  }, [token.price]);

  const priceColor =
    token.priceChange24h > 0
      ? 'text-[#22c55e]'
      : token.priceChange24h < 0
      ? 'text-[#ef4444]'
      : 'text-slate-200';

  return (
    <div
      className={cn(
        'flex items-center px-4 py-3 text-sm transition-colors duration-300',
        flash === 'up' && 'bg-green-950/30',
        flash === 'down' && 'bg-red-950/30',
        !flash && 'hover:bg-white/5',
      )}
      onClick={() => dispatch(tokenSelected(token))}
    >
      {/* Left: logo + symbol + name with tooltip */}
      <div className="w-40 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-slate-700" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col text-left">
                <span className="font-medium text-white leading-tight">
                  {token.symbol}
                </span>
                <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
                  {token.name}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">
                {token.name}
                <br />
                ID: {token.id}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Price */}
      <div className={cn('flex-1 tabular-nums text-right', priceColor)}>
        {token.price.toFixed(4)}
      </div>

      {/* 24h % */}
      <div className="flex-1 tabular-nums text-right">
        <span
          className={cn(
            token.priceChange24h > 0
              ? 'text-[#22c55e]'
              : token.priceChange24h < 0
              ? 'text-[#ef4444]'
              : 'text-slate-200',
          )}
        >
          {(token.priceChange24h * 100).toFixed(2)}%
        </span>
      </div>

      {/* Volume */}
      <div className="flex-1 tabular-nums text-right text-slate-200 hidden sm:block">
        {(token.volume24h / 1_000).toFixed(1)}k
      </div>

      {/* Market cap */}
      <div className="flex-1 tabular-nums text-right text-slate-200 hidden md:block">
        {(token.marketCap / 1_000_000).toFixed(1)}M
      </div>
    </div>
  );
};
