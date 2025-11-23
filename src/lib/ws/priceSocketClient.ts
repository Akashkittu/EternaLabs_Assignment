export const createPriceSocket = () => {
  const url = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:3001';
  return new WebSocket(url);
};
