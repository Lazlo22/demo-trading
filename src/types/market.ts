export interface PerpetualMeta {
  name: string;
  szDecimals: number;
}

export interface SpotToken {
  name: string;
  szDecimals: number;
  weiDecimals: number;
  index: number;
}

export interface SpotPair {
  name: string;
  tokens: [number, number];
  index: number;
}

export interface MarketMetadata {
  perpetuals: PerpetualMeta[];
  spotTokens: SpotToken[];
  spotPairs: SpotPair[];
}

export interface MarketItem {
  id: string;
  symbol: string;
  price: string;
  change24h?: string;
  volume?: string;
  displayName: string;
  coin: string;
  mid: string;
}