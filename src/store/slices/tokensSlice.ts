import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ConnectionStatus =
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

export interface PriceUpdate {
  id: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  timestamp: number;
}

interface TokensState {
  connectionStatus: ConnectionStatus;
  lastUpdateTs?: number;
  liveOverrides: Record<string, PriceUpdate>;
}

const initialState: TokensState = {
  connectionStatus: 'connecting',
  liveOverrides: {},
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    connectionStatusChanged(state, action: PayloadAction<ConnectionStatus>) {
      state.connectionStatus = action.payload;
    },
    priceUpdateReceived(state, action: PayloadAction<PriceUpdate>) {
      const update = action.payload;
      state.liveOverrides[update.id] = update;
      state.lastUpdateTs = update.timestamp;
    },
  },
});

export const { connectionStatusChanged, priceUpdateReceived } =
  tokensSlice.actions;

export default tokensSlice.reducer;
