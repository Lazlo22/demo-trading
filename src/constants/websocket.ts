export const WEBSOCKET_SUBSCRIPTIONS = {
  ALL_MIDS: 'allMids',
} as const;

export const WEBSOCKET_CONFIG = {
  URL: 'wss://api.hyperliquid.xyz/ws',
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 1000,
} as const;

export const WS_INTERFACE_UPDATE_TIMEOUT = 400;