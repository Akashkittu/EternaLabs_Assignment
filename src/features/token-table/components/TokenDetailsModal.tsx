'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { tokenSelected } from '@/store/slices/uiSlice';
import { X } from 'lucide-react';

export const TokenDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { selectedToken } = useAppSelector((s) => s.ui);

  const open = !!selectedToken;

  const handleClose = () => {
    dispatch(tokenSelected(undefined));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) handleClose();
      }}
    >
      <DialogContent className="relative max-w-lg border border-[#1a1a24] bg-[#080814]">
        {/* Close (X) button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-300 hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-slate-700" />
            {selectedToken?.symbol}{' '}
            <span className="text-xs text-slate-400">
              {selectedToken?.name}
            </span>
          </DialogTitle>
        </DialogHeader>

        {selectedToken && (
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price</span>
              <span className="tabular-nums">
                {selectedToken.price.toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>24h Change</span>
              <span className="tabular-nums">
                {(selectedToken.priceChange24h * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Volume 24h</span>
              <span className="tabular-nums">
                {selectedToken.volume24h.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Market Cap</span>
              <span className="tabular-nums">
                {selectedToken.marketCap.toFixed(0)}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
