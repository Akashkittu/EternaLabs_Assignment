'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { categoryChanged, sortChanged } from '@/store/slices/uiSlice';
import { ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const columns = [
  { key: 'price', label: 'Price' },
  { key: 'priceChange24h', label: '24h %' },
  { key: 'volume24h', label: 'Volume 24h' },
  { key: 'marketCap', label: 'Mkt Cap' },
] as const;

export const TokenTableHeader = () => {
  const dispatch = useAppDispatch();
  const { activeCategory, sort } = useAppSelector((s) => s.ui);

  const handleSortClick = (
    field: (typeof columns)[number]['key'],
  ) => {
    if (sort.field === field) {
      dispatch(
        sortChanged({
          field,
          direction: sort.direction === 'asc' ? 'desc' : 'asc',
        }),
      );
    } else {
      dispatch(sortChanged({ field, direction: 'desc' }));
    }
  };

  return (
    <div className="border-b border-[#1A1A24] bg-[#05050C]">
      {/* Top row: category pills (filters / segments) */}
      <div className="flex items-center justify-between px-4 pt-3">
        <Tabs
          value={activeCategory}
          onValueChange={(v) => dispatch(categoryChanged(v as any))}
          className="mb-2"
        >
          {/* Fancy segmented control */}
          <TabsList
            className="
              inline-flex gap-1 rounded-full border border-[#26263A]
              bg-black/40 px-1 py-1
              shadow-[0_0_0_1px_rgba(15,23,42,0.65)]
              backdrop-blur
            "
          >
            <TabsTrigger
              value="new_pairs"
              className="
                relative overflow-hidden rounded-full px-4 py-1.5
                text-[11px] font-medium tracking-wide text-slate-300
                transition-all
                hover:-translate-y-[1px] hover:bg-white/5 hover:text-slate-100
                data-[state=active]:bg-slate-100
                data-[state=active]:text-black
                data-[state=active]:shadow-[0_0_8px_rgba(248,250,252,0.28)]
              "
            >
              New pairs
            </TabsTrigger>

            <TabsTrigger
              value="final_stretch"
              className="
                relative overflow-hidden rounded-full px-4 py-1.5
                text-[11px] font-medium tracking-wide text-slate-300
                transition-all
                hover:-translate-y-[1px] hover:bg:white/5 hover:text-slate-100
                data-[state=active]:bg-slate-100
                data-[state=active]:text-black
                data-[state=active]:shadow-[0_0_8px_rgba(248,250,252,0.28)]
              "
            >
              Final Stretch
            </TabsTrigger>

            <TabsTrigger
              value="migrated"
              className="
                relative overflow-hidden rounded-full px-4 py-1.5
                text-[11px] font-medium tracking-wide text-slate-300
                transition-all
                hover:-translate-y-[1px] hover:bg-white/5 hover:text-slate-100
                data-[state=active]:bg-slate-100
                data-[state=active]:text-black
                data-[state=active]:shadow-[0_0_8px_rgba(248,250,252,0.28)]
              "
            >
              Migrated
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table column headers */}
      <div className="flex items-center px-4 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {/* Token column label (fixed width to align with rows) */}
        <div className="w-40">Token</div>

        {/* Numeric / sortable columns */}
        {columns.map((col) => {
          const isActive = sort.field === col.key;

          return (
            <button
              key={col.key}
              type="button"
              onClick={() => handleSortClick(col.key)}
              className={cn(
                'flex flex-1 items-center justify-end gap-1 text-right transition-colors',
                'hover:text-slate-200',
                isActive && 'text-slate-100',
              )}
            >
              <span>{col.label}</span>
              <ArrowUpDown
                className={cn(
                  'h-3 w-3 opacity-50',
                  isActive && 'opacity-100 text-slate-100',
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
