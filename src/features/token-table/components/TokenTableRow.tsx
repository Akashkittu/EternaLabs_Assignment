'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MoreHorizontal } from 'lucide-react';
import type { Token } from '@/lib/types/token';
import { useEffect, useRef, useState, memo } from 'react';
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

const TokenTableRowInner = ({ token }: Props) => {
  const dispatch = useAppDispatch();
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPrice = useRef<number>(token.price);

  // Track popover open + row ref for outside-click
  const [menuOpen, setMenuOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prev = prevPrice.current;
    if (token.price !== prev) {
      setFlash(token.price > prev ? 'up' : 'down');
      prevPrice.current = token.price;

      const timeout = setTimeout(() => setFlash(null), 400);
      return () => clearTimeout(timeout);
    }
  }, [token.price]);

  // Close menu when clicking anywhere outside this row
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const row = rowRef.current;
      if (!row) return;

      if (!row.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    // use capture so stopPropagation inside doesn't hide it from us
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [menuOpen]);

  const priceColor =
    token.priceChange24h > 0
      ? 'text-[#16C784]'
      : token.priceChange24h < 0
      ? 'text-[#EA3943]'
      : 'text-slate-200';

  return (
    <div
      ref={rowRef}
      className={cn(
        'relative flex h-12 items-center px-4 text-[13px] leading-[1.35]',
        'border-t border-[#1A1A24]/70 first:border-t-0',
        // strong pop-out motion
        'transition-all duration-150 ease-out',
        'hover:-translate-y-[2px] hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,0.65)] hover:z-10',
        flash === 'up' && 'bg-green-950/25',
        flash === 'down' && 'bg-red-950/25',
        !flash && 'hover:bg-[#11111D]',
      )}
      onClick={() => {
        setMenuOpen(false);
        dispatch(tokenSelected(token));
      }}
    >
      {/* Left: logo + symbol + name with tooltip */}
      <div className="flex w-40 items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-500" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col text-left">
                <span className="text-[13px] font-medium text-slate-50">
                  {token.symbol}
                </span>
                <span className="max-w-[140px] truncate text-[11px] text-slate-400">
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
              ? 'text-[#16C784]'
              : token.priceChange24h < 0
              ? 'text-[#EA3943]'
              : 'text-slate-200',
          )}
        >
          {(token.priceChange24h * 100).toFixed(2)}%
        </span>
      </div>

      {/* Volume */}
      <div className="hidden flex-1 tabular-nums text-right text-slate-200 sm:block">
        {(token.volume24h / 1_000).toFixed(1)}k
      </div>

      {/* Market cap */}
      <div className="hidden flex-1 tabular-nums text-right text-slate-200 md:block">
        {(token.marketCap / 1_000_000).toFixed(1)}M
      </div>

      {/* Actions popover */}
      <div className="ml-3 flex w-10 items-center justify-end">
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger
            className="h-7 w-7 rounded-full border border-slate-700/60 bg-slate-900/70 hover:bg-slate-800/80"
            onClick={(e) => {
              e.stopPropagation(); // don’t trigger row click
              setMenuOpen((prev) => !prev);
            }}
            aria-label="Open token actions"
          >
            <MoreHorizontal className="h-4 w-4 text-slate-200" />
          </PopoverTrigger>

          <PopoverContent
            // removed sideOffset & collisionPadding so they don't hit the DOM
            className="z-50 w-44 rounded-xl border border-slate-700 bg-[#05050C] p-1.5 text-xs shadow-[0_18px_45px_rgba(0,0,0,0.85)]"
            onClick={(e) => {
              e.stopPropagation(); // keep row click from firing
            }}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-800/80"
              onClick={() => {
                setMenuOpen(false);
                dispatch(tokenSelected(token));
              }}
            >
              <span>View details</span>
              <span className="text-slate-500">⏎</span>
            </button>

            <button
              type="button"
              className="mt-1 flex w-full items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-800/80"
              onClick={() => {
                setMenuOpen(false);
                navigator.clipboard?.writeText(token.symbol);
              }}
            >
              <span>Copy symbol</span>
              <span className="text-slate-500">{token.symbol}</span>
            </button>

            <button
              type="button"
              className="mt-1 flex w-full items-center justify-between rounded-lg px-2 py-1.5 hover:bg-slate-800/80"
              onClick={() => {
                // later: open block explorer
                setMenuOpen(false);
              }}
            >
              <span>Open on explorer</span>
              <span className="text-slate-500">↗</span>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export const TokenTableRow = memo(TokenTableRowInner);
