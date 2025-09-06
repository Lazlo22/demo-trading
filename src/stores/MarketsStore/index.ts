import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { MarketItem } from "@/types/market";

interface MarketsStore {
  markets: MarketItem[];
  updateMarkets: (mids: Record<string, string>) => void;
}

export const useMarketsStore = create<MarketsStore>()(
  immer((set) => ({
    markets: [],
    updateMarkets: (mids: Record<string, string>) => {
      set((state) => {
        state.markets = Object.entries(mids)
        .filter(([coin]) => coin[0] !== '@') // Hiding spot tokens
        .map(([coin, mid]) => {
          const displayName = `FUTURES ${coin}/USDC`;
          const symbol = `FUTURES ${coin}/USDC`;

          return {
            coin,
            mid,
            id: coin,
            symbol,
            price: mid,
            displayName,
          };
        });
      });
    },
  }))
);