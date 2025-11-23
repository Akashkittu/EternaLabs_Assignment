import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import tokensReducer from './slices/tokensSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tokens: tokensReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
