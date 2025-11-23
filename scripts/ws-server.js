// scripts/ws-server.js
const { WebSocketServer } = require('ws');

/**
 * Mutable in-memory token state for mocking.
 */
const tokens = [
  { id: 'sol-usdc', price: 180.23, volume24h: 1_203_456.78, priceChange24h: 0.042 },
  { id: 'pepe-usdc', price: 0.00000123, volume24h: 560_000, priceChange24h: -0.15 },
  { id: 'eth-usdc', price: 3400.12, volume24h: 9_345_678.9, priceChange24h: -0.013 },
  { id: 'wif-usdc', price: 4.21, volume24h: 3_100_000, priceChange24h: 0.23 },
  { id: 'uni-eth', price: 9.4, volume24h: 1_040_000, priceChange24h: 0.03 },
  { id: 'link-eth', price: 18.5, volume24h: 2_040_000, priceChange24h: 0.015 },
];

function randomWalk(value, pct) {
  const delta = (Math.random() * 2 - 1) * pct * value;
  return value + delta;
}

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  const interval = setInterval(() => {
    const updates = tokens.map((t) => {
      t.price = randomWalk(t.price, 0.005);
      t.volume24h = randomWalk(t.volume24h, 0.02);

      return {
        id: t.id,
        price: +t.price.toFixed(6),
        priceChange24h: t.priceChange24h,
        volume24h: +t.volume24h.toFixed(2),
        timestamp: Date.now(),
      };
    });

    ws.send(JSON.stringify(updates));
  }, 1000);

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    clearInterval(interval);
  });
});

console.log('WebSocket mock server running at ws://localhost:3001');
