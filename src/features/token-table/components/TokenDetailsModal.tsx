'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { tokenSelected } from '@/store/slices/uiSlice';

export const TokenDetailsModal = () => {
  const dispatch = useAppDispatch();
  const { selectedToken } = useAppSelector((s) => s.ui);

  const open = !!selectedToken;

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) dispatch(tokenSelected(undefined));
      }}
    >
      <DialogContent className="max-w-lg bg-[#080814] border border-[#1a1a24]">
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
            {/* Later: mini chart placeholder */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
