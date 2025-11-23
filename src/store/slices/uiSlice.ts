import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Token } from '@/lib/types/token';

export type TokenCategory = 'new_pairs' | 'final_stretch' | 'migrated';

interface SortState {
  field: 'price' | 'volume24h' | 'marketCap' | 'priceChange24h';
  direction: 'asc' | 'desc';
}

interface UiState {
  activeCategory: TokenCategory;
  sort: SortState;
  selectedToken?: Token;
}

const initialState: UiState = {
  activeCategory: 'new_pairs',
  sort: { field: 'volume24h', direction: 'desc' },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    categoryChanged(state, action: PayloadAction<TokenCategory>) {
      state.activeCategory = action.payload;
    },
    sortChanged(state, action: PayloadAction<SortState>) {
      state.sort = action.payload;
    },
    tokenSelected(state, action: PayloadAction<Token | undefined>) {
      state.selectedToken = action.payload;
    },
  },
});

export const { categoryChanged, sortChanged, tokenSelected } = uiSlice.actions;
export default uiSlice.reducer;
