import { axiosClient } from './axiosClient';
import type { Token } from '@/lib/types/token';
import type { TokenCategory } from '@/store/slices/uiSlice';

export const fetchTokens = async (
  category: TokenCategory,
): Promise<Token[]> => {
  const { data } = await axiosClient.get<Token[]>('/api/tokens', {
    params: { category },
  });
  return data;
};
