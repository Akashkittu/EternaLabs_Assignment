import { Skeleton } from '@/components/ui/skeleton';

export const TokenTableSkeleton = () => {
  const rows = new Array(10).fill(0);

  return (
    <div className="divide-y divide-[#1a1a24]">
      {rows.map((_, idx) => (
        <div
          key={idx}
          className="flex items-center px-4 py-3 gap-4"
        >
          <div className="w-40 flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-1 h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
};
