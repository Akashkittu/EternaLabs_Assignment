import { TokenTable } from '@/features/token-table/components/TokenTable';
import { TokenDetailsModal } from '@/features/token-table/components/TokenDetailsModal';

export default function Page() {
  return (
    <main className="min-h-screen flex justify-center px-2 py-6">
      <div className="w-full max-w-6xl">
        <header className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            Token Discovery
          </h1>
          {/* You can add search/filter here later */}
        </header>

        <section className="rounded-2xl">
          <TokenTable />
        </section>

        <TokenDetailsModal />
      </div>
    </main>
  );
}
