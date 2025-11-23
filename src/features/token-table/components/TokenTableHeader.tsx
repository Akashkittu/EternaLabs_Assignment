'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { categoryChanged, sortChanged } from '@/store/slices/uiSlice';
import { ArrowUpDown } from 'lucide-react';

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
    <div className="border-b border-[#1a1a24]">
      <div className="flex items-center justify-between px-4 pt-3">
        <Tabs
          value={activeCategory}
          onValueChange={(v) => dispatch(categoryChanged(v as any))}
          className="mb-2"
        >
          <TabsList className="bg-transparent p-0 gap-1">
            <TabsTrigger
              value="new_pairs"
              className="rounded-full px-3 py-1 text-xs data-[state=active]:bg-white data-[state=active]:text-black"
            >
              New pairs
            </TabsTrigger>
            <TabsTrigger
              value="final_stretch"
              className="rounded-full px-3 py-1 text-xs data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Final Stretch
            </TabsTrigger>
            <TabsTrigger
              value="migrated"
              className="rounded-full px-3 py-1 text-xs data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Migrated
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center px-4 pb-2 text-xs text-slate-400">
        <div className="w-40">Token</div>

        {/* hide some columns on very small screens later if needed */}
        {columns.map((col) => (
          <button
            key={col.key}
            type="button"
            onClick={() => handleSortClick(col.key)}
            className="flex items-center gap-1 text-left flex-1 hover:text-slate-200"
          >
            {col.label}
            <ArrowUpDown className="h-3 w-3" />
          </button>
        ))}
      </div>
    </div>
  );
};
