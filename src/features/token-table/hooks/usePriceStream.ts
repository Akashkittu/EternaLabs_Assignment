'use client';

import { useEffect } from 'react';
import { createPriceSocket } from '@/lib/ws/priceSocketClient';
import { useAppDispatch } from '@/store/hooks';
import {
  connectionStatusChanged,
  priceUpdateReceived,
  type PriceUpdate,
} from '@/store/slices/tokensSlice';

export const usePriceStream = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = createPriceSocket();

    socket.onopen = () => {
      dispatch(connectionStatusChanged('connected'));
    };

    socket.onclose = () => {
      dispatch(connectionStatusChanged('disconnected'));
    };

    socket.onerror = () => {
      dispatch(connectionStatusChanged('error'));
    };

    socket.onmessage = (event) => {
      try {
        const updates = JSON.parse(event.data) as PriceUpdate[];
        updates.forEach((u) => dispatch(priceUpdateReceived(u)));
      } catch (error) {
        console.error('Error parsing WS message:', error);
      }
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);
};
