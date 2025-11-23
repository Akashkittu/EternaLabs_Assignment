import { NextRequest, NextResponse } from 'next/server';
import type { Token } from '@/lib/types/token';
import type { TokenCategory } from '@/store/slices/uiSlice';

const baseTokens: Token[] = [
  // New pairs
  {
    id: 'sol-usdc',
    symbol: 'SOL',
    name: 'Solana',
    category: 'new_pairs',
    price: 180.23,
    priceChange24h: 0.042,
    volume24h: 1_203_456.78,
    marketCap: 8_000_000_000,
    liquidity: 0.92,
    lastUpdated: Date.now(),
  },
  {
    id: 'pepe-usdc',
    symbol: 'PEPE',
    name: 'Pepe',
    category: 'new_pairs',
    price: 0.00000123,
    priceChange24h: -0.15,
    volume24h: 560_000.0,
    marketCap: 300_000_000,
    liquidity: 0.7,
    lastUpdated: Date.now(),
  },
  // Final stretch
  {
    id: 'eth-usdc',
    symbol: 'ETH',
    name: 'Ethereum',
    category: 'final_stretch',
    price: 3400.12,
    priceChange24h: -0.013,
    volume24h: 9_345_678.9,
    marketCap: 43_000_000_000,
    liquidity: 0.97,
    lastUpdated: Date.now(),
  },
  {
    id: 'wif-usdc',
    symbol: 'WIF',
    name: 'Dogwifhat',
    category: 'final_stretch',
    price: 4.21,
    priceChange24h: 0.23,
    volume24h: 3_100_000.0,
    marketCap: 1_200_000_000,
    liquidity: 0.88,
    lastUpdated: Date.now(),
  },
  // Migrated
  {
    id: 'uni-eth',
    symbol: 'UNI',
    name: 'Uniswap',
    category: 'migrated',
    price: 9.4,
    priceChange24h: 0.03,
    volume24h: 1_040_000.0,
    marketCap: 5_000_000_000,
    liquidity: 0.9,
    lastUpdated: Date.now(),
  },
  {
    id: 'link-eth',
    symbol: 'LINK',
    name: 'Chainlink',
    category: 'migrated',
    price: 18.5,
    priceChange24h: 0.015,
    volume24h: 2_040_000.0,
    marketCap: 6_000_000_000,
    liquidity: 0.93,
    lastUpdated: Date.now(),
  },
  // …add more tokens to make the table look “full”
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryParam = (searchParams.get('category') ??
    'new_pairs') as TokenCategory;

  const data = baseTokens.filter((t) => t.category === categoryParam);

  return NextResponse.json(data);
}
