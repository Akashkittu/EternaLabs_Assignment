import type { TokenCategory } from '@/store/slices/uiSlice';

export interface Token {
  id: string; // unique per pair, e.g. "sol-usdc"
  symbol: string;
  name: string;
  category: TokenCategory;
  price: number;
  priceChange24h: number; // -0.01 = -1%
  volume24h: number;
  marketCap: number;
  liquidity: number;
  lastUpdated: number;
}
