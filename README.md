# Eterna Frontend Task – Token Trading Table

Pixel-perfect replica of the Axiom Trade **Pulse** token discovery table, built with
Next.js 14 App Router, TypeScript, Tailwind CSS, Redux Toolkit, React Query and a
mock WebSocket price stream.

---

## ✨ Features

- **Token views**
  - Category tabs: **New pairs**, **Final Stretch**, **Migrated**
  - Search by token or contract address
  - Network pills (SOL / BTC / ETH – UI only)
  - View filters (Trending / Perpetuals / New – UI only, can be wired later)

- **Rich interactions**
  - Sortable columns: **Price**, **24h %**, **Volume 24h**, **Mkt Cap**
  - Row hover elevation + subtle highlight
  - Click row → token **details modal**
  - Row “…” **popover** with:
    - View details (opens modal)
    - Copy symbol
    - Open on explorer (placeholder action)

- **Real-time data**
  - Mock WebSocket server streaming price, volume 24h and 24h% updates
  - Client-side WebSocket hook merges live deltas into React Query data
  - Smooth green/red **flash** on price movement (up/down)

- **Resilient UX**
  - Skeleton **table with shimmer** during initial load
  - **Progressive loading** overlay while background refetch is in progress
  - Dedicated **error** state with retry button for API failures
  - React **ErrorBoundary** wrapping the token table to catch render errors

---

## 🧱 Architecture & Tech Stack

### Framework & styling

- **Next.js 14** App Router
- **TypeScript** with `strict: true`
- **Tailwind CSS** for styling

### State & data

- **Redux Toolkit**

  - `uiSlice`
    - `activeCategory`: `'new_pairs' | 'final_stretch' | 'migrated'`
    - `sort`: `{ field: 'price' | 'volume24h' | 'marketCap' | 'priceChange24h'; direction: 'asc' | 'desc' }`
    - `selectedToken`: currently open token in the details modal

  - `tokensSlice`
    - `connectionStatus`: `'connecting' | 'connected' | 'disconnected' | 'error'`
    - `liveOverrides`: map of latest real-time updates per token (`PriceUpdate`)
    - `lastUpdateTs`: timestamp of last live update

- **React Query**

  - REST endpoint `GET /api/tokens?category=` provides base token lists
  - `useTokenTableData(searchQuery)`:
    1. Fetches category tokens via React Query
    2. Merges WebSocket overrides from `tokensSlice.liveOverrides`
    3. Applies search (symbol/name) and sorting
    4. Returns memoized `tokens` + `isLoading` / `isError` / `isFetching` flags

- **Real-time WebSocket stream**

  - `scripts/ws-server.js`
    - Node `ws` server with an in-memory token list
    - Applies random-walk updates to `price`, `volume24h`, `priceChange24h`
    - Broadcasts `PriceUpdate[]` to all connected clients every second
  - `src/features/token-table/hooks/usePriceStream.ts`
    - Opens WebSocket connection (URL from `NEXT_PUBLIC_WS_URL`)
    - Listens for messages and dispatches `priceUpdateReceived`
    - Updates connection status in Redux

### UI / feature modules

- `src/app/page.tsx`
  - Main “Pulse” screen
  - Header with title & description
  - Network pills, search bar, “Paste CA” button, and view filters
  - Wraps `<TokenTable />` + `<TokenDetailsModal />` in `<ErrorBoundary>`

- `src/features/token-table/components`
  - `TokenTable`
    - Orchestrates loading, error, progressive overlay
    - Uses `useTokenTableData` + `usePriceStream`
  - `TokenTableHeader`
    - Category tabs (New pairs / Final Stretch / Migrated)
    - Sortable column headers with active state indicator
  - `TokenTableRow`
    - Token avatar, symbol, name
    - Price, 24h %, Volume 24h, Mkt Cap cells
    - Real-time flash animation on price change
    - Row click → opens details modal
    - “…” popover menu with actions
  - `TokenTableSkeleton`
    - Skeleton version of the table used for initial + overlay loading
  - `TokenDetailsModal`
    - Dialog showing token stats
    - Controlled by `selectedToken` in `uiSlice`

- `src/components/ui`
  - Lightweight primitives inspired by shadcn/ui:
    - `dialog` – modal overlay with portal & focus management
    - `popover` – anchored floating panel for row actions
    - `tabs` – segmented control for categories
    - `skeleton` – animated shimmer blocks for loading

The architecture is intentionally **atomic**:

- `app/` – routing, layout, API routes
- `features/` – self-contained feature modules
- `store/` – Redux store & slices
- `lib/` – shared utilities, API client, WebSocket factory, types
- `components/ui/` – small, reusable primitives

---

## 🚀 Running the project

From the project root:

```bash
# 1. Install dependencies
npm install

# 2. Start the WebSocket mock server (terminal 1)
node scripts/ws-server.js

# 3. Start the Next.js dev server (terminal 2)
npm run dev

# 4. Open the app

http://localhost:3000

> **Note (production / Vercel):**  
> The mock WebSocket server (`node scripts/ws-server.js`) only runs locally.  
> On the Vercel deployment the header pill may show “Disconnected”, but the
> table still uses the REST API data and remains fully functional.

---

## 🧪 Visual Regression

Visual regression testing is implemented using **Playwright** to satisfy the
“≤ 2 px diff with a visual-regression tool” requirement.

```bash
# with dev server + ws-server running
npm run test:visual -- --update-snapshots   # create/update baseline snapshots
npm run test:visual                         # compare against baselines


The tests capture desktop + mobile screenshots of the Pulse page and compare
them to stored baselines with a small pixel-diff threshold.

---

## 📱 Responsive

The layout is responsive down to **320 px** width:

- On small screens, less critical columns (like Market Cap) are hidden and the
  table becomes horizontally scrollable.
- On larger screens, the table is centered with a max width closely matching
  the Axiom Pulse layout.

